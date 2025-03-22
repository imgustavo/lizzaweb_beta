document.addEventListener('DOMContentLoaded', function () {
  let phoneNumber = '5493764692295'; // Número sin el signo "+"
  let whatsappLink = 'https://wa.me/' + phoneNumber;
  document.getElementById('whatsapp-button').setAttribute('href', whatsappLink);
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

// Función para ordenar aleatoriamente los terrenos
function randomizarTerrenos() {
  // Seleccionar el contenedor principal de terrenos
  const contenedorTerrenos = document.querySelector('#terrenos-venta > div[style*="display: flex"]');

  if (contenedorTerrenos) {
    // Seleccionar todos los divs de terrenos (los que tienen max-width: 350px)
    const terrenos = Array.from(contenedorTerrenos.querySelectorAll('div[style*="max-width: 350px"]'));

    // Remover los terrenos del DOM
    terrenos.forEach(terreno => terreno.remove());

    // Mezclar el array de terrenos aleatoriamente
    for (let i = terrenos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [terrenos[i], terrenos[j]] = [terrenos[j], terrenos[i]];
    }

    // Insertar los terrenos mezclados de vuelta en el contenedor
    terrenos.forEach(terreno => {
      contenedorTerrenos.appendChild(terreno);
    });
  }

  // También mezclar los terrenos adicionales si existen
  const contenedorTerrenosAdicionales = document.getElementById('terrenos-adicionales');
  if (contenedorTerrenosAdicionales) {
    const terrenosAdicionales = Array.from(contenedorTerrenosAdicionales.querySelectorAll('div[style*="max-width: 350px"]'));

    // Remover los terrenos adicionales del DOM
    terrenosAdicionales.forEach(terreno => terreno.remove());

    // Mezclar el array de terrenos adicionales aleatoriamente
    for (let i = terrenosAdicionales.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [terrenosAdicionales[i], terrenosAdicionales[j]] = [terrenosAdicionales[j], terrenosAdicionales[i]];
    }

    // Insertar los terrenos adicionales mezclados de vuelta en su contenedor
    terrenosAdicionales.forEach(terreno => {
      contenedorTerrenosAdicionales.appendChild(terreno);
    });
  }
}

// Modificar la función del enlace "Ver más terrenos disponibles"
function modificarEnlaceVerMas() {
  // Añadir un contenedor para terrenos adicionales si no existe
  const seccionTerrenos = document.getElementById('terrenos-venta');
  const contenedorPrincipal = seccionTerrenos.querySelector('div[style*="display: flex"]');

  if (!document.getElementById('terrenos-adicionales')) {
    // Crear el contenedor para terrenos adicionales
    const terrenosAdicionales = document.createElement('div');
    terrenosAdicionales.id = 'terrenos-adicionales';
    terrenosAdicionales.style.cssText =
      'display: none; flex-wrap: wrap; justify-content: center; gap: 30px; max-width: 1200px; margin: 30px auto 0;';

    // Insertar el contenedor de terrenos adicionales después del contenedor principal
    contenedorPrincipal.parentNode.insertBefore(
      terrenosAdicionales,
      document.querySelector('#terrenos-venta > div[style*="text-align: center"]')
    );
  }

  // Modificar el enlace existente
  const enlaceVerMas = document.querySelector('#terrenos-venta a[style*="display: inline-block"]');
  if (enlaceVerMas) {
    // Eliminar el onclick existente
    enlaceVerMas.removeAttribute('onclick');

    // Añadir nuevo manejador de eventos
    enlaceVerMas.addEventListener('click', function (e) {
      e.preventDefault();

      const terrenosAdicionales = document.getElementById('terrenos-adicionales');
      if (terrenosAdicionales) {
        const estaVisible = terrenosAdicionales.style.display !== 'none';

        // Cambiar la visibilidad y el texto del enlace
        if (estaVisible) {
          terrenosAdicionales.style.display = 'none';
          this.textContent = 'Ver más terrenos disponibles';
        } else {
          // Limpiar cualquier mensaje existente antes de mostrar el contenedor
          const mensajesExistentes = terrenosAdicionales.querySelectorAll('p[style*="text-align: center"]');
          mensajesExistentes.forEach(mensaje => mensaje.remove());

          terrenosAdicionales.style.display = 'flex';
          this.textContent = 'Ver menos terrenos';

          // Comprobar si hay terrenos adicionales
          const hayTerrenosAdicionales = terrenosAdicionales.querySelectorAll('div[style*="max-width: 350px"]').length > 0;

          // Si no hay terrenos adicionales, mostrar un mensaje
          if (!hayTerrenosAdicionales) {
            const mensaje = document.createElement('p');
            mensaje.style.cssText = 'text-align: center; width: 100%; padding: 20px; color: #00438f; font-size: 18px;';
            mensaje.textContent = 'No hay terrenos adicionales disponibles en este momento.';
            terrenosAdicionales.appendChild(mensaje);
          }
        }
      }
    });
  }
}

// Inicializar todo cuando la página se cargue
document.addEventListener('DOMContentLoaded', function () {
  randomizarTerrenos(); // La función que creamos antes
  modificarEnlaceVerMas();
});
