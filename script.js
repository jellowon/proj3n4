

document.addEventListener('DOMContentLoaded', function() {
    const screens = {
        home: document.querySelector('.container'),
        play: document.querySelector('.play-screen'),
        results: document.querySelector('.results-screen')
    };

    // home screen
    const homeElements = {
        animalSelect: document.getElementById('animal-select'),
        animalPrompt: document.getElementById('animal-prompt')
    };

    // play screen
    const playElements = {
        replayButton: document.querySelector('.replay-box'),
        currentAnimalImg: document.querySelector('.current-animal'),
        animalOptions: document.querySelectorAll('.animal-option')
    };

    // results screen
    const resultsElements = {
        animalSelect: document.getElementById('results-animal-select'),
        animalPrompt: document.getElementById('results-animal-prompt'),
        animalImg: document.getElementById('results-animal-img')
    };

    // audio
    const sounds = {
        cow: document.getElementById('cow-sound'),
        chicken: document.getElementById('chicken-sound'),
        goat: document.getElementById('goat-sound'),
        sheep: document.getElementById('sheep-sound')
    };

   
    let currentAnimal = 'cow';

    // THESE CANNOT BE REMOVED //
    function showScreen(screenName) {
        // THIS HIDES THE SCREENS
        Object.values(screens).forEach(screen => screen.classList.add('hidden'));
        // SHOWS THE SCREEN
        screens[screenName].classList.remove('hidden');
        console.log('Screen changed to:', screenName);
    }

    function playAnimalSound() {
        
        sounds[currentAnimal].pause();
        sounds[currentAnimal].currentTime = 0;
       
        sounds[currentAnimal].play().catch(e => console.log("Audio error:", e));
        console.log('Playing sound for:', currentAnimal);
    }

    function setupPlayScreen() {
        // update animal
        playElements.currentAnimalImg.src = `${currentAnimal}.png`;
        
        // Set up animal options
        playElements.animalOptions.forEach(option => {
            
            option.style.backgroundColor = '#D5DBE8';
            
            
            if (option.dataset.animal === currentAnimal) {
                option.classList.add('correct-animal');
            }
        });
        
        playAnimalSound();
    }

    function setupResultsScreen() {
        
        resultsElements.animalImg.src = `${currentAnimal}.png`;
        resultsElements.animalSelect.value = currentAnimal;
        resultsElements.animalPrompt.textContent = `Find a ${currentAnimal}`;
    }

    
    
    homeElements.animalSelect.addEventListener('change', function() {
        currentAnimal = this.value;
        homeElements.animalPrompt.textContent = `Find a ${currentAnimal}`;
        console.log('Animal selected from dropdown:', currentAnimal);
        playAnimalSound();
    });

    // game start
    homeElements.animalPrompt.addEventListener('click', function() {
        console.log('Game started with animal:', currentAnimal);
        setupPlayScreen();
        showScreen('play');
    });

    // sound replay
    playElements.replayButton.addEventListener('click', playAnimalSound);

    // play select animal
    playElements.animalOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedAnimal = this.dataset.animal;
            
            if (selectedAnimal === currentAnimal) {
                // right answer
                console.log('Correct selection:', selectedAnimal);
                this.style.backgroundColor = '#4CAF50';
                setTimeout(() => {
                    setupResultsScreen();
                    showScreen('results');
                }, 1000);
            } else {
                // wrong answer
                console.log('Wrong selection:', selectedAnimal, '(Expected:', currentAnimal + ')');
                this.style.backgroundColor = '#F44336';
                setTimeout(() => {
                    this.style.backgroundColor = '#D5DBE8';
                }, 500);
            }
        });
    });

    // results select animal
    resultsElements.animalSelect.addEventListener('change', function() {
        currentAnimal = this.value;
        resultsElements.animalPrompt.textContent = `Find a ${currentAnimal}`;
        console.log('Animal selected from results dropdown:', currentAnimal);
        playAnimalSound();
    });

    
    resultsElements.animalPrompt.addEventListener('click', function() {
        console.log('Restarting game with animal:', currentAnimal);
        setupPlayScreen();
        showScreen('play');
    });

    // INITIALIZE GAME //
    function initGame() {
        // set animal from dropdown
        currentAnimal = homeElements.animalSelect.value;
        homeElements.animalPrompt.textContent = `Find a ${currentAnimal}`;
        showScreen('home');
        console.log('Game initialized');
    }

    initGame();
});