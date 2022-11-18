// Info date
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Tasks Container
const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'long' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText; //Agarra los datos del formulario
    if(!value) return; // Evita que se agreguen tareas sin texto
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder'); // define ese div como task y roundborder
    task.addEventListener('click', changeTaskState) //cuando se hace click en la tarea, recibimos un evento
    task.textContent = value;
    //para borrar tareas
    const borrar = document.createElement('div');
    borrar.className = 'borrar'
    borrar.innerHTML = "X"
    task.appendChild(borrar)
    borrar.addEventListener('click', ()=> {
        tasksContainer.removeChild(task);
    })
    tasksContainer.prepend(task); //agrega task a la lista
    event.target.reset();
};

const changeTaskState = event => {
    event.target.classList.toggle('done'); //Si la lista de clases no tiene done se la agrega. Si la tiene, se la saca. 
};

const order = () => { //ordenar las tareas
    const done = []; //tareas hechas
    const toDo = []; //tareas por hacer
    tasksContainer.childNodes.forEach( el => { //forEach itera cada elemento adentro del task container 
        el.classList.contains('done') ? done.push(el) : toDo.push(el) //si la lista de clases del el tiene done, agrega el elemento a done, sino, a push. 
    })
    return [...toDo, ...done]; //devuelve un array (spread ...) primero del toDo y después done
}

const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el)) //itera el array y lo agrega al taskContainer
}

setDate();

new Sortable(tasksContainer, {
    animation: 300
});
