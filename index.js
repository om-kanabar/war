// © Om Kanabar 2025.
// See more info in the LICENSE file.

document.addEventListener("DOMContentLoaded", () => {
    clearStorageIfNew();
    checkStarted();
    tos()
    document.querySelector("main").classList.remove("hidden");
});

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function tos(){
    const accepted = localStorage.getItem("tosAccepted");
    if (accepted === "true") {
        changeScene()
    } else {
        document.querySelector("main").classList.remove("hidden");
    }
}

let scene = 0;

async function changeScene(){
    currentScene = document.getElementById(`s${scene}`);
    currentScene.classList.add("s-hidden");
    await pause(500);
    currentScene.classList.add("hidden");
    await pause(50);
    scene++;
    document.getElementById(`s${scene}`).classList.replace("hidden", "s-hidden");
    await pause(100);
    document.getElementById(`s${scene}`).classList.remove("s-hidden");
    return;
}

let isTransitioning = false; // Lock

async function changeScene() {
    if (isTransitioning) return; // Ignore if already in transition
    isTransitioning = true;

    currentScene = document.getElementById(`s${scene}`);
    currentScene.classList.add("s-hidden");
    await pause(500);
    currentScene.classList.add("hidden");
    await pause(50);
    scene++;
    document.getElementById(`s${scene}`).classList.replace("hidden", "s-hidden");
    await pause(100);
    document.getElementById(`s${scene}`).classList.remove("s-hidden");

    isTransitioning = false; // Unlock
}

async function backScene() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentScene = document.getElementById(`s${scene}`);
    currentScene.classList.add("s-hidden");
    await pause(500);
    currentScene.classList.add("hidden");
    await pause(50);
    scene--;
    document.getElementById(`s${scene}`).classList.replace("hidden", "s-hidden");
    await pause(100);
    document.getElementById(`s${scene}`).classList.remove("s-hidden");

    isTransitioning = false;
}

async function skip(s) {
    if (isTransitioning) return;
    isTransitioning = true;

    currentScene = document.getElementById(`s${scene}`);
    currentScene.classList.add("s-hidden");  
    await pause(500);
    currentScene.classList.add("hidden");
    await pause(50);
    scene = s;
    document.getElementById(`s${scene}`).classList.replace("hidden", "s-hidden");
    await pause(100);
    document.getElementById(`s${scene}`).classList.remove("s-hidden");

    isTransitioning = false;
}

const checkbox = document.getElementById('agreeCheckbox');
const button = document.getElementById('submitBtn');

checkbox.addEventListener('change', () => {
    button.disabled = !checkbox.checked;
});

function acceptTOS() {
    localStorage.setItem("tosAccepted", "true");
    changeScene(); // move to the next part of the game
}

let startCheck;

function start(){
    startCheck = 1;
    localStorage.setItem('startCheck', startCheck);
    window.location.href = "game.html";
}

function checkStarted(){
    startCheck = localStorage.getItem('startCheck');
    if (startCheck == 1){
        window.location.href = "game.html"
    };
}

function clearStorageIfNew() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('new')) {
        localStorage.clear();
    }
}
