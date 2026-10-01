// Ventana de advertencia que aparece al pulsar "Iniciar" (index.html)
// Solo se sale con los botones: "Seguir" (enlace a narrativa.html) o "Volver" (cierra la ventana).
// Si se intenta salir de otra forma (clic afuera o tecla Esc), la caja se sacude.
const dialogo = document.getElementById('advertencia')
const botonIniciar = document.getElementById('boton-iniciar')

if (dialogo && botonIniciar) {
    const botonVolver = dialogo.querySelector('[data-volver]')
    const animacionesAviso = ['advertencia-sacudida', 'advertencia-destello']

    // Sacude la caja para recordar que hay que elegir una opción
    const sacudir = () => {
        dialogo.classList.remove('sacudir')
        void dialogo.offsetWidth // reinicia la animación si ya estaba en curso
        dialogo.classList.add('sacudir')
    }

    dialogo.addEventListener('animationend', (evento) => {
        if (animacionesAviso.includes(evento.animationName)) {
            dialogo.classList.remove('sacudir')
        }
    })

    botonIniciar.addEventListener('click', () => {
        dialogo.classList.remove('sacudir')
        dialogo.showModal()
        document.documentElement.classList.add('modal-abierto')
    })

    // Volver: cierra la ventana y deja el index como estaba
    botonVolver.addEventListener('click', () => dialogo.close())

    // Clic en el fondo oscuro (fuera de la caja): no cierra, sacude
    dialogo.addEventListener('pointerdown', (evento) => {
        if (evento.target === dialogo) sacudir()
    })

    // Tecla Esc: tampoco cierra
    dialogo.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            evento.preventDefault()
            sacudir()
        }
    })

    // Respaldo: cualquier intento de cancelar el diálogo (p. ej. gesto "atrás" en móvil)
    dialogo.addEventListener('cancel', (evento) => {
        evento.preventDefault()
        sacudir()
    })

    // Se dispara al cerrar (solo ocurre con Volver)
    dialogo.addEventListener('close', () => {
        document.documentElement.classList.remove('modal-abierto')
    })
}