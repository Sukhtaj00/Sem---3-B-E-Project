import request from "supertest";

import app from "../src/app";

import * as matchController from "../src/api/v1/controllers/MatchController";

import { HTTP_STATUS } from "../src/constants/httpConstants";

// Mock the controller functions properly
jest.mock("../src/api/v1/controllers/MatchController", () => ({
    getAllMatches: jest.fn(),
    getMatchById: jest.fn(),
    createMatch: jest.fn(),
    updateMatch: jest.fn(),
    deleteMatch: jest.fn(),
}));

// Mock implementation for each controller
const mockMatchController = matchController as jest.Mocked<typeof matchController>;

describe("Match Routes", () => {
    beforeEach(() => {
        // Setup mock implementations that properly handle Express response
        mockMatchController.getAllMatches.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.OK).json({ success: true, data: [], message: "Success" });
            return Promise.resolve();
        });

        mockMatchController.getMatchById.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.OK).json({ success: true, data: {}, message: "Success" });
            return Promise.resolve();
        });

        mockMatchController.createMatch.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.CREATED).json({ success: true, data: {}, message: "Created" });
            return Promise.resolve();
        });

        mockMatchController.updateMatch.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.OK).json({ success: true, data: {}, message: "Updated" });
            return Promise.resolve();
        });

        mockMatchController.deleteMatch.mockImplementation((req, res, next) => {
            res.status(HTTP_STATUS.OK).json({ success: true, data: null, message: "Deleted" });
            return Promise.resolve();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/matches", () => {
        it("should call getAllMatches controller", async () => {
            await request(app).get("/api/v1/matches");

            expect(mockMatchController.getAllMatches).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/matches/:id", () => {
        it("should call getMatchById controller", async () => {
            await request(app).get("/api/v1/matches/test-id");

            expect(mockMatchController.getMatchById).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/matches", () => {
        it("should call createMatch controller", async () => {
            const newMatch = {
                gameId: "game123",
                playerId: "player456",
                score: 1500,
                timestamp: "2024-01-15T10:30:00Z"
            };

            await request(app).post("/api/v1/matches").send(newMatch);

            expect(mockMatchController.createMatch).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/matches/:id", () => {
        it("should call updateMatch controller", async () => {
            const updateData = {
                score: 1800,
                timestamp: "2024-01-15T11:30:00Z"
            };

            await request(app).put("/api/v1/matches/test-id").send(updateData);

            expect(mockMatchController.updateMatch).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/matches/:id", () => {
        it("should call deleteMatch controller", async () => {
            await request(app).delete("/api/v1/matches/test-id");

            expect(mockMatchController.deleteMatch).toHaveBeenCalled();
        });
    });
});