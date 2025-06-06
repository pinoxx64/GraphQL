import { postTablero, darDueno, hacerTurno } from "../../conections/tableroAPI.js";

document.addEventListener('DOMContentLoaded', () => {
  const crearPartidaBtn = document.getElementById('crear-partida-btn');
  const seleccionarCasillaBtn = document.getElementById('seleccionar-casilla-btn');
  const jugarTurnoBtn = document.getElementById('jugar-turno-btn');

  // Contenedor para mostrar el tablero
  let tableroContainer = document.createElement('div');
  tableroContainer.id = 'tablero-container';
  document.body.appendChild(tableroContainer);

  // Contenedor para mostrar el mensaje del turno
  let messageContainer = document.createElement('div');
  messageContainer.id = 'message-container';
  messageContainer.style.marginTop = '16px';
  document.body.appendChild(messageContainer);

  // Crear partida
  crearPartidaBtn.addEventListener('click', async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      alert('No hay usuario autenticado.');
      return;
    }
    const tableroId = crypto.randomUUID();
    const body = {
      id: tableroId,
      idUsuario: userId
    };
    sessionStorage.setItem('tableroId', tableroId);
    console.log(body)
    const resultado = await postTablero(body);
    if (resultado && resultado.casillas) {
      mostrarTablero(resultado.casillas);
      messageContainer.textContent = '';
    }
  });

  // Seleccionar casilla
  seleccionarCasillaBtn.addEventListener('click', async () => {
    const fila = parseInt(document.getElementById('fila').value, 10);
    const columna = parseInt(document.getElementById('columna').value, 10);
    const tableroId = sessionStorage.getItem('tableroId');
    // Posición en array lineal
    const posicion = fila * 4 + columna;
    const body = {
      id: tableroId,
      posicion
    };
    const resultado = await darDueno(body);
    if (resultado && resultado.tablero && resultado.tablero.casillas) {
      mostrarTablero(resultado.tablero.casillas);
      messageContainer.textContent = '';
    }
  });

  // Jugar turno
  jugarTurnoBtn.addEventListener('click', async () => {
    const tableroId = sessionStorage.getItem('tableroId');
    if (!tableroId) {
      alert('No hay partida creada.');
      return;
    }
    const body = {
      id: tableroId
    };
    const resultado = await hacerTurno(body);
    if (resultado && resultado.tablero && resultado.tablero.casillas) {
      mostrarTablero(resultado.tablero.casillas);
      messageContainer.textContent = resultado.message || '';
    }
  });

  // Función para mostrar el tablero como matriz 3x4
  function mostrarTablero(casillas) {
    tableroContainer.innerHTML = '<h3>Tablero actual</h3>';
    const tabla = document.createElement('table');
    tabla.style.borderCollapse = 'collapse';
    for (let i = 0; i < 3; i++) {
      const fila = document.createElement('tr');
      for (let j = 0; j < 4; j++) {
        const idx = i * 4 + j;
        const casilla = casillas[idx];
        const celda = document.createElement('td');
        celda.style.border = '1px solid #333';
        celda.style.padding = '8px';
        celda.innerHTML = `
          <strong>Material:</strong> ${casilla.material}<br>
          <strong>Número:</strong> ${casilla.numero}<br>
          <strong>Cantidad:</strong> ${casilla.cantidad}<br>
          <strong>Propietario:</strong> ${casilla.propietario}
        `;
        fila.appendChild(celda);
      }
      tabla.appendChild(fila);
    }
    tableroContainer.appendChild(tabla);
  }
});