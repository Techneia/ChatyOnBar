<div align="center">
  <img src="build/icon.png" width="120" alt="Chaty Robot Icon">
  <h1>Chaty</h1>
  <p><em>Un asistente rápido y ligero en la barra de menú de macOS.</em></p>
</div>

---

## 🤖 ¿Qué es Chaty?

**Chaty** es una aplicación de escritorio simple construida con Electron, diseñada para incrustar y mostrar de forma rápida cualquier chat de Inteligencia Artificial (como ChatGPT, Gemini, Claude, etc.) directamente desde la barra de menú superior de tu Mac. 

Funciona como un **asistente de acceso rápido** que flota por encima del resto de tus aplicaciones. Su objetivo es mantener a tu IA favorita a un solo clic de distancia sin abarrotar tu pantalla de ventanas o pestañas de navegadores.

### ✨ Características Principales

- **Fácil Acceso**: Reside silenciosamente en tu barra de menú (System Tray).
- **URL Personalizable al Vuelo**: Haz clic derecho en el ícono del robot y selecciona "Cambiar URL..." para cargar la interfaz web de cualquier IA o sitio que necesites, instantáneamente.
- **Modo Asistente Siempre Visible**: Al abrirse, la ventana se ancla a toda la altura de la pantalla y se mantiene por encima de cualquier otro programa (incluso sobre apps en pantalla completa).
- **Integración Nativa**: El encantador ícono en formato *Template* se adapta dinámicamente al Modo Claro o Modo Oscuro de macOS de manera automática.

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js y npm instalados.
- macOS.

### Ejecución Local
1. Clona este repositorio:
   ```bash
   git clone https://github.com/Techneia/ChatyOnBar.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm start
   ```

### Compilar la App (Empaquetar)
Si deseas generar el archivo ejecutable `.app` para agregarlo a tu carpeta de **Aplicaciones**, ejecuta:

```bash
npm run build
```
Una vez finalizado, busca en la carpeta `dist/mac-arm64/` (o el equivalente de tu arquitectura) el ejecutable `Chaty.app` y arrástralo a tus Aplicaciones.

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **[Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)**.

Eres libre de copiar, descargar el código, remezclarlo y usarlo para tus proyectos personales. Sin embargo, **no está permitido** el uso de este código ni sus derivados con fines comerciales. Para más detalles, por favor lee el archivo `LICENSE` incluido en este repositorio.

---
*Hecho por Gabriel ([Techneia](https://github.com/Techneia))*
