import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { playerSchemas } from "../src/api/v1/validation/PlayerValidation";
import { MiddlewareFunction } from "../src/api/v1/types/express";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("Player Validation Middleware", () => {
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
    // CREATE PLAYER (POST /players)
    //
    describe("playerSchemas.create", () => {
        it("should pass validation for valid player data", () => {
            mockReq.body = {
                username: "gamer123",
                achievements: "First Win",
                totalGamesPlayed: 5,
            };

            const middleware: MiddlewareFunction = validateRequest(playerSchemas.create);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });

        it("should fail when username is missing", () => {
            mockReq.body = {
                achievements: "First Win",
                totalGamesPlayed: 5,
            };

            const middleware: MiddlewareFunction = validateRequest(playerSchemas.create);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should fail when username is empty", () => {
            mockReq.body = {
                username: "",
                achievements: "First Win",
                totalGamesPlayed: 2,
            };

            const middleware: MiddlewareFunction = validateRequest(playerSchemas.create);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should pass when only username is provided (optional fields omitted)", () => {
            mockReq.body = {
                username: "gamer123",
            };

            const middleware: MiddlewareFunction = validateRequest(playerSchemas.create);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });

        it("should fail when totalGamesPlayed is negative", () => {
            mockReq.body = {
                username: "gamer123",
                totalGamesPlayed: -1,
            };

            const middleware: MiddlewareFunction = validateRequest(playerSchemas.create);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });
    });

    //
    // UPDATE PLAYER (PUT /players/:id)
    //
    describe("playerSchemas.update", () => {
        it("should pass for valid params and body", () => {
            mockReq.params = { id: "player123" };
            mockReq.body = { username: "updatedUser" };

            const middleware: MiddlewareFunction = validateRequest(playerSchemas.update);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });

        it("should fail when id is missing", () => {
            mockReq.params = {}; 
            mockReq.body = { username: "updatedUser" };

            const middleware: MiddlewareFunction = validateRequest(playerSchemas.update);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should fail when username is empty", () => {
            mockReq.params = { id: "player123" };
            mockReq.body = { username: "" };

            const middleware: MiddlewareFunction = validateRequest(playerSchemas.update);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should fail when totalGamesPlayed is negative", () => {
            mockReq.params = { id: "player123" };
            mockReq.body = { totalGamesPlayed: -5 };

            const middleware: MiddlewareFunction = validateRequest(playerSchemas.update);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should pass when body is empty (valid optional update)", () => {
            mockReq.params = { id: "player123" };
            mockReq.body = {};

            const middleware: MiddlewareFunction = validateRequest(playerSchemas.update);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });

        it("should pass when updating achievements only", () => {
            mockReq.params = { id: "player123" };
            mockReq.body = { achievements: "New Achievement" };

            const middleware: MiddlewareFunction = validateRequest(playerSchemas.update);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });
    });

});
