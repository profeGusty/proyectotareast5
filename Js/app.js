const title_task = document.getElementById("title_task");
const conte_list__task = document.getElementById("conte_list__task");
let ArrayTareas = localStorage.getItem('tareas') === null ? [] : JSON.parse(localStorage.getItem('tareas'))

document.addEventListener("click", (e) => { //recibe el evento click en la pantalla "e"
  e.preventDefault(); //para que no se recargue el formulario
  agregarTarea(e); // agregar una tarea nueva
  borrarTarea(e);// borrar tarea 
  //editarTarea(e);// editar tarea
});

//guardamos el Array de tareas en el local Storage 
const guardarTarea = () => {
  //guardamos el contenido del ArrayTask en el localStorage con el identificador Task
  localStorage.setItem('tareas', JSON.stringify(ArrayTareas))
}

//funcion flecha para agregar una tarea nueva "recibe el evento click en la pantalla "e""
const agregarTarea = (e) => {
  //SI se hizo click en la pantalla en el componente que tiene como clase ....
  if (e.target.classList.contains("register_task")) {
     //creamos un nuevo objeto tarea con lo que esta contenido en el input
    const tarea = { id: Date.now(),
                   title: title_task.value, };
    //si el contenido del input es distinto de vacio
    if (title_task.value !== '') {
      //a nuestro array de tareas lo igualamos con el contenido del array mas el nuevo elemento
      ArrayTareas = [...ArrayTareas, tarea]
      //lamamos a la funcion guardar tarea en el localStorage
      guardarTarea();
      //dejamos en blanco el contenido del input text
      title_task.value = "";

      listaTareas();
      // swal(
      //   'Se Registro Correctamente!',
      //   '',
      //   'success'
      // )
      // return;
    }
    // swal(
    //   'Error Campos Vacios!',
    //   '',
    //   'error'
    // )
  }
};

let state = true;

//creamos una funcion flecha para llenar el contenedor de tareas con las
//tareas que estan dentro de Array Task
const listaTareas = () => {
  //primero dejamos el contenedor vacio
  conte_list__task.innerHTML = "";
  //SI dentro de LocalStorage ay alguna tarea dentro de nuestro identificador 
  if (JSON.parse(localStorage.getItem('tareas'))) {
    //utilizamos map para recorrer cada uno de los elementos u objetos
    //que estan dentro de nuestro array con el nombre ITEM
    JSON.parse(localStorage.getItem('tareas')).map(
      (item) =>
      //para cada una de las tareas creamos un div dentro del contenedor
      (conte_list__task.innerHTML += `
      <div class="tasks flex">
        <span class="">${item.title}</span>
        <div class="conte_buttons">
        <span class="fas fa-trash-alt delete " data-id=${item.id}></span>
        </div>
        </div>
        `)
        )
        //sino mostramos un mensaje en consola o pantalla 
        //<span class="edit fas fa-edit" data-id=${item.id}></span>
  } else {
    console.log('no hay datos para mostrar pe :S')
  }
};
//llamamos a la funcion para mostrar las tareas
listaTareas();

//Creamos una funcion para borrar una tarea,recibe el evento click
const borrarTarea = (e) => {
  //creamos una variable para guardar el id del elemento al que se le hizo click
  // tomamos este dato de "data-id" con el id del elemento que lo insertamos
  // cuando creamos el elemento en la funcion listTask
  let idTask = e.target.dataset.id
  //prefuntamos si se hizo click dentro del contenedor en el elemento
  //con la clase "delete"
  if (e.target.classList.contains("delete")) {
    //creamos una nueva variable donde vamos a guardar un nuevo array
    //pero filtrado, guarda solo las tareas que tienen un id distinto al 
    // del que tenemos guardado en la variable "idTask"
    const nuevaTarea = ArrayTareas.filter(task => task.id !== Number(idTask))
    //una vez filtrado y creado nuestro nuevo array sin el elemento que 
    //acavamos de sacar, igualamos nuestro Array principal con el nuevo
    //de esta manera no incluimos el elemento al que desamos borrar
    ArrayTareas = nuevaTarea
    //actualizamos el contenido de nuestro LocalStorage
    guardarTarea();
    //volvemos a llenar el contenedor con la nueva lista
    listaTareas();

    // swal(
    //   'Se Elimino Correctamente!',
    //   '',
    //   'success'
    // )
    // return;
  }
};

// const EdiTask = (e) => {
//   let idTask = e.target.dataset.id
//   if (e.target.classList.contains("edit")) {
//     if (title_task.value !== '') {
//       const newTask = { id: Date.now(), title: title_task.value, };
//       const ediTask = ArrayTask.map(task => task.id === Number(idTask) ? newTask : task)
//       ArrayTask = ediTask
//       SaveTask();
//       ListTask();
//       title_task.value = ''
//       swal(
//         'Editado Correctamente!',
//         '',
//         'success'
//       )
//       return;
//     }
//     swal(
//       'Error Campos Vacio!',
//       '',
//       'error'
//     )
//   }
// }


