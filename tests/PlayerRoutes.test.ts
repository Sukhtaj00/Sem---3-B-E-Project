import request from "supertest";

import app from "../src/app";

import * as playerController from "../src/api/v1/controllers/PlayerController";

import { HTTP_STATUS } from "../src/constants/httpConstants";

// Mock the controller functions properly
jest.mock("../src/api/v1/controllers/PlayerController", () => ({
    getAllPlayers: jest.fn(),
    getPlayerById: jest.fn(),
    createPlayer: jest.fn(),
    updatePlayer: jest.fn(),
    deletePlayer: jest.fn(),
}));

// Mock implementation for each controller
const mockPlayerController = playerController as jest.Mocked<typeof playerController>;

describe("Player Routes", () => {
    beforeEach(() => {
        // Setup mock implementations that properly handle Express response
        mockPlayerController.getAllPlayers.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.OK).json({ success: true, data: [], message: "Success" });
            return Promise.resolve();
        });

        mockPlayerController.getPlayerById.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.OK).json({ success: true, data: {}, message: "Success" });
            return Promise.resolve();
        });

        mockPlayerController.createPlayer.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.CREATED).json({ success: true, data: {}, message: "Created" });
            return Promise.resolve();
        });

        mockPlayerController.updatePlayer.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.OK).json({ success: true, data: {}, message: "Updated" });
            return Promise.resolve();
        });

        mockPlayerController.deletePlayer.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.OK).json({ success: true, data: null, message: "Deleted" });
            return Promise.resolve();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/players", () => {
        it("should call getAllPlayers controller", async () => {
            await request(app).get("/api/v1/players");

            expect(mockPlayerController.getAllPlayers).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/players/:id", () => {
        it("should call getPlayerById controller", async () => {
            await request(app).get("/api/v1/players/test-id");

            expect(mockPlayerController.getPlayerById).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/players", () => {
        it("should call createPlayer controller", async () => {
            const newPlayer = {
                username: "gamer123",
                achievements: "First Win",
                totalGamesPlayed: 0
            };

            await request(app).post("/api/v1/players").send(newPlayer);

            expect(mockPlayerController.createPlayer).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/players/:id", () => {
        it("should call updatePlayer controller", async () => {
            const updateData = {
                username: "proGamer123",
                totalGamesPlayed: 25
            };

            await request(app).put("/api/v1/players/test-id").send(updateData);

            expect(mockPlayerController.updatePlayer).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/players/:id", () => {
        it("should call deletePlayer controller", async () => {
            await request(app).delete("/api/v1/players/test-id");

            expect(mockPlayerController.deletePlayer).toHaveBeenCalled();
        });
    });
});