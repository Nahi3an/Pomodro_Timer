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
focusPlayBtn.addEventListener("mouseenter", hoverStyleAdd);
focusPlayBtn.addEventListener("mouseleave", hoverStyleRmv);

// Hover Event Handlers
focusResetBtn.addEventListener("mouseenter", hoverStyleAdd);
focusResetBtn.addEventListener("mouseleave", hoverStyleRmv);

//*Hover Fucntion Play & Reset Buttons For Both Timer
function hoverStyleAdd(e) {
  e.target.classList.add("timer-btn-hover");
}

function hoverStyleRmv(e) {
  e.target.classList.remove("timer-btn-hover");
}

//**Play & Pause Btn
focusPlayBtn.addEventListener("click", focusTimerControl);
focusResetBtn.addEventListener("click", focusTimerControl);

let count = 0;
//Main timer control function
function focusTimerControl(e) {
  let min = parseInt(document.getElementById("f_min").textContent);
  let sec = parseInt(document.getElementById("f_sec").textContent);

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
    if (e.target.id == "f_play") {
      //*Pause
      if (count % 2 == 0) {
        focusPlayBtn.textContent = "play_circle_filled";
        document
          .querySelector(".focus-timer")
          .classList.remove("togle-timer-border");

        clearInterval(s);
      } else {
        //*** PLay

        document
          .querySelector(".focus-timer")
          .classList.toggle("togle-timer-border");

        //**Loading the Undone Tasks From Task List
        if (document.querySelector(".task-collection").children.length != 0) {
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

        focusPlayBtn.textContent = "pause";
        if (sec == 0) {
          sec = 60;
          min--;
        }

        sec--;

        if (min < 10) {
          document.getElementById("f_min").textContent = "0" + min;
        } else {
          document.getElementById("f_min").textContent = min;
        }

        if (sec < 10) {
          document.getElementById("f_sec").textContent = "0" + sec;
        } else {
          document.getElementById("f_sec").textContent = sec;
        }
      }
    }

    //** Finish
    if (sec == 0 && min == 0) {
      const runningTimer = document.querySelector(".focus-timer");
      const disabledTimer = document.querySelector(".break-timer");
      const text1 = "Work Time Over!";
      const text2 = "Take A Small Break";
      timerFinish(runningTimer, disabledTimer, text1, text2);
      cycleCounter();
      focusPlayBtn.textContent = "play_circle_filled";
      document.getElementById("f_min").textContent = "00";
      document.getElementById("f_sec").textContent = "10";
      clearInterval(s);
    }
  }, 1000);

  //Reset Btn
  if (e.target.id == "f_reset") {
    document.getElementById("f_min").textContent = "05";
    document.getElementById("f_sec").textContent = "00";

    focusPlayBtn.textContent = "play_circle_filled";
    clearInterval(s);
  }
  count++;
}

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

//** Break Timer*/

const breakPlayBtn = document.querySelector("#b_play");
const breakResetBtn = document.querySelector("#b_reset");

// Hover Event Handlers
breakPlayBtn.addEventListener("mouseenter", hoverStyleAdd);
breakPlayBtn.addEventListener("mouseleave", hoverStyleRmv);

breakResetBtn.addEventListener("mouseenter", hoverStyleAdd);
breakResetBtn.addEventListener("mouseleave", hoverStyleRmv);

//**Play & Pause Btn
breakPlayBtn.addEventListener("click", breakTimerControl);
breakResetBtn.addEventListener("click", breakTimerControl);

let count_2 = 0;
//Break Timer Control
function breakTimerControl(e) {
  let min = parseInt(document.getElementById("b_min").textContent);
  let sec = parseInt(document.getElementById("b_sec").textContent);

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
    if (e.target.id == "b_play") {
      //* Pause Break Timer
      if (count_2 % 2 == 0) {
        breakPlayBtn.textContent = "play_circle_filled";
        document
          .querySelector(".break-timer")
          .classList.remove("togle-timer-border");

        clearInterval(s);
      } else {
        //*** Play Break Timer

        document
          .querySelector(".break-timer")
          .classList.toggle("togle-timer-border");

        breakPlayBtn.textContent = "pause";
        if (sec == 0) {
          sec = 60;
          min--;
        }

        sec--;

        if (min < 10) {
          document.getElementById("b_min").textContent = "0" + min;
        } else {
          document.getElementById("b_min").textContent = min;
        }

        if (sec < 10) {
          document.getElementById("b_sec").textContent = "0" + sec;
        } else {
          document.getElementById("b_sec").textContent = sec;
        }
      }
    }

    //** Finish
    if (sec == 0 && min == 0) {
      const runningTimer = document.querySelector(".break-timer");
      const disabledTimer = document.querySelector(".focus-timer");
      const text1 = "Break Time Over!";
      const text2 = "Get Back To Work";
      timerFinish(runningTimer, disabledTimer, text1, text2);
      document.getElementById("b_min").textContent = "00";
      document.getElementById("b_sec").textContent = "10";

      breakPlayBtn.textContent = "play_circle_filled";
      clearInterval(s);
    }
  }, 1000);

  //Reset Btn
  if (e.target.id == "b_reset") {
    document.getElementById("b_min").textContent = "01";
    document.getElementById("b_sec").textContent = "00";

    breakPlayBtn.textContent = "play_circle_filled";
    clearInterval(s);
  }

  count_2++;
}

function timerFinish(runningTimer, disabledTimer, text1, text2) {
  runningTimer.classList.remove("togle-timer-border");

  runningTimer.classList.add("disabled");
  disabledTimer.classList.remove("disabled");
  document.querySelector("#notification-board").classList.add("work-time-ends");
  document.querySelector("#notification-board").innerHTML = `
    <h5 class="m-0 ">
    <i class="material-icons" style="font-weight: bolder !important;">notifications</i>
    </h5>
    <h5 style="font-weight: bolder !important;">${text1}</h5> 
    <h6>${text2}</h6>`;
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

  if (quarter_value % 4 == 0) {
    full_value++;
    document.getElementById("full_counter").textContent = full_value;
  }
}
