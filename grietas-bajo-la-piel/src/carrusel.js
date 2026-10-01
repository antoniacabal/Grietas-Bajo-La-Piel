// Carrusel del proceso de personaje (contexto.html)
(function () {
    const carrusel = document.querySelector('.carrusel');
    if (!carrusel) return;

    const pista = carrusel.querySelector('.carrusel-pista');
    const slides = Array.from(carrusel.querySelectorAll('.carrusel-slide'));
    const anterior = carrusel.querySelector('.carrusel-boton--anterior');
    const siguiente = carrusel.querySelector('.carrusel-boton--siguiente');
    const contenedorPuntos = carrusel.querySelector('.carrusel-puntos');

    // Fondo difuminado: copia la ruta de cada imagen a la variable CSS --fondo
    slides.forEach((slide) => {
        const img = slide.querySelector('img');
        const src = img && img.getAttribute('src');
        if (src) slide.style.setProperty('--fondo', 'url("' + src + '")');
    });

    // Puntos de navegación (uno por slide)
    const puntos = slides.map((slide, i) => {
        const punto = document.createElement('button');
        punto.type = 'button';
        punto.className = 'carrusel-punto';
        punto.setAttribute('aria-label', 'Ir a la imagen ' + (i + 1));
        punto.addEventListener('click', () => irA(i));
        contenedorPuntos.appendChild(punto);
        return punto;
    });

    let actual = 0;

    function irA(indice) {
        // Carrusel circular: pasar de la última a la primera (y al revés)
        const total = slides.length;
        const destino = ((indice % total) + total) % total;
        pista.scrollTo({ left: slides[destino].offsetLeft, behavior: 'smooth' });
    }

    function actualizar() {
        actual = Math.round(pista.scrollLeft / pista.clientWidth);
        puntos.forEach((p, i) => p.setAttribute('aria-current', i === actual ? 'true' : 'false'));
    }

    anterior.addEventListener('click', () => irA(actual - 1));
    siguiente.addEventListener('click', () => irA(actual + 1));
    pista.addEventListener('scroll', actualizar, { passive: true });
    window.addEventListener('resize', () => irA(actual));

    // Flechas del teclado cuando la pista tiene el foco
    pista.tabIndex = 0;
    pista.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); irA(actual - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); irA(actual + 1); }
    });

    actualizar();
})();