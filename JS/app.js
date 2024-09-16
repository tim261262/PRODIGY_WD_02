const div = document.querySelector(".dis-none");
// List elements
const staLi = document.querySelector(".starting");
const resLi = document.querySelector(".resuming");
const stoLi = document.querySelector(".stoping");
const lapLi = document.querySelector(".lapping");
const setLi = document.querySelector(".reseting");

const borderP = document.querySelector(".border p");
const nav = document.querySelector(".nav ul");
// Selected the button elements
const start = document.querySelector("#start");
const resume = document.querySelector("#resume");
const lap = document.querySelector("#lap");
const stopp = document.querySelector("#stop");
const reset = document.querySelector("#reset");
// Selected the elements that contian the time/numbers
const hr = document.querySelector("#hr");
const min = document.querySelector("#min");
const sec = document.querySelector("#sec");
const mili = document.querySelector("#mili");

let miliSec = 1, second = 1, minute = 1, hour = 1, interval = null;
// Start Timer function
function startTimer(){
    if(interval){
        clearInterval(interval);
    }
    staLi.style.display = "none";
    stoLi.style.display = "block";
    setLi.style.display = "block";
    lapLi.style.display = "block";
    interval = setInterval(() => {
        if(miliSec <= 100){
            mili.textContent = miliSec < 10 ? "0" + miliSec : miliSec;
            if (miliSec === 100){
                sec.textContent = second < 10 ? "0" + second + ":" : second + ":";
                if(second === 60){
                    min.textContent = minute < 10 ? "0"  + minute + ":" : minute + ":";
                    minute++;
                    second = 0;
                    if(minute === 60){
                        hr.textContent = hour < 10 ? "0" + hour + ":"  : hour + ":";
                        hour++;
                        minute = 1;
                    }
                }
                second++;
                miliSec = 0;
            }
            miliSec++;
        }
    }, 10);
}

// function to Resume the watch after Stop is applied
function re(){
    stoLi.style.display = "block";
    resLi.style.display = "none";
    startTimer();
}
// funtion to stop the timer
function stopTimer(){
    stoLi.style.display = "none";
    resLi.style.display = "block";
    clearInterval(interval);
    interval = null;
}
// function to record Laps
function recordLap(){
    nav.classList.add("list");
    borderP.classList.add("pp");
    div.classList.remove("dis-none");
    div.classList.add("lap");
    const h2 = document.createElement("h2");
    h2.classList.add("remove");
    const h22 = document.querySelectorAll("h2");
    let minutee = minute - 1;
    let hourr = hour - 1;
    let secondd = second -1;
    let miliSecc = miliSec - 1;
    if(hour > 0 || minute > 0 || second > 0 || miliSec > 0){
        let lapNumber = h22.length + 1;
        h2.textContent = "Lap " + lapNumber + ": " +
        (hour < 10 ? "0" : "") + hourr + ":" + 
        (minute < 10 ? "0" : "") + minutee + ":" + 
        (second < 11 ? "0" : "") + secondd + ":" + 
        (miliSec < 10 ? "0" : "") + miliSecc; 
    }
    div.appendChild(h2);
}
//  function to reset the timer
function resetTimer(){
    nav.classList.remove("list");
    borderP.classList.remove("pp");
    stoLi.style.display = "none";
    setLi.style.display = "none";
    lapLi.style.display = "none";
    staLi.style.display = "block";
    resLi.style.display = "none";
    div.classList.add("dis-none");
    const removeLaps = document.querySelectorAll(".remove");
    miliSec = 1;
    second = 1;
    minute = 1; 
    hour = 1;
    updateDisplay();
    removeLaps.forEach(item => {
        item.remove();
    });
    clearInterval(interval)
}
// function to update the display or timer
function updateDisplay(){
    hr.textContent = "";
    min.textContent = "";
    sec.textContent = "00:";
    mili.textContent = "00";
}


// collection of addevent listners
start.addEventListener("click", startTimer);
resume.addEventListener("click", re)
stopp.addEventListener("click", stopTimer);
lap.addEventListener("click", recordLap);
reset.addEventListener("click", resetTimer);



