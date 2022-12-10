const preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//esto va a leer si está seteado en modo oscuro el sistema operativo del usuario
const slider = document.getElementById("slider");

const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme",theme);
    localStorage.setItem("theme",theme)
}

slider.addEventListener("click", () => {
    let switchToTheme  = localStorage.getItem("theme") === "dark" ? "light" : "dark";
    setTheme(switchToTheme);
}); //Si el usuario está usando dark, se cambia a light, y viceversa

setTheme(localStorage.getItem("theme") || preferedColorScheme);


// Info Fecha
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'long' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const tasksContainer = document.getElementById('tasksContainer');

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if(!value) return; // Evita que se agreguen tareas sin texto
    const task = document.createElement('div'); 
    task.classList.add('task', 'roundBorder');
    task.addEventListener('click', changeTaskState) //para cambiar de tasks por hacer a hechas ("done")
    task.textContent = value;
    const borrar = document.createElement('div'); 
    borrar.className = 'borrar'
    borrar.innerHTML = "X"
    task.appendChild(borrar) // "X" que permite borrar tareas
    borrar.addEventListener('click', ()=> {tasksContainer.removeChild(task);}) //borra task de la lista
    tasksContainer.prepend(task); //agrega task a la lista
    event.target.reset(); 
};

const changeTaskState = event => {
    event.target.classList.toggle('done'); //toggle: agrega o saca "done" de la lista de clases
};

//ordenar las tareas
const order = () => {
    const done = []; //tareas hechas
    const toDo = []; //tareas por hacer
    tasksContainer.childNodes.forEach( elemento => { //forEach itera cada elemento adentro del task container 
        elemento.classList.contains('done') ? done.push(elemento) : toDo.push(elemento) //si la lista de clases del elemento tiene "done", agrega el elemento a done. Si no, a toDo. 
    })
    return [...toDo, ...done]; //devuelve un array (spread ...) primero del toDo y después done
}

const renderOrderedTasks = () => {
    order().forEach(elemento => tasksContainer.appendChild(elemento)) //itera el array y lo agrega al taskContainer
}

setDate();