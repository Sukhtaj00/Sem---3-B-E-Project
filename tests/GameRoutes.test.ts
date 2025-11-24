import request from "supertest";

import app from "../src/app";

import * as gameController from "../src/api/v1/controllers/GameController";

import { HTTP_STATUS } from "../src/constants/httpConstants";

// Mock the controller functions properly
jest.mock("../src/api/v1/controllers/GameController", () => ({
    getAllGames: jest.fn(),
    getGameById: jest.fn(),
    createGame: jest.fn(),
    updateGame: jest.fn(),
    deleteGame: jest.fn(),
}));

// Mock implementation for each controller
const mockGameController = gameController as jest.Mocked<typeof gameController>;

describe("Game Routes", () => {
    beforeEach(() => {
        // Setup mock implementations that properly handle Express response
        mockGameController.getAllGames.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.OK).json({ success: true, data: [], message: "Success" });
            return Promise.resolve();
        });

        mockGameController.getGameById.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.OK).json({ success: true, data: {}, message: "Success" });
            return Promise.resolve();
        });

        mockGameController.createGame.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.CREATED).json({ success: true, data: {}, message: "Created" });
            return Promise.resolve();
        });

        mockGameController.updateGame.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.OK).json({ success: true, data: {}, message: "Updated" });
            return Promise.resolve();
        });

        mockGameController.deleteGame.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.OK).json({ success: true, data: null, message: "Deleted" });
            return Promise.resolve();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/games", () => {
        it("should call getAllGames controller", async () => {
            await request(app).get("/api/v1/games");

            expect(mockGameController.getAllGames).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/games/:id", () => {
        it("should call getGameById controller", async () => {
            await request(app).get("/api/v1/games/test-id");

            expect(mockGameController.getGameById).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/games", () => {
        it("should call createGame controller", async () => {
            const newGame = {
                name: "Space Invaders",
                description: "Classic arcade space shooting game",
                modes: "Single Player, Multiplayer"
            };

            await request(app).post("/api/v1/games").send(newGame);

            expect(mockGameController.createGame).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/games/:id", () => {
        it("should call updateGame controller", async () => {
            const updateData = {
                name: "Space Invaders Deluxe",
                description: "Enhanced version of classic arcade game"
            };

            await request(app).put("/api/v1/games/test-id").send(updateData);

            expect(mockGameController.updateGame).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/games/:id", () => {
        it("should call deleteGame controller", async () => {
            await request(app).delete("/api/v1/games/test-id");

            expect(mockGameController.deleteGame).toHaveBeenCalled();
        });
    });
});