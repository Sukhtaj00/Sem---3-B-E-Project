import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as matchService from "../services/MatchService";
import { Match } from "../models/MatchModule";
import { successResponse } from "../models/ResponseModel";

/**
* Manages requests and responses to retrieve all matches
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const getAllMatches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const matches: Match[] = await matchService.getAllMatches();
        res.status(HTTP_STATUS.OK).json(
            successResponse(matches, "Matches retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
* Manages requests, responses, and validation to create a match
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const createMatch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { gameId, playerId, score, timestamp } = req.body;

        const newMatch: Match = await matchService.createMatch({
            gameId,
            playerId,
            score,
            timestamp,
        });

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newMatch, "Match created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
* Manages requests and responses to retrieve a single match
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const getMatchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const match = await matchService.getMatchById(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(match, "Match retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
* Manages requests and responses to update a match
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const updateMatch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { gameId, playerId, score, timestamp } = req.body;

        const updatedMatch: Match = await matchService.updateMatch(id, {
            gameId,
            playerId,
            score,
            timestamp,
        });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedMatch, "Match updated successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
* Manages requests and responses to delete a match
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const deleteMatch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await matchService.deleteMatch(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(null,"Match successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};