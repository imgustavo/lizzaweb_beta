document.addEventListener('DOMContentLoaded', function () {
  let phoneNumber = '5493764692295'; // Número sin el signo "+"
  let whatsappLink = 'https://wa.me/' + phoneNumber;
  document.getElementById('whatsapp-button').setAttribute('href', whatsappLink);

  // Inicializa la gestión de terrenos
  gestionarTerrenos();
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

// Nueva función para gestionar los terrenos
function gestionarTerrenos() {
  // Seleccionar el contenedor principal de terrenos
  const contenedorTerrenos = document.querySelector('#terrenos-venta > div[style*="display: flex"]');

  if (contenedorTerrenos) {
    // Obtener todos los terrenos
    const todosLosTerrenos = Array.from(contenedorTerrenos.querySelectorAll('div[style*="max-width: 350px"]'));

    // Si hay más de 3 terrenos, crear el contenedor para los adicionales
    if (todosLosTerrenos.length > 3) {
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

      // Dejar solo los primeros 3 terrenos en el contenedor principal
      // y mover el resto al contenedor de terrenos adicionales
      todosLosTerrenos.forEach((terreno, index) => {
        if (index >= 3) {
          terreno.remove();
          terrenosAdicionales.appendChild(terreno);
        }
      });

      // Configurar el botón "Ver más terrenos disponibles"
      configurarBotonVerMas();
    }
  }
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

// Función para ordenar aleatoriamente los terrenos (opcional)
function randomizarTerrenos() {
  // Seleccionar el contenedor principal de terrenos
  const contenedorTerrenos = document.querySelector('#terrenos-venta > div[style*="display: flex"]');
  const terrenosAdicionales = document.getElementById('terrenos-adicionales');

  if (contenedorTerrenos) {
    // Seleccionar todos los terrenos (principales y adicionales)
    const todosLosTerrenos = [
      ...Array.from(contenedorTerrenos.querySelectorAll('div[style*="max-width: 350px"]')),
      ...(terrenosAdicionales ? Array.from(terrenosAdicionales.querySelectorAll('div[style*="max-width: 350px"]')) : []),
    ];

    // Remover todos los terrenos
    todosLosTerrenos.forEach(terreno => terreno.remove());

    // Mezclar aleatoriamente
    for (let i = todosLosTerrenos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [todosLosTerrenos[i], todosLosTerrenos[j]] = [todosLosTerrenos[j], todosLosTerrenos[i]];
    }

    // Colocar los primeros 3 en el contenedor principal
    for (let i = 0; i < Math.min(3, todosLosTerrenos.length); i++) {
      contenedorTerrenos.appendChild(todosLosTerrenos[i]);
    }

    // Colocar el resto en terrenos adicionales
    if (terrenosAdicionales && todosLosTerrenos.length > 3) {
      for (let i = 3; i < todosLosTerrenos.length; i++) {
        terrenosAdicionales.appendChild(todosLosTerrenos[i]);
      }
    }
  }
}
