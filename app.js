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