// Se seleccionan los elementos del documento html, como la salida y el microfono
const salida = document.querySelector('.out');
const microfono = document.querySelector('.in');

// Creamos el evento click para el microfono
microfono.addEventListener('click', ejecutar);

// Creamos la funcion ejecutar

function ejecutar() {
    // creamos la constante reconocimientoVoz y le asignamos la API webkitSpeechRecognition
    const reconocimientoVoz = new webkitSpeechRecognition();

    // creamos la constante reconocimiento y le asignamos la constante reconocimientoVoz
    const reconocimiento = reconocimientoVoz();

    // Comenzamos el reconocimiento
    reconocimiento.start();

    // Creamos la funcion reconocimiento que se ejecuta cuando se inicia el reconocimiento
    reconocimiento.onstart = function() {
        // Asignamos la clase mostrar al elemento salida
        salida.classList.add('mostrar');
        // Asignamos el texto a mostrar en el elemento salida
        salida.textContent = 'Escuchando...';
    };

    // Creamos la funcion reconocimiento que se ejecuta cuando se deja de grabar
    reconocimiento.onspeechend = function() {
        // Asignamos el texto a mostrar en el elemento salida
        salida.textContent = 'Se dejo de grabar';
        // Detenemos el reconocimiento
        reconocimiento.stop();
    };

    // Creamos la funcion reconocimiento que se ejecuta cuando se deja de grabar
    reconocimiento.onresult = function(e) {
        console.log(e.results[0][0]);

        // Destructuramos el objeto e.results[0][0] y obtenemos el transcript y el confidence
        const{ transcript, confidence } = e.results[0][0];

        // Creamos un elemento p y le asignamos el texto a mostrar
        const texto = document.createElement('p');

        // Asignamos el texto a mostrar en el elemento p
        texto.innerHTML = `Grabado: ${transcript}`;

        // Creamos otro elemento p y le asignamos el texto a mostrar
        const fiabilidad = document.createElement('p');

        // Asignamos el texto a mostrar en el elemento p
        fiabilidad.innerHTML = `Fiabilidad del ${parseInt (confidence*100)}%`

        // Agregamos los elementos p al elemento salida
        salida.appendChild(texto);
        salida.appendChild(fiabilidad);
    }
}