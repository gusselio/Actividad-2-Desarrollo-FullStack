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