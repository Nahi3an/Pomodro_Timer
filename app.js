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

  setTimeout(function remove() {
    alert.remove();
  }, 2000);
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
      showAlert(".task-input-field", "Task added to the list!", "sucess-alert");
      taskInput.value = "";
    } else {
      showAlert(".task-input-field", "Enter a task first!", "error-alert");
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

          showAlert(".card-content", "Task marked as done!", "sucess-alert");
        } else {
          task.classList.remove("done-task");
          e.target.style.color = "#5e35b1";
          showAlert(".card-content", "Task marked as not done!", "error-alert");
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
    showAlert(".task-input-field", "All tasks deleted!", "sucess-alert");
  } else {
    showAlert(".task-input-field", "No task to delete!", "error-alert");
  }
}

//**** Focus Timer ***** //

const focusPlayBtn = document.querySelector("#f_play");
const focusResetBtn = document.querySelector("#f_reset");

const breakPlayBtn = document.querySelector("#b_play");
const breakResetBtn = document.querySelector("#b_reset");

//**Focus Timer Play & Pause Btn
focusPlayBtn.addEventListener("click", focusTimerControl);
focusResetBtn.addEventListener("click", focusTimerControl);

breakPlayBtn.addEventListener("click", focusTimerControl);
breakResetBtn.addEventListener("click", focusTimerControl);

let count = 0;
//Main timer control function
function focusTimerControl(e) {
  let min_txt, sec_txt, min, sec, timerBody, playBtn, otherTimerBody;

  if (e.target.id == "f_play") {
    min_txt = document.getElementById("f_min");
    sec_txt = document.getElementById("f_sec");
    timerBody = document.querySelector(".focus-timer");
    otherTimerBody = document.querySelector(".break-timer");
    playBtn = focusPlayBtn;
    min = parseInt(min_txt.textContent);
    sec = parseInt(sec_txt.textContent);
    otherTimerBody.classList.add("disabled");
  } else if (e.target.id == "b_play") {
    min_txt = document.getElementById("b_min");
    sec_txt = document.getElementById("b_sec");
    timerBody = document.querySelector(".break-timer");
    otherTimerBody = document.querySelector(".focus-timer");
    playBtn = breakPlayBtn;
    min = parseInt(min_txt.textContent);
    sec = parseInt(sec_txt.textContent);
    otherTimerBody.classList.add("disabled");
  } else {
    if (e.target.id == "b_reset") {
      min_txt = document.getElementById("b_min");
      sec_txt = document.getElementById("b_sec");
      playBtn = breakPlayBtn;
    } else if (e.target.id == "f_reset") {
      min_txt = document.getElementById("f_min");
      sec_txt = document.getElementById("f_sec");
      playBtn = focusPlayBtn;
    }
  }

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

  const s = setInterval(() => {
    if (e.target.id == "f_play" || e.target.id == "b_play") {
      //*Pause
      if (count % 2 == 0) {
        playBtn.textContent = "play_circle_filled";
        timerBody.classList.remove("togle-timer-border");

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
        console.log(sec);

        if (min < 10) {
          min_txt.textContent = `00`;
        } else {
          min_txt.textContent = `${min}`;
        }

        if (sec < 10) {
          console.log(sec_txt.textContent);
          sec_txt.textContent = "0" + sec;
          console.log(sec_txt.textContent);
        } else {
          sec_txt.textContent = `${sec}`;
        }
      }
    }

    //** Finish
    if (sec == 0 && min == 0) {
      playBtn.textContent = "play_circle_filled";
      min_txt.textContent = "00";
      sec_txt.textContent = "10";

      timerBody.classList.remove("togle-timer-border");
      timerBody.classList.add("disabled");
      otherTimerBody.classList.remove("disabled");

      showNotification(timerBody);
      cycleCounter();
      clearInterval(s);
    }
  }, 1000);

  //Reset Btn
  if (e.target.id == "f_reset" || e.target.id == "b_reset") {
    min_txt.textContent = "00";
    sec_txt.textContent = "10";

    playBtn.textContent = "play_circle_filled";
    clearInterval(s);
  }
  count++;
}

function showNotification(timerBody) {
  let txt1, txt2;

  if (timerBody.id == "focus-timer") {
    txt1 = "Work Session Over!";
    txt2 = "Take A Short Break!";
  } else if (timerBody.id == "break-timer") {
    console.log("ok");
    txt1 = "Break Session Over!";
    txt2 = "Get Back To Work!";
  }

  document.querySelector("#notification-board").classList.add("work-time-ends");
  document.querySelector("#notification-board").innerHTML = `
    <h5 class="m-0 ">
    <i class="material-icons" style="font-weight: bolder !important;">notifications</i>
    </h5>
    <h5 style="font-weight: bolder !important;">${txt1}</h5>
    <h6>${txt2}</h6>`;
}

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
  }
  longBreakTimer(quarter_value);
}

//** Break Timer*/

focusPlayBtn.addEventListener("mouseenter", hoverStyleAdd);
focusPlayBtn.addEventListener("mouseleave", hoverStyleRmv);

// Hover Event Handlers
focusResetBtn.addEventListener("mouseenter", hoverStyleAdd);
focusResetBtn.addEventListener("mouseleave", hoverStyleRmv);

// Hover Event Handlers
breakPlayBtn.addEventListener("mouseenter", hoverStyleAdd);
breakPlayBtn.addEventListener("mouseleave", hoverStyleRmv);

breakResetBtn.addEventListener("mouseenter", hoverStyleAdd);
breakResetBtn.addEventListener("mouseleave", hoverStyleRmv);

//*Hover Fucntion Play & Reset Buttons For Both Timer
function hoverStyleAdd(e) {
  e.target.classList.add("timer-btn-hover");
}

function hoverStyleRmv(e) {
  e.target.classList.remove("timer-btn-hover");
}

// //**Play & Pause Btn
// breakPlayBtn.addEventListener("click", breakTimerControl);
// breakResetBtn.addEventListener("click", breakTimerControl);

// let count_2 = 0;
// //Break Timer Control
// function breakTimerControl(e) {
//   let min = parseInt(document.getElementById("b_min").textContent);
//   let sec = parseInt(document.getElementById("b_sec").textContent);
//   document.querySelector("#notification-board").innerHTML = "";

//   //** Removing the Style of Notification Board */
//   if (
//     document
//       .querySelector("#notification-board")
//       .classList.contains("work-time-ends")
//   ) {
//     document
//       .querySelector("#notification-board")
//       .classList.remove("work-time-ends");
//   }

//   const s = setInterval(() => {
//     if (e.target.id == "b_play") {
//       //* Pause Break Timer
//       if (count_2 % 2 == 0) {
//         breakPlayBtn.textContent = "play_circle_filled";
//         document
//           .querySelector(".break-timer")
//           .classList.remove("togle-timer-border");

//         clearInterval(s);
//       } else {
//         //*** Play Break Timer

//         document
//           .querySelector(".break-timer")
//           .classList.toggle("togle-timer-border");

//         breakPlayBtn.textContent = "pause";
//         if (sec == 0) {
//           sec = 60;
//           min--;
//         }

//         sec--;

//         if (min < 10) {
//           document.getElementById("b_min").textContent = "0" + min;
//         } else {
//           document.getElementById("b_min").textContent = min;
//         }

//         if (sec < 10) {
//           document.getElementById("b_sec").textContent = "0" + sec;
//         } else {
//           document.getElementById("b_sec").textContent = sec;
//         }
//       }
//     }

//     //** Finish
//     if (sec == 0 && min == 0) {
//       const runningTimer = document.querySelector(".break-timer");
//       const disabledTimer = document.querySelector(".focus-timer");
//       const text1 = "Break Time Over!";
//       const text2 = "Get Back To Work";
//       timerFinish(runningTimer, disabledTimer, text1, text2);
//       document.getElementById("b_min").textContent = "00";
//       document.getElementById("b_sec").textContent = "10";

//       breakPlayBtn.textContent = "play_circle_filled";
//       clearInterval(s);
//     }
//   }, 1000);

//   //Reset Btn
//   if (e.target.id == "b_reset") {
//     document.getElementById("b_min").textContent = "01";
//     document.getElementById("b_sec").textContent = "00";

//     breakPlayBtn.textContent = "play_circle_filled";
//     clearInterval(s);
//   }

//   count_2++;
// }

//***Showing task label In the timer
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

//Close Label Function
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

function longBreakTimer(quarter_value) {
  if (quarter_value % 4 == 0 && quarter_value !== 0) {
    document.querySelector("#break-title").textContent = "LONG BREAK TIMER";
    document.getElementById("b_min").textContent = "00";
    document.getElementById("b_sec").textContent = "15";
  } else {
    document.querySelector("#break-title").textContent = "SHORT BREAK TIMER";
    document.getElementById("b_min").textContent = "00";
    document.getElementById("b_sec").textContent = "10";
  }
}
