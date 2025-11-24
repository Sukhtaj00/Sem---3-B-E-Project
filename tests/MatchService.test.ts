import * as matchService from "../src/api/v1/services/MatchService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Match } from "../src/api/v1/models/MatchModule";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Match Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a match successfully", async () => {
        // Arrange
        const mockMatchData: {
            gameId: string;
            playerId: string;
            score: number;
            timestamp: Date;
        } = {
            gameId: "game123",
            playerId: "player456",
            score: 1500,
            timestamp: new Date("2024-01-15T10:30:00Z")
        };
        const mockDocumentId: string = "test-match-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result: Match = await matchService.createMatch(mockMatchData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "matches",
            expect.objectContaining({
                gameId: mockMatchData.gameId,
                playerId: mockMatchData.playerId,
                score: mockMatchData.score,
                timestamp: mockMatchData.timestamp,
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.gameId).toBe(mockMatchData.gameId);
        expect(result.score).toBe(mockMatchData.score);
    });

    it("should get a match by ID successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-match-id";
        const mockTimestamp = new Date("2024-01-15T10:30:00Z");
        const mockMatchData = {
            gameId: "game123",
            playerId: "player456",
            score: 1500,
            timestamp: mockTimestamp
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
            exists: true,
            id: mockDocumentId,
            data: () => mockMatchData
        });

        // Act
        const result: Match = await matchService.getMatchById(mockDocumentId);

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
            "matches",
            mockDocumentId
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.gameId).toBe(mockMatchData.gameId);
        expect(result.score).toBe(mockMatchData.score);
    });

    it("should get all matches successfully", async () => {
        // Arrange
        const mockTimestamp = new Date("2024-01-15T10:30:00Z");
        const mockMatchesData = [
            {
                id: "match1",
                data: () => ({
                    gameId: "game123",
                    playerId: "player456",
                    score: 1500,
                    timestamp: mockTimestamp
                })
            },
            {
                id: "match2", 
                data: () => ({
                    gameId: "game123",
                    playerId: "player789",
                    score: 1800,
                    timestamp: mockTimestamp
                })
            }
        ];

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
            docs: mockMatchesData
        });

        // Act
        const result: Match[] = await matchService.getAllMatches();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("matches");
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe("match1");
        expect(result[1].score).toBe(1800);
    });

    it("should update a match successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-match-id";
        const mockTimestamp = new Date("2024-01-15T10:30:00Z");
        const mockExistingMatch: Match = {
            id: mockDocumentId,
            gameId: "game123",
            playerId: "player456",
            score: 1500,
            timestamp: mockTimestamp
        };
        const updateData = {
            score: 1800,
            timestamp: new Date("2024-01-15T11:30:00Z"),
            gameId: "game123",
            playerId: "player456",
        };

        jest.spyOn(matchService, "getMatchById").mockResolvedValue(mockExistingMatch);
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        const result: Match = await matchService.updateMatch(mockDocumentId, updateData);

        // Assert
        expect(matchService.getMatchById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "matches",
            mockDocumentId,
            expect.objectContaining({
                score: updateData.score,
                timestamp: updateData.timestamp,
                gameId: mockExistingMatch.gameId,
                playerId: mockExistingMatch.playerId
            })
        );
        expect(result.score).toBe(updateData.score);
    });

    it("should delete a match successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-match-id";
        const mockTimestamp = new Date("2024-01-15T10:30:00Z");
        const mockMatch: Match = {
            id: mockDocumentId,
            gameId: "game123",
            playerId: "player456",
            score: 1500,
            timestamp: mockTimestamp
        };

        jest.spyOn(matchService, "getMatchById").mockResolvedValue(mockMatch);
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        await matchService.deleteMatch(mockDocumentId);

        // Assert
        expect(matchService.getMatchById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "matches",
            mockDocumentId
        );
    });
});