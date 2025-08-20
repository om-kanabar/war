// © Om Kanabar 2025.
// See more info in the LICENSE file.
/** @type {Debug} */
let debug;
/** @type {Param} */
let param;

document.addEventListener("DOMContentLoaded", () => {
    functionLoad();
    // Calls load() only if debug mode is NOT enabled
    if (!debug.enabled) {
        load();
    } else {
        document.getElementById("loadScreen").classList.remove("hidden");
    }
});

function functionLoad(){
    debug = new Debug();
    param = new Param();
    debug.showButton();
    setSeed();
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

async function checkElementId(id, prefix, maxAttempts = 5, interval = 50) {
    const fullId = `${prefix}${id}`;
    let elem = document.getElementById(fullId);
    let attempt = 0;
    while (!elem && attempt < maxAttempts) {
        debug.log(`[DEBUG checkElementId] Attempt ${attempt + 1} to find "${fullId}"`);
        await pause(interval);
        elem = document.getElementById(fullId);
        attempt++;
    }
    if (!elem) {
        throw new Error(`[CHECK ELEMENT] Element with ID "${fullId}" not found after ${maxAttempts} attempts.`);
    }
    debug.log(`[DEBUG checkElementId] Found element "${fullId}" on attempt ${attempt}`);
    return elem;
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
    await pause(200);
    elem1.classList.replace("s-hidden", "hidden");
    elem2.classList.replace("hidden", "s-hidden");
    await pause(changeTime);
    elem2.classList.remove("s-hidden");
}

async function gameStart(){
    changeScene("presInfo", "wake")
    debug.changeSceneRight();
    actualStart();
}

class Debug {
    debugScene = 0;

    constructor() {
        const params = new URLSearchParams(window.location.search);
        this.enabled = params.get('debug') === 'true';
        if (this.enabled) this.setupButtons();
    }

    /**
     * Logs a debug message if debug mode is enabled.
     * @param {any} message Main message to log
     * @param {any} var1 Optional extra variable
     * @param {any} var2 Optional extra variable
     * @param {any} message2 Optional second message
     * @param {any} message3 Optional third message
     */
    log(message, var1 = "", var2 = "", message2 = "", message3 = "") {
        if (this.enabled) console.log("[DEBUG]", `${message}${var1}${message2}${var2}${message3}`);
    }

    error(message) {
        if (this.enabled) {
            console.log(`%c[ERROR] ${message}`, "color: #ff4444ff; font-weight: bold;");
        }
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
    await pause(1000);
    subtitle("2-0-t-1");
    await pause(4000);
    subtitle("2-1-t-1");
}

/*
ID naming scheme for subtitles:
st-[parentScene]-[subtitleIndex]-[animationType]-[lineCount]

Example: 2-0-t-1
- 2: parent data-scene = 2
- 0: subtitle number inside the parent scene
- t: animation type (e.g., typewriter)
- 1: number of lines
*/

/**
 * Finds a subtitle <p> by id string and converts its ID into an array
 * @param {string} id - The id string of the subtitle
 * @returns {Array<string>} Array of ID parts, or empty array if not found */

async function subtitle(id) {
    const pElem = await checkElementId(id, "st-");
    if (!pElem) {
        throw new Error(`[SUBTITLE] Subtitle with id "${id}" does not exist in the DOM.`);
    } 
    const stId = id.split("-");
    // bx-2-0-t-1
    const pBoxId = `bx-${id}`
    const pBox = await checkElementId(id, "bx-");
    if(!pBox){
        throw new Error(`[SUBTITLE] Subtitle box not found for ID "st-${id}". Expected element ID: "${pBoxId}", but none was found.`);
    }
    const fBoxId = `f-${id}`;
    const fBox = await checkElementId(id, "f-");
    if(!fBox){
        throw new Error(`[SUBTITLE] fBox not found for ID "st-${id}". Expected element ID: "${fBoxId}", but none was found.`);
    }
    if (!validateSubtitleId(id)) return;
    let textData = pElem.dataset.text || "";
    textData = textData.replace(/\$\{showTitle\(\)\}/g, showTitle());
    const textArray = Array.from(textData);

    // Read duration and pause from data-time attribute
    let duration = 1000;
    let pauseTime = 2500;
    if (pElem.dataset.time) {
        const match = pElem.dataset.time.match(/^(\d+)-(\d+)$/);
        if (match) {
            duration = parseInt(match[1], 10);
            pauseTime = parseInt(match[2], 10);
        } else {
            debug.error(`[SUBTITLE] Invalid data-time format "${pElem.dataset.time}". Expected format: two numbers separated by a dash, e.g. "1000-2500"`);
            throw new Error(`[SUBTITLE] Invalid data-time format "${pElem.dataset.time}".`);
        }
    }
    if (stId[2] === "t") {
        typeWriterAnim(id, textArray, duration, pauseTime);
    }
}

/**
 * Validates a subtitle ID string.
 * @param {string} id - The subtitle's id
 * @returns {boolean} - True if valid, false if errors found
 */
function validateSubtitleId(id) {
    const stId = id.split("-");
    if (stId.length !== 4) {
        throw new Error(`[SUBTITLE] Expected 5 segments in ID, got ${stId.length}`);
    }
    if (isNaN(parseInt(stId[0], 10))) {
        throw new Error(`[SUBTITLE] Invalid parent scene index: "${stId[1]}"`);
    }
    if (isNaN(parseInt(stId[1], 10))) {
        throw new Error(`[SUBTITLE] Invalid subtitle index: "${stId[1]}"`);
    }
    const allowedAnimations = ["t"];
        if (!allowedAnimations.includes(stId[2])) {
        throw new Error(`[SUBTITLE] Invalid animation type "${stId[2]}". Allowed: ${allowedAnimations.join(", ")}`);
    }
    if (isNaN(parseInt(stId[3], 10))) {
        throw new Error(`[SUBTITLE] Invalid line count "${stId[3]}"`);
    }

    return true;
}

async function typeWriterAnim(id, textArray, duration, pauseTime) {
    const st = document.getElementById(`st-${id}`);
    const bx = document.getElementById(`bx-${id}`);
    const f = document.getElementById(`f-${id}`);
    const stId = id.split("-");
    const fullText = textArray.join("");
    f.innerHTML = fullText;
    debug.log("[typeWriterAnim] Showing box:", bx, bx?.classList);
    bx.classList.replace("hidden", "s-hidden");
    bx.classList.add("trans");
    bx.classList.remove("s-hidden")
    const length = textArray.length;
    if (length == 0) return;
    let i;
    let text = "";
    let interval = duration/length;
    for (i = 0; i < length; i++) {
        text = `${text}${textArray[i]}`
        st.innerHTML = text;
        f.innerHTML = textRemove(fullText, i);
        await pause(interval);
    }
    await pause(pauseTime);
    debug.log("[typeWriterAnim] Hiding box:", bx, bx?.classList);
    bx.classList.add("s-hidden");
    await pause(200);
    bx.classList.replace("s-hidden", "hidden");
    bx.classList.remove("trans");
    return
}

const textRemove = (text, i) => text.slice(i+1);

function showTitle(){
    if (title == "Mr. President" || title == "Ms. President") return title;
    else return "President";
}

