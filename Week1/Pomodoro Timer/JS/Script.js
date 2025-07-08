let [minutes,seconds] = [25,0];
let Pomo = document.querySelector("#Pomodoro");
let intrvl = null;
let click = false;
let modalclk = true;
let stats, Minu, Sec;
var studyMin =25, shortMin = 5, longMin = 10;

const shortbtn = document.querySelector("#short-btn");
const Pomodorobtn = document.querySelector("#pomodoro-btn");
const longbtn = document.querySelector("#long-btn");
const Gbutton = document.querySelector(".start");
const rest = document.querySelector(".restart");
const audioClick = document.querySelector("#sound");
const audioAlarm = document.querySelector("#alarm");
const favDialog = document.getElementById("favDialog");
var label = document.getElementById("minute");
const updateDetails = document.getElementById("updateDetails");
const cls = document.getElementById("cls");
var output = document.querySelector("h2");
let modal=true;
var userInput1 = 0, userInput2;
let modalstats = null;
const studyModal = document.getElementById("study-modal");
const shortModal = document.getElementById("short-modal");
const longModal = document.getElementById("long-modal");

Pomo.innerHTML = studyMin + ":00";
//this is for the first display of the timer 
Gbutton.addEventListener("click",(startdisplay));
//restarting the time
rest.addEventListener("click",() =>{
    studyMin = 25;
    Pomo.innerHTML = "25:00";
    [minutes,seconds] = [25,0];
    restartTimer();
});
//this code will be excecuted if the study button will be clicked
Pomodorobtn.addEventListener("click",()=>{
    audioClick.play();
    stats = "pomo";
    restartTimer();
    Pomo.innerHTML = studyMin + ":00";
    [minutes,seconds] = [studyMin,0];

//the estudy button will be restarted to 25 min
    rest.addEventListener("click",() =>{
        studyMin = 25;
        Pomo.innerHTML = "25:00";
        [minutes,seconds] = [25,0];
        restartTimer();
    });
    Gbutton.addEventListener("click",(startdisplay)); 

});
//this code will be excecuted if the short button will be clicked
shortbtn.addEventListener("click",()=>{
    audioClick.play();
    stats = "short";
    restartTimer();
    Pomo.innerHTML = shortMin + ":00";
    [minutes,seconds] = [shortMin,0];

//the estudy button will be restarted to 5 min
    rest.addEventListener("click",() =>{
        shortMin = 5;
        Pomo.innerHTML = "05:00";
        [minutes,seconds] = [5,0];
        restartTimer();
    });
    Gbutton.addEventListener("click",(startdisplay)); 

});
//this code will be excecuted if the long button will be clicked
longbtn.addEventListener("click",()=>{
    audioClick.play();
    stats = "long";
    restartTimer();
    Pomo.innerHTML = longMin + ":00";
    [minutes,seconds] = [longMin,0];

//the estudy button will be restarted to 5 min
    rest.addEventListener("click",() =>{
        longMin = 10;
        Pomo.innerHTML = "10:00";
        [minutes,seconds] = [10,0];
        restartTimer();
    });
    Gbutton.addEventListener("click",(startdisplay)); 


});


//this function will start the timer
function startTimer(){
    if(intrvl !== null){
        clearInterval(intrvl);
    }
    audioClick.play();
    intrvl = setInterval(display, 1000);
    Gbutton.innerHTML="PAUSE"
}
//this function will pause the timer
function pauseTimer(){
    audioClick.play();
    clearInterval(intrvl);
}
//this function will restart the timer
function restartTimer() {
    clearInterval(intrvl);
    audioClick.play();
    click = false;
    Gbutton.innerHTML="START"
}
//this function will identify if the start button is clicked or not and will proceed to its designated function
function startdisplay(){
    if(click == false){
        startTimer();
        click = true;
        console.log("this is the minutes of study:" + studyMin);
    }else{
        pauseTimer();
        click = false;
        Gbutton.innerHTML="START"
    }
}
//it will display the timer and set rules if the numbers reach 0;
function display(){

    seconds--;
    if(seconds <= -1){
        minutes--;
        seconds = 59;
    }
    else if(seconds <= 0 && minutes <= 0){
        restartTimer();
        audioAlarm.play();
        if(stats == "pomo"){
            Pomo.innerHTML = "25:00";
        }else if(stats == "short"){
            [minutes,seconds] = [5,0];
            Pomo.innerHTML = "05:00";
        }else if(stats == "long"){
            [minutes,seconds] = [10,0];
            Pomo.innerHTML = "10:00";
        }else{
            [minutes,seconds] = [25,0];
            Pomo.innerHTML = "25:00";
        }
        
    }

    let s = seconds <10 ? "0"+seconds : seconds;
    let m = minutes <10 ? "0"+minutes : minutes;

    Pomo.innerHTML = `${m}:${s}`;

}

//this is how you open tthe modals and update the timer
updateDetails.addEventListener("click",() =>{
    audioClick.play();
    favDialog.showModal();
    label.value ="";
    changePlaceholder()
  });
  //event listender for the modal closing
  cls.addEventListener("click", () =>{
    closeModal();
  });
  //getting the value of the user input
  label.addEventListener("change", (event) =>{
   userInput1 = event.target.value;
  });
  
  

  //this will let the user enter only numbers and block the other characters and lettters
  label.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  });
  
  label.addEventListener('keydown', function (e) {
    var charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
    }
  });
  //displaying the last placed number
  function changePlaceholder(){
    document.getElementById('minute').placeholder =Number(userInput1);
  }

  //function for closing the modal
  function closeModal(){
    favDialog.close();
    audioClick.play();
  }
//if the study button will be clicked inside the modal
  studyModal.addEventListener("click", () =>{
if(userInput1 == 0){
    closeModal();
}else{
    modalstats = "study";
    audioClick.play();
    favDialog.close();
    studyMin = Number(userInput1);
    Pomo.innerHTML = studyMin + ":00";
    [minutes,seconds] = [studyMin,0];
    restartTimer();
}
  });
  //if the short button will be clicked inside the modal
  shortModal.addEventListener("click", () =>{
    if(userInput1 == 0){
        closeModal();
    }else{
        modalstats = "short"
        audioClick.play();
        favDialog.close();
        shortMin = Number(userInput1);
        Pomo.innerHTML = shortMin + ":00";
        [minutes,seconds] = [shortMin,0];
        restartTimer();
    }

  });
//if the long button will be clicked inside the modal
  longModal.addEventListener("click", () =>{
    if(userInput1 == 0){
        closeModal();
    }else{
        modalstats = "longs";
        audioClick.play();
        favDialog.close();
        longMin = Number(userInput1);
        Pomo.innerHTML = longMin + ":00";
        [minutes,seconds] = [longMin,0];
        restartTimer();
    }

  });


  
