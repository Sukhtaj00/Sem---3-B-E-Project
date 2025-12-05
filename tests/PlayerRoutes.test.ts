import request from "supertest";
import express from "express";
import playerRoutes from "../src/api/v1/routes/PlayerRoutes";
import { Request, Response, NextFunction } from "express";

// Mocking authentication middleware
jest.mock("../src/api/v1/middleware/authenticate", () => {
  return {
    default: jest.fn((_req: Request, _res: Response, next: NextFunction) => {
      // Add mock user for tests that require authentication
      (_req as any).user = { uid: "test-user-id", role: "admin" };
      return next();
    })
  };
});

// Mocking authorization middleware
jest.mock("../src/api/v1/middleware/authorize", () => {
  return {
    default: jest.fn(() => {
      return jest.fn((_req: Request, _res: Response, next: NextFunction) => {
        return next();
      });
    })
  };
});

// Mocking validation middleware
jest.mock("../src/api/v1/middleware/validate", () => ({
  validateRequest: jest.fn(() => (req: Request, res: Response, next: NextFunction) => next())
}));

const app = express();
app.use(express.json());
app.use("/api/v1/players", playerRoutes);

describe("Player Routes", () => {
  describe("GET /api/v1/players", () => {
    it("should return a list of players", async () => {
      const response = await request(app).get("/api/v1/players");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("POST /api/v1/players", () => {
    it("should create a new player", async () => {
      const newPlayer = {
        name: "Test Player",
        email: "test@example.com",
        age: 25
      };
      const response = await request(app)
        .post("/api/v1/players")
        .send(newPlayer);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
    });
  });

  describe("GET /api/v1/players/:id", () => {
    it("should return a player by ID", async () => {
      const response = await request(app).get("/api/v1/players/1");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
    });
  });

  describe("PUT /api/v1/players/:id", () => {
    it("should update a player", async () => {
      const updatedData = { name: "Updated Name" };
      const response = await request(app)
        .put("/api/v1/players/1")
        .send(updatedData);
      expect(response.status).toBe(200);
    });
  });

  describe("DELETE /api/v1/players/:id", () => {
    it("should delete a player", async () => {
      const response = await request(app).delete("/api/v1/players/1");
      expect(response.status).toBe(200);
    });
  });
});