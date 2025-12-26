<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grandmaster Chess</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Chess.js for Game Logic -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js"></script>
    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* Custom Board Styling */
        .chess-board {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: repeat(8, 1fr);
            width: 100%;
            max-width: 600px;
            aspect-ratio: 1 / 1;
            border: 8px solid #475569;
            border-radius: 4px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
        }

        .square {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
        }

        /* Reverted to classic colorful wood theme */
        .square.white { background-color: #f0d9b5; }
        .square.black { background-color: #b58863; }

        .square.selected {
            background-color: #bbcba2 !important; /* Lime-greenish */
            box-shadow: inset 0 0 15px rgba(0,0,0,0.2);
        }

        .square.highlight {
            position: relative;
        }
        
        .square.highlight::after {
            content: '';
            position: absolute;
            width: 24%;
            height: 24%;
            background-color: rgba(0, 0, 0, 0.25);
            border-radius: 50%;
        }

        .square.last-move {
            background-color: rgba(250, 204, 21, 0.4) !important; /* Yellow-400 with opacity */
        }

        /* New Suggestion Style */
        .square.suggested {
            box-shadow: inset 0 0 0 4px #3b82f6 !important; /* Blue ring */
        }

        .piece {
            width: 95%;
            height: 95%;
            transition: transform 0.2s ease;
            pointer-events: none; /* Let clicks pass through to square */
            filter: drop-shadow(2px 4px 3px rgba(0,0,0,0.5)); /* Stronger shadow for 3D feel */
        }

        /* Animations */
        @keyframes popIn {
            0% { transform: scale(0.1); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        .animate-pop {
            animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Modal styling */
        .modal-bg {
            background-color: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(4px);
        }
    </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center font-sans selection:bg-amber-500 selection:text-white">

    <!-- Header -->
    <header class="w-full p-4 bg-slate-900 shadow-md flex justify-between items-center border-b border-slate-800">
        <div class="flex items-center gap-3">
            <i class="fa-solid fa-chess-knight text-amber-500 text-3xl"></i>
            <h1 class="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">Grandmaster Chess</h1>
        </div>
        <div class="text-sm text-slate-400 hidden sm:block">Built with Chess.js & Minimax</div>
    </header>

    <!-- Main Layout -->
    <main class="flex-1 w-full max-w-6xl p-4 flex flex-col lg:flex-row gap-8 justify-center items-start mt-4">
        
        <!-- Left Column: Board -->
        <div class="w-full lg:w-auto flex flex-col items-center">
            
            <!-- Player Info (Top) -->
            <div class="w-full max-w-[600px] flex justify-between items-center mb-3 px-2">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
                        <i class="fa-solid fa-robot text-slate-400 text-lg"></i>
                    </div>
                    <div class="flex flex-col">
                        <span id="topPlayerName" class="font-bold text-slate-200 leading-tight">Opponent</span>
                        <span class="text-xs text-slate-500">Rating: 1350</span>
                    </div>
                </div>
                <div id="statusBadge" class="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs font-semibold text-slate-300 shadow-sm">
                    Ready
                </div>
            </div>

            <!-- The Board -->
            <div id="board" class="chess-board">
                <!-- Generated via JS -->
            </div>

            <!-- Player Info (Bottom) -->
            <div class="w-full max-w-[600px] flex justify-between items-center mt-3 px-2">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center border border-amber-500 shadow-lg shadow-amber-900/20">
                        <i class="fa-solid fa-user text-white text-lg"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-amber-500 leading-tight">You</span>
                        <span class="text-xs text-slate-500">Rating: 1200</span>
                    </div>
                </div>
                <div id="turnIndicator" class="bg-amber-500 text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold hidden shadow-lg shadow-amber-500/20">
                    YOUR TURN
                </div>
            </div>
        </div>

        <!-- Right Column: Controls & History -->
        <div class="w-full lg:w-80 flex flex-col gap-4">
            
            <!-- Controls Card -->
            <div class="bg-slate-900 p-5 rounded-xl shadow-xl border border-slate-800">
                <h2 class="text-lg font-semibold mb-4 text-slate-200 flex items-center gap-2">
                    <i class="fa-solid fa-sliders text-slate-500 text-sm"></i> Controls
                </h2>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mode</label>
                        <div class="relative">
                            <select id="gameMode" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-300 focus:border-amber-500 focus:outline-none transition-all appearance-none">
                                <option value="ai">Human vs AI</option>
                                <option value="human">Human vs Human</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                <i class="fa-solid fa-chevron-down text-xs"></i>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">AI Level</label>
                        <div class="grid grid-cols-3 gap-2">
                            <button class="diff-btn active bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs py-2 transition-all text-slate-400" onclick="setDifficulty(1, this)">Easy</button>
                            <button class="diff-btn bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs py-2 transition-all text-slate-400" onclick="setDifficulty(2, this)">Med</button>
                            <button class="diff-btn bg-slate-800 hover:bg-slate-700 border-amber-500/50 border rounded text-xs py-2 transition-all text-amber-500 font-bold shadow-[0_0_10px_rgba(245,158,11,0.1)]" onclick="setDifficulty(3, this)">Hard</button>
                        </div>
                        <input type="hidden" id="aiDepth" value="3">
                    </div>

                    <button id="suggestBtn" class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-blue-900/20 border border-blue-500/30 flex items-center justify-center gap-2 group">
                        <i class="fa-solid fa-lightbulb group-hover:text-yellow-300 transition-colors"></i> Suggest Move
                    </button>

                    <div class="grid grid-cols-2 gap-2 pt-2">
                        <button id="newGameBtn" class="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg font-semibold text-sm transition-colors border border-slate-700">
                            New Game
                        </button>
                        <button id="undoBtn" class="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg font-semibold text-sm transition-colors border border-slate-700">
                            Undo
                        </button>
                    </div>
                </div>
            </div>

            <!-- Move History -->
            <div class="bg-slate-900 p-0 rounded-xl shadow-xl border border-slate-800 flex-1 min-h-[200px] max-h-[350px] flex flex-col overflow-hidden">
                <div class="p-4 border-b border-slate-800 bg-slate-900/50">
                    <h2 class="text-sm font-bold text-slate-400 uppercase tracking-wider">Move History</h2>
                </div>
                <div id="moveHistory" class="overflow-y-auto flex-1 text-sm font-mono text-slate-400 custom-scrollbar bg-slate-950/30">
                    <div class="flex items-center justify-center h-full text-slate-600 italic text-xs">
                        Game has not started
                    </div>
                </div>
            </div>

            <!-- Captured Pieces -->
            <div class="bg-slate-900 p-4 rounded-xl shadow-xl border border-slate-800">
                <div class="flex justify-between items-end mb-2">
                    <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Evaluation</div>
                    <div id="evalText" class="text-xs font-mono text-amber-500 font-bold">0.0</div>
                </div>
                <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex border border-slate-700/50">
                    <div id="whiteAdvantage" class="h-full bg-slate-300 transition-all duration-700 ease-out" style="width: 50%"></div>
                    <div id="blackAdvantage" class="h-full bg-slate-950 transition-all duration-700 ease-out" style="width: 50%"></div>
                </div>
            </div>

        </div>
    </main>

    <!-- Game Over Modal -->
    <div id="gameOverModal" class="fixed inset-0 modal-bg flex items-center justify-center z-50 hidden opacity-0 transition-opacity duration-300">
        <div class="bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-700 text-center max-w-sm w-full transform scale-95 transition-transform duration-300 relative overflow-hidden">
            <!-- Decorative glow -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            
            <div id="modalIcon" class="text-6xl mb-6 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                <i class="fa-solid fa-trophy"></i>
            </div>
            <h2 id="modalTitle" class="text-3xl font-bold text-white mb-2 tracking-tight">Checkmate!</h2>
            <p id="modalMessage" class="text-slate-400 mb-8 text-lg">White wins the game.</p>
            <button onclick="resetGame()" class="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-amber-900/20">
                Play Again
            </button>
        </div>
    </div>

    <!-- Javascript Logic -->
    <script>
        // --- 3D Grayscale Assets ---
        // High-fidelity SVGs inspired by professional digital chess sets (Neo/Alpha style)
        
        const DEFS = `
            <defs>
                <!-- White Piece Gradients -->
                <linearGradient id="grad_w_body" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stop-color="#FFFFFF"/>
                    <stop offset="100%" stop-color="#D1D1D1"/>
                </linearGradient>
                
                <!-- Black Piece Gradients -->
                <linearGradient id="grad_b_body" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stop-color="#595959"/>
                    <stop offset="100%" stop-color="#2b2b2b"/>
                </linearGradient>
            </defs>
        `;

        const PIECE_SVGS = {
            'w': {
                'p': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${DEFS}<g stroke="#2c2c2c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="url(#grad_w_body)"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" /></g></svg>`,
                'n': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${DEFS}<g stroke="#2c2c2c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="url(#grad_w_body)"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" /><path d="M24 18c.38 2.32-4.68 1.97-5 0 0-1.33.86-2.4 2.25-2.97" fill="#2c2c2c" stroke="#2c2c2c"/></g></svg>`,
                'b': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${DEFS}<g stroke="#2c2c2c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="url(#grad_w_body)"><g><path d="M9 36c3.39-.47 5.5-2.06 5.5-5.5a5.5 5.5 0 0 1 11 0c0 3.44 2.11 5.03 5.5 5.5v2h-22v-2z" /><path d="M19.5 32c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5-4.5 2-4.5 4.5 2 4.5 4.5 4.5z" /><path d="M15 32l-5.5-5.5M20 23l-5.5-5.5M25 32l5.5-5.5M20 12l5.5-5.5" /><path d="M22.5 11.63V6M20 8h5M22.5 11.63c1.3-1 2-2.5 2-4 0-2.5-1.5-4.5-4-4.5s-4 2-4 4.5c0 1.5.7 3 2 4" /></g></g></svg>`,
                'r': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${DEFS}<g stroke="#2c2c2c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="url(#grad_w_body)"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" /><path d="M34 14l-3 3H14l-3-3" /><path d="M31 17v12.5H14V17" /><path d="M31 29.5l1.5 2.5h-20l1.5-2.5" /><path d="M11 14h23" /></g></svg>`,
                'q': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${DEFS}<g stroke="#2c2c2c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="url(#grad_w_body)"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM10.5 20.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM38.5 20.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" /><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11 2 12zM9 26c0 2 1.5 2 2.5 4 1 2.5 3 4.5 6 5 3 .5 15 .5 18 0 3-.5 5-2.5 6-5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" /><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" /></g><circle cx="6" cy="12" r="1.5" fill="#2c2c2c"/><circle cx="24.5" cy="7.5" r="1.5" fill="#2c2c2c"/><circle cx="43" cy="12" r="1.5" fill="#2c2c2c"/><circle cx="9" cy="21" r="1.5" fill="#2c2c2c"/><circle cx="40" cy="21" r="1.5" fill="#2c2c2c"/></svg>`,
                'k': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${DEFS}<g stroke="#2c2c2c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="url(#grad_w_body)"><path d="M22.5 11.63V6M20 8h5" /><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" /><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 2-8 2s-4-2.5-5-2.5-2 2.5-5 2.5-4-3-8-2c-3 6 6 10.5 6 10.5v7z" /><path d="M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0" /></g></svg>`
            },
            'b': {
                'p': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${DEFS}<g stroke="#d1d1d1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="url(#grad_b_body)"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" /></g></svg>`,
                'n': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${DEFS}<g stroke="#d1d1d1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="url(#grad_b_body)"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" /><path d="M24 18c.38 2.32-4.68 1.97-5 0 0-1.33.86-2.4 2.25-2.97" fill="#d1d1d1" stroke="#d1d1d1"/></g></svg>`,
                'b': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${DEFS}<g stroke="#d1d1d1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="url(#grad_b_body)"><g><path d="M9 36c3.39-.47 5.5-2.06 5.5-5.5a5.5 5.5 0 0 1 11 0c0 3.44 2.11 5.03 5.5 5.5v2h-22v-2z" /><path d="M19.5 32c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5-4.5 2-4.5 4.5 2 4.5 4.5 4.5z" /><path d="M15 32l-5.5-5.5M20 23l-5.5-5.5M25 32l5.5-5.5M20 12l5.5-5.5" /><path d="M22.5 11.63V6M20 8h5M22.5 11.63c1.3-1 2-2.5 2-4 0-2.5-1.5-4.5-4-4.5s-4 2-4 4.5c0 1.5.7 3 2 4" /></g></g></svg>`,
                'r': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${DEFS}<g stroke="#d1d1d1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="url(#grad_b_body)"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" /><path d="M34 14l-3 3H14l-3-3" /><path d="M31 17v12.5H14V17" /><path d="M31 29.5l1.5 2.5h-20l1.5-2.5" /><path d="M11 14h23" /></g></svg>`,
                'q': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${DEFS}<g stroke="#d1d1d1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="url(#grad_b_body)"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM10.5 20.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM38.5 20.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" /><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11 2 12zM9 26c0 2 1.5 2 2.5 4 1 2.5 3 4.5 6 5 3 .5 15 .5 18 0 3-.5 5-2.5 6-5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" /><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" /></g><circle cx="6" cy="12" r="1.5" fill="#d1d1d1"/><circle cx="24.5" cy="7.5" r="1.5" fill="#d1d1d1"/><circle cx="43" cy="12" r="1.5" fill="#d1d1d1"/><circle cx="9" cy="21" r="1.5" fill="#d1d1d1"/><circle cx="40" cy="21" r="1.5" fill="#d1d1d1"/></svg>`,
                'k': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${DEFS}<g stroke="#d1d1d1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="url(#grad_b_body)"><path d="M22.5 11.63V6M20 8h5" /><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" /><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 2-8 2s-4-2.5-5-2.5-2 2.5-5 2.5-4-3-8-2c-3 6 6 10.5 6 10.5v7z" /><path d="M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0" /></g></svg>`
            }
        };

        // --- Global State ---
        let game = new Chess();
        let boardEl = document.getElementById('board');
        let selectedSquare = null;
        let suggestedMove = null; // New state for learner mode
        let legalMoves = [];
        let gameMode = 'ai'; // 'ai' or 'human'
        let aiDepth = 3;
        let playerColor = 'w'; // Human is white in 'ai' mode by default
        let isAiThinking = false;

        // --- AI Evaluation Weights (Simplified PeSTO) ---
        const PIECE_VALUES = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };
        const PST = {
            p: [ [0,0,0,0,0,0,0,0], [50,50,50,50,50,50,50,50], [10,10,20,30,30,20,10,10], [5,5,10,25,25,10,5,5], [0,0,0,20,20,0,0,0], [5,-5,-10,0,0,-10,-5,5], [5,10,10,-20,-20,10,10,5], [0,0,0,0,0,0,0,0] ],
            n: [ [-50,-40,-30,-30,-30,-30,-40,-50], [-40,-20,0,0,0,0,-20,-40], [-30,0,10,15,15,10,0,-30], [-30,5,15,20,20,15,5,-30], [-30,0,15,20,20,15,0,-30], [-30,5,10,15,15,10,5,-30], [-40,-20,0,5,5,0,-20,-40], [-50,-40,-30,-30,-30,-30,-40,-50] ],
            b: [ [-20,-10,-10,-10,-10,-10,-10,-20], [-10,0,0,0,0,0,0,-10], [-10,0,5,10,10,5,0,-10], [-10,5,5,10,10,5,5,-10], [-10,0,10,10,10,10,0,-10], [-10,10,10,10,10,10,10,-10], [-10,5,0,0,0,0,5,-10], [-20,-10,-10,-10,-10,-10,-10,-20] ],
            r: [ [0,0,0,0,0,0,0,0], [5,10,10,10,10,10,10,5], [-5,0,0,0,0,0,0,-5], [-5,0,0,0,0,0,0,-5], [-5,0,0,0,0,0,0,-5], [-5,0,0,0,0,0,0,-5], [-5,0,0,0,0,0,0,-5], [0,0,0,5,5,0,0,0] ],
            q: [ [-20,-10,-10,-5,-5,-10,-10,-20], [-10,0,0,0,0,0,0,-10], [-10,0,5,5,5,5,0,-10], [-5,0,5,5,5,5,0,-5], [0,0,5,5,5,5,0,-5], [-10,5,5,5,5,5,0,-10], [-10,0,5,0,0,0,0,-10], [-20,-10,-10,-5,-5,-10,-10,-20] ],
            k: [ [-30,-40,-40,-50,-50,-40,-40,-30], [-30,-40,-40,-50,-50,-40,-40,-30], [-30,-40,-40,-50,-50,-40,-40,-30], [-30,-40,-40,-50,-50,-40,-40,-30], [-20,-30,-30,-40,-40,-30,-30,-20], [-10,-20,-20,-20,-20,-20,-20,-10], [20,20,0,0,0,0,20,20], [20,30,10,0,0,10,30,20] ]
        };

        // --- Initialization ---
        function init() {
            gameMode = document.getElementById('gameMode').value;
            aiDepth = parseInt(document.getElementById('aiDepth').value);
            
            // Event Listeners
            document.getElementById('newGameBtn').addEventListener('click', resetGame);
            document.getElementById('undoBtn').addEventListener('click', undoMove);
            document.getElementById('suggestBtn').addEventListener('click', suggestMove);
            document.getElementById('gameMode').addEventListener('change', (e) => {
                gameMode = e.target.value;
                document.getElementById('topPlayerName').innerText = gameMode === 'ai' ? "Computer (AI)" : "Opponent";
                resetGame();
            });
            // Note: Difficulty buttons are handled via onclick in HTML

            // Initial Render
            renderBoard();
            updateStatus();
        }
        
        // Function called by difficulty buttons
        function setDifficulty(depth, btn) {
            aiDepth = depth;
            document.querySelectorAll('.diff-btn').forEach(b => {
                b.className = "diff-btn bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs py-2 transition-all text-slate-400";
            });
            btn.className = "diff-btn active bg-slate-800 hover:bg-slate-700 border-amber-500/50 border rounded text-xs py-2 transition-all text-amber-500 font-bold shadow-[0_0_10px_rgba(245,158,11,0.1)]";
        }

        // --- Core UI Functions ---

        function renderBoard() {
            boardEl.innerHTML = '';
            const board = game.board();
            const lastMove = game.history({ verbose: true }).pop();

            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    const square = document.createElement('div');
                    const squareName = String.fromCharCode(97 + col) + (8 - row);
                    const piece = board[row][col];
                    
                    // Styling
                    const isWhite = (row + col) % 2 === 0;
                    square.className = `square ${isWhite ? 'white' : 'black'}`;
                    square.dataset.square = squareName;

                    // Highlight selection
                    if (selectedSquare === squareName) {
                        square.classList.add('selected');
                    }

                    // Highlight last move
                    if (lastMove && (lastMove.from === squareName || lastMove.to === squareName)) {
                        square.classList.add('last-move');
                    }

                    // Highlight suggestion
                    if (suggestedMove && (suggestedMove.from === squareName || suggestedMove.to === squareName)) {
                        square.classList.add('suggested');
                    }

                    // Highlight legal moves
                    const isLegalMove = legalMoves.find(m => m.to === squareName);
                    if (isLegalMove) {
                        square.classList.add('highlight');
                    }

                    // Render Piece
                    if (piece) {
                        const pieceEl = document.createElement('div');
                        pieceEl.className = 'piece';
                        if (lastMove && lastMove.to === squareName) {
                            pieceEl.classList.add('animate-pop');
                        }
                        pieceEl.innerHTML = PIECE_SVGS[piece.color][piece.type];
                        square.appendChild(pieceEl);
                    }

                    // Click Event
                    square.addEventListener('click', () => handleSquareClick(squareName));
                    boardEl.appendChild(square);
                }
            }
        }

        function handleSquareClick(squareName) {
            if (isAiThinking) return;
            if (game.game_over()) return;

            // Deselect if clicking same square
            if (selectedSquare === squareName) {
                deselect();
                return;
            }

            // Try to move
            if (selectedSquare) {
                const move = game.move({
                    from: selectedSquare,
                    to: squareName,
                    promotion: 'q' // Always promote to queen for simplicity
                });

                if (move) {
                    // Valid move made
                    suggestedMove = null; // Clear suggestion on move
                    deselect();
                    renderBoard();
                    updateStatus();
                    playSound(move);

                    // Trigger AI if needed
                    if (!game.game_over() && gameMode === 'ai' && game.turn() !== playerColor) {
                        isAiThinking = true;
                        updateStatus("AI Thinking...");
                        // Use timeout to allow UI to update before heavy calculation
                        setTimeout(() => {
                            makeAiMove();
                            isAiThinking = false;
                            renderBoard();
                            updateStatus();
                        }, 100);
                    }
                    return;
                }
            }

            // Select logic
            const piece = game.get(squareName);
            // Can only select own pieces
            if (piece && piece.color === game.turn()) {
                // If user is playing white in AI mode, don't let them select black
                if(gameMode === 'ai' && piece.color !== playerColor) return;

                selectedSquare = squareName;
                legalMoves = game.moves({ square: squareName, verbose: true });
                renderBoard();
            } else {
                deselect();
            }
        }

        function deselect() {
            selectedSquare = null;
            legalMoves = [];
            renderBoard();
        }

        function updateStatus(customMsg) {
            const statusBadge = document.getElementById('statusBadge');
            const turnIndicator = document.getElementById('turnIndicator');
            const modal = document.getElementById('gameOverModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');
            const modalIcon = document.getElementById('modalIcon');

            let status = '';
            let moveColor = game.turn() === 'w' ? 'White' : 'Black';

            if (game.in_checkmate()) {
                status = `Checkmate! ${moveColor === 'White' ? 'Black' : 'White'} wins.`;
                showModal('Checkmate!', `${moveColor === 'White' ? 'Black' : 'White'} wins!`, 'fa-trophy');
            } else if (game.in_draw()) {
                status = 'Draw!';
                showModal('Draw', 'Game ended in a draw.', 'fa-handshake');
            } else if (game.in_check()) {
                status = `${moveColor} is in check!`;
                statusBadge.className = "bg-red-900/50 border border-red-500 px-3 py-1 rounded-full text-xs font-semibold text-red-200 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.3)]";
            } else {
                status = customMsg || (game.turn() === 'w' ? "White's Turn" : "Black's Turn");
                statusBadge.className = "bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs font-semibold text-slate-300";
            }

            statusBadge.innerText = status;

            // Turn Indicator for User
            if (gameMode === 'ai') {
                if (game.turn() === playerColor) {
                    turnIndicator.classList.remove('hidden');
                    turnIndicator.innerText = "YOUR TURN";
                    turnIndicator.className = "bg-amber-500 text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-amber-500/20";
                } else {
                    turnIndicator.classList.remove('hidden');
                    turnIndicator.innerText = "AI THINKING";
                    turnIndicator.className = "bg-slate-700 text-slate-300 px-4 py-1.5 rounded-full text-xs font-bold animate-pulse";
                }
            } else {
                turnIndicator.classList.remove('hidden');
                turnIndicator.innerText = game.turn() === 'w' ? "WHITE'S TURN" : "BLACK'S TURN";
                turnIndicator.className = game.turn() === 'w' ? "bg-slate-200 text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold" : "bg-slate-900 text-slate-200 border border-slate-700 px-4 py-1.5 rounded-full text-xs font-bold";
            }

            // History
            updateHistory();
            updateEvaluation();
        }

        function updateHistory() {
            const historyEl = document.getElementById('moveHistory');
            const history = game.history();
            
            if (history.length === 0) {
                historyEl.innerHTML = '<div class="flex items-center justify-center h-full text-slate-600 italic text-xs">Game has not started</div>';
                return;
            }

            let html = '';
            for (let i = 0; i < history.length; i += 2) {
                const num = (i / 2) + 1;
                const wMove = history[i];
                const bMove = history[i + 1] || '';
                html += `
                    <div class="flex border-b border-slate-800/50 py-1.5 hover:bg-slate-800/50 transition-colors px-2">
                        <div class="w-8 text-slate-600 text-xs font-mono pt-0.5">${num}.</div>
                        <div class="w-16 text-slate-300 font-bold text-sm">${wMove}</div>
                        <div class="w-16 text-slate-300 font-bold text-sm">${bMove}</div>
                    </div>
                `;
            }
            historyEl.innerHTML = html;
            historyEl.scrollTop = historyEl.scrollHeight;
        }

        function updateEvaluation() {
            const ev = evaluateBoard(game.board());
            const whiteBar = document.getElementById('whiteAdvantage');
            const blackBar = document.getElementById('blackAdvantage');
            const evalText = document.getElementById('evalText');
            
            // Sigmoid to constrain bar between 0 and 100%
            const advantage = 1 / (1 + Math.pow(10, -ev / 1000)); 
            const whitePct = advantage * 100;
            
            whiteBar.style.width = `${whitePct}%`;
            blackBar.style.width = `${100 - whitePct}%`;

            let valText = "0.0";
            if (ev > 0) {
                 valText = `+${(ev/100).toFixed(1)}`;
                 evalText.className = "text-xs font-mono text-slate-300 font-bold";
            } else if (ev < 0) {
                 valText = `+${(Math.abs(ev)/100).toFixed(1)}`; // Show positive for black relative to black side
                 // Actually standard is - for black. Let's show + for leader.
                 evalText.innerText = `${(ev/100).toFixed(1)}`;
                 evalText.className = "text-xs font-mono text-slate-500 font-bold";
            } else {
                evalText.className = "text-xs font-mono text-slate-400 font-bold";
            }
            evalText.innerText = (ev / 100).toFixed(1);
        }

        function resetGame() {
            game.reset();
            suggestedMove = null; // Clear suggestion
            deselect();
            document.getElementById('gameOverModal').classList.add('hidden', 'opacity-0');
            document.getElementById('gameOverModal').classList.remove('flex');
            updateStatus();
            renderBoard();
        }

        function undoMove() {
            if (gameMode === 'ai') {
                // Undo twice to revert both AI and Player
                game.undo();
                game.undo();
            } else {
                game.undo();
            }
            suggestedMove = null; // Clear suggestion
            deselect();
            renderBoard();
            updateStatus();
        }

        // --- New Learner Mode Logic ---
        let isAnalyzing = false;

        function suggestMove() {
            if (game.game_over() || isAiThinking || isAnalyzing) return;
            
            isAnalyzing = true;
            const btn = document.getElementById('suggestBtn');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Analyzing...';
            btn.disabled = true;
            btn.classList.add('opacity-75', 'cursor-not-allowed');
            
            setTimeout(() => {
                // Use depth 3 for a good suggestion that isn't too slow
                const bestMove = getBestMove(game, 3);
                
                if (bestMove) {
                    suggestedMove = bestMove; // Store {from, to, ...}
                    renderBoard();
                    updateStatus("Best move suggested (Blue Ring)");
                }
                
                // Reset button state
                btn.innerHTML = '<i class="fa-solid fa-lightbulb group-hover:text-yellow-300 transition-colors"></i> Suggest Move';
                btn.disabled = false;
                btn.classList.remove('opacity-75', 'cursor-not-allowed');
                isAnalyzing = false;
            }, 50);
        }

        function playSound(move) {
            // Sound removed for compatibility
        }

        function showModal(title, message, iconClass) {
            const modal = document.getElementById('gameOverModal');
            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalMessage').innerText = message;
            document.getElementById('modalIcon').innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
            
            modal.classList.remove('hidden');
            // Trigger reflow
            void modal.offsetWidth;
            modal.classList.add('flex', 'opacity-100');
            modal.children[0].classList.remove('scale-95');
            modal.children[0].classList.add('scale-100');
        }


        // --- AI Engine (Minimax) ---

        function makeAiMove() {
            const bestMove = getBestMove(game, aiDepth);
            if (bestMove) {
                game.move(bestMove);
                playSound(bestMove);
            }
        }

        function getBestMove(gameInstance, depth) {
            const possibleMoves = gameInstance.moves({ verbose: true });
            if (possibleMoves.length === 0) return null;

            let bestMove = null;
            let bestValue = -Infinity;
            let alpha = -Infinity;
            let beta = Infinity;
            
            const aiColor = gameInstance.turn();
            const isWhite = aiColor === 'w';

            // Simple move ordering: Captures first
            possibleMoves.sort((a, b) => {
                if (a.captured && !b.captured) return -1;
                if (!a.captured && b.captured) return 1;
                return 0.5 - Math.random();
            });

            for (let i = 0; i < possibleMoves.length; i++) {
                const move = possibleMoves[i];
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
            
            if (!bestMove && possibleMoves.length > 0) return possibleMoves[0];
            return bestMove;
        }

        function minimax(gameNode, depth, alpha, beta, isMaximizingPlayer) {
            if (depth === 0 || gameNode.game_over()) {
                return evaluateBoard(gameNode.board());
            }

            const moves = gameNode.moves(); 

            if (isMaximizingPlayer) {
                let maxEval = -Infinity;
                for (const move of moves) {
                    gameNode.move(move);
                    const eval = minimax(gameNode, depth - 1, alpha, beta, false);
                    gameNode.undo();
                    maxEval = Math.max(maxEval, eval);
                    alpha = Math.max(alpha, eval);
                    if (beta <= alpha) break;
                }
                return maxEval;
            } else {
                let minEval = Infinity;
                for (const move of moves) {
                    gameNode.move(move);
                    const eval = minimax(gameNode, depth - 1, alpha, beta, true);
                    gameNode.undo();
                    minEval = Math.min(minEval, eval);
                    beta = Math.min(beta, eval);
                    if (beta <= alpha) break;
                }
                return minEval;
            }
        }

        function evaluateBoard(board) {
            let totalEvaluation = 0;
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    totalEvaluation += getPieceValue(board[row][col], row, col);
                }
            }
            return totalEvaluation;
        }

        function getPieceValue(piece, row, col) {
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

        // Start
        init();

    </script>
</body>
</html>