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

const addTaskBtn = document.querySelector("#add-taskbtn");

addTaskBtn.addEventListener("click", addTask);

function addTask(e) {
  const taskInput = document.querySelector("#task-input");

  if (taskInput.value !== "") {
    const parent = document.querySelector(".task-collection");
    const child = document.createElement("li");
    child.innerHTML = `<span>${taskInput.value}</span>
                       <a class="right" href="">
                       <i class="material-icons m-0" id="task-remove">remove_circle</i>
                      </a>
                      <a class="right" href="">
                      <i class="material-icons m-0" id="task-done">check_box
                      </i>
                      </a>`;
    child.classList.add("collection-item");
    parent.appendChild(child);
    taskInput.value = "";
    console.log(taskInput.value);
  } else {
    const parent = document.querySelector(".task-input-field");
    const alertTxt = document.createElement("p");
    alertTxt.innerHTML = `<p class="input-task-alert">Enter A Task First!</p>`;
    parent.appendChild(alertTxt);

    setTimeout(function remove() {
      alertTxt.remove();
    }, 5000);
  }

  /**
   *  <li class="collection-item"><span>Task 1</span>
                                <a class="right" href=""><i class="material-icons m-0" id="task-remove">remove_circle
                                    </i>
                                </a>
                                <a class="right" href=""><i class="material-icons m-0" id="task-done">check_box
                                    </i>
                                </a>
                            </li>
   */
}
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
