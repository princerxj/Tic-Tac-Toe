console.log("Welcome to Tic Tac Toe");

let music = new Audio("Assets/music.mp3");
let audioTurn = new Audio("Assets/ting.mp3");
let gameover = new Audio("Assets/gameover.mp3");
let turn = "X";
let isgameover = false;
let mode = 'friend'; // Default to friend mode

// Function to change the turn 
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

// Function to check for a win 
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],    // Horizontal top
        [3, 4, 5, 5, 15, 0],   // Horizontal middle
        [6, 7, 8, 5, 25, 0],   // Horizontal bottom
        [0, 3, 6, -5, 15, 90], // Vertical left
        [1, 4, 7, 5, 15, 90],  // Vertical middle
        [2, 5, 8, 15, 15, 90], // Vertical right
        [0, 4, 8, 5, 15, 45],  // Diagonal \
        [2, 4, 6, 5, 15, 135]  // Diagonal /
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[0]].innerText !== "")) {

            // Display who won
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won!";
            isgameover = true;

            // Show winning image
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";

            // Display the line
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw"; // Adjust length as needed
            gameover.play();
        }
    });
}

// AI logic to make a random move
const aiMove = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let emptyBoxes = [];
    for (let i = 0; i < boxtext.length; i++) {
        if (boxtext[i].innerText === "") {
            emptyBoxes.push(i);
        }
    }

    // Make a random move from available options
    if (emptyBoxes.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        boxtext[emptyBoxes[randomIndex]].innerText = turn;
        checkWin();
        turn = changeTurn();
        audioTurn.play();
        if (!isgameover) {
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        }
    }
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            if (mode === 'ai') {
                // After player turn, trigger AI move
                setTimeout(aiMove, 500); // Delay for AI to simulate thinking
            }
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Add onclick listener to reset button 
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw"; // Hide the winning line
    document.querySelector(".line").style.transform = "none"; // Reset the transform
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});

// Add onclick listener to back to menu button
document.getElementById('back-to-menu').addEventListener('click', () => {
    // Reset game variables
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw"; // Hide the winning line
    document.querySelector(".line").style.transform = "none"; // Reset the transform
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";

    // Show start page and hide game page
    document.getElementById('game-page').classList.remove('active');
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('start-page').style.display = "flex"; // Ensure start page uses flexbox to center again
});

// New functionality for the Start Page
document.addEventListener('DOMContentLoaded', () => {
    const startPage = document.getElementById('start-page');
    const gamePage = document.getElementById('game-page');
    const startGameButton = document.getElementById('start-game');
    const modeSelect = document.getElementById('mode');

    // Start Game - Switch to Game Page and Scroll to Top
    startGameButton.addEventListener('click', () => {
        mode = modeSelect.value; // Get the selected mode
        startPage.style.display = "none"; // Hide start page
        gamePage.classList.remove('hidden');
        gamePage.classList.add('active');

        // Automatically scroll to the top of the game page
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling effect
        });
    });   
});
