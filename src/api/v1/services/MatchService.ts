import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore"

import { Match } from "../models/MatchModule";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

// firestore collection name
const COLLECTION: string = "matches";

/** 
* Retrieves all matches from Firestore
* @returns Array of all matches
*/
export const getAllMatches = async (): Promise<Match[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const matches: Match[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Match;
        });

        return matches;
    } catch (error: unknown){ 
        throw error;
    }
};

/**
* Create a new match
* @param matchData - Match input data
* @returns The created match 
*/
export const createMatch = async ( matchData: {
    gameId: string;
    playerId: string;
    score: number;
    timestamp: Date;
}): Promise<Match> => {
    const newMatch: Partial<Match> = {
        ...matchData,
    };

    const matchId: string = await createDocument<Match>(COLLECTION, newMatch);

    return structuredClone({ id: matchId, ...newMatch} as Match);
};

/**
* Retrieves a single match by ID from the database
* @param id - The ID of the match to retrieve
* @returns The match if found
*/
export const getMatchById = async (id: string): Promise<Match> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Match with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const match: Match = {
        id: doc.id,
        ...data,
    } as Match;

    return structuredClone(match);
};

/**
* Updates (replaces) an existing match
* @param id - The ID of the match to update
* @param matchData - The fields to update (gameId, playerId, score, or timestamp)
* @returns The updated match
* @throws Error if match with given ID is not found
*/
export const updateMatch = async (
    id: string,
    matchData: Pick<Match, "gameId" | "playerId" | "score" | "timestamp">
): Promise<Match> => {
    // Check if the match exists before updating
    const match: Match = await getMatchById(id);
    if (!match) {
        throw new Error(`Match with ID ${id} not found`);
    }

    // Create a copy of the existing match
    const updatedMatch: Match = {
        ...match,
    };

    // Only update fields that are provided
    if (matchData.gameId !== undefined) updatedMatch.gameId = matchData.gameId;
    if (matchData.playerId !== undefined) updatedMatch.playerId = matchData.playerId;
    if (matchData.score !== undefined) updatedMatch.score = matchData.score;
    if (matchData.timestamp !== undefined) updatedMatch.timestamp = matchData.timestamp;

    // Save updated match to Firestore
    await updateDocument<Match>(COLLECTION, id, updatedMatch);

    return structuredClone(updatedMatch);
};

/**
* Deletes a match from storage
* @param id - The ID of the match to delete
* @throws Error if match with given ID is not found
*/
export const deleteMatch = async (id: string): Promise<void> => {
    // Check if the match exists before deleting
    const match: Match = await getMatchById(id);
    if (!match) {
        throw new Error(`Match with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};