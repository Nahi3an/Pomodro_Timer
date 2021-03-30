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

//Fucntion To Add task
function addTask(e) {
  const taskInput = document.querySelector("#task-input");

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
  }

  //Remove Task
  if (e.target.id == "task-remove") {
    const listItem = e.target.parentElement.parentElement;

    listItem.remove();
    showAlert(".card-content", "Task Removed!", "sucess-alert");
  }
}

// Delete All Btn
const dltAllTaskBtn = document.querySelector("#dltall-btn");

// Delete All Btn Event Handler
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
const focusStopBtn = document.querySelector("#f_play");
const focusResetBtn = document.querySelector("#f_play");

focusPlayBtn.addEventListener("click", playPauseFunction);

let count = 0;
function playPauseFunction(e) {
  let min = parseInt(document.getElementById("f_min").textContent);
  let sec = parseInt(document.getElementById("f_sec").textContent);

  const s = setInterval(() => {
    if (count % 2 == 0) {
      focusPlayBtn.textContent = "play_circle_filled";
      document
        .querySelector(".focus-timer")
        .classList.remove("togle-timer-border");

      clearInterval(s);
    } else {
      // document.querySelector(".focus-timer").add
      focusPlayBtn.textContent = "pause";
      document
        .querySelector(".focus-timer")
        .classList.toggle("togle-timer-border");

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

    if (sec == 0 && min == 0) {
      document
        .querySelector(".focus-timer")
        .classList.remove("togle-timer-border");

      document.querySelector(".focus-timer").classList.add("disabled");
      document.querySelector(".work-time-ends").style.display = "inline-block";
      document.getElementById("f_min").textContent = "01";
      document.getElementById("f_sec").textContent = "00";

      focusPlayBtn.textContent = "play_circle_filled";
      clearInterval(s);
    }
  }, 1000);

  count++;
}

// console.log(document.querySelector(".f-timer-title").nextElementSibling);

/*const main_btn = document.querySelector("#m-play-btn");
const main_stopBtn = document.querySelector("#m-stop-btn");
const break_btn = document.querySelector("#b-play-btn");

const main_min = document.querySelector("#m-min");
const main_sec = document.querySelector("#m-sec");

let count = 0;
function timer(e) {
  var s = setInterval(function countdown() {
    if (count % 2 == 0) {
      clearInterval(s);
      e.target.textContent = "play_arrow";
    } else {
      let sec = parseInt(main_sec.textContent);
      let min = parseIn
      t(main_min.textContent);
      if (sec == 0) {
        sec = 60;
        min = min - 1;
      }
      sec = sec - 1;

      main_min.textContent = min;
      if (sec == 0) {
        m_sec.textContent = "00";
      } else {
        if (sec < 10) {
          main_sec.textContent = "0" + sec;
        } else {
          main_sec.textContent = sec;
        }
      }
      e.target.textContent = "pause";
    }
  }, 1000);

  count++;
}

function stop_timer() {
  main_min.textContent = "25";
  main_sec.textContent = "00";
}
main_btn.addEventListener("click", timer);
main_stopBtn.addEventListener("click", stop_timer);
// break_btn.addEventListener("click", timer);
*/
