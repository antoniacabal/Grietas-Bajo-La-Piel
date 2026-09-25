// Indice
    // 0. Imports
    // 1. Debugging
    // 2. Canvas
    // 3. Escena
    // 4. Texturas
    // 5. Luces
    // 6. Objetos
    // 7. Grupos
    // 8. Tamaño
    // 9. Cámara
    // 10. Controles
    // 11. Render
    // 12. Animación


// 0. Imports
import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// 1. Debugging

// 2. Canvas
const canvas = document.querySelector('canvas.webgl')


// 3. Escena
const scene = new THREE.Scene()
    
    // Background
    const fondo = { color: '#000000' }
    scene.background = new THREE.Color(fondo.color)

// 4. Texturas

// 5. Luces

// 6. Objetos
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "green"})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

mesh.rotation.y = Math.PI * 0.25

// 7. Grupos

// 8. Tamaños
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Actualizar tamaños
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Actualizar Camara
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Actualizar renderizador
    renderer.setSize(sizes.width, sizes.height)
})

// 9. Cámara
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)

camera.position.z = 4
camera.position.y = 3
camera.lookAt (mesh.position)

// 10. Controles

// 11. Render
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// 12. Animaciones
    // Reloj
    const clock = new THREE.Clock()

const tick = () =>
{
    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()