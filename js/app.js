const {ipcRenderer} = require('electron');

ipcRenderer.on('producto:agregar', function(evento,nombreProducto){
    localStorage.setItem(nombreProducto, nombreProducto);
    
    cargarListaCompras();
    
});

function cargarListaCompras(){
    let html = Object.keys(localStorage).map(k => `<div class="list-group-item">${localStorage.getItem(k)}</div>`).join('');

    document.getElementById('listaCompras').innerHTML = html;
}

/*
document.addEventListener('keydown', (e) => {
    remote.getCurrentWindow().webContents.openDevTools();
}) 
*/
cargarListaCompras();