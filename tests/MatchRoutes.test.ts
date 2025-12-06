import request from "supertest";
import app from "../src/app";
import * as matchController from "../src/api/v1/controllers/MatchController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { Request, Response, NextFunction } from "express";

// Mock controller functions
jest.mock("../src/api/v1/controllers/MatchController", () => ({
  getAllMatches: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
  getMatchById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
  createMatch: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
  updateMatch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
  deleteMatch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send())
}));

jest.mock("../src/api/v1/middleware/authenticate", () => {
  return jest.fn((_req, _res, next: NextFunction) => next());
});

jest.mock("../src/api/v1/middleware/authorize", () => {
  return jest.fn(() => (_req: Request, _res: Response, next: NextFunction) => next());
});

jest.mock("../src/api/v1/middleware/validate", () => ({
  validateRequest: () => (_req: Request, _res: Response, next: NextFunction) => next()
}));

describe("Match Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/matches", () => {
    it("should call getAllMatches controller", async () => {
      await request(app).get("/api/v1/matches");
      expect(matchController.getAllMatches).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/matches/:id", () => {
    it("should call getMatchById controller", async () => {
      await request(app).get("/api/v1/matches/test-id");
      expect(matchController.getMatchById).toHaveBeenCalled();
    });
  });

  describe("POST /api/v1/matches", () => {
    it("should call createMatch controller", async () => {
      const newMatch = {
        gameId: "game-123",
        player1Id: "player1",
        player2Id: "player2",
        winnerId: "player1"
      };

      await request(app).post("/api/v1/matches").send(newMatch);
      expect(matchController.createMatch).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/matches/:id", () => {
    it("should call updateMatch controller", async () => {
      const updateData = { winnerId: "player2" };

      await request(app)
        .put("/api/v1/matches/test-id")
        .send(updateData);

      expect(matchController.updateMatch).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/matches/:id", () => {
    it("should call deleteMatch controller", async () => {
      await request(app).delete("/api/v1/matches/test-id");
      expect(matchController.deleteMatch).toHaveBeenCalled();
    });
  });

});
