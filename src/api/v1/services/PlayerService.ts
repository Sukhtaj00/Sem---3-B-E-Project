import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore"

import { Player } from "../models/PlayerModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

// firestore collection name
const COLLECTION: string = "players";

/** 
* Retrieves all players from Firestore
* @returns Array of all players
*/
export const getAllPlayers = async (): Promise<Player[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const players: Player[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Player;
        });

        return players;
    } catch (error: unknown){ 
        throw error;
    }
};

/**
* Create a new player
* @param playerData - Player input data
* @returns The created player 
*/
export const createPlayer = async ( playerData: {
    username: string;
    achievements: string;
    totalGamesPlayed: number;
}): Promise<Player> => {
    const newPlayer: Partial<Player> = {
        ...playerData,
    };

    const playerId: string = await createDocument<Player>(COLLECTION, newPlayer);

    return structuredClone({ id: playerId, ...newPlayer} as Player);
};

/**
* Retrieves a single player by ID from the database
* @param id - The ID of the player to retrieve
* @returns The player if found
*/
export const getPlayerById = async (id: string): Promise<Player> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Player with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const player: Player = {
        id: doc.id,
        ...data,
    } as Player;

    return structuredClone(player);
};

/**
* Updates (replaces) an existing player
* @param id - The ID of the player to update
* @param playerData - The fields to update (username, achievements, or totalGamesPlayed)
* @returns The updated player
* @throws Error if player with given ID is not found
*/
export const updatePlayer = async (
    id: string,
    playerData: Pick<Player, "username" | "achievements" | "totalGamesPlayed">
): Promise<Player> => {
    // Check if the player exists before updating
    const player: Player = await getPlayerById(id);
    if (!player) {
        throw new Error(`Player with ID ${id} not found`);
    }

    // Create a copy of the existing player
    const updatedPlayer: Player = {
        ...player,
    };

    // Only update fields that are provided
    if (playerData.username !== undefined) updatedPlayer.username = playerData.username;
    if (playerData.achievements !== undefined) updatedPlayer.achievements = playerData.achievements;
    if (playerData.totalGamesPlayed !== undefined) updatedPlayer.totalGamesPlayed = playerData.totalGamesPlayed;

    // Save updated player to Firestore
    await updateDocument<Player>(COLLECTION, id, updatedPlayer);

    return structuredClone(updatedPlayer);
};

/**
* Deletes a player from storage
* @param id - The ID of the player to delete
* @throws Error if player with given ID is not found
*/
export const deletePlayer = async (id: string): Promise<void> => {
    // Check if the player exists before deleting
    const player: Player = await getPlayerById(id);
    if (!player) {
        throw new Error(`Player with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};