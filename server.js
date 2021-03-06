const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/membresia-ui'));

app.all('*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/membresia-ui/index.html'));
});

const porta = (process.env.PORT || 4300);
app.listen(porta, () => {
	console.info(`Aplicacao membresia-ui rodando na porta ${porta}`);
});
