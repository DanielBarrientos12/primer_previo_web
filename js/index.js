const form = document.getElementById('form-login');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const codigo = document.querySelector("#codigo").value;
    const password = document.querySelector("#password").value;
    login(codigo, password);
});

function login(codigo, clave) {
    const api = 'https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/login';
    const data = {
        codigo: codigo,
        clave: clave
    };
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(user => {
        if (user.login) {
            localStorage.setItem('usuario', JSON.stringify(user));
            alert('Bienvenido ' + user.nombre);
            window.location.href = "pages/notas.html"; 
        } else {
            alert(user.mensaje);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}