const {ipcRenderer} = require('electron');

function agregarProducto(evento){
    evento.preventDefault();
    
    let nombreProducto = document.querySelector('#nombreProducto').value;
    console.log('Nombre de Producto:', nombreProducto);
    if (nombreProducto) {
        document.querySelector('#nombreProducto').value = '';
        ipcRenderer.send('producto:agregar', nombreProducto);
    }
}

document.querySelector('#frmAgregarProducto').addEventListener('submit', agregarProducto);