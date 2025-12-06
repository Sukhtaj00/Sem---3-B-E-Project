import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { matchSchemas } from "../src/api/v1/validation/MatchValidation";
import { MiddlewareFunction } from "../src/api/v1/types/express";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("Match Validation Middleware", () => {
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
    // CREATE MATCH (POST /matches)
    //
    describe("matchSchemas.create", () => {
        it("should pass validation for valid match data", () => {
            mockReq.body = {
                gameId: "game123",
                playerId: "player123",
                score: 200,
                timestamp: "2024-01-01T10:00:00Z"
            };

            const middleware: MiddlewareFunction = validateRequest(matchSchemas.create);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });

        it("should fail when gameId is missing", () => {
            mockReq.body = {
                playerId: "player123",
                score: 200
            };

            const middleware: MiddlewareFunction = validateRequest(matchSchemas.create);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should fail when playerId is missing", () => {
            mockReq.body = {
                gameId: "game123",
                score: 200
            };

            const middleware: MiddlewareFunction = validateRequest(matchSchemas.create);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should fail when score is missing", () => {
            mockReq.body = {
                gameId: "game123",
                playerId: "player123"
            };

            const middleware: MiddlewareFunction = validateRequest(matchSchemas.create);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should fail when score is not a number", () => {
            mockReq.body = {
                gameId: "game123",
                playerId: "player123",
                score: "wrong"
            };

            const middleware: MiddlewareFunction = validateRequest(matchSchemas.create);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should fail when score is negative", () => {
            mockReq.body = {
                gameId: "game123",
                playerId: "player123",
                score: -1
            };

            const middleware: MiddlewareFunction = validateRequest(matchSchemas.create);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });
    });

    //
    // UPDATE MATCH (PUT /matches/:id)
    //
    describe("matchSchemas.update", () => {
        it("should pass for valid params and body", () => {
            mockReq.params = { id: "match123" };
            mockReq.body = { score: 250 };

            const middleware: MiddlewareFunction = validateRequest(matchSchemas.update);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });

        it("should fail when id param is missing", () => {
            mockReq.params = {};
            mockReq.body = { score: 200 };

            const middleware: MiddlewareFunction = validateRequest(matchSchemas.update);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should fail when gameId is empty", () => {
            mockReq.params = { id: "match123" };
            mockReq.body = { gameId: "" };

            const middleware: MiddlewareFunction = validateRequest(matchSchemas.update);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should fail when playerId is empty", () => {
            mockReq.params = { id: "match123" };
            mockReq.body = { playerId: "" };

            const middleware: MiddlewareFunction = validateRequest(matchSchemas.update);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should fail when score is negative", () => {
            mockReq.params = { id: "match123" };
            mockReq.body = { score: -5 };

            const middleware: MiddlewareFunction = validateRequest(matchSchemas.update);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it("should pass when body is empty (valid optional update)", () => {
            mockReq.params = { id: "match123" };
            mockReq.body = {};

            const middleware: MiddlewareFunction = validateRequest(matchSchemas.update);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });
    });

});
