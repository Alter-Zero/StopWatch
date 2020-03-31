const timer = document.getElementById("timer-value")
const startBtn = document.getElementById("startTimerBtn")
const stopBtn = document.getElementById("stopTimerBtn")
const resetBtn = document.getElementById("resetTimerBtn")
const lapsBtn = document.getElementById("lapsBtn")
const resetLapsBtn = document.getElementById("resetLapsBtn")
const lapsResult = document.querySelector(".laps-results")

let displayHours
let displayMinutes 
let displaySeconds 
let timerStatus = "stopped"

let lapsNumber = 0

let hours = 0
let minutes = 0 
let seconds = 0

startBtn.addEventListener('click', ()=>{
    timerStart()
})
stopBtn.addEventListener('click', ()=>{
    timerStop()
})
resetBtn.addEventListener('click', ()=>{
    timerReset()
})
lapsBtn.addEventListener('click', ()=>{
    timerLaps()
})
resetLapsBtn.addEventListener('click', ()=>{
    resetLaps()
})

function timerCount() {
    seconds++
    if (seconds / 60 === 1){
        minutes++
        seconds = 0
    }
    if(minutes / 60 === 1){
        hours++
        minutes = 0
    }
    
    if (seconds < 10){
        displaySeconds = "0" + seconds.toString()
    } else {
        displaySeconds = seconds
    }
    if (minutes < 10){
        displayMinutes = "0" + minutes.toString()
    } else {
        displayMinutes = minutes
    }
    if (hours < 10){
        displayHours= "0" + hours.toString()
    } else {
        displayHours = hours
    }

    timer.innerText = `${displayHours}:${displayMinutes}:${displaySeconds}`
}

function timerStart() {
    if(timerStatus === "stopped"){
        timerInit = setInterval(timerCount, 1000)
        startBtn.innerText = "Counting"
        startBtn.classList.add("off")
        startBtn.blur()
        stopBtn.innerText = "Stop"
        timerStatus = "working"
        stopBtn.classList.remove("off")
    }
}

function timerStop() {
    if(timerStatus === "working"){
    clearInterval(timerInit)
    startBtn.innerText = "Resume"
    stopBtn.classList.add("off")
    stopBtn.blur()
    stopBtn.innerText = "Stopped"
    timerStatus = "stopped"
    startBtn.classList.remove("off")
    }
}

function timerReset() {
    clearInterval(timerInit)
    timer.innerText = "00:00:00"
    timerStatus = "stopped"
    startBtn.innerText = "Start"
    stopBtn.innerText = "Stop"
    stopBtn.classList.remove("off")
    startBtn.classList.remove("off")
}

function timerLaps() {
    if (timer.innerText !== "00:00:00"){
        lapsNumber++
        let lapsValue = `Lap ${lapsNumber}: ${timer.innerText}`
        let child = document.createElement("p")
        child.innerText = lapsValue
        lapsResult.appendChild(child)
        if (lapsResult.childNodes.length === 16) {
            lapsResult.removeChild(lapsResult.firstChild)
        }
    }
}

function resetLaps(){
    while (lapsResult.hasChildNodes()){
        lapsResult.removeChild(lapsResult.firstChild)
        lapsNumber = 0
    }
}