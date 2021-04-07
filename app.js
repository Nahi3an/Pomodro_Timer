// Jquery For Collapsible
$(document).ready(function () {
  $(".sidenav").sidenav();
});
$(document).ready(function () {
  $(".collapsible").collapsible();
});

// Jquery For Modal
$(document).ready(function () {
  $(".modal").modal();
});

//**** Task List***** //

// Alert Function For Task List
function showAlert(parentClassName, msg, styleClassName) {
  const alert = document.createElement("p");

  alert.classList.add(styleClassName);
  alert.appendChild(document.createTextNode(msg));
  const parent = document.querySelector(`${parentClassName}`);

  parent.appendChild(alert);

  let res = alert.textContent.split(" ");
  if (res.length <= 2) {
    setTimeout(function remove() {
      alert.remove();
    }, 500);
  } else {
    setTimeout(function remove() {
      alert.remove();
    }, 1000);
  }
}

// Add Task Button
const addTaskBtn = document.querySelector("#add-taskbtn");

//Add Task Event Handler
addTaskBtn.addEventListener("click", addTask);
document.querySelector("#task-input").addEventListener("keypress", addTask);

//Fucntion To Add task
function addTask(e) {
  const taskInput = document.querySelector("#task-input");

  if (e.keyCode === 13 || e.target.id === "add-taskbtn") {
    if (taskInput.value !== "") {
      const parent = document.querySelector(".task-collection");
      const child = document.createElement("li");
      child.innerHTML = `<span class="task-name">${taskInput.value}</span>
                       <a class="right" href="#">
                       <i class="material-icons m-0" id="task-remove">remove_circle</i>
                      </a>
                      <a class="right" href="#">
                      <i class="material-icons m-0" id="task-done">check_box
                      </i>
                      </a>`;
      child.classList.add("collection-item");
      parent.appendChild(child);
      showAlert(".task-input-field", "Task Added!", "sucess-alert");
      taskInput.value = "";
    } else {
      showAlert(".task-input-field", "No Task To Add!", "error-alert");
    }
  }
}

// Body Event Handler for done task & Remove task
document.body.addEventListener("click", taskControl);

//Fucntion of Controling done task & Remove task
function taskControl(e) {
  if (e.target.id == "task-done") {
    const tasks = Array.from(e.target.parentElement.parentElement.children);
    //Done Task
    tasks.forEach((task) => {
      if (task.classList.contains("task-name")) {
        if (!task.classList.contains("done-task")) {
          task.classList.add("done-task");
          e.target.style.color = "grey";

          showAlert(".card-content", "Done!", "sucess-alert");
        } else {
          task.classList.remove("done-task");
          e.target.style.color = "#5e35b1";
          showAlert(".card-content", "Not Done!", "error-alert");
        }
      }
    });

    //Removing Click of Cross Button
    document
      .querySelector("#ongoing-task")
      .classList.remove("closebtn-clicked");
  }

  //Remove Task
  if (e.target.id == "task-remove") {
    const listItem = e.target.parentElement.parentElement;

    listItem.remove();
    showAlert(".card-content", "Task Removed!", "sucess-alert");
  }
}

// Delete All Tasks
const dltAllTaskBtn = document.querySelector("#dltall-btn");

// Delete All Tasks Btn Event Handler
dltAllTaskBtn.addEventListener("click", deleteAllTask);

//Function to Delete All Task
function deleteAllTask(e) {
  const taskLists = Array.from(
    document.querySelector(".task-collection").children
  );

  if (taskLists.length !== 0) {
    taskLists.forEach((taskList) => {
      if (taskList.classList.contains("collection-item")) {
        taskList.remove();
      }
    });
    showAlert(".task-input-field", "All Tasks Deleted!", "sucess-alert");
  } else {
    showAlert(".task-input-field", "No Tasks to delete!", "error-alert");
  }
}

//** Load Default Value Of Timers

const focusInput = document.querySelector("#focus-min");
const shortInput = document.querySelector("#short-break-min");
const longInput = document.querySelector("#long-break-min");

function loadDefaultValue() {
  document.querySelector("#f_min").textContent = "25";
  document.querySelector("#b_min").textContent = "05";

  focusInput.value = "25";
  shortInput.value = "5";
  longInput.value = "10";
}

loadDefaultValue();

//**** Focus Timer ***** //

//*Sound Notification

//*Timer Sound
const timerSound = document.getElementById("timer-sound");

const timerSoundOn = document.getElementById("timer_sound_on");
function playTimerSound() {
  if (timerSoundOn.classList.contains("on")) {
    timerSound.play();
  }
}

function pauseTimerSound() {
  timerSound.pause();
}

document.body.addEventListener("click", function (e) {
  if (e.target.id == "timer_sound_on") {
    if (!timerSoundOn.classList.contains("on")) {
      timerSoundOn.classList.add("on");
    }
  } else if (e.target.id == "timer_sound_off") {
    timerSoundOn.classList.remove("on");
  }
});

/**Sound button Hover */
document
  .getElementById("timer_sound_on")
  .addEventListener("mouseenter", soundBtnStyle);
document
  .getElementById("timer_sound_on")
  .addEventListener("mouseleave", soundBtnStyle);
document
  .getElementById("timer_sound_off")
  .addEventListener("mouseenter", soundBtnStyle);
document
  .getElementById("timer_sound_off")
  .addEventListener("mouseleave", soundBtnStyle);

function soundBtnStyle(e) {
  if (e.type == "mouseenter") {
    e.target.classList.add("sound-btn-hover");
  } else if (e.type == "mouseleave") {
    e.target.classList.remove("sound-btn-hover");
  }
}

// const finishSound = document.getElementById("finish-sound");

// const finishSoundOn = document.getElementById("cycle_sound_on");
// let pass = 1;
// function playFinishSound() {
//   if (pass) {
//     finishSound.play();
//   }
// }

// // function test() {

// // }

// // test();

// function pauseFinishSound() {
//   finishSound.pause();
// }

// document.body.addEventListener("click", function (e) {
//   if (e.target.id == "cycle_sound_on") {
//     pass = 1;
//   } else if (e.target.id == "cycle_sound_off") {
//     pass = 0;
//   }
// });

/** Main Timer Part */
const focusPlayBtn = document.querySelector("#f_play");
const focusResetBtn = document.querySelector("#f_reset");

const breakPlayBtn = document.querySelector("#b_play");
const breakResetBtn = document.querySelector("#b_reset");

const saveSettingBtn = document.querySelector("#setting-btn");
//**Focus Timer Play & Reset  Event Handler
focusPlayBtn.addEventListener("click", timerControl);
focusResetBtn.addEventListener("click", timerControl);

//**Break Timer Play & Reset  Event Handler
breakPlayBtn.addEventListener("click", timerControl);
breakResetBtn.addEventListener("click", timerControl);
saveSettingBtn.addEventListener("click", timerControl);
//*Both Timer Control Function
let count = 0;
function timerControl(e) {
  let min_txt, sec_txt, min, sec, timerBody, playBtn, otherTimerBody;

  //* If Focus timer play button clicked
  if (e.target.id == "f_play") {
    min_txt = document.getElementById("f_min");
    sec_txt = document.getElementById("f_sec");
    timerBody = document.querySelector(".focus-timer");
    otherTimerBody = document.querySelector(".break-timer");
    playBtn = focusPlayBtn;
    min = parseInt(min_txt.textContent);
    sec = parseInt(sec_txt.textContent);
    otherTimerBody.classList.add("disabled");
    /**Ongoing Notification */
    ongoingNotification(
      "Work Time running!",
      "Dont lose the site of your goal!",
      "next_week"
    );
  } else if (e.target.id == "b_play") {
    //* If Break timer play button clicked

    min_txt = document.getElementById("b_min");
    sec_txt = document.getElementById("b_sec");
    timerBody = document.querySelector(".break-timer");
    otherTimerBody = document.querySelector(".focus-timer");
    playBtn = breakPlayBtn;
    min = parseInt(min_txt.textContent);
    sec = parseInt(sec_txt.textContent);
    otherTimerBody.classList.add("disabled");
    /**Ongoing Notification */
    ongoingNotification(
      "Break Time running!",
      "Take A Chill Pill",
      "sentiment_very_satisfied"
    );
  } else {
    //**Reset Button  */
    if (e.target.id == "b_reset") {
      //*If Break Timer reset Button Clicked
      timerBody = document.querySelector(".break-timer");
      min_txt = document.getElementById("b_min");
      sec_txt = document.getElementById("b_sec");
      playBtn = breakPlayBtn;
    } else if (e.target.id == "f_reset") {
      //*If Focus Timer reset Button Clicked
      timerBody = document.querySelector(".focus-timer");
      min_txt = document.getElementById("f_min");
      sec_txt = document.getElementById("f_sec");
      playBtn = focusPlayBtn;
    }
  }

  //**Per second TIme Interval Function */
  const s = setInterval(() => {
    if (e.target.id == "f_play" || e.target.id == "b_play") {
      //*Pause
      if (count % 2 == 0) {
        playBtn.textContent = "play_circle_filled";
        timerBody.classList.remove("togle-timer-border");
        pauseTimerSound();
        clearInterval(s);
      } else {
        //*** Play

        timerBody.classList.toggle("togle-timer-border");

        //**Only Loads Task if Main timer is on */
        if (e.target.id == "f_play") {
          if (document.querySelector(".task-collection").children.length != 0) {
            //**Loading the Undone Tasks From Task List
            const taskList = Array.from(
              document.querySelector(".task-collection").children
            );

            const undoneTasks = taskList.filter((task) => {
              if (!task.firstElementChild.classList.contains("done-task")) {
                return task.firstElementChild;
              }
            });

            //If once cross button is Clicked Dont load the task
            //untill given permisson
            if (
              !document
                .querySelector("#ongoing-task")
                .classList.contains("closebtn-clicked")
            ) {
              showLabel(undoneTasks);
            }
          }
        }

        playBtn.textContent = "pause";

        if (sec == 0) {
          sec = 60;
          min--;
        }

        sec--;

        /**Min Update */
        if (min < 10) {
          min_txt.textContent = "0" + min;
        } else {
          min_txt.textContent = min;
        }

        /**Sec Update */
        if (sec < 10) {
          sec_txt.textContent = "0" + sec;
        } else {
          sec_txt.textContent = sec;
        }

        playTimerSound();
      }
    }
    //** Finish
    if (sec == 0 && min == 0) {
      //**Reseting Counter For Each timer  */
      count = 0;

      //**Reseting Timer Value After Finishing  */
      if (timerBody.id == "focus-timer") {
        resetTimer(min_txt, sec_txt, focusInput.value);
      } else {
        resetTimer(min_txt, sec_txt, shortInput.value);
      }
      playBtn.textContent = "play_circle_filled";

      //**Removing blinking */
      timerBody.classList.remove("togle-timer-border");
      timerBody.classList.add("disabled");
      otherTimerBody.classList.remove("disabled");

      showNotification(timerBody);
      //**Only Counting Cycle if it is the main timer */
      if (timerBody.id == "focus-timer") {
        cycleCounter();
      }
      pauseTimerSound();
      playFinishSound();
      clearInterval(s);
    }
  }, 1000);

  //Save Value On Settings
  if (e.target.id == "setting-btn") {
    resetTimer(
      document.getElementById("f_min"),
      document.getElementById("f_sec"),
      focusInput.value
    );

    resetTimer(
      document.getElementById("b_min"),
      document.getElementById("b_sec"),
      shortInput.value
    );

    clearInterval(s);
  }

  //Reset Btn
  if (e.target.id == "f_reset" || e.target.id == "b_reset") {
    clearInterval(s);
    if (timerBody.id == "focus-timer") {
      resetTimer(min_txt, sec_txt, focusInput.value);
    } else {
      resetTimer(min_txt, sec_txt, shortInput.value);
    }

    pauseTimerSound();
    removeNotification();
    document.getElementById("f_play").textContent = "play_circle_filled";
  }
  count++;
}

//Function To Reset Timer Values
function resetTimer(minute, sec, value) {
  if (value < 10) {
    minute.textContent = "0" + value;
  } else {
    minute.textContent = value;
  }
  sec.textContent = "00";
}
//**  Notification Showing Fucntion */
function showNotification(timerBody) {
  let txt1, txt2, txt3;

  if (timerBody.id == "focus-timer") {
    txt1 = "Work Session Over!";
    txt2 = "Take A Short Break!";
    txt3 = "Going To Break";
  } else if (timerBody.id == "break-timer") {
    console.log("ok");
    txt1 = "Break Session Over!";
    txt2 = "Get Back To Work!";
    txt3 = "Back To Work";
  }

  document.querySelector("#notification-board").classList.add("work-time-ends");
  document.querySelector("#notification-board").innerHTML = `
    <h5 class="m-0 ">
    <i class="material-icons" style="font-weight: bolder !important;">notifications</i>
    </h5>
    <h5 style="font-weight: bolder !important; margin-top:2px !important">${txt1}</h5>
    <h6>${txt2}</h6>
    <a class="btn btn-small" id="session-done" style="margin-top:5px !important">${txt3}</a>`;
}

//**Function TO display Ongoing Notification */
function ongoingNotification(txt1, quoets, icon) {
  document.querySelector("#notification-board").classList.add("work-time-ends");
  document.querySelector("#notification-board").innerHTML = `
    <h5 class="m-0 ">
    <i class="material-icons">${icon}</i>
    </h5>
    <h5 style="font-weight: bolder !important; margin-top:2px !important">${txt1}</h5>
    <h6 style="font-style:italic">${quoets}</h6>`;
}

//**Function to Remove Ongoing Notification */

function removeNotification() {
  document.querySelector("#notification-board").innerHTML = "";
  if (
    document
      .querySelector("#notification-board")
      .classList.contains("work-time-ends")
  ) {
    document
      .querySelector("#notification-board")
      .classList.remove("work-time-ends");
  }
}
//**Stoping the finish Sound */
document.body.addEventListener("click", function (e) {
  if (e.target.id == "session-done") {
    pauseFinishSound();
    removeNotification();
  }
});

//**Quarter & Full Cycle Counter */
function cycleCounter() {
  let quarter_value = parseInt(
    document.getElementById("quarter_counter").textContent
  );
  let full_value = parseInt(
    document.getElementById("full_counter").textContent
  );

  quarter_value++;

  document.getElementById("quarter_counter").textContent = quarter_value;

  if (quarter_value % 4 == 0 && quarter_value !== 0) {
    full_value++;
    document.getElementById("full_counter").textContent = full_value;
    longBreakTimer(quarter_value);
  }
}

//**Long Break time change & style change function*/
function longBreakTimer(quarter_value) {
  if (quarter_value % 4 == 0 && quarter_value !== 0) {
    document.querySelector("#break-title").textContent = "LONG BREAK TIMER";

    if (longInput.value < 10) {
      document.getElementById("b_min").textContent = "0" + longInput.value;
    } else {
      document.getElementById("b_min").textContent = longInput.value;
    }
  } else {
    document.querySelector("#break-title").textContent = "SHORT BREAK TIMER";

    if (shortInput.value < 10) {
      document.getElementById("b_min").textContent = "0" + shortInput.value;
    } else {
      document.getElementById("b_min").textContent = shortInput.value;
    }
  }
}

//** Hover Event Handlers */

focusPlayBtn.addEventListener("mouseenter", hoverStyle);
focusPlayBtn.addEventListener("mouseleave", hoverStyle);

focusResetBtn.addEventListener("mouseenter", hoverStyle);
focusResetBtn.addEventListener("mouseleave", hoverStyle);

breakPlayBtn.addEventListener("mouseenter", hoverStyle);
breakPlayBtn.addEventListener("mouseleave", hoverStyle);

breakResetBtn.addEventListener("mouseenter", hoverStyle);
breakResetBtn.addEventListener("mouseleave", hoverStyle);

//** Hover Function */
function hoverStyle(e) {
  if (e.type == "mouseenter") {
    e.target.classList.add("timer-btn-hover");
  } else {
    e.target.classList.remove("timer-btn-hover");
  }
}

//**Show task Label Function */
function showLabel(undoneTasks) {
  const label = document.querySelector("#ongoing-task");

  // If task exists then load
  if (undoneTasks.length != 0) {
    const task = undoneTasks[0].firstElementChild.textContent;

    //Adding task label & styles
    label.innerHTML = `<p><span style="margin-right:5px">${task}</span><span style="font-style: normal;
            font-weight: bold;
            padding: 1px 10px;
           
            background: #3C2075;
            cursor:pointer" id="lable-closebtn">X</span></p>`;
    label.classList.add("ongoing-task");
    document
      .querySelector(".focus-timer")
      .classList.add("focus-timer-withtask");

    document.querySelector(".dial-box").style.marginTop = "1rem";
  } else {
    // If No Task
    //Then removing task label & styles
    label.innerHTML = "";
    label.classList.remove("ongoing-task");
    document
      .querySelector(".focus-timer")
      .classList.remove("focus-timer-withtask");
    document.querySelector(".dial-box").style.marginTop = "0px";
  }
}

//**Cross Sign Of Task Label */
document.body.addEventListener("click", closeLable);

//*Close Label Function
function closeLable(e) {
  const label = document.querySelector("#ongoing-task");
  if (e.target.id == "lable-closebtn") {
    //Adding Click of Cross Button
    label.classList.add("closebtn-clicked");

    //Removing task label & styles
    label.innerHTML = "";
    label.classList.remove("ongoing-task");
    document
      .querySelector(".focus-timer")
      .classList.remove("focus-timer-withtask");
    document.querySelector(".dial-box").style.marginTop = "0px";
  }
}

const anchors = document.querySelector(".no_use_a");
anchors.addEventListener("click", function (e) {
  e.preventDefault();
});
