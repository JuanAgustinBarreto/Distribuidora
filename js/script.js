document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admindistri' && password === 'meier2024') {
        localStorage.setItem('user', 'admin');
        window.location.href = 'menu.html';
    } else {
        // Implementar la lógica para otros usuarios y almacenamiento en base de datos
        // Aquí asumimos que el usuario ha sido autenticado correctamente
        localStorage.setItem('user', 'regular');
        window.location.href = 'menu.html';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('productosTable')) {
        cargarProductos();
    }
    if (document.getElementById('clientesTable')) {
        cargarClientes();
    }
});

function cargarProductos() {
    const productos = [
        { id: 1, nombre: 'Producto 1', marca: 'Marca 1', stock: 10, precio: 100 },
        { id: 2, nombre: 'Producto 2', marca: 'Marca 2', stock: 20, precio: 200 },
        // Agregar más productos según sea necesario
    ];

    const productosTableBody = document.getElementById('productosTable').querySelector('tbody');
    productos.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.marca}</td>
            <td>${producto.stock}</td>
            <td>${producto.precio}</td>
        `;
        row.addEventListener('click', () => agregarAlCarrito(producto));
        productosTableBody.appendChild(row);
    });
}

function agregarAlCarrito(producto) {
    const carritoList = document.getElementById('carritoList');
    const item = document.createElement('li');
    item.textContent = `${producto.nombre} - ${producto.precio} €`;
    carritoList.appendChild(item);
}

function generarPedido() {
    const carritoList = document.getElementById('carritoList');
    const items = carritoList.querySelectorAll('li');
    const pedido = [];
    items.forEach(item => pedido.push(item.textContent));

    fetch('/api/generar-pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pedido }),
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function cargarClientes() {
    const clientes = [
        { id: 1, nombre: 'Cliente 1', apellido: 'Apellido 1', telefono: '123456789', email: 'cliente1@example.com', empresa: 'Empresa 1' },
        { id: 2, nombre: 'Cliente 2', apellido: 'Apellido 2', telefono: '987654321', email: 'cliente2@example.com', empresa: 'Empresa 2' },
        // Agregar más clientes según sea necesario
    ];

    const clientesTableBody = document.getElementById('clientesTable').querySelector('tbody');
    clientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.email}</td>
            <td>${cliente.empresa}</td>
        `;
        clientesTableBody.appendChild(row);
    });
}