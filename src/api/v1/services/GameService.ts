import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore"

import { Game } from "../models/GameModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

// firestore collection name
const COLLECTION: string = "games";

/** 
* Retrieves all games from Firestore
* @returns Array of all games
*/
export const getAllGames = async (): Promise<Game[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const games: Game[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Game;
        });

        return games;
    } catch (error: unknown){ 
        throw error;
    }
};

/**
* Create a new game
* @param gameData - Game input data
* @returns The created game 
*/
export const createGame = async ( gameData: {
    name: string;
    description: string;
    modes: string;
}): Promise<Game> => {
    const newGame: Partial<Game> = {
        ...gameData,
    };

    const gameId: string = await createDocument<Game>(COLLECTION, newGame);

    return structuredClone({ id: gameId, ...newGame} as Game);
};

/**
* Retrieves a single game by ID from the database
* @param id - The ID of the game to retrieve
* @returns The game if found
*/
export const getGameById = async (id: string): Promise<Game> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Game with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const game: Game = {
        id: doc.id,
        ...data,
    } as Game;

    return structuredClone(game);
};

/**
* Updates (replaces) an existing game
* @param id - The ID of the game to update
* @param gameData - The fields to update (name, description, or modes)
* @returns The updated game
* @throws Error if game with given ID is not found
*/
export const updateGame = async (
    id: string,
    gameData: Pick<Game, "name" | "description" | "modes">
): Promise<Game> => {
    // Check if the game exists before updating
    const game: Game = await getGameById(id);
    if (!game) {
        throw new Error(`Game with ID ${id} not found`);
    }

    // Create a copy of the existing game
    const updatedGame: Game = {
        ...game,
    };

    // Only update fields that are provided
    if (gameData.name !== undefined) updatedGame.name = gameData.name;
    if (gameData.description !== undefined) updatedGame.description = gameData.description;
    if (gameData.modes !== undefined) updatedGame.modes = gameData.modes;

    // Save updated game to Firestore
    await updateDocument<Game>(COLLECTION, id, updatedGame);

    return structuredClone(updatedGame);
};

/**
* Deletes a game from storage
* @param id - The ID of the game to delete
* @throws Error if game with given ID is not found
*/
export const deleteGame = async (id: string): Promise<void> => {
    // Check if the game exists before deleting
    const game: Game = await getGameById(id);
    if (!game) {
        throw new Error(`Game with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};