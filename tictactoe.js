export declare class TicTacToe {
    playerX: string;
    playerY: string;
    private _currentTurn: boolean;
    private _board: number[][];
    private _turns: number;

    constructor(playerX: string, playerY: string) {
        this.playerX = playerX;
        this.playerY = playerY;
        this._currentTurn = true;
        this._board = Array(3).fill(null).map(() => Array(3).fill(0));
        this._turns = 0;
    }

    get board(): number[][] {
        return this._board;
    }

    turn(player: string, x: number, y: number): boolean {
        const playerSymbol = this._currentTurn ? 1 : 2;

        if (this._validateTurn(x, y)) {
            this._board[x][y] = playerSymbol;
            this._turns++;
            if (this._checkWinner(playerSymbol)) {
                return true; // Vincitore
            }
            this._currentTurn = !this._currentTurn;
            return true; // Turno valido
        }
        return false; // Turno non valido
    }

    private _validateTurn(x: number, y: number): boolean {
        return x >= 0 && x < 3 && y >= 0 && y < 3 && this._board[x][y] === 0;
    }

    private _checkWinner(playerSymbol: number): boolean {
        const winningCombinations = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        return winningCombinations.some(combination => 
            combination.every(([x, y]) => this._board[x][y] === playerSymbol)
        );
    }

    resetGame(): void {
        this._board = Array(3).fill(null).map(() => Array(3).fill(0));
        this._turns = 0;
        this._currentTurn = true;
    }
}
