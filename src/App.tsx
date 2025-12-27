import { useState, useEffect, useMemo, useCallback } from 'react';
import { Chess, Move } from 'chess.js';
// @ts-ignore
import type { ChessInstance } from 'chess.js';

const PIECE_NAMES: Record<string, string> = {
  p: 'pawn',
  n: 'knight',
  b: 'bishop',
  r: 'rook',
  q: 'queen',
  k: 'king'
};

const COLOR_NAMES: Record<string, string> = {
  w: 'white',
  b: 'black'
};

// --- AI Evaluation Weights (Simplified PeSTO) ---
const PIECE_VALUES: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };
const PST: Record<string, number[][]> = {
    p: [ [0,0,0,0,0,0,0,0], [50,50,50,50,50,50,50,50], [10,10,20,30,30,20,10,10], [5,5,10,25,25,10,5,5], [0,0,0,20,20,0,0,0], [5,-5,-10,0,0,-10,-5,5], [5,10,10,-20,-20,10,10,5], [0,0,0,0,0,0,0,0] ],
    n: [ [-50,-40,-30,-30,-30,-30,-40,-50], [-40,-20,0,0,0,0,-20,-40], [-30,0,10,15,15,10,0,-30], [-30,5,15,20,20,15,5,-30], [-30,0,15,20,20,15,0,-30], [-30,5,10,15,15,10,5,-30], [-40,-20,0,5,5,0,-20,-40], [-50,-40,-30,-30,-30,-30,-40,-50] ],
    b: [ [-20,-10,-10,-10,-10,-10,-10,-20], [-10,0,0,0,0,0,0,-10], [-10,0,5,10,10,5,0,-10], [-10,5,5,10,10,5,5,-10], [-10,0,10,10,10,10,0,-10], [-10,10,10,10,10,10,10,-10], [-10,5,0,0,0,0,5,-10], [-20,-10,-10,-10,-10,-10,-10,-20] ],
    r: [ [0,0,0,0,0,0,0,0], [5,10,10,10,10,10,10,5], [-5,0,0,0,0,0,0,-5], [-5,0,0,0,0,0,0,-5], [-5,0,0,0,0,0,0,-5], [-5,0,0,0,0,0,0,-5], [-5,0,0,0,0,0,0,-5], [0,0,0,5,5,0,0,0] ],
    q: [ [-20,-10,-10,-5,-5,-10,-10,-20], [-10,0,0,0,0,0,0,-10], [-10,0,5,5,5,5,0,-10], [-5,0,5,5,5,5,0,-5], [0,0,5,5,5,5,0,-5], [-10,5,5,5,5,5,0,-10], [-10,0,5,0,0,0,0,-10], [-20,-10,-10,-5,-5,-10,-10,-20] ],
    k: [ [-30,-40,-40,-50,-50,-40,-40,-30], [-30,-40,-40,-50,-50,-40,-40,-30], [-30,-40,-40,-50,-50,-40,-40,-30], [-30,-40,-40,-50,-50,-40,-40,-30], [-20,-30,-30,-40,-40,-30,-30,-20], [-10,-20,-20,-20,-20,-20,-20,-10], [20,20,0,0,0,0,20,20], [20,30,10,0,0,10,30,20] ]
};

function getPieceValue(piece: any, row: number, col: number) {
    if (piece === null) return 0;

    // Absolute Value
    let value = PIECE_VALUES[piece.type];

    // Position Value (Flip table for black)
    let pstValue = 0;
    if (piece.color === 'w') {
        pstValue = PST[piece.type][row][col];
    } else {
        pstValue = PST[piece.type][7 - row][col];
        value = -value; 
        pstValue = -pstValue; 
    }

    return value + pstValue;
}

function evaluateBoard(board: any[][]) {
    let totalEvaluation = 0;
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            totalEvaluation += getPieceValue(board[row][col], row, col);
        }
    }
    return totalEvaluation;
}

function minimax(gameNode: any, depth: number, alpha: number, beta: number, isMaximizingPlayer: boolean): number {
    if (depth === 0 || gameNode.game_over()) {
        return evaluateBoard(gameNode.board());
    }

    const moves = gameNode.moves(); 

    if (isMaximizingPlayer) {
        let maxEval = -Infinity;
        for (const move of moves) {
            gameNode.move(move);
            const evalVal = minimax(gameNode, depth - 1, alpha, beta, false);
            gameNode.undo();
            maxEval = Math.max(maxEval, evalVal);
            alpha = Math.max(alpha, evalVal);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of moves) {
            gameNode.move(move);
            const evalVal = minimax(gameNode, depth - 1, alpha, beta, true);
            gameNode.undo();
            minEval = Math.min(minEval, evalVal);
            beta = Math.min(beta, evalVal);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

function getBestMove(gameInstance: any, depth: number): string | null {
    const possibleMoves = gameInstance.moves({ verbose: true });
    if (possibleMoves.length === 0) return null;

    let bestMove: any = null;
    let bestValue = -Infinity;
    
    const aiColor = gameInstance.turn();
    const isWhite = aiColor === 'w';

    // Simple move ordering: Captures first
    const sortedMoves = possibleMoves.toSorted((a: any, b: any) => {
        if (a.captured && !b.captured) return -1;
        if (!a.captured && b.captured) return 1;
        return 0.5 - Math.random();
    });

    for (const move of sortedMoves) {
        gameInstance.move(move);
        const value = minimax(gameInstance, depth - 1, -Infinity, Infinity, !isWhite);
        gameInstance.undo();

        if (isWhite) {
            if (value > bestValue) {
                bestValue = value;
                bestMove = move;
            }
        } else {
            // If AI is black, we want to minimize the score (since evaluation is +White)
            // But my minimax implementation above handles the "Active Player Perspective" logic differently often.
            // Let's check minimax below.
            // My minimax returns + for White advantage, - for Black advantage.
            
            // So if isWhite is false (Black to move), we want the LOWEST value.
            if (bestValue === -Infinity) bestValue = Infinity; // reset for min search
            if (value < bestValue) {
                 bestValue = value;
                 bestMove = move;
            }
        }
    }
    
    return bestMove?.san ?? sortedMoves[0]?.san ?? null;
}

function App() {
    const [game] = useState(new Chess());
    const [fen, setFen] = useState(game.fen());
    const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
    const [suggestedMove, setSuggestedMove] = useState<any | null>(null);
    const [legalMoves, setLegalMoves] = useState<Move[]>([]);
    const [gameMode, setGameMode] = useState<'ai' | 'human'>('ai');
    const [aiDepth, setAiDepth] = useState(3);
    const [playerColor] = useState('w'); // Human is white in 'ai' mode by default
    const [isAiThinking, setIsAiThinking] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [gameOverModal, setGameOverModal] = useState<{title: string, message: string, icon: string} | null>(null);

    const board = useMemo(() => game.board(), [fen]);
    const history = useMemo(() => game.history(), [fen]);
    const lastMove = useMemo(() => {
        return game.history({ verbose: true }).findLast(() => true) ?? null;
    }, [fen]);

    const evaluation = useMemo(() => evaluateBoard(board), [board]);

    const makeMove = useCallback((move: string | { from: string; to: string; promotion?: string }) => {
        try {
            const result = game.move(move as any);
            if (result) {
                setFen(game.fen());
                setSuggestedMove(null);
                setSelectedSquare(null);
                setLegalMoves([]);
                return result;
            }
        } catch (e) {
            return null;
        }
        return null;
    }, [game]);

    const handleSquareClick = (squareName: string) => {
        if (isAiThinking) return;
        if (game.game_over()) return;

        // Deselect if clicking same square
        if (selectedSquare === squareName) {
            setSelectedSquare(null);
            setLegalMoves([]);
            return;
        }

        // Try to move
        if (selectedSquare) {
            const moveResult = makeMove({
                from: selectedSquare,
                to: squareName,
                promotion: 'q' // Always promote to queen for simplicity
            });

            if (moveResult) {
                // Valid move made
                // Trigger AI if needed
                if (!game.game_over() && gameMode === 'ai' && game.turn() !== playerColor) {
                    setIsAiThinking(true);
                }
                return;
            }
        }

        // Select logic
        const piece = game.get(squareName as any);
        // Can only select own pieces
        if (piece?.color === game.turn()) {
            // If user is playing white in AI mode, don't let them select black
            if(gameMode === 'ai' && piece.color !== playerColor) return;

            setSelectedSquare(squareName);
            setLegalMoves(game.moves({ square: squareName as any, verbose: true }) as Move[]);
        } else {
            setSelectedSquare(null);
            setLegalMoves([]);
        }
    };

    useEffect(() => {
        if (isAiThinking) {
            setTimeout(() => {
                const bestMove = getBestMove(game, aiDepth);
                if (bestMove) {
                    makeMove(bestMove);
                }
                setIsAiThinking(false);
            }, 100);
        }
    }, [isAiThinking, game, aiDepth, makeMove]);

    useEffect(() => {
        if (game.game_over()) {
            let title = '';
            let message = '';
            let icon = '';
            const moveColor = game.turn() === 'w' ? 'White' : 'Black';

            if (game.in_checkmate()) {
                title = 'Checkmate!';
                message = `${moveColor === 'White' ? 'Black' : 'White'} wins!`;
                icon = 'fa-trophy';
            } else if (game.in_draw()) {
                title = 'Draw';
                message = 'Game ended in a draw.';
                icon = 'fa-handshake';
            } else {
                title = 'Game Over';
                message = 'Game over.';
                icon = 'fa-flag';
            }
            setGameOverModal({ title, message, icon });
        } else {
            setGameOverModal(null);
        }
    }, [fen, game]);

    const resetGame = () => {
        game.reset();
        setFen(game.fen());
        setSuggestedMove(null);
        setSelectedSquare(null);
        setLegalMoves([]);
        setGameOverModal(null);
        setIsAiThinking(false);
    };

    const undoMove = () => {
        if (gameMode === 'ai') {
            game.undo();
            game.undo();
        } else {
            game.undo();
        }
        setFen(game.fen());
        setSuggestedMove(null);
        setSelectedSquare(null);
        setLegalMoves([]);
    };

    const suggestMove = () => {
        if (game.game_over() || isAiThinking || isAnalyzing) return;
        
        setIsAnalyzing(true);
        setTimeout(() => {
            const bestMoveSan = getBestMove(game, 3);
            if (bestMoveSan) {
                // We need the verbose move object to highlight squares
                // But getBestMove returns SAN string now to be compatible with makeMove
                // Let's find the move object from SAN
                const moves = game.moves({ verbose: true }) as Move[];
                const moveObj = moves.find(m => m.san === bestMoveSan);
                if (moveObj) {
                    setSuggestedMove(moveObj);
                }
            }
            setIsAnalyzing(false);
        }, 50);
    };

    // Calculate advantage bar width
    const advantage = 1 / (1 + Math.pow(10, -evaluation / 1000)); 
    const whitePct = advantage * 100;

    return (
        <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center font-sans selection:bg-amber-500 selection:text-white">
            {/* Header */}
            <header className="w-full p-4 bg-slate-900 shadow-md flex justify-between items-center border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <i className="fa-solid fa-chess-knight text-amber-500 text-3xl"></i>
                    <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">Grandmaster Chess</h1>
                </div>
                <div className="text-sm text-slate-400 hidden sm:block">Built with Chess.js & Minimax</div>
            </header>

            {/* Main Layout */}
            <main className="flex-1 w-full max-w-6xl p-4 flex flex-col lg:flex-row gap-8 justify-center items-start mt-4">
                
                {/* Left Column: Board */}
                <div className="w-full lg:w-auto flex flex-col items-center">
                    
                    {/* Player Info (Top) */}
                    <div className="w-full max-w-[600px] flex justify-between items-center mb-3 px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
                                <i className="fa-solid fa-robot text-slate-400 text-lg"></i>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-slate-200 leading-tight">{gameMode === 'ai' ? "Computer (AI)" : "Opponent"}</span>
                                <span className="text-xs text-slate-500">Rating: 1350</span>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                            game.in_check() 
                            ? "bg-red-900/50 border border-red-500 text-red-200 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                            : "bg-slate-800 border border-slate-700 text-slate-300"
                        }`}>
                            {game.in_check() ? "Check!" : "Ready"}
                        </div>
                    </div>

                    {/* The Board */}
                    <div id="board" className="chess-board">
                        {board.map((row: any[], rowIndex: number) => (
                            row.map((piece: any, colIndex: number) => {
                                const squareName = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
                                const isWhite = (rowIndex + colIndex) % 2 === 0;
                                const isSelected = selectedSquare === squareName;
                                const isLastMove = lastMove?.from === squareName || lastMove?.to === squareName;
                                const isSuggested = suggestedMove?.from === squareName || suggestedMove?.to === squareName;
                                const isLegal = legalMoves.find(m => m.to === squareName);

                                return (
                                    <div 
                                        key={squareName}
                                        className={`square ${isWhite ? 'white' : 'black'} 
                                            ${isSelected ? 'selected' : ''} 
                                            ${isLastMove ? 'last-move' : ''} 
                                            ${isSuggested ? 'suggested' : ''}
                                            ${isLegal ? 'highlight' : ''}
                                        `}
                                        onClick={() => handleSquareClick(squareName)}
                                    >
                                        {piece && (
                                            <div className={`piece ${lastMove?.to === squareName ? 'animate-pop' : ''}`}>
                                                <img 
                                                    src={`/pieces/${COLOR_NAMES[piece.color]}_${PIECE_NAMES[piece.type]}.svg`} 
                                                    alt={`${COLOR_NAMES[piece.color]} ${PIECE_NAMES[piece.type]}`}
                                                    className="w-full h-full"
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ))}
                    </div>

                    {/* Player Info (Bottom) */}
                    <div className="w-full max-w-[600px] flex justify-between items-center mt-3 px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center border border-amber-500 shadow-lg shadow-amber-900/20">
                                <i className="fa-solid fa-user text-white text-lg"></i>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-amber-500 leading-tight">You</span>
                                <span className="text-xs text-slate-500">Rating: 1200</span>
                            </div>
                        </div>
                        {gameMode === 'ai' ? (
                            game.turn() === playerColor ? (
                                <div className="bg-amber-500 text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-amber-500/20">
                                    YOUR TURN
                                </div>
                            ) : (
                                <div className="bg-slate-700 text-slate-300 px-4 py-1.5 rounded-full text-xs font-bold animate-pulse">
                                    AI THINKING
                                </div>
                            )
                        ) : (
                            <div className={game.turn() === 'w' ? "bg-slate-200 text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold" : "bg-slate-900 text-slate-200 border border-slate-700 px-4 py-1.5 rounded-full text-xs font-bold"}>
                                {game.turn() === 'w' ? "WHITE'S TURN" : "BLACK'S TURN"}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Controls & History */}
                <div className="w-full lg:w-80 flex flex-col gap-4">
                    
                    {/* Controls Card */}
                    <div className="bg-slate-900 p-5 rounded-xl shadow-xl border border-slate-800">
                        <h2 className="text-lg font-semibold mb-4 text-slate-200 flex items-center gap-2">
                            <i className="fa-solid fa-sliders text-slate-500 text-sm"></i> Controls
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mode</label>
                                <div className="relative">
                                    <select 
                                        value={gameMode} 
                                        onChange={(e) => {
                                            setGameMode(e.target.value as 'ai' | 'human');
                                            resetGame();
                                        }}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-300 focus:border-amber-500 focus:outline-none transition-all appearance-none"
                                    >
                                        <option value="ai">Human vs AI</option>
                                        <option value="human">Human vs Human</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                        <i className="fa-solid fa-chevron-down text-xs"></i>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">AI Level</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[1, 2, 3].map(level => (
                                        <button 
                                            key={level}
                                            className={`diff-btn rounded text-xs py-2 transition-all ${
                                                aiDepth === level 
                                                ? "active bg-slate-800 hover:bg-slate-700 border-amber-500/50 border text-amber-500 font-bold shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                                                : "bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400"
                                            }`}
                                            onClick={() => setAiDepth(level)}
                                        >
                                            {level === 1 ? 'Easy' : level === 2 ? 'Med' : 'Hard'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={suggestMove}
                                disabled={isAnalyzing}
                                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-blue-900/20 border border-blue-500/30 flex items-center justify-center gap-2 group ${isAnalyzing ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isAnalyzing ? (
                                    <><i className="fa-solid fa-circle-notch fa-spin"></i> Analyzing...</>
                                ) : (
                                    <><i className="fa-solid fa-lightbulb group-hover:text-yellow-300 transition-colors"></i> Suggest Move</>
                                )}
                            </button>

                            <div className="grid grid-cols-2 gap-2 pt-2">
                                <button onClick={resetGame} className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg font-semibold text-sm transition-colors border border-slate-700">
                                    New Game
                                </button>
                                <button onClick={undoMove} className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg font-semibold text-sm transition-colors border border-slate-700">
                                    Undo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Move History */}
                    <div className="bg-slate-900 p-0 rounded-xl shadow-xl border border-slate-800 flex-1 min-h-[200px] max-h-[350px] flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Move History</h2>
                        </div>
                        <div className="overflow-y-auto flex-1 text-sm font-mono text-slate-400 custom-scrollbar bg-slate-950/30">
                            {history.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-slate-600 italic text-xs">
                                    Game has not started
                                </div>
                            ) : (
                                Array.from({ length: Math.ceil(history.length / 2) }).map((_, i) => (
                                    <div key={i} className="flex border-b border-slate-800/50 py-1.5 hover:bg-slate-800/50 transition-colors px-2">
                                        <div className="w-8 text-slate-600 text-xs font-mono pt-0.5">{i + 1}.</div>
                                        <div className="w-16 text-slate-300 font-bold text-sm">{history[i * 2]}</div>
                                        <div className="w-16 text-slate-300 font-bold text-sm">{history[i * 2 + 1] ?? ''}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Captured Pieces / Evaluation */}
                    <div className="bg-slate-900 p-4 rounded-xl shadow-xl border border-slate-800">
                        <div className="flex justify-between items-end mb-2">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Evaluation</div>
                            <div className={`text-xs font-mono font-bold ${evaluation > 0 ? "text-slate-300" : evaluation < 0 ? "text-slate-500" : "text-slate-400"}`}>
                                {evaluation > 0 ? `+${(evaluation/100).toFixed(1)}` : evaluation < 0 ? `${(evaluation/100).toFixed(1)}` : "0.0"}
                            </div>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex border border-slate-700/50">
                            <div className="h-full bg-slate-300 transition-all duration-700 ease-out" style={{ width: `${whitePct}%` }}></div>
                            <div className="h-full bg-slate-950 transition-all duration-700 ease-out" style={{ width: `${100 - whitePct}%` }}></div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Game Over Modal */}
            {gameOverModal && (
                <div className="fixed inset-0 modal-bg flex items-center justify-center z-50 opacity-100 transition-opacity duration-300">
                    <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-700 text-center max-w-sm w-full transform scale-100 transition-transform duration-300 relative overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                        
                        <div className="text-6xl mb-6 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                            <i className={`fa-solid ${gameOverModal.icon}`}></i>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">{gameOverModal.title}</h2>
                        <p className="text-slate-400 mb-8 text-lg">{gameOverModal.message}</p>
                        <button onClick={resetGame} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-amber-900/20">
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
