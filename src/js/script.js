// Seleccionamos los elementos del documento html, como la salida y el microfono
const salida = document.querySelector('.out');
const microfono = document.querySelector('.in');

// Creamos el evento click para el microfono
microfono.addEventListener('click', ejecutar);

// Creamos la función ejecutar
function ejecutar() {
    // Creamos la constante reconocimiento y le asignamos la API webkitSpeechRecognition
    const reconocimiento = new webkitSpeechRecognition();

    // Configuramos el reconocimiento para capturar solo un resultado continuo
    reconocimiento.interimResults = false;

    // Comenzamos el reconocimiento
    reconocimiento.start();

    // Función que se ejecuta cuando se inicia el reconocimiento
    reconocimiento.onstart = function () {
        salida.classList.add('mostrar');
        salida.textContent = 'Escuchando...';
    };

    // Función que se ejecuta cuando se deja de grabar
    reconocimiento.onspeechend = function () {
        salida.textContent = 'Se dejó de grabar';
        reconocimiento.stop();
    };

    // Función que se ejecuta cuando se obtienen resultados
    reconocimiento.onresult = function (e) {
        console.log(e.results[0][0]);

        const { transcript, confidence } = e.results[0][0];

        // Usamos una expresión regular para filtrar números
        const numeros = transcript.match(/\d+/g);

        // Limpiamos la salida anterior
        salida.innerHTML = '';

        if (numeros) {
            // Si se encontraron números, los mostramos
            numeros.forEach(numero => {
                const texto = document.createElement('p');
                texto.innerHTML = `Número detectado: ${numero}`;
                salida.appendChild(texto);
            });

            const fiabilidad = document.createElement('p');
            fiabilidad.innerHTML = `Fiabilidad del ${parseInt(confidence * 100)}%`;
            salida.appendChild(fiabilidad);
        } else {
            // Si no se encontraron números, mostramos un mensaje
            const texto = document.createElement('p');
            texto.innerHTML = `No se detectaron números.`;
            salida.appendChild(texto);
        }
    };

    // Manejo de errores
    reconocimiento.onerror = function (event) {
        salida.textContent = `Error en el reconocimiento: ${event.error}`;
    };
}
