const {app,BrowserWindow,Menu,ipcMain,remote} = require('electron');

let ventanaPrincipal;
let ventanaNuevoProducto;

let menuPrincipalPlantilla = [
    {
        label:  'Archivo',
        submenu:    [
            {
                label:  'Agregar Producto',
                click(){
                    crearVentanaAgregarProducto()
                }
            },
            {
                label:  'Eliminar Productos',
                click() {
                    ventanaPrincipal.webContents.send('productos:eliminar')
                }
            },
            {
                label:  'Salir',
                accelerator: process.platform === 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
]

function crearVentanaAgregarProducto() {
    ventanaNuevoProducto = new BrowserWindow({
        parent: ventanaPrincipal,
        modal:  true,
        width:  300,
        height: 200,
        title:  'Agregar Producto',
        webPreferences: {
            nodeIntegration: true
        }
    });

    ventanaNuevoProducto.loadFile('agregar-producto.html');

    ventanaNuevoProducto.on('close', function() {
        ventanaNuevoProducto = null
    });
}


function crearVentanaPrincipal() {
    ventanaPrincipal = new BrowserWindow({
        width:  800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    ventanaPrincipal.loadFile('index.html');

    let menuPrincipal = Menu.buildFromTemplate(menuPrincipalPlantilla);

    ventanaPrincipal.setMenu(menuPrincipal);
    //ventanaPrincipal.webContents.openDevTools();

}

app.whenReady().then(crearVentanaPrincipal);

ipcMain.on('producto:agregar', function(evento, nombreProducto){
    ventanaPrincipal.webContents.send('producto:agregar',nombreProducto);
});