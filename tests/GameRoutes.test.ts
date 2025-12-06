import request from "supertest";
import app from "../src/app";
import * as gameController from "../src/api/v1/controllers/GameController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { Request, Response, NextFunction } from "express";


// Mock controller functions
jest.mock("../src/api/v1/controllers/GameController", () => ({
  getAllGames: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
  getGameById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
  createGame: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
  updateGame: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
  deleteGame: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send())
}));

// Mock authentication (bypass)
jest.mock("../src/api/v1/middleware/authenticate", () => {
  return jest.fn((_req, _res, next: NextFunction) => next());
});

jest.mock("../src/api/v1/middleware/authorize", () => {
  return jest.fn(() => (_req: Request, _res: Response, next: NextFunction) => next());
});

jest.mock("../src/api/v1/middleware/validate", () => ({
  validateRequest: () => (_req: Request, _res: Response, next: NextFunction) => next()
}));

describe("Game Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/games", () => {
    it("should call getAllGames controller", async () => {
      await request(app).get("/api/v1/games");
      expect(gameController.getAllGames).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/games/:id", () => {
    it("should call getGameById controller", async () => {
      await request(app).get("/api/v1/games/test-id");
      expect(gameController.getGameById).toHaveBeenCalled();
    });
  });

  describe("POST /api/v1/games", () => {
    it("should call createGame controller", async () => {
      const newGame = { name: "New Game" };

      await request(app).post("/api/v1/games").send(newGame);
      expect(gameController.createGame).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/games/:id", () => {
    it("should call updateGame controller", async () => {
      const updateData = { name: "Updated Game" };

      await request(app)
        .put("/api/v1/games/test-id")
        .send(updateData);

      expect(gameController.updateGame).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/games/:id", () => {
    it("should call deleteGame controller", async () => {
      await request(app).delete("/api/v1/games/test-id");
      expect(gameController.deleteGame).toHaveBeenCalled();
    });
  });
});
