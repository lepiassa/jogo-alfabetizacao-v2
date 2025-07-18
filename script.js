// Estado do jogo
let gameState = {
    currentLevel: '',
    currentMode: '',
    score: 0,
    lives: 3,
    currentQuestionIndex: 0,
    questions: [],
    isGameActive: false
};

// Dados do jogo
const gameData = {
    forest: {
        background: 'forest-bg',
        quiz: [
            {
                question: "Quantas sílabas tem a palavra 'GATO'?",
                options: ["1", "2", "3", "4"],
                correct: 1,
                audio: "gato"
            },
            {
                question: "Qual letra começa a palavra 'BOLA'?",
                options: ["A", "B", "C", "D"],
                correct: 1,
                audio: "bola"
            },
            {
                question: "Como se escreve o som 'PA'?",
                options: ["BA", "PA", "MA", "DA"],
                correct: 1,
                audio: "pato"
            }
        ],
        complete: [
            {
                sentence: "O ____ mia.",
                answer: "gato",
                image: "character_mario_style.png",
                audio: "gato"
            },
            {
                sentence: "A ____ rola.",
                answer: "bola",
                image: "coin_reward.png",
                audio: "bola"
            }
        ]
    },
    castle: {
        background: 'castle-bg',
        quiz: [
            {
                question: "Quantas letras tem a palavra 'CASA'?",
                options: ["3", "4", "5", "6"],
                correct: 1,
                audio: "casa"
            },
            {
                question: "Qual palavra rima com 'MESA'?",
                options: ["CASA", "PESA", "BOLA", "GATO"],
                correct: 1,
                audio: "mesa"
            },
            {
                question: "Como se divide a palavra 'SAPO'?",
                options: ["S-APO", "SA-PO", "SAP-O", "SAPO"],
                correct: 1,
                audio: "sapo"
            }
        ],
        complete: [
            {
                sentence: "A ____ é bonita.",
                answer: "casa",
                image: "castle_background.png",
                audio: "casa"
            },
            {
                sentence: "O ____ pula.",
                answer: "sapo",
                image: "star_reward.png",
                audio: "sapo"
            }
        ]
    },
    mountain: {
        background: 'mountain-bg',
        quiz: [
            {
                question: "Qual palavra tem mais letras?",
                options: ["RATO", "FACA", "DEDO", "BOCA"],
                correct: 1,
                audio: "faca"
            },
            {
                question: "Que letra vem depois de 'C'?",
                options: ["B", "D", "E", "F"],
                correct: 1,
                audio: "dedo"
            },
            {
                question: "Como termina a palavra 'BOCA'?",
                options: ["BA", "CA", "CO", "BO"],
                correct: 1,
                audio: "boca"
            }
        ],
        complete: [
            {
                sentence: "O ____ come queijo.",
                answer: "rato",
                image: "character_mario_style.png",
                audio: "rato"
            },
            {
                sentence: "A ____ fala.",
                answer: "boca",
                image: "star_reward.png",
                audio: "boca"
            }
        ]
    }
};

// Elementos DOM
const screens = {
    start: document.getElementById('start-screen'),
    levelSelect: document.getElementById('level-select'),
    game: document.getElementById('game-screen'),
    congratulations: document.getElementById('congratulations')
};

const buttons = {
    start: document.getElementById('start-btn'),
    backToStart: document.getElementById('back-to-start'),
    backToLevels: document.getElementById('back-to-levels'),
    checkAnswer: document.getElementById('check-answer'),
    nextQuestion: document.getElementById('next-question'),
    playAgain: document.getElementById('play-again'),
    backToMenu: document.getElementById('back-to-menu')
};

const gameElements = {
    background: document.getElementById('game-background'),
    score: document.getElementById('score'),
    lives: document.getElementById('lives'),
    finalScore: document.getElementById('final-score'),
    quizQuestion: document.getElementById('quiz-question'),
    quizOptions: document.getElementById('quiz-options'),
    quizGame: document.getElementById('quiz-game'),
    completeGame: document.getElementById('complete-game'),
    sentenceImg: document.getElementById('sentence-img'),
    sentenceQuestion: document.getElementById('sentence-question'),
    sentenceInput: document.getElementById('sentence-input'),
    feedback: document.getElementById('feedback'),
    feedbackIcon: document.getElementById('feedback-icon'),
    feedbackText: document.getElementById('feedback-text')
};

// Funções de navegação
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function initGame() {
    // Event listeners para botões principais
    buttons.start.addEventListener('click', () => showScreen('levelSelect'));
    buttons.backToStart.addEventListener('click', () => showScreen('start'));
    buttons.backToLevels.addEventListener('click', () => showScreen('levelSelect'));
    buttons.playAgain.addEventListener('click', () => showScreen('levelSelect'));
    buttons.backToMenu.addEventListener('click', () => showScreen('start'));

    // Event listeners para seleção de fases
    document.querySelectorAll('.level-card').forEach(card => {
        card.addEventListener('click', () => {
            const level = card.dataset.level;
            startLevel(level);
        });
    });

    // Event listeners para o jogo
    buttons.checkAnswer.addEventListener('click', checkSentenceAnswer);
    buttons.nextQuestion.addEventListener('click', nextQuestion);

    // Event listener para Enter no input
    gameElements.sentenceInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkSentenceAnswer();
        }
    });

    updateUI();
}

function startLevel(level) {
    gameState.currentLevel = level;
    gameState.score = 0;
    gameState.lives = 3;
    gameState.currentQuestionIndex = 0;
    gameState.isGameActive = true;

    // Misturar perguntas de quiz e complete
    const levelData = gameData[level];
    gameState.questions = [
        ...levelData.quiz.map(q => ({...q, type: 'quiz'})),
        ...levelData.complete.map(q => ({...q, type: 'complete'}))
    ].sort(() => Math.random() - 0.5);

    // Configurar background
    gameElements.background.className = `background ${levelData.background}`;
    
    showScreen('game');
    showNextQuestion();
    updateUI();
}

function showNextQuestion() {
    if (gameState.currentQuestionIndex >= gameState.questions.length) {
        endGame();
        return;
    }

    const question = gameState.questions[gameState.currentQuestionIndex];
    
    if (question.type === 'quiz') {
        showQuizQuestion(question);
    } else {
        showCompleteQuestion(question);
    }
}

function showQuizQuestion(question) {
    gameElements.quizGame.style.display = 'block';
    gameElements.completeGame.style.display = 'none';
    
    gameElements.quizQuestion.textContent = question.question;
    gameElements.quizOptions.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => selectQuizAnswer(index, question.correct));
        gameElements.quizOptions.appendChild(button);
    });

    // Reproduzir áudio da palavra
    if (question.audio) {
        playAudio(question.audio);
    }
}

function showCompleteQuestion(question) {
    gameElements.quizGame.style.display = 'none';
    gameElements.completeGame.style.display = 'block';
    
    gameElements.sentenceQuestion.textContent = question.sentence;
    gameElements.sentenceImg.src = question.image;
    gameElements.sentenceInput.value = '';
    gameElements.sentenceInput.focus();

    // Reproduzir áudio da palavra
    if (question.audio) {
        playAudio(question.audio);
    }
}

function selectQuizAnswer(selectedIndex, correctIndex) {
    const options = document.querySelectorAll('.option-btn');
    const isCorrect = selectedIndex === correctIndex;
    
    options.forEach((option, index) => {
        option.disabled = true;
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
    });

    setTimeout(() => {
        if (isCorrect) {
            gameState.score += 10;
            showFeedback(true, "Muito bem! Resposta correta!");
        } else {
            gameState.lives--;
            showFeedback(false, "Ops! Tente novamente na próxima.");
        }
        updateUI();
    }, 1000);
}

function checkSentenceAnswer() {
    const userAnswer = gameElements.sentenceInput.value.toLowerCase().trim();
    const question = gameState.questions[gameState.currentQuestionIndex];
    const correctAnswer = question.answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        gameState.score += 15;
        showFeedback(true, "Perfeito! Você completou a frase!");
    } else {
        gameState.lives--;
        showFeedback(false, `A resposta correta é: ${question.answer}`);
    }
    updateUI();
}

function showFeedback(isCorrect, message) {
    gameElements.feedbackIcon.textContent = isCorrect ? '🎉' : '😅';
    gameElements.feedbackText.textContent = message;
    gameElements.feedback.classList.add('show');
    
    // Reproduzir som de feedback
    playFeedbackSound(isCorrect);
}

function nextQuestion() {
    gameElements.feedback.classList.remove('show');
    gameState.currentQuestionIndex++;
    
    if (gameState.lives <= 0) {
        endGame();
    } else {
        showNextQuestion();
    }
}

function endGame() {
    gameState.isGameActive = false;
    gameElements.finalScore.textContent = gameState.score;
    showScreen('congratulations');
}

function updateUI() {
    gameElements.score.textContent = gameState.score;
    gameElements.lives.textContent = gameState.lives;
}

function playAudio(audioName) {
    try {
        const audio = new Audio(`${audioName}.wav`);
        audio.volume = 0.7;
        audio.play().catch(e => console.log('Erro ao reproduzir áudio:', e));
    } catch (e) {
        console.log('Erro ao carregar áudio:', e);
    }
}

function playFeedbackSound(isCorrect) {
    try {
        // Criar um som sintético simples para feedback
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (isCorrect) {
            // Som de sucesso (notas ascendentes)
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        } else {
            // Som de erro (nota descendente)
            oscillator.frequency.setValueAtTime(392.00, audioContext.currentTime); // G4
            oscillator.frequency.setValueAtTime(329.63, audioContext.currentTime + 0.1); // E4
        }
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log('Erro ao reproduzir som de feedback:', e);
    }
}

// Adicionar efeitos visuais
function addVisualEffects() {
    // Efeito de partículas para acertos
    function createParticles(x, y, color) {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 10;
            const velocity = 100 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let posX = x;
            let posY = y;
            let opacity = 1;
            
            const animate = () => {
                posX += vx * 0.016;
                posY += vy * 0.016 + 200 * 0.016; // gravidade
                opacity -= 0.02;
                
                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(particle);
                }
            };
            
            requestAnimationFrame(animate);
        }
    }
    
    // Adicionar efeito de clique nos botões
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn') || e.target.classList.contains('option-btn')) {
            const rect = e.target.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createParticles(x, y, '#FFD700');
        }
    });
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    addVisualEffects();
});

// Prevenir zoom em dispositivos móveis
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

