import request from "supertest";
import express from "express";
import matchRoutes from "../src/api/v1/routes/MatchRoutes";
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
app.use("/api/v1/matches", matchRoutes);

describe("Match Routes", () => {
  describe("GET /api/v1/matches", () => {
    it("should return a list of matches", async () => {
      const response = await request(app).get("/api/v1/matches");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("POST /api/v1/matches", () => {
    it("should create a new match", async () => {
      const newMatch = {
        gameId: 1,
        player1Id: 1,
        player2Id: 2,
        date: "2023-12-01",
        location: "Test Location"
      };
      const response = await request(app)
        .post("/api/v1/matches")
        .send(newMatch);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
    });
  });

  describe("GET /api/v1/matches/:id", () => {
    it("should return a match by ID", async () => {
      const response = await request(app).get("/api/v1/matches/1");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
    });
  });

  describe("PUT /api/v1/matches/:id", () => {
    it("should update a match", async () => {
      const updatedData = { location: "Updated Location" };
      const response = await request(app)
        .put("/api/v1/matches/1")
        .send(updatedData);
      expect(response.status).toBe(200);
    });
  });

  describe("DELETE /api/v1/matches/:id", () => {
    it("should delete a match", async () => {
      const response = await request(app).delete("/api/v1/matches/1");
      expect(response.status).toBe(200);
    });
  });
});