let notcomplete = 0;
document
  .querySelector('input[type="button"][value="Add"]')
  .addEventListener("click", () => {
    const user_input = document.getElementById("TaskList_input").value.trim();

    if (user_input != "") {
      addTask(user_input);
      updateStatus();
    } else {
      alert("provide some text in the text field");
    }
  });

const addTask = (new_task) => {
  const ul = document.getElementById("Task_list");

  const li = document.createElement("li");
  li.classList.add("task");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "Task_done";
  checkbox.id = "Task_done";
  checkbox.addEventListener("change", updateStatus);

  const desc = document.createElement("p");
  desc.textContent = new_task;

  const del = document.createElement("input");
  del.type = "button";
  del.value = "Delete";
  del.onclick = () => {
    li.remove();
    updateStatus();
  };

  const edit = document.createElement("input");
  edit.type = "button";
  edit.value = "edit";
  edit.onclick = () => {
    const newText = prompt("edit your task: ", desc.textContent);
    if (newText != null) {
      desc.textContent = newText;
    }
  };

  ul.appendChild(li);
  li.appendChild(checkbox);
  li.appendChild(desc);
  li.appendChild(del);
  li.appendChild(edit);
};

const updateStatus = () => {
  const bx = document.querySelectorAll('input[type="checkbox"]');

  let complete = 0;
  notcomplete = bx.length;

  bx.forEach((box) => {
    if (box.checked) {
      complete++;
    }
  });
  result(complete, notcomplete);
};

const result = (complete, notcomplete) => {
  const result = document.getElementById("result");
  result.innerText = `Complete ${complete} | Uncomplete ${
    notcomplete - complete
  }`;
};

const checkbx = document.querySelectorAll('input[type="checkbox"]');
checkbx.forEach((box) => {
  box.addEventListener("change", updateStatus);
});
