// © Om Kanabar 2025.
// See more info in the LICENSE file.

let debug;
let param;

document.addEventListener("DOMContentLoaded", () => {
    debug = new Debug();
    param = new Param();
    debug.showButton();
    functionLoad();
    // Calls load() only if debug mode is NOT enabled
    if (!debug.enabled) {
        load();
    } else {
        document.getElementById("loadScreen").classList.remove("hidden");
    }
});

function functionLoad(){
    setSeed()
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function r(min,max){return Math.floor(Math.random()*(max-min+1))+min;}

function f(x){if(x===0)return 1;let y=1;for(let i=1;i<=x;i++)y*=i;return y;}

function g(t=Math.sqrt(Math.ceil(2.15**3)**(Math.ceil(1.41**(Math.floor(1.56**1.56)))))){
    let s=0;
    for(let k=0;k<t;k++){
        s += (f(4*k)*(1103+26390*k)) / (Math.pow(f(k),4) * Math.pow(396,4*k));
    }
    return 1/((2*Math.sqrt(2)/9801)*s);
}

function h(){
    // Actor
    const A = r(0,9);
    debug.log(A);
    // Severity
    let B;
    if(A==0){B=r(7,9);}
    else if([1,2,3].includes(A)){B=r(1,8);}
    else if([4,5,6].includes(A)){B=r(1,5);}
    else{B=r(3,4);}
    debug.log(B);
    //Number
    let C;
    if(B==1){C=0;}
    else{C = Math.min(Math.floor((2*B + 3*(10-A))/1.2), 9);}
    debug.log(C);
    //Order
    const D = r(0,9);
    debug.log(D);
    //Global Aid
    let E;
    if(B<=3){E=r(1,5);}
    else if(B>=7){E=r(7,9);}
    else{E=r(3,8);}
    debug.log(E);
    // Check
    const ω = g(10);
    const F = Math.floor(Math.pow(ω,A) + Math.pow(ω,B) + Math.pow(ω,C) + Math.pow(ω,D) + Math.pow(ω,E)) % 10;
    debug.log(F);

    return `${A}${B}${C}${D}${E}${F}`;
}
let seed;

function pause(ms) {
    param.log("time", "TIME", "Paused for ", `${ms}`, "ms");
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function load() {
    document.getElementById("loadScreen").classList.replace("hidden", "s-hidden");
    await pause(250);
    document.getElementById("loadScreen").classList.remove("s-hidden");
    await pause(3000);
    document.getElementById("loadScreen").classList.add("s-hidden");
    document.querySelector("main").classList.replace("hidden", "s-hidden");
    await pause(200);
    document.getElementById("loadScreen").classList.replace("s-hidden", "hidden");
    document.querySelector("main").classList.remove("s-hidden");
}

let title;

document.getElementById('genderButton').addEventListener('click', function() {
    title = document.getElementById('titleSelect').value;
    gameStart()
});


function setSeed(){
    seed = h()
    document.getElementById("seed").innerHTML = seed; 
    console.log(seed)
}

/**
 * Changes the scene by hiding one element and showing another.
 * @param {string} id1 The ID of the element to hide
 * @param {string} id2 The ID of the element to show
 * @param {number} changeTime Delay in milliseconds before switching default is 500
*/
async function changeScene(id1, id2, changeTime = 500) {
    const elem1 = document.getElementById(id1);
    const elem2 = document.getElementById(id2);
    elem1.classList.add("s-hidden");
    await pause(changeTime);
    elem1.classList.replace("s-hidden", "hidden");
    elem2.classList.replace("hidden", "s-hidden");
    await pause(200);
    elem2.classList.remove("s-hidden");
}

async function gameStart(){
    changeScene("presInfo", "wake")
    debug.changeSceneRight();
}

class Debug {
    debugScene = 0;

    constructor() {
        const params = new URLSearchParams(window.location.search);
        this.enabled = params.get('debug') === 'true';
        if (this.enabled) this.setupButtons();
    }

    log(message) {
        if (this.enabled) console.log("[DEBUG]", message);
    }

    async changeSceneRight() {
        const scenes = this.getAllScenes();
        const currentIndex = scenes.findIndex(el => parseInt(el.dataset.scene) === this.debugScene);
        const nextIndex = (currentIndex + 1) % scenes.length;
        const nextScene = scenes[nextIndex];

        const currentSceneElem = scenes[currentIndex];
        currentSceneElem.classList.add("hidden");
        nextScene.classList.remove("hidden");

        this.debugScene = parseInt(nextScene.dataset.scene);
        this.log(`Changed to scene ${this.debugScene}`);
    }

    async changeSceneLeft() {
        const scenes = this.getAllScenes();
        const currentIndex = scenes.findIndex(el => parseInt(el.dataset.scene) === this.debugScene);
        const prevIndex = (currentIndex - 1 + scenes.length) % scenes.length;
        const prevScene = scenes[prevIndex];

        const currentSceneElem = scenes[currentIndex];
        currentSceneElem.classList.add("hidden");
        prevScene.classList.remove("hidden");

        this.debugScene = parseInt(prevScene.dataset.scene);
        this.log(`Changed to scene ${this.debugScene}`);
    }

    getAllScenes() {
        return Array.from(document.querySelectorAll("[data-scene]"))
            .sort((a,b) => parseInt(a.dataset.scene) - parseInt(b.dataset.scene));
    }

    setupButtons() {
        const btnLeft = document.getElementById("sceneLeft");
        const btnRight = document.getElementById("sceneRight");

        btnLeft?.addEventListener("click", () => this.changeSceneLeft());
        btnRight?.addEventListener("click", () => this.changeSceneRight());
    }

    showButton() {
        if (this.enabled) {
            const btnLeft = document.getElementById("sceneLeft");
            const btnRight = document.getElementById("sceneRight");
            if (btnLeft && btnRight) document.getElementById("debugBtns").classList.remove("hidden");
        }
    }
}

class Param {
    constructor() {
        this.params = new URLSearchParams(window.location.search);
    }

    /**
        * Logs a message to the console if a specific URL parameter is present.
        * - If the parameter exists with no value (e.g., ?time), it logs.
        * - If the parameter exists with value "true" (e.g., ?time=true), it logs.
        * - Otherwise, it does nothing (blank by default).
        * @param {string} param The name of the URL parameter to check
        * @param {string} prefix A prefix tag shown in the console log
        * @param {string} message The main message to log
        * @param {string} [var1=""] An optional variable or string to append
        * @param {string} [message2=""] An optional second message to append
    */

    log(param, prefix, message, var1 = "", message2 = "") {
        if (!this.params.has(param)) return; // no param → blank by default

        const actualValue = this.params.get(param);

        if (actualValue === "" || actualValue === null) {
            console.log(`[${prefix}] ${message}${var1}${message2}`);
            return;
        }

        if (actualValue === "true") {
            console.log(`[${prefix}] ${message}${var1}${message2}`);
        }
    }
    check(param, value = null) {
        if (!this.params.has(param)) return false;
        if (value === null) return true;
        return this.params.get(param) === value;
    }
}

async function actualStart() {
    
}