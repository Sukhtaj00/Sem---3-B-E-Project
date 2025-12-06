import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { gameSchemas } from "../src/api/v1/validation/GameValidation";
import { MiddlewareFunction } from "../src/api/v1/types/express";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("Game Validation Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    //
    // CREATE GAME (POST /games)
    //
    describe("gameSchemas.create", () => {
        it("should pass validation for valid game data", () => {
            mockReq.body = {
                name: "Space Invaders",
                description: "Classic shooting game",
                modes: "Single, Multiplayer"
            };

            const middleware: MiddlewareFunction = validateRequest(gameSchemas.create);

            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(mockRes.status).not.toHaveBeenCalled();
        });

        it("should fail when name is missing", () => {
            mockReq.body = {
                description: "Fun game",
                modes: "Single Player"
            };

            const middleware: MiddlewareFunction = validateRequest(gameSchemas.create);

            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalled();
        });

        it("should fail when description is missing", () => {
            mockReq.body = {
                name: "Pac-Man",
                modes: "Single Player"
            };

            const middleware: MiddlewareFunction = validateRequest(gameSchemas.create);

            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalled();
        });

        it("should fail when modes is missing", () => {
            mockReq.body = {
                name: "Pac-Man",
                description: "Arcade classic"
            };

            const middleware: MiddlewareFunction = validateRequest(gameSchemas.create);

            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalled();
        });
    });

    //
    // UPDATE GAME (PUT /games/:id)
    //
    describe("gameSchemas.update", () => {
        it("should pass validation for valid update data", () => {
            mockReq.params = { id: "game123" };
            mockReq.body = { name: "Updated Name" };

            const middleware: MiddlewareFunction = validateRequest(gameSchemas.update);

            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });

        it("should fail when id is missing", () => {
            mockReq.params = {};
            mockReq.body = { name: "Updated Name" };

            const middleware: MiddlewareFunction = validateRequest(gameSchemas.update);

            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalled();
        });

        it("should fail when name field is empty", () => {
            mockReq.params = { id: "game123" };
            mockReq.body = { name: "" };

            const middleware: MiddlewareFunction = validateRequest(gameSchemas.update);

            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalled();
        });

        it("should fail when description field is empty", () => {
            mockReq.params = { id: "game123" };
            mockReq.body = { description: "" };

            const middleware: MiddlewareFunction = validateRequest(gameSchemas.update);

            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalled();
        });

        it("should fail when modes field is empty", () => {
            mockReq.params = { id: "game123" };
            mockReq.body = { modes: "" };

            const middleware: MiddlewareFunction = validateRequest(gameSchemas.update);

            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalled();
        });
    });

});
