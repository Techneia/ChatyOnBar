const { menubar } = require('menubar');
const { app, nativeImage, screen, Menu } = require('electron');

app.on('ready', () => {
  // La función .setTemplateImage(true) le dice a macOS que el ícono es una "Plantilla"
  // ¡Esto hace la magia de colorearlo blanco en Modo Oscuro y negro en Modo Claro automáticamente!

  // Icono básico de cabeza de robotcito (Plantilla que cambia al modo oscuro)
  const iconBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVklEQVR4nO2Uz0rDQBCHv4sn7RvoQS/+OasvKVb6Cj2ISNGDFuprqO9QFDy0PSqMBKYibRLSzW6SKfPBj8CGmcyX3QQcxxwHwAiYax6AYwxKfAGykmxtH0OMciSWuccQ8xKRGYb4LBH5wBB3JSK3GOIImOZITPWeKQ6B4T+Joa6ZRTTmERdJyBnQB96ARcmfKTQL7X0NnKYQ2AEGwE+C4YvyDdzos6NJvDQoICuZxJIZtCghmuw41/4mmjxOUnLMTuqI9DsgIZqrOiLvHRAQzWsdkRS/2NDM6ohIxxJMleZPwAWwq9fnRDUSrlFtoDweI9dIapHzgrrLyDWyiUjIme0V9OpFrpFN5EKaNL0jkkok+0jzGEeukdQiy8Gyt7mn13GiGkkt0nbWaHsgF/EdoVtZo+2BXGRrdySP0Gah6xJjaBfBRf5wkaq4CEZFpKEEszUijkMYv4e7k+lvQRFfAAAAAElFTkSuQmCC';
  const icon = nativeImage.createFromDataURL(iconBase64).resize({ width: 18, height: 18 });
  icon.setTemplateImage(true);

  // Obtenemos la pantalla principal para darle altura máxima inicialmente
  const primaryDisplay = screen.getPrimaryDisplay();

  const mb = menubar({
    index: 'http://localhost:3050',
    windowPosition: 'topLeft',
    browserWindow: {
      width: 500,
      height: primaryDisplay.workArea.height, // Ajuste al total de la pantalla principal
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    },
    showDockIcon: false,
    icon: icon
  });

  mb.on('ready', () => {
    if (mb.tray) {
      // Hemos quitado "mb.tray.setTitle(' Chaty');" para que SOLO se muestre tu ícono.

      // Añadimos la función para cerrar la aplicación dándole click derecho
      const contextMenu = Menu.buildFromTemplate([
        {
          label: 'Mostrar / Ocultar',
          click: () => {
            if (mb.window && mb.window.isVisible()) {
              mb.hideWindow();
            } else {
              mb.showWindow();
            }
          }
        },
        {
          label: 'Cambiar URL...',
          click: async () => {
            const prompt = require('electron-prompt');
            try {
              const newUrl = await prompt({
                title: 'Cambiar URL de Chaty',
                label: 'Ingresa la nueva página web que quieres mostrar:',
                value: 'https://',
                inputAttrs: { type: 'url', required: true },
                type: 'input'
              });

              if (newUrl) {
                // Si la ventana no ha sido mostrada aún, la creamos
                if (!mb.window) {
                  mb.showWindow();
                }
                mb.window.loadURL(newUrl).catch(err => {
                  console.error('Error cargando la página (puede ser un link inválido o https en vez de http):', err.message);
                });
                mb.showWindow(); // Nos aseguramos de abrirla
              }
            } catch (error) {
              console.error('Prompt cancelado o con error:', error);
            }
          }
        },
        {
          label: 'Actualizar / Refrescar',
          click: () => {
             if (mb.window) {
               mb.window.webContents.reload();
             }
          }
        },
        { type: 'separator' },
        {
          label: 'Cerrar Chaty',
          click: () => { app.quit(); }
        }
      ]);

      mb.tray.on('right-click', () => {
        mb.tray.popUpContextMenu(contextMenu);
      });
    }
  });

  mb.on('show', () => {
    const cursorPoint = screen.getCursorScreenPoint();
    const currentDisplay = screen.getDisplayNearestPoint(cursorPoint);
    const workArea = currentDisplay.workArea;

    // Ajustamos ancho a 500px y alto al total de la pantalla
    // (Ya no necesitamos setPosition, porque windowPosition: 'topLeft' lo maneja automáticamente en la pantalla del ícono)
    mb.window.setSize(500, workArea.height);

    // Aseguramos que la ventana flote al más alto nivel macOS, incluso sobre full-screen
    mb.window.setAlwaysOnTop(true, 'screen-saver');
    mb.window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
