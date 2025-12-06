import request from "supertest";
import app from "../src/app";
import * as playerController from "../src/api/v1/controllers/PlayerController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { NextFunction } from "express";

// Mock controller functions
jest.mock("../src/api/v1/controllers/PlayerController", () => ({
  getAllPlayers: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
  getPlayerById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
  createPlayer: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
  updatePlayer: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
  deletePlayer: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send())
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
describe("Player Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/players", () => {
    it("should call getAllPlayers controller", async () => {
      await request(app).get("/api/v1/players");
      expect(playerController.getAllPlayers).toHaveBeenCalled();
    });
  });

  describe(" GET /api/v1/players/:id", () => {
    it("should call getPlayerById controller", async () => {
      await request(app).get("/api/v1/players/test-id");
      expect(playerController.getPlayerById).toHaveBeenCalled();
    });
  });

  describe("POST /api/v1/players", () => {
    it("should call createPlayer controller", async () => {
      const newPlayer = {
        name: "Test Player",
        age: 21,
        level: "pro"
      };

      await request(app).post("/api/v1/players").send(newPlayer);
      expect(playerController.createPlayer).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/players/:id", () => {
    it("should call updatePlayer controller", async () => {
      const updateData = { name: "Updated Player" };

      await request(app)
        .put("/api/v1/players/test-id")
        .send(updateData);

      expect(playerController.updatePlayer).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/players/:id", () => {
    it("should call deletePlayer controller", async () => {
      await request(app).delete("/api/v1/players/test-id");
      expect(playerController.deletePlayer).toHaveBeenCalled();
    });
  });
});
