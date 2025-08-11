// © Om Kanabar 2025.
// See more info in the LICENSE file.

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("main").classList.remove("hidden");
});

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let scene = 1;

async function changeScene(){
    currentScene = document.getElementById(`s${scene}`);
    currentScene.classList.add("s-hidden");
    await pause(500);
    currentScene.classList.add("hidden");
    await pause(50);
    currentScene.remove()
    scene++;
    document.getElementById(`s${scene}`).classList.replace("hidden", "s-hidden");
    await pause(100);
    document.getElementById(`s${scene}`).classList.remove("s-hidden");
    return;
}