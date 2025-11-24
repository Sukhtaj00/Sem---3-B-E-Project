import * as playerService from "../src/api/v1/services/PlayerService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Player } from "../src/api/v1/models/PlayerModel";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Player Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a player successfully", async () => {
        // Arrange
        const mockPlayerData: {
            username: string;
            achievements: string;
            totalGamesPlayed: number;
        } = {
            username: "gamer123",
            achievements: "First Win",
            totalGamesPlayed: 0
        };
        const mockDocumentId: string = "test-player-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result: Player = await playerService.createPlayer(mockPlayerData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "players",
            expect.objectContaining({
                username: mockPlayerData.username,
                achievements: mockPlayerData.achievements,
                totalGamesPlayed: mockPlayerData.totalGamesPlayed,
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.username).toBe(mockPlayerData.username);
        expect(result.achievements).toBe(mockPlayerData.achievements);
    });

    it("should get a player by ID successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-player-id";
        const mockPlayerData = {
            username: "gamer123",
            achievements: "First Win",
            totalGamesPlayed: 5
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
            exists: true,
            id: mockDocumentId,
            data: () => mockPlayerData
        });

        // Act
        const result: Player = await playerService.getPlayerById(mockDocumentId);

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
            "players",
            mockDocumentId
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.username).toBe(mockPlayerData.username);
    });

    it("should get all players successfully", async () => {
        // Arrange
        const mockPlayersData = [
            {
                id: "player1",
                data: () => ({
                    username: "gamer123",
                    achievements: "First Win",
                    totalGamesPlayed: 5
                })
            },
            {
                id: "player2", 
                data: () => ({
                    username: "proGamer",
                    achievements: "High Score",
                    totalGamesPlayed: 25
                })
            }
        ];

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
            docs: mockPlayersData
        });

        // Act
        const result: Player[] = await playerService.getAllPlayers();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("players");
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe("player1");
        expect(result[1].username).toBe("proGamer");
    });

    it("should update a player successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-player-id";
        const mockExistingPlayer: Player = {
            id: mockDocumentId,
            username: "gamer123",
            achievements: "First Win",
            totalGamesPlayed: 5
        };
        const updateData = {
            username: "proGamer123",
            achievements: "First Win, High Score",
            totalGamesPlayed: 10
        };

        jest.spyOn(playerService, "getPlayerById").mockResolvedValue(mockExistingPlayer);
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        const result: Player = await playerService.updatePlayer(mockDocumentId, updateData);

        // Assert
        expect(playerService.getPlayerById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "players",
            mockDocumentId,
            expect.objectContaining({
                username: updateData.username,
                achievements: updateData.achievements,
                totalGamesPlayed: updateData.totalGamesPlayed
            })
        );
        expect(result.username).toBe(updateData.username);
    });

    it("should delete a player successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-player-id";
        const mockPlayer: Player = {
            id: mockDocumentId,
            username: "gamer123",
            achievements: "First Win",
            totalGamesPlayed: 5
        };

        jest.spyOn(playerService, "getPlayerById").mockResolvedValue(mockPlayer);
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        await playerService.deletePlayer(mockDocumentId);

        // Assert
        expect(playerService.getPlayerById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "players",
            mockDocumentId
        );
    });
});