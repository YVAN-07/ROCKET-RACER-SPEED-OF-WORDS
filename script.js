const facts = [
    "The sun is a star at the center of the solar system.",
    "Earth is the only known planet with liquid water.",
    "The Great Wall of China is visible from space.",
    "A day on Venus is longer than a year on Venus.",
    "Sharks have been around longer than trees.",
    "Octopuses have three hearts and blue blood.",
    "The Eiffel Tower can grow during summer.",
    "Bananas are berries, but strawberries aren't.",
    "Honey never spoils, even after thousands of years.",
    "The moon is slowly drifting away from Earth.",
    "Antarctica is the driest and windiest place on Earth.",
    "Jellyfish have existed for over 500 million years.",
    "Water can boil and freeze at the same time.",
    "A year on Mars is nearly twice as long as one on Earth.",
    "Lightning strikes Earth 100 times every second.",
    "Mount Everest grows about 4 millimeters every year.",
    "Sea otters hold hands while they sleep.",
    "The Amazon rainforest produces 20% of Earth's oxygen.",
    "Cows have best friends and get stressed when separated.",
    "The Andromeda galaxy will merge with the Milky Way in 4.5 billion years."
  ];
  
  const sentenceEl = document.getElementById("sentence");
  const input = document.getElementById("input");
  const timerEl = document.getElementById("timer");
  const startButton = document.getElementById("startButton");
  const replayButton = document.getElementById("replayButton");
  const statsEl = document.getElementById("stats");
  const wpmEl = document.getElementById("wpm");
  const particlesContainer = document.getElementById("particles-container");
  
  let timer = 0;
  let interval = null;
  let currentSentence = "";
  let playerPosition = 90;  // Start position for the player ship (in percentage)
  let enemyPosition = 90;   // Start position for the enemy ship (in percentage)
  let moveSpeed = 5;        // Distance the spaceship moves for each word
  let playerShip = document.getElementById("player-ship");
  let enemyShip = document.getElementById("enemy-ship");
  let gameOver = false; // Track if the game is over
  
  
  
  function updateSpaceships() {
    // Update the player's spaceship position based on progress
    playerShip.style.left = `${playerPosition}%`;
  
    // Move enemy spaceship automatically towards the finish line
    if (enemyPosition > 7) {
      enemyPosition -= 0.04; // Slow movement towards the finish line
    } else if (!gameOver) {
      // If the enemy reaches its destination and the player hasn't finished
      gameOver = true;
      stopTimer();
      input.disabled = true;
  
      setTimeout(() => {
        alert("You lost the race! The enemy reached the finish line first.");
        replayButton.style.display = "inline-block"; // Show replay button
      }, 100); // Add a slight delay for better experience
    }
  
    enemyShip.style.right = `${100 - enemyPosition}%`; // Position enemy ship
  }
  
  
  input.addEventListener("input", () => {
    updateSentenceDisplay();
  
    // Move spaceship only after a word is completed
    movePlayerShip();
  
    // Check if the sentence is completed
    if (input.value.trim() === currentSentence) {
      stopTimer();
      input.disabled = true;
      const words = currentSentence.split(" ").length;
      const wpm = timer > 0 ? Math.round((words / timer) * 60) : 0;
      wpmEl.textContent = wpm;
      statsEl.style.display = "block";
      replayButton.style.display = "inline-block";
      setTimeout(() => {
        alert("Congratulations! You won the race!");
      }, 100);
    }
  });
  
  // Move the player's spaceship based on completed words
  function movePlayerShip() {
    const typedWords = input.value.trim().split(" ").filter(word => word.length > 0);
    const allWords = currentSentence.split(" ");
    
    if (typedWords.length > 0) {
      const lastTypedWord = typedWords[typedWords.length - 1];
      const correspondingWord = allWords[typedWords.length - 1] || "";
  
      // Check if the last word is complete and matches the current sentence
      if (lastTypedWord === correspondingWord) {
        const totalWords = allWords.length;
        const progress = Math.min(typedWords.length / totalWords, 1); // Ensure progress doesn't exceed 100%
        
        // Move player position
        playerPosition = 90 - (progress * 86); // Move towards the left edge (from 90% to 4%)
        updateSpaceships();
      }
    }
  }
  
  // Continuously update the positions of both ships
  function animateGame() {
    updateSpaceships();
    requestAnimationFrame(animateGame);  // Keep updating positions
  }
  
  // Start the animation loop after the game begins
  startButton.addEventListener("click", () => {
    startGame();
    animateGame();  // Start animating both spaceships
  });
  
  function getRandomSentence() {
    return facts[Math.floor(Math.random() * facts.length)];
  }
  
  function startGame() {
    gameOver = false; // Reset game over state
    if (interval) clearInterval(interval); // Ensure no duplicate intervals
    timer = 0;
    input.value = "";
    input.disabled = false;
    input.focus();
    currentSentence = getRandomSentence();
    sentenceEl.textContent = currentSentence;
    updateSentenceDisplay();
    startButton.style.display = "none";
    replayButton.style.display = "none";
    statsEl.style.display = "none";
    timerEl.textContent = timer;
    startTimer();
  
    // Reset player and enemy positions
    resetPositions();
  }
  
  function resetPositions() {
    // Reset positions of player and enemy ships to initial values
    playerPosition = 90;  // Starting position for the player ship (at 90% of the screen)
    enemyPosition = 90;   // Starting position for the enemy ship (at 90% of the screen)
  
    // Apply the positions to the ships
    playerShip.style.left = `${playerPosition}%`;
    enemyShip.style.right = `${100 - enemyPosition}%`;
  }
  
  function startTimer() {
    interval = setInterval(() => {
      timer++;
      timerEl.textContent = timer;
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(interval);
    interval = null;
  }
  
  function updateSentenceDisplay() {
    const typedText = input.value;
    let highlightedSentence = "";
  
    for (let i = 0; i < currentSentence.length; i++) {
      if (i < typedText.length) {
        highlightedSentence +=
          typedText[i] === currentSentence[i]
            ? `<span class="correct">${currentSentence[i]}</span>`
            : `<span class="incorrect">${currentSentence[i]}</span>`;
      } else {
        highlightedSentence += currentSentence[i];
      }
    }
    sentenceEl.innerHTML = highlightedSentence;
  }
  
  
  
  function replayGame() {
    startGame();
  }
  
  startButton.addEventListener("click", startGame);
  replayButton.addEventListener("click", replayGame);
  function initParticles() {
    // Set up the scene, camera, and renderer
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(
      window.innerWidth / -200,
      window.innerWidth / 200,
      window.innerHeight / 150,
      window.innerHeight / -100,
    );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    particlesContainer.appendChild(renderer.domElement);
  
    // Create particles
    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
  
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // X position
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y position
      positions[i * 3 + 2] = 0; // Z position (fixed for 2D)
    }
  
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2, // Adjust size of particles
    });
  
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  
    // Set the camera position
    camera.position.z = 1;
  
    animateParticles();
  }
  
  function animateParticles() {
    // Animate particles for 2D movement
    const positions = particles.geometry.attributes.position.array;
  
    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3] += 0.05; // Move horizontally (X)
      if (positions[i * 3] > 10) positions[i * 3] = -10; // Reset position when offscreen
  
      positions[i * 3 + 1] += Math.sin(positions[i * 3]) * 0.00; // Add slight vertical wave motion (Y)
    }
  
    particles.geometry.attributes.position.needsUpdate = true;
  
    renderer.render(scene, camera);
    requestAnimationFrame(animateParticles);
  }
  
  window.onload = initParticles;
  