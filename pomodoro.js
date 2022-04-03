

// model

const timerDisplay=document.querySelector('.clock');
const endTime=document.querySelector('.be-back');
const button=document.querySelectorAll('[data-time]');

let countdown;

// controller

function timer(seconds) {
    //clearInterval før ny timer
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return
        }
        displayTimeLeft(secondsLeft);
    }, 1000)
} //ifsetningen sjekker om timer er 0 før den kjører displaytimeleft()

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display=`
    ${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}
    `;
    timerDisplay.textContent=display;
    document.title=display;
    console.log({minutes, remainderSeconds});
} //remaindersecounds teller ned fra 60 etter minutter. 

function displayEndTime(then){
    const end=new Date(then);
    const hour=end.getHours();
    const minutes=end.getMinutes();
    endTime.textContent=`Be Back At ${hour}:${minutes<10?'0':''}${minutes}`
    console.log({hour,minutes})
}

function startTimer(){
    const seconds=parseInt(this.dataset.time);
    timer(seconds);
}

button.forEach(button=>button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit',function(e){
    e.preventDefault()
    min=this.minutes.value;
    timer(min*60);
    this.reset();
}) //preventDefault gjør at man kan trykke enter på formen uten å sende initial value. 