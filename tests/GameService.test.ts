import * as gameService from "../src/api/v1/services/GameService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Game } from "../src/api/v1/models/GameModel";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Game Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a game successfully", async () => {
        // Arrange
        const mockGameData: {
            name: string;
            description: string;
            modes: string;
        } = {
            name: "Space Invaders",
            description: "Classic arcade space shooting game",
            modes: "Single Player, Multiplayer"
        };
        const mockDocumentId: string = "test-game-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result: Game = await gameService.createGame(mockGameData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "games",
            expect.objectContaining({
                name: mockGameData.name,
                description: mockGameData.description,
                modes: mockGameData.modes,
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockGameData.name);
        expect(result.description).toBe(mockGameData.description);
    });

    it("should get a game by ID successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-game-id";
        const mockGameData = {
            name: "Space Invaders",
            description: "Classic arcade space shooting game",
            modes: "Single Player, Multiplayer"
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
            exists: true,
            id: mockDocumentId,
            data: () => mockGameData
        });

        // Act
        const result: Game = await gameService.getGameById(mockDocumentId);

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
            "games",
            mockDocumentId
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockGameData.name);
    });

    it("should get all games successfully", async () => {
        // Arrange
        const mockGamesData = [
            {
                id: "game1",
                data: () => ({
                    name: "Space Invaders",
                    description: "Classic arcade game",
                    modes: "Single Player"
                })
            },
            {
                id: "game2", 
                data: () => ({
                    name: "Pac-Man",
                    description: "Maze game",
                    modes: "Single Player"
                })
            }
        ];

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
            docs: mockGamesData
        });

        // Act
        const result: Game[] = await gameService.getAllGames();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("games");
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe("game1");
        expect(result[1].name).toBe("Pac-Man");
    });

    it("should update a game successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-game-id";
        const mockExistingGame: Game = {
            id: mockDocumentId,
            name: "Space Invaders",
            description: "Classic arcade game",
            modes: "Single Player"
        };
        const updateData = {
            name: "Space Invaders Deluxe",
            description: "Enhanced version",
            modes : "Simulation"
        };

        jest.spyOn(gameService, "getGameById").mockResolvedValue(mockExistingGame);
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        const result: Game = await gameService.updateGame(mockDocumentId, updateData);

        // Assert
        expect(gameService.getGameById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "games",
            mockDocumentId,
            expect.objectContaining({
                name: updateData.name,
                description: updateData.description,
                modes: updateData.modes
            })
        );
        expect(result.name).toBe(updateData.name);
    });

    it("should delete a game successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-game-id";
        const mockGame: Game = {
            id: mockDocumentId,
            name: "Space Invaders",
            description: "Classic arcade game",
            modes: "Single Player"
        };

        jest.spyOn(gameService, "getGameById").mockResolvedValue(mockGame);
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        await gameService.deleteGame(mockDocumentId);

        // Assert
        expect(gameService.getGameById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "games",
            mockDocumentId
        );
    });
});