document.addEventListener('DOMContentLoaded', function () {
  let phoneNumber = '5493764692295'; // Número sin el signo "+"
  let whatsappLink = 'https://wa.me/' + phoneNumber;
  document.getElementById('whatsapp-button').setAttribute('href', whatsappLink);

  // Inicializa la gestión de terrenos con aleatorización
  gestionarTerrenosAleatorios();
});

//////////////////////////////////////////////////////////////////////////////////

function toggleMenu() {
  var menu = document.getElementById('menu');
  var whatsappButton = document.getElementById('whatsapp-button');
  var menuToggle = document.querySelector('.menu-toggle');

  if (menu) {
    var isMenuVisible = menu.classList.toggle('show-menu');
    menuToggle.classList.toggle('active');

    if (isMenuVisible) {
      whatsappButton.classList.add('whatsapp-hidden');
    } else {
      whatsappButton.classList.remove('whatsapp-hidden');
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////
function contactarPorTerreno(nombreTerreno) {
  let phoneNumber = '5493764692295'; // El mismo número que ya tienes configurado
  let mensaje = `Hola Lizza, estoy interesado/a en recibir más información sobre el ${nombreTerreno}. ¿Podrías brindarme detalles?`;

  // Codificar el mensaje para URL
  let mensajeCodificado = encodeURIComponent(mensaje);

  // Crear el enlace de WhatsApp con el mensaje predefinido
  let whatsappLink = `https://wa.me/${phoneNumber}?text=${mensajeCodificado}`;

  // Abrir WhatsApp en una nueva pestaña
  window.open(whatsappLink, '_blank');
}
//////////////////////////////////////////////////////////////////////////////////

// Función para gestionar terrenos con aleatorización
function gestionarTerrenosAleatorios() {
  // Seleccionar el contenedor principal de terrenos
  const contenedorTerrenos = document.querySelector('#terrenos-venta > div[style*="display: flex"]');

  if (contenedorTerrenos) {
    // Obtener todos los terrenos
    const todosLosTerrenos = Array.from(contenedorTerrenos.querySelectorAll('div[style*="max-width: 350px"]'));

    // Remover todos los terrenos del contenedor
    todosLosTerrenos.forEach(terreno => terreno.remove());

    // Mezclar aleatoriamente los terrenos
    shuffleArray(todosLosTerrenos);

    // Crear el contenedor para terrenos adicionales si no existe
    let terrenosAdicionales = document.getElementById('terrenos-adicionales');

    if (!terrenosAdicionales) {
      terrenosAdicionales = document.createElement('div');
      terrenosAdicionales.id = 'terrenos-adicionales';
      terrenosAdicionales.style.cssText =
        'display: none; flex-wrap: wrap; justify-content: center; gap: 30px; max-width: 1200px; margin: 30px auto 0;';

      // Insertar después del contenedor principal pero antes del botón
      const divBoton = document.querySelector('#terrenos-venta > div[style*="text-align: center"]');
      contenedorTerrenos.parentNode.insertBefore(terrenosAdicionales, divBoton);
    }

    // Distribuir los terrenos entre el contenedor principal y el adicional
    todosLosTerrenos.forEach((terreno, index) => {
      if (index < 3) {
        // Los primeros 3 van al contenedor principal
        contenedorTerrenos.appendChild(terreno);
      } else {
        // El resto va al contenedor adicional
        terrenosAdicionales.appendChild(terreno);
      }
    });

    // Configurar el botón "Ver más terrenos disponibles"
    // Solo mostrar el botón si hay terrenos adicionales
    const divBoton = document.querySelector('#terrenos-venta > div[style*="text-align: center"]');
    if (divBoton) {
      if (todosLosTerrenos.length > 3) {
        divBoton.style.display = 'block';
        configurarBotonVerMas();
      } else {
        divBoton.style.display = 'none';
      }
    }
  }
}

// Función para barajar un array (algoritmo Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Función para configurar el botón "Ver más terrenos"
function configurarBotonVerMas() {
  const botonVerMas = document.querySelector('#terrenos-venta > div[style*="text-align: center"] > a');

  if (botonVerMas) {
    // Eliminar cualquier manejador de eventos existente
    botonVerMas.removeAttribute('onclick');

    // Añadir nuevo manejador de eventos
    botonVerMas.addEventListener('click', function (e) {
      e.preventDefault();

      const terrenosAdicionales = document.getElementById('terrenos-adicionales');

      if (terrenosAdicionales) {
        const estaVisible = terrenosAdicionales.style.display !== 'none';

        if (estaVisible) {
          terrenosAdicionales.style.display = 'none';
          this.textContent = 'Ver más terrenos disponibles';
        } else {
          terrenosAdicionales.style.display = 'flex';
          this.textContent = 'Ver menos terrenos';
        }
      }
    });
  }
}
