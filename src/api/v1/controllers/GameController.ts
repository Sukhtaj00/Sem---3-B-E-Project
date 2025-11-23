import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as gameService from "../services/GameService";
import { Game } from "../models/GameModel";
import { successResponse } from "../models/ResponseModel";

/**
* Manages requests and responses to retrieve all games
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const getAllGames = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const games: Game[] = await gameService.getAllGames();
        res.status(HTTP_STATUS.OK).json(
            successResponse(games, "Games retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
* Manages requests, responses, and validation to create a game
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const createGame = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, description, modes } = req.body;

        const newGame: Game = await gameService.createGame({
            name,
            description,
            modes,
        });

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newGame, "Game created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
* Manages requests and responses to retrieve a single game
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const getGameById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const game = await gameService.getGameById(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(game, "Game retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
* Manages requests and responses to update a game
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const updateGame = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, description, modes } = req.body;

        const updatedGame: Game = await gameService.updateGame(id, {
            name,
            description,
            modes,
        });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedGame, "Game updated successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
* Manages requests and responses to delete a game
* @param req - The express Request
* @param res  - The express Response
* @param next - The express middleware chaining function
*/
export const deleteGame = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await gameService.deleteGame(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(null,"Game successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};