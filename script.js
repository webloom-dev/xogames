// Game State
let gameState = {
    currentScreen: 'splash',
    currentPage: 1,
    levelsPerPage: 12,
    totalLevels: 50,
    unlockedLevels: 1,
    coins: 0,
    currentLevel: 1,
    currentPlayerSymbol: 'X',
    board: Array(9).fill(''),
    gameActive: false,
    aiSymbol: 'O',
    currentTab: 'x-skins',
    language: 'en',
    difficulty: 'medium', // easy, medium, hard, unbeatable
    gameVolume: 80,
    musicVolume: 50,
    muteGameSounds: false,
    muteBackgroundMusic: false,
    darkMode: false,
    skins: {
        x: [
            { id: 'x1', name: 'Classic X', symbol: '❌', price: 0, owned: true, equipped: true },
            { id: 'x2', name: 'Bold X', symbol: '❎', price: 20, owned: false, equipped: false },
            { id: 'x3', name: 'Fire X', symbol: '🔥', price: 35, owned: false, equipped: false },
            { id: 'x4', name: 'Lightning X', symbol: '⚡', price: 50, owned: false, equipped: false },
            { id: 'x5', name: 'Skull X', symbol: '💀', price: 100, owned: false, equipped: false },
            { id: 'x6', name: 'Heart X', symbol: '❤️', price: 75, owned: false, equipped: false }
        ],
        o: [
            { id: 'o1', name: 'Classic O', symbol: '⭕', price: 0, owned: true, equipped: true },
            { id: 'o2', name: 'Target O', symbol: '🎯', price: 20, owned: false, equipped: false },
            { id: 'o3', name: 'Snowflake O', symbol: '❄️', price: 35, owned: false, equipped: false },
            { id: 'o4', name: 'Star O', symbol: '⭐', price: 50, owned: false, equipped: false },
            { id: 'o5', name: 'Diamond O', symbol: '💎', price: 100, owned: false, equipped: false },
            { id: 'o6', name: 'Moon O', symbol: '🌙', price: 75, owned: false, equipped: false }
        ],
        board: [
            { id: 'b1', name: 'Classic Board', css: '', price: 0, owned: true, equipped: true },
            { id: 'b2', name: 'Wooden Board', css: 'wooden', price: 30, owned: false, equipped: false },
            { id: 'b3', name: 'Marble Board', css: 'marble', price: 50, owned: false, equipped: false },
            { id: 'b4', name: 'Neon Board', css: 'neon', price: 75, owned: false, equipped: false },
            { id: 'b5', name: 'Space Board', css: 'space', price: 120, owned: false, equipped: false },
            { id: 'b6', name: 'Ocean Board', css: 'ocean', price: 90, owned: false, equipped: false }
        ]
    }
};

// DOM Elements
const elements = {
    splashScreen: document.getElementById('splash-screen'),
    splashProgress: document.getElementById('splash-progress'),
    mainMenu: document.getElementById('main-menu'),
    transitionScreen: document.getElementById('transition-screen'),
    levelScreen: document.getElementById('level-screen'),
    gameScreen: document.getElementById('game-screen'),
    storeScreen: document.getElementById('store-screen'),
    settingsScreen: document.getElementById('settings-screen'),
    resultModal: document.getElementById('result-modal'),
    coinCount: document.getElementById('coin-count'),
    gameCoins: document.getElementById('game-coins'),
    storeCoins: document.getElementById('store-coins'),
    settingsCoins: document.getElementById('settings-coins'),
    gameCoinsHeader: document.getElementById('game-coins-header'),
    levelGrid: document.getElementById('level-grid'),
    prevPage: document.getElementById('prev-page'),
    nextPage: document.getElementById('next-page'),
    pageInfo: document.getElementById('page-info'),
    currentLevel: document.getElementById('current-level'),
    symbolSelection: document.getElementById('symbol-selection'),
    symbols: document.querySelectorAll('.symbol-btn'),
    boardGrid: document.getElementById('board-grid'),
    hintBtn: document.getElementById('hint-btn'),
    resultMessage: document.getElementById('result-message'),
    coinsEarned: document.getElementById('coins-earned'),
    xSkinsGrid: document.getElementById('x-skins-grid'),
    oSkinsGrid: document.getElementById('o-skins-grid'),
    boardSkinsGrid: document.getElementById('board-skins-grid'),
    tabButtons: document.querySelectorAll('.tab-btn'),
    languageToggle: document.getElementById('language-toggle'),
    darkModeToggle: document.getElementById('dark-mode-toggle'),
    languageSelect: document.getElementById('language-select'),
    difficultySelect: document.getElementById('difficulty-select'),
    gameVolumeSlider: document.getElementById('game-volume-slider'),
    musicVolumeSlider: document.getElementById('music-volume-slider'),
    gameVolumeValue: document.getElementById('game-volume-value'),
    musicVolumeValue: document.getElementById('music-volume-value'),
    muteGameToggle: document.getElementById('mute-game-toggle'),
    muteMusicToggle: document.getElementById('mute-music-toggle'),
    darkModeSetting: document.getElementById('dark-mode-setting')
};

// Audio Elements
const sounds = {
    click: document.getElementById('click-sound'),
    win: document.getElementById('win-sound'),
    lose: document.getElementById('lose-sound'),
    background: document.getElementById('background-music')
};

// Initialize Game
function init() {
    loadGameState();
    updateLanguage();
    updateSettingsUI();
    applyDarkMode();
    playBackgroundMusic();
    simulateLoading();
}

// Simulate Loading Process
function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        elements.splashProgress.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                elements.splashScreen.style.opacity = '0';
                setTimeout(() => {
                    elements.splashScreen.style.display = 'none';
                    showMainMenu();
                }, 500);
            }, 300);
        }
    }, 100);
}

// Show Main Menu
function showMainMenu() {
    gameState.currentScreen = 'menu';
    elements.mainMenu.style.display = 'flex';
    saveGameState();
}

// Show Screen with Transition
function showScreen(screenName) {
    // Play transition effect
    elements.transitionScreen.classList.add('active');
    
    setTimeout(() => {
        // Hide all screens including main menu
        document.querySelectorAll('.screen, .main-menu').forEach(screen => {
            screen.style.display = 'none';
        });
        
        // Show target screen
        if (screenName === 'menu') {
            elements.mainMenu.style.display = 'flex';
        } else {
            document.getElementById(`${screenName}-screen`).style.display = 'block';
        }
        
        gameState.currentScreen = screenName;
        
        // Update coin displays
        updateCoinDisplay();
        
        // Hide transition
        elements.transitionScreen.classList.remove('active');
        saveGameState();
    }, 500);
}

// Load Game State from localStorage
function loadGameState() {
    const saved = localStorage.getItem('xoEvolutionState');
    if (saved) {
        const parsed = JSON.parse(saved);
        gameState = { ...gameState, ...parsed };
    }
    
    // Ensure starting state
    gameState.coins = 0;
    gameState.unlockedLevels = 1;
    gameState.currentLevel = 1;
}

// Save Game State to localStorage
function saveGameState() {
    localStorage.setItem('xoEvolutionState', JSON.stringify(gameState));
}

// Update Coin Display
function updateCoinDisplay() {
    elements.coinCount.textContent = gameState.coins;
    elements.gameCoins.textContent = gameState.coins;
    elements.storeCoins.textContent = gameState.coins;
    elements.settingsCoins.textContent = gameState.coins;
    elements.gameCoinsHeader.textContent = gameState.coins;
}

// Update Language
function updateLanguage() {
    const lang = gameState.language;
    document.querySelectorAll('[data-en]').forEach(el => {
        if (lang === 'ar') {
            el.textContent = el.getAttribute('data-ar') || el.textContent;
        } else {
            el.textContent = el.getAttribute('data-en') || el.textContent;
        }
    });
    
    elements.languageToggle.textContent = lang === 'en' ? 'العربية' : 'English';
    document.body.classList.toggle('arabic', lang === 'ar');
    
    // Update select options
    elements.languageSelect.value = lang;
}

// Apply Dark Mode
function applyDarkMode() {
    document.body.classList.toggle('dark-mode', gameState.darkMode);
    elements.darkModeToggle.innerHTML = gameState.darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    elements.darkModeSetting.checked = gameState.darkMode;
}

// Update Settings UI
function updateSettingsUI() {
    elements.languageSelect.value = gameState.language;
    elements.difficultySelect.value = gameState.difficulty;
    elements.gameVolumeSlider.value = gameState.gameVolume;
    elements.musicVolumeSlider.value = gameState.musicVolume;
    elements.gameVolumeValue.textContent = `${gameState.gameVolume}%`;
    elements.musicVolumeValue.textContent = `${gameState.musicVolume}%`;
    elements.muteGameToggle.checked = gameState.muteGameSounds;
    elements.muteMusicToggle.checked = gameState.muteBackgroundMusic;
    elements.darkModeSetting.checked = gameState.darkMode;
}

// Play Background Music
function playBackgroundMusic() {
    if (gameState.muteBackgroundMusic) {
        sounds.background.volume = 0;
    } else {
        sounds.background.volume = gameState.musicVolume / 100;
    }
    
    sounds.background.play().catch(e => console.log("Background music play failed:", e));
}

// Render Level Screen
function renderLevelScreen() {
    const startLevel = (gameState.currentPage - 1) * gameState.levelsPerPage + 1;
    const endLevel = Math.min(startLevel + gameState.levelsPerPage - 1, gameState.totalLevels);
    
    elements.levelGrid.innerHTML = '';
    
    for (let i = startLevel; i <= endLevel; i++) {
        const levelBtn = document.createElement('button');
        levelBtn.className = `level-btn ${i <= gameState.unlockedLevels ? 'unlocked' : 'locked'}`;
        levelBtn.dataset.level = i;
        
        if (i <= gameState.unlockedLevels) {
            levelBtn.textContent = i;
            levelBtn.addEventListener('click', () => startLevelGame(i));
        } else {
            levelBtn.innerHTML = `<i class="fas fa-lock"></i>`;
            levelBtn.disabled = true;
        }
        
        elements.levelGrid.appendChild(levelBtn);
    }
    
    elements.pageInfo.textContent = `Page ${gameState.currentPage} of ${Math.ceil(gameState.totalLevels / gameState.levelsPerPage)}`;
    elements.prevPage.disabled = gameState.currentPage === 1;
    elements.nextPage.disabled = gameState.currentPage === Math.ceil(gameState.totalLevels / gameState.levelsPerPage);
}

// Start Level Game
function startLevelGame(level) {
    playSound('click');
    gameState.currentLevel = level;
    elements.currentLevel.textContent = level;
    showScreen('game');
    showSymbolSelection();
}

// Show Symbol Selection
function showSymbolSelection() {
    elements.symbolSelection.style.display = 'block';
    elements.boardGrid.parentElement.style.display = 'none';
    elements.resultModal.classList.remove('active');
}

// Select Symbol
function selectSymbol(symbol) {
    playSound('click');
    gameState.currentPlayerSymbol = symbol;
    gameState.aiSymbol = symbol === 'X' ? 'O' : 'X';
    elements.symbolSelection.style.display = 'none';
    elements.boardGrid.parentElement.style.display = 'block';
    startGame();
}

// Start Game
function startGame() {
    gameState.board = Array(9).fill('');
    gameState.gameActive = true;
    renderBoard();
    updateCoinDisplay();
    
    // AI makes first move if it's supposed to
    if (gameState.aiSymbol === 'X') {
        setTimeout(makeAIMove, 1000);
    }
}

// Render Game Board
function renderBoard() {
    elements.boardGrid.innerHTML = '';
    
    // Get equipped skins
    const xSkin = gameState.skins.x.find(skin => skin.equipped);
    const oSkin = gameState.skins.o.find(skin => skin.equipped);
    const boardSkin = gameState.skins.board.find(skin => skin.equipped);
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.dataset.index = i;
        
        if (gameState.board[i]) {
            cell.textContent = gameState.board[i] === 'X' ? xSkin.symbol : oSkin.symbol;
            cell.classList.add('occupied');
        } else {
            cell.classList.add('playable');
            cell.addEventListener('click', () => makePlayerMove(i));
        }
        
        // Apply board skin
        if (boardSkin.css) {
            cell.classList.add(boardSkin.css);
        }
        
        elements.boardGrid.appendChild(cell);
    }
}

// Make Player Move
function makePlayerMove(index) {
    if (!gameState.gameActive || gameState.board[index] !== '') return;
    
    playSound('click');
    gameState.board[index] = gameState.currentPlayerSymbol;
    renderBoard();
    
    if (checkWin(gameState.board, gameState.currentPlayerSymbol)) {
        endGame('win');
    } else if (gameState.board.every(cell => cell !== '')) {
        endGame('draw');
    } else {
        setTimeout(makeAIMove, 500 + Math.random() * 1000);
    }
}

// Make AI Move
function makeAIMove() {
    if (!gameState.gameActive) return;
    
    let move;
    
    // Determine AI difficulty based on settings
    switch (gameState.difficulty) {
        case 'easy':
            move = makeEasyMove();
            break;
        case 'medium':
            move = makeMediumMove();
            break;
        case 'hard':
            // 70% chance of hard move, 30% chance of medium
            move = Math.random() < 0.7 ? makeHardMove() : makeMediumMove();
            break;
        case 'unbeatable':
            move = makeHardMove();
            break;
        default:
            move = makeMediumMove();
    }
    
    if (move !== -1) {
        gameState.board[move] = gameState.aiSymbol;
        renderBoard();
        
        if (checkWin(gameState.board, gameState.aiSymbol)) {
            endGame('lose');
        } else if (gameState.board.every(cell => cell !== '')) {
            endGame('draw');
        }
    }
}

// Easy AI Move
function makeEasyMove() {
    // Simple blocking/winning or random
    const winMove = findWinningMove(gameState.aiSymbol);
    if (winMove !== -1) return winMove;
    
    const blockMove = findWinningMove(gameState.currentPlayerSymbol);
    if (blockMove !== -1) return blockMove;
    
    // Random move
    const emptyCells = gameState.board.map((cell, index) => cell === '' ? index : null).filter(cell => cell !== null);
    return emptyCells.length > 0 ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : -1;
}

// Medium AI Move
function makeMediumMove() {
    // Try to win
    const winMove = findWinningMove(gameState.aiSymbol);
    if (winMove !== -1) return winMove;
    
    // Block player win
    const blockMove = findWinningMove(gameState.currentPlayerSymbol);
    if (blockMove !== -1) return blockMove;
    
    // Take center if available
    if (gameState.board[4] === '') return 4;
    
    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(index => gameState.board[index] === '');
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available spot
    const emptyCells = gameState.board.map((cell, index) => cell === '' ? index : null).filter(cell => cell !== null);
    return emptyCells.length > 0 ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : -1;
}

// Hard AI Move (Minimax)
function makeHardMove() {
    return minimax(gameState.board, gameState.aiSymbol).index;
}

// Minimax Algorithm
function minimax(board, player) {
    const availableSpots = board.map((cell, index) => cell === '' ? index : null).filter(cell => cell !== null);
    
    if (checkWin(board, gameState.currentPlayerSymbol)) {
        return { score: -10 };
    } else if (checkWin(board, gameState.aiSymbol)) {
        return { score: 10 };
    } else if (availableSpots.length === 0) {
        return { score: 0 };
    }
    
    const moves = [];
    
    for (let i = 0; i < availableSpots.length; i++) {
        const move = {};
        move.index = availableSpots[i];
        board[availableSpots[i]] = player;
        
        const result = minimax(board, player === gameState.aiSymbol ? gameState.currentPlayerSymbol : gameState.aiSymbol);
        move.score = result.score;
        
        board[availableSpots[i]] = '';
        moves.push(move);
    }
    
    let bestMove;
    if (player === gameState.aiSymbol) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    
    return moves[bestMove];
}

// Find Winning Move
function findWinningMove(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState.board[a] === player && gameState.board[b] === player && gameState.board[c] === '') {
            return c;
        }
        if (gameState.board[a] === player && gameState.board[c] === player && gameState.board[b] === '') {
            return b;
        }
        if (gameState.board[b] === player && gameState.board[c] === player && gameState.board[a] === '') {
            return a;
        }
    }
    
    return -1;
}

// Check Win
function checkWin(board, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

// End Game
function endGame(result) {
    gameState.gameActive = false;
    playSound(result === 'win' ? 'win' : result === 'lose' ? 'lose' : 'click');
    
    let coinsEarned = 0;
    let message = '';
    let emoji = '';
    let messageClass = '';
    
    switch (result) {
        case 'win':
            coinsEarned = 20 + Math.floor(gameState.currentLevel / 5);
            message = gameState.language === 'ar' ? 'لقد فزت!' : 'You Win!';
            emoji = '🎉';
            messageClass = 'win';
            // Unlock next level if this was a win
            if (gameState.currentLevel === gameState.unlockedLevels && gameState.unlockedLevels < gameState.totalLevels) {
                gameState.unlockedLevels++;
            }
            break;
        case 'lose':
            coinsEarned = 5;
            message = gameState.language === 'ar' ? 'لقد خسرت!' : 'You Lose!';
            emoji = '😔';
            messageClass = 'lose';
            break;
        case 'draw':
            coinsEarned = 10;
            message = gameState.language === 'ar' ? 'تعادل!' : 'It\'s a Draw!';
            emoji = '🤝';
            messageClass = 'draw';
            break;
    }
    
    gameState.coins += coinsEarned;
    updateCoinDisplay();
    saveGameState();
    
    elements.resultMessage.textContent = `${emoji} ${message}`;
    elements.resultMessage.className = messageClass;
    elements.coinsEarned.textContent = gameState.language === 'ar' ? 
        `العملات المكتسبة: ${coinsEarned}` : 
        `Coins earned: ${coinsEarned}`;
    elements.resultModal.classList.add('active');
}

// Use Hint
function useHint() {
    if (gameState.coins < 15 || !gameState.gameActive) return;
    
    playSound('click');
    gameState.coins -= 15;
    updateCoinDisplay();
    saveGameState();
    
    // Find best move for player
    let hintMove;
    const winMove = findWinningMove(gameState.currentPlayerSymbol);
    if (winMove !== -1) {
        hintMove = winMove;
    } else {
        const blockMove = findWinningMove(gameState.aiSymbol);
        if (blockMove !== -1) {
            hintMove = blockMove;
        } else {
            // Use minimax for best strategic move
            const result = minimax([...gameState.board], gameState.currentPlayerSymbol);
            hintMove = result.index;
        }
    }
    
    // Show hint permanently
    const cells = document.querySelectorAll('.cell');
    cells[hintMove].classList.add('hinted');
}

// Render Store
function renderStore() {
    renderSkins('x', elements.xSkinsGrid);
    renderSkins('o', elements.oSkinsGrid);
    renderSkins('board', elements.boardSkinsGrid);
}

// Render Skins for a Category
function renderSkins(category, container) {
    container.innerHTML = '';
    
    gameState.skins[category].forEach(skin => {
        const skinElement = document.createElement('div');
        skinElement.className = `skin-item ${skin.owned ? 'owned' : ''} ${skin.equipped ? 'equipped' : ''}`;
        skinElement.dataset.id = skin.id;
        skinElement.dataset.category = category;
        
        let preview = skin.symbol || '⬜';
        if (category === 'board' && skin.css) {
            preview = '⬜';
        }
        
        skinElement.innerHTML = `
            <div class="skin-preview">${preview}</div>
            <div class="skin-name">${skin.name}</div>
            <div class="skin-price">${skin.price > 0 ? `${skin.price}🪙` : 'Free'}</div>
            <div class="skin-status">
                ${skin.owned ? 
                    (skin.equipped ? 
                        (gameState.language === 'ar' ? 'مُ equipped' : 'Equipped') : 
                        (gameState.language === 'ar' ? 'مُ Owned' : 'Owned')) : 
                    (gameState.language === 'ar' ? 'غير مُ Owned' : 'Not Owned')}
            </div>
        `;
        
        skinElement.addEventListener('click', () => handleSkinClick(skin.id, category));
        container.appendChild(skinElement);
    });
}

// Handle Skin Click
function handleSkinClick(skinId, category) {
    playSound('click');
    const skin = gameState.skins[category].find(s => s.id === skinId);
    
    if (!skin.owned) {
        // Purchase skin
        if (gameState.coins >= skin.price) {
            gameState.coins -= skin.price;
            skin.owned = true;
            updateCoinDisplay();
            saveGameState();
            renderStore();
        }
    } else if (!skin.equipped) {
        // Equip skin
        gameState.skins[category].forEach(s => s.equipped = false);
        skin.equipped = true;
        saveGameState();
        renderStore();
    }
}

// Play Sound
function playSound(soundType) {
    if (gameState.muteGameSounds && soundType !== 'background') return;
    
    const sound = sounds[soundType];
    if (sound) {
        if (soundType === 'background') {
            sound.volume = gameState.musicVolume / 100;
        } else {
            sound.volume = gameState.gameVolume / 100;
        }
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Audio play failed:", e));
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Main Menu Buttons
    document.getElementById('start-game').addEventListener('click', () => {
        playSound('click');
        showScreen('level');
        renderLevelScreen();
    });
    
    document.getElementById('store-menu').addEventListener('click', () => {
        playSound('click');
        showScreen('store');
        renderStore();
    });
    
    document.getElementById('settings-menu').addEventListener('click', () => {
        playSound('click');
        showScreen('settings');
    });
    
    // Navigation
    elements.prevPage.addEventListener('click', () => {
        playSound('click');
        if (gameState.currentPage > 1) {
            gameState.currentPage--;
            renderLevelScreen();
        }
    });
    
    elements.nextPage.addEventListener('click', () => {
        playSound('click');
        if (gameState.currentPage < Math.ceil(gameState.totalLevels / gameState.levelsPerPage)) {
            gameState.currentPage++;
            renderLevelScreen();
        }
    });
    
    elements.languageToggle.addEventListener('click', () => {
        playSound('click');
        gameState.language = gameState.language === 'en' ? 'ar' : 'en';
        updateLanguage();
        saveGameState();
    });
    
    document.getElementById('back-to-menu').addEventListener('click', () => {
        playSound('click');
        showScreen('menu');
    });
    
    document.getElementById('back-to-menu-store').addEventListener('click', () => {
        playSound('click');
        showScreen('menu');
    });
    
    document.getElementById('back-to-levels').addEventListener('click', () => {
        playSound('click');
        showScreen('level');
    });
    
    // Symbol Selection
    elements.symbols.forEach(btn => {
        btn.addEventListener('click', () => {
            selectSymbol(btn.dataset.symbol);
        });
    });
    
    // Hint Button
    elements.hintBtn.addEventListener('click', useHint);
    
    // Modal Buttons
    document.getElementById('next-match').addEventListener('click', () => {
        playSound('click');
        elements.resultModal.classList.remove('active');
        
        // On win, go to next level; on loss/draw, restart current level
        if (gameState.currentLevel < gameState.unlockedLevels) {
            startLevelGame(gameState.currentLevel + 1);
        } else {
            startLevelGame(gameState.currentLevel);
        }
    });
    
    document.getElementById('back-to-menu-result').addEventListener('click', () => {
        playSound('click');
        elements.resultModal.classList.remove('active');
        showScreen('menu');
    });
    
    // Store Tabs
    elements.tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            playSound('click');
            elements.tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gameState.currentTab = btn.dataset.tab;
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(gameState.currentTab).classList.add('active');
        });
    });
    
    // Settings Controls
    elements.languageSelect.addEventListener('change', () => {
        playSound('click');
        gameState.language = elements.languageSelect.value;
        updateLanguage();
        saveGameState();
    });
    
    elements.difficultySelect.addEventListener('change', () => {
        playSound('click');
        gameState.difficulty = elements.difficultySelect.value;
        saveGameState();
    });
    
    elements.gameVolumeSlider.addEventListener('input', () => {
        gameState.gameVolume = parseInt(elements.gameVolumeSlider.value);
        elements.gameVolumeValue.textContent = `${gameState.gameVolume}%`;
        saveGameState();
    });
    
    elements.musicVolumeSlider.addEventListener('input', () => {
        gameState.musicVolume = parseInt(elements.musicVolumeSlider.value);
        elements.musicVolumeValue.textContent = `${gameState.musicVolume}%`;
        sounds.background.volume = gameState.musicVolume / 100;
        saveGameState();
    });
    
    elements.muteGameToggle.addEventListener('change', () => {
        gameState.muteGameSounds = elements.muteGameToggle.checked;
        saveGameState();
    });
    
    elements.muteMusicToggle.addEventListener('change', () => {
        gameState.muteBackgroundMusic = elements.muteMusicToggle.checked;
        sounds.background.volume = gameState.muteBackgroundMusic ? 0 : gameState.musicVolume / 100;
        saveGameState();
    });
    
    elements.darkModeSetting.addEventListener('change', () => {
        gameState.darkMode = elements.darkModeSetting.checked;
        applyDarkMode();
        saveGameState();
    });
    
    elements.darkModeToggle.addEventListener('click', () => {
        playSound('click');
        gameState.darkMode = !gameState.darkMode;
        applyDarkMode();
        saveGameState();
    });
    
    document.getElementById('back-to-menu-settings').addEventListener('click', () => {
        playSound('click');
        showScreen('menu');
    });
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupEventListeners();
});