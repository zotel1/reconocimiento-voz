// Seleccionamos los elementos del documento html, como la salida y el microfono
const salida = document.querySelector('.out');
const microfono = document.querySelector('.in');

// Creamos el evento click para el microfono
microfono.addEventListener('click', ejecutar);

// Creamos la función ejecutar
function ejecutar() {
    // Creamos la constante reconocimiento y le asignamos la API webkitSpeechRecognition
    const reconocimiento = new webkitSpeechRecognition();

    // Comenzamos el reconocimiento
    reconocimiento.start();

    // Función que se ejecuta cuando se inicia el reconocimiento
    reconocimiento.onstart = function () {
        // Asignamos la clase mostrar al elemento salida
        salida.classList.add('mostrar');
        // Asignamos el texto a mostrar en el elemento salida
        salida.textContent = 'Escuchando...';
    };

    // Función que se ejecuta cuando se deja de grabar
    reconocimiento.onspeechend = function () {
        // Asignamos el texto a mostrar en el elemento salida
        salida.textContent = 'Se dejó de grabar';
        // Detenemos el reconocimiento
        reconocimiento.stop();
    };

    // Función que se ejecuta cuando se obtienen resultados
    reconocimiento.onresult = function (e) {
        console.log(e.results[0][0]);

        // Destructuramos el objeto e.results[0][0] y obtenemos el transcript y el confidence
        const { transcript, confidence } = e.results[0][0];

        // Creamos un elemento p y le asignamos el texto a mostrar
        const texto = document.createElement('p');
        texto.innerHTML = `Grabado: ${transcript}`;

        // Creamos otro elemento p y le asignamos el texto a mostrar
        const fiabilidad = document.createElement('p');
        fiabilidad.innerHTML = `Fiabilidad del ${parseInt(confidence * 100)}%`;

        // Agregamos los elementos p al elemento salida
        salida.appendChild(texto);
        salida.appendChild(fiabilidad);
    }
}
