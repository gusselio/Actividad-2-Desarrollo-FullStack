// CLASE 1: Representa cada tarea individual
class Tarea {
  constructor(nombre, completada = false) {
    this.id = Date.now().toString(); // ID único basado en timestamp
    this.nombre = nombre;
    this.completada = completada;
  }

  // Método para alternar el estado de la tarea
  toggleEstado() {
    this.completada = !this.completada;
  }

  // Método para editar el contenido de la tarea
  editarNombre(nuevoNombre) {
    this.nombre = nuevoNombre;
  }
}

// CLASE 2: Gestiona la lista completa de tareas y su persistencia
class GestorDeTareas {
  constructor() {
    // Carga desde localStorage si existe, o inicializa un arreglo vacío
    this.tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  }

  // Guardar en LocalStorage
  guardarStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  // Agregar una nueva tarea
  agregarTarea(nombre) {
    const nuevaTarea = new Tarea(nombre);
    this.tareas.push(nuevaTarea);
    this.guardarStorage();
  }

  // Eliminar tarea por ID
  eliminarTarea(id) {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    this.guardarStorage();
  }

  // Cambiar estado completado/incompleto
  cambiarEstado(id) {
    const tarea = this.tareas.find(t => t.id === id);
    if (tarea) {
      tarea.toggleEstado();
      this.guardarStorage();
    }
  }

  // Editar texto de la tarea
  editarTarea(id, nuevoNombre) {
    const tarea = this.tareas.find(t => t.id === id);
    if (tarea) {
      tarea.editarNombre(nuevoNombre);
      this.guardarStorage();
    }
  }
}

// --- MANIPULACIÓN DEL DOM E INTERACCIÓN ---
const gestor = new GestorDeTareas();

// Seleccionamos elementos del DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const errorMsg = document.getElementById('errorMsg');

// Función flecha para renderizar las tareas en la interfaz
const renderizarTareas = () => {
  taskList.innerHTML = '';

  if (gestor.tareas.length === 0) {
    taskList.innerHTML = '<p style="text-align: center; color: #94a3b8; padding: 20px;">No hay tareas pendientes.</p>';
    return;
  }

  // Ciclo forEach obligatorio por la actividad
  gestor.tareas.forEach(tarea => {
    const li = document.createElement('li');
    li.className = `task-item ${tarea.completada ? 'completed' : ''}`;

    // Uso de Template Literals para generar el HTML dinámico
    li.innerHTML = `
      <div class="task-info">
        <input type="checkbox" ${tarea.completada ? 'checked' : ''} data-id="${tarea.id}" class="chk-status">
        <span>${tarea.nombre}</span>
      </div>
      <div class="task-actions">
        <button class="btn-edit" data-id="${tarea.id}">Editar</button>
        <button class="btn-delete" data-id="${tarea.id}">Eliminar</button>
      </div>
    `;

    taskList.appendChild(li);
  });
};

// Evento para Agregar Tarea con validación
const manejarAgregarTarea = () => {
  const textoTarea = taskInput.value.trim();

  // Validación de entrada vacía requerida por la rúbrica
  if (textoTarea === '') {
    errorMsg.textContent = 'Por favor, escribe el nombre de la tarea.';
    return;
  }

  errorMsg.textContent = '';
  gestor.agregarTarea(textoTarea);
  taskInput.value = '';
  renderizarTareas();
};

// Eventos mediante funciones flecha
addTaskBtn.addEventListener('click', manejarAgregarTarea);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    manejarAgregarTarea();
  }
});

// Delegación de eventos para los botones de la lista (Completar, Editar, Eliminar)
taskList.addEventListener('click', (e) => {
  const id = e.target.dataset.id;

  if (!id) return;

  // Botón Eliminar
  if (e.target.classList.contains('btn-delete')) {
    gestor.eliminarTarea(id);
    renderizarTareas();
  }

  // Botón Editar
  if (e.target.classList.contains('btn-edit')) {
    const tareaActual = gestor.tareas.find(t => t.id === id);
    const nuevoTexto = prompt('Edita el nombre de tu tarea:', tareaActual.nombre);
    
    if (nuevoTexto !== null) {
      if (nuevoTexto.trim() === '') {
        alert('El nombre de la tarea no puede estar vacío.');
        return;
      }
      gestor.editarTarea(id, nuevoTexto.trim());
      renderizarTareas();
    }
  }

  // Checkbox de Estado
  if (e.target.classList.contains('chk-status')) {
    gestor.cambiarEstado(id);
    renderizarTareas();
  }
});

// Inicializar la aplicación renderizando al cargar la página
document.addEventListener('DOMContentLoaded', renderizarTareas);