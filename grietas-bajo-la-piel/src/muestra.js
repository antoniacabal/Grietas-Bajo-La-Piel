// Muestra del juego para el index (el juego completo está en script.js / narrativa.html)
// Indice
    // 0. Imports
    // 1. Canvas
    // 2. Escena
    // 3. Objetos
    // 4. Tamaños
    // 5. Cámara
    // 6. Controles
    // 7. Render
    // 8. Animación

// 0. Imports
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 1. Canvas
const canvas = document.querySelector('canvas.webgl')
const contenedor = canvas.parentElement

// 2. Escena
// Sin color de fondo: el canvas es transparente y toma el color de la sección (--color-escena en style.css)
const scene = new THREE.Scene()

// 3. Objetos
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "green" })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

mesh.rotation.y = Math.PI * 0.25

// 4. Tamaños (siguen al contenedor, no a la ventana)
const sizes = {
    width: contenedor.clientWidth,
    height: contenedor.clientHeight
}

// 5. Cámara
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)

camera.position.z = 4
camera.position.y = 3
camera.lookAt(mesh.position)

// 6. Controles
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const controls = new OrbitControls(camera, canvas)
controls.target.copy(mesh.position)  // siempre gira alrededor del objeto
controls.enableDamping = true        // inercia suave al soltar
controls.dampingFactor = 0.08
controls.enableRotate = true         // girar arrastrando
controls.enableZoom = true           // acercar / alejar con la rueda (o pellizco en pantallas táctiles)
controls.enablePan = false           // no se puede mover/desplazar la escena
controls.minDistance = 2.5           // zoom máximo (qué tan cerca)
controls.maxDistance = 9             // zoom mínimo (qué tan lejos)
controls.minPolarAngle = Math.PI * 0.1  // evita que se voltee por completo por arriba
controls.maxPolarAngle = Math.PI / 2    // la cámara no baja del nivel del objeto: no se ve la parte de abajo

// Giro automático natural: la cámara orbita sola alrededor del objeto
controls.autoRotate = !sinMovimiento
controls.autoRotateSpeed = 2         // más alto = más rápido (2 ≈ una vuelta cada 30 s)

// Mientras la persona interactúa se pausa el giro automático;
// 2 segundos después de soltar, vuelve a girar solo
let temporizadorGiro = null

controls.addEventListener('start', () =>
{
    clearTimeout(temporizadorGiro)
    controls.autoRotate = false
    canvas.style.cursor = 'grabbing'
})

controls.addEventListener('end', () =>
{
    canvas.style.cursor = 'grab'
    if (sinMovimiento) return
    temporizadorGiro = setTimeout(() => { controls.autoRotate = true }, 2000)
})

canvas.style.cursor = 'grab'

// 7. Render
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width, sizes.height, false) // false: el tamaño visual lo controla el CSS

const resizeObserver = new ResizeObserver(() =>
{
    sizes.width = contenedor.clientWidth
    sizes.height = contenedor.clientHeight

    if (sizes.width === 0 || sizes.height === 0) return

    // Actualizar Camara
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Actualizar renderizador
    renderer.setSize(sizes.width, sizes.height, false)
})
resizeObserver.observe(contenedor)

// 8. Animación
const tick = () =>
{
    // Necesario para el amortiguado (damping) y el giro automático
    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()