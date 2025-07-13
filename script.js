// script.js completo para Mapa Curricular Interactivo LPA

const materias = [
  // --- Trimestre I ---
  { id: 'prec', nombre: 'Precálculo', clave: '2130045', trimestre: 1, creditos: '10 (4T / 2P)', tipo: 'Formación básica', requisitos: [] },
  { id: 'quimg', nombre: 'Química General', clave: '2300034', trimestre: 1, creditos: '12 (6T / 0P)', tipo: 'Formación básica', requisitos: [] },
  { id: 'biog', nombre: 'Biología General', clave: '2300036', trimestre: 1, creditos: '10 (4T / 2P)', tipo: 'Formación básica', requisitos: [] },
  { id: 'metodo', nombre: 'Método Científico Experimental', clave: '2300038', trimestre: 1, creditos: '7 (2T / 3P)', tipo: 'Tronco general', requisitos: [] },
  { id: 'ingles1', nombre: 'Inglés I', clave: '2255064', trimestre: 1, creditos: '10 (4T / 2P)', tipo: 'Lengua extranjera', requisitos: [] },

  // --- Trimestre II ---
  { id: 'calculo', nombre: 'Cálculo Diferencial', clave: '2130046', trimestre: 2, creditos: '10 (4T / 2P)', tipo: 'Formación básica', requisitos: ['prec'] },
  { id: 'quimo', nombre: 'Química Orgánica I', clave: '2300042', trimestre: 2, creditos: '15 (6T / 3P)', tipo: 'Formación básica', requisitos: ['quimg'] },
  { id: 'bioetica', nombre: 'Bioética', clave: '2300039', trimestre: 2, creditos: '8 (4T / 0P)', tipo: 'Formación básica', requisitos: [] },
  { id: 'origen', nombre: 'Origen y domesticación de las especies', clave: '2321050', trimestre: 2, creditos: '8 (4T / 0P)', tipo: 'Tronco general', requisitos: [] },
  { id: 'ingles2', nombre: 'Inglés II', clave: '2255065', trimestre: 2, creditos: '10 (4T / 2P)', tipo: 'Lengua extranjera', requisitos: ['ingles1'] },

  // --- Trimestre III ---
  { id: 'morfo', nombre: 'Morfofisiología del Animal Productivo', clave: '2321056', trimestre: 3, creditos: '8 (4T / 0P)', tipo: 'Formación profesional', requisitos: ['biog'] },
  { id: 'bioqbas', nombre: 'Bioquímica Básica', clave: '23210041', trimestre: 3, creditos: '11 (4T / 3P)', tipo: 'Formación profesional', requisitos: ['quimo'] },
  { id: 'biocel', nombre: 'Biología Celular', clave: '2300040', trimestre: 3, creditos: '11 (4T / 3P)', tipo: 'Formación básica', requisitos: ['biog'] },
  { id: 'pp1', nombre: 'Práctica Pecuaria I', clave: '2321053', trimestre: 3, creditos: '5 (0T / 5P)', tipo: 'Área de integración', requisitos: [] },
  { id: 'ingles3', nombre: 'Inglés III', clave: '2255066', trimestre: 3, creditos: '10 (4T / 2P)', tipo: 'Lengua extranjera', requisitos: ['ingles2'] },

  // --- Trimestre IV ---
  { id: 'bioqmet', nombre: 'Bioquímica Metabólica Animal', clave: '2321113', trimestre: 4, creditos: '8 (4T / 0P)', tipo: 'Formación profesional', requisitos: ['bioqbas'] },
  { id: 'fisio', nombre: 'Fisiología Animal', clave: '2321102', trimestre: 4, creditos: '8 (4T / 0P)', tipo: 'Formación profesional', requisitos: ['morfo'] },
  { id: 'diversidad', nombre: 'Diversidad genética y ecotipos', clave: '2321071', trimestre: 4, creditos: '8 (4T / 0P)', tipo: 'Formación profesional', requisitos: ['biocel'] },
  { id: 'pp2', nombre: 'Práctica Pecuaria II', clave: '2321057', trimestre: 4, creditos: '5 (0T / 5P)', tipo: 'Área de integración', requisitos: ['pp1'] },

  // Continúan los trimestres V a XII…
];

let estado = JSON.parse(localStorage.getItem('estadoMaterias')) || {};

function renderMaterias() {
  const contenedor = document.getElementById('trimestres');
  contenedor.innerHTML = '';

  for (let t = 1; t <= 12; t++) {
    const bloque = document.createElement('div');
    bloque.classList.add('trimestre');
    bloque.innerHTML = `<h2>Trimestre ${t}</h2>`;

    const materiasT = materias.filter(m => m.trimestre === t);
    materiasT.forEach(m => {
      const matDiv = document.createElement('div');
      matDiv.className = 'materia';
      matDiv.textContent = m.nombre;

      const completada = estado[m.id] === true;
      const bloqueada = m.requisitos.some(req => !estado[req]);

      if (completada) matDiv.classList.add('completada');
      else if (bloqueada) matDiv.classList.add('bloqueada');

      matDiv.onclick = () => {
        if (bloqueada) return;
        estado[m.id] = !completada;
        localStorage.setItem('estadoMaterias', JSON.stringify(estado));
        mostrarInfo(m);
        renderMaterias();
        checkTrimestre(t);
      };

      bloque.appendChild(matDiv);
    });

    contenedor.appendChild(bloque);
  }
}

function mostrarInfo(materia) {
  document.getElementById('info').innerHTML = `
    <h3>${materia.nombre}</h3>
    <p><strong>Clave:</strong> ${materia.clave}</p>
    <p><strong>Créditos:</strong> ${materia.creditos}</p>
    <p><strong>Tipo:</strong> ${materia.tipo}</p>
    <p><strong>Requiere:</strong> ${materia.requisitos.length ? materia.requisitos.join(', ') : 'Ninguno'}</p>
  `;
}

function checkTrimestre(t) {
  const materiasT = materias.filter(m => m.trimestre === t);
  if (materiasT.every(m => estado[m.id])) {
    alert(`🎉 ¡Felicidades! Has completado el trimestre ${t}`);
  }
}

renderMaterias();
