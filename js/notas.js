window.addEventListener('load', function() {
    var user = JSON.parse(localStorage.getItem('usuario'));

    if (!user || !user.login) {
        window.location.href = '../index.html';
        return;
    }

    document.getElementById('codigo-estudiante').textContent = user.codigo;
    document.getElementById('nombre-estudiante').textContent = user.nombre;

    var api = `https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/students/${user.codigo}/notas`;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            if (data.notas && data.notas.length > 0) {
                var tbody = document.querySelector('tbody');

                data.notas.forEach(nota => {
                    var row = document.createElement('tr');
                    var asignaturaCell = document.createElement('td');
                    var creditosCell = document.createElement('td');
                    var n1Cell = document.createElement('td');
                    var n2Cell = document.createElement('td');
                    var n3Cell = document.createElement('td');
                    var exCell = document.createElement('td');
                    var defCell = document.createElement('td');

                    asignaturaCell.textContent = nota.asignatura;
                    creditosCell.textContent = nota.creditos;
                    n1Cell.textContent = nota.n1;
                    n2Cell.textContent = nota.n2;
                    n3Cell.textContent = nota.n3;
                    exCell.textContent = nota.ex;
                    defCell.textContent = ((parseFloat(nota.n1) + parseFloat(nota.n2) + parseFloat(nota.n3) + parseFloat(nota.ex)) / 4).toFixed(2); // calculo de las definitivas

                    row.appendChild(asignaturaCell);
                    row.appendChild(creditosCell);
                    row.appendChild(n1Cell);
                    row.appendChild(n2Cell);
                    row.appendChild(n3Cell);
                    row.appendChild(exCell);
                    row.appendChild(defCell);
                    tbody.appendChild(row);

                    document.getElementById('promedio-estudiante').textContent = promedio(nota.n1, nota.n2, nota.n3, nota.ex).toFixed(2); //calculo del promedio
                });
            } else {
                console.log('No hay notas disponibles para mostrar.');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API:', error);
        });
});

document.querySelector('.btn-logout').addEventListener('click', function() {
    localStorage.clear();
    window.location.href = '../index.html';
});

function promedio (n1, n2, n3, ex) {
    return (((parseFloat(n1) + parseFloat(n2) + parseFloat(n3)) / 3) * 0.7) + (parseFloat(ex) * 0.3);
}

function promedioPonderado (def1, cre1, def2, cre2, def3, cre3, def4, cre4, def5, cre5) {
    return ((def1 * cre1) + (def2 * cre2) + (def3 * cre3) + (def4 * cre4) + (def5 * cre5)) / (cre1 + cre2 + cre3 + cre4 + cre5);
}
