import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as playerService from "../services/PlayerService";
import { Player } from "../models/PlayerModel";
import { successResponse } from "../models/ResponseModel";

/**
* Manages requests and responses to retrieve all players
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const getAllPlayers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const players: Player[] = await playerService.getAllPlayers();
        res.status(HTTP_STATUS.OK).json(
            successResponse(players, "Players retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
* Manages requests, responses, and validation to create a player
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const createPlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { username, achievements, totalGamesPlayed } = req.body;

        const newPlayer: Player = await playerService.createPlayer({
            username,
            achievements,
            totalGamesPlayed,
        });

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newPlayer, "Player created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
* Manages requests and responses to retrieve a single player
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const getPlayerById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const player = await playerService.getPlayerById(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(player, "Player retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
* Manages requests and responses to update a player
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const updatePlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { username, achievements, totalGamesPlayed } = req.body;

        const updatedPlayer: Player = await playerService.updatePlayer(id, {
            username,
            achievements,
            totalGamesPlayed,
        });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedPlayer, "Player updated successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
* Manages requests and responses to delete a player
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const deletePlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await playerService.deletePlayer(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(null,"Player successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};