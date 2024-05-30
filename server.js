const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Ruta para guardar el pedido
app.post('/api/generar-pedido', (req, res) => {
    const pedido = req.body.pedido;
    const pedidoId = new Date().getTime();
    const filePath = path.join(__dirname, 'data', 'pedidos', `pedido_${pedidoId}.txt`);

    fs.writeFile(filePath, pedido.join('\n'), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al guardar el pedido.');
        } else {
            res.send('Pedido guardado correctamente.');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});