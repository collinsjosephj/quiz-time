/*
1- I need a timer, it needs to start when you hit the button.
1a- The timer needs to start at 60s and end at 0s.
1b- The timer should go down by 1
*/

let time = 60;
var timerStart =document.querySelector("#timer")

function timer() {
    const interval = setInterval(function(){
        document.getElementById("timer").innerHTML = time;
        time--;
        if (time < 0 ) {
            clearInterval(interval);
        }
        }, 1000)
}

timerStart.addEventListener("click", timer)