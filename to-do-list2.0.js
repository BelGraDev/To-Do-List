const taskArray = [];

renderHeaderLine();

function renderHeaderLine(){

    document.querySelector('.number').innerHTML = `Number of tasks: ${taskArray.length}`
}
//Render the addition panel once the button has been pressed
function renderAdditionPanel(){

    const content = document.querySelector('.addition-panel-invisible');
    content.innerHTML = `
    <label for="deadline">Deadline: </label><input type="date" id="deadline">
    <label for="title">Title: </label><input type="text" placeholder="Title" id="title">
    <label for="description">Description: </label><input type="text" placeholder="Short description" id="description">
    <button onclick="
    
        hideAdditionPanel();
    
    " class="cancel-button">Cancel</button>
    <button onclick="
    
        addTask();
    
    " class="add-task">Add</button>`

    document.querySelector('.addition-panel-invisible').classList.add('addition-panel');
}

//Add tasks only if all the fields have been filled
function addTask(){

    const deadlineInput = document.getElementById('deadline').value;
    const titleInput = document.getElementById('title').value;
    const descriptionInput = document.getElementById('description').value;

    if(deadlineInput && titleInput && descriptionInput){

        const task = {
            deadline: deadlineInput,
            title: titleInput,
            description: descriptionInput
        };
        document.querySelector('.addition-panel-invisible').innerHTML = '';
        document.querySelector('.addition-panel-invisible').classList.remove('addition-panel');
        taskArray.push(task);
        renderHeaderLine();
        renderTasks();

    }else{
        alert('All the components must be filled');
    }

}

//Render the tasks that have been added
function renderTasks(){

    let taskHTML = '';
    for(let i = 0; i < taskArray.length; i++){

        const currentTask = taskArray[i];
        const html = `
        
            <table>
                <tr>
                    <td><span class="render-title">${currentTask.title}</span> - <span class="render-deadline">${currentTask.deadline}</span></td>
                    <td><button class="options-style" onclick="
                    
                        renderOptionsMenu(${i});
                    
                    ">⋮</button></td>
                </tr>
                <tr>
                    <td>${currentTask.description}</td>
                </tr>

            </table>
        `;
        taskHTML += html;
    }
    document.querySelector('.task-panel').innerHTML = taskHTML;

}

//Functions associated with the Options Menu
//Render options menu
function renderOptionsMenu(pos){

    document.querySelector('.options-button').classList.add('options-button-visible');
    const content = document.querySelector('.options-button-visible');
    content.innerHTML = `
        <p class="delete-row" onclick="
        
            hideModifiers();
            taskArray.splice(${pos},1);
            hideOptionsMenu();
            renderTasks();
            renderHeaderLine();

        ">Delete </p>
        <p class="options-row" onclick="
        
            hideModifiers();
            changeTitle(${pos});

        ">Change Title </p>
        <p class="options-row" onclick="
        
            hideModifiers();
            changeDescription(${pos});

        ">Change Description </p>
        <p class="options-row" onclick="
        
            hideModifiers();
            changeDeadline(${pos});
        
        ">Change Deadline </p>
        <button class="cancel-button" onclick="
        
            hideModifiers();
            hideOptionsMenu();
        
        ">Cancel</button>

    `;

}

//Functions for changing title, description and deadline
function changeTitle(pos){

    document.querySelector('.new-title').classList.add('title-visible');
    const content = document.querySelector('.title-visible');

    content.innerHTML = `
    
        <label for="modify-text">New text: </label>
        <input type="text" placeholder="Title" id="modify-text" onkeydown="
        
            submitNewText(event,${pos});
        
        ">
        <button class="cancel-button" onclick="
        
            hideModifiers();
        
        ">Cancel</button>
    
    `;

}

function changeDescription(pos){

    document.querySelector('.new-description').classList.add('description-visible');
    const content = document.querySelector('.description-visible');

    content.innerHTML = `
    
        <label for="modify-description">New description: </label>
        <input type="text" placeholder="Description" id="modify-description" onkeydown="
        
            submitNewDescription(event,${pos});
        
        ">
        <button class="cancel-button" onclick="
        
            hideModifiers();
        
        ">Cancel</button>
    `;
}

function changeDeadline(pos){

    document.querySelector('.new-deadline').classList.add('deadline-visible');
    const content = document.querySelector('.deadline-visible');

    content.innerHTML = `
    
        <label for="modify-date">New deadline: </label>
        <input type="date" id="modify-date" onkeydown="
        
            submitNewDeadline(event,${pos});
        
        ">
        <button class="cancel-button" onclick="
        
            hideModifiers();
        
        ">Cancel</button>
    `;

}


function submitNewText(event,pos){

    const key = event.key;
    if(key === 'Enter'){

        taskArray[pos].title = document.getElementById('modify-text').value;
        hideModifiers();
        hideOptionsMenu();
        renderTasks();

    }

}

function submitNewDescription(event,pos){
    const key = event.key;
    if(key === 'Enter'){
        taskArray[pos].description = document.getElementById('modify-description').value;
        hideModifiers();
        hideOptionsMenu();
        renderTasks();
    }
}

function submitNewDeadline(event,pos){
    const key = event.key;
    if(key === 'Enter'){
        taskArray[pos].deadline = document.getElementById('modify-date').value;
        hideModifiers();
        hideOptionsMenu();
        renderTasks();
    }
}


//Function for hiding panels
function hideAdditionPanel(){

    document.querySelector('.addition-panel-invisible').innerHTML = '';
    document.querySelector('.addition-panel-invisible').classList.remove('addition-panel');

}
function hideOptionsMenu(){
    document.querySelector('.options-button').innerHTML = '';
    document.querySelector('.options-button').classList.remove('options-button-visible');
}

function hideModifiers(){

    document.querySelector('.new-title').innerHTML = '';
    document.querySelector('.new-title').classList.remove('title-visible');

    document.querySelector('.new-description').innerHTML = '';
    document.querySelector('.new-description').classList.remove('description-visible');

    document.querySelector('.new-deadline').innerHTML = '';
    document.querySelector('.new-deadline').classList.remove('deadline-visible');
}
