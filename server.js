const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Inicializa o app e o servidor
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve os arquivos estáticos (HTML, CSS, JS) na pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Evento de conexão de um novo usuário
io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    // Quando uma mensagem é enviada
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg); // Envia a mensagem para todos os usuários
    });

    // Quando o usuário desconecta
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

// Define a porta e inicia o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
