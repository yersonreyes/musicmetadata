# musicMetadata 🎵

Herramienta de consola para editar metadata de archivos MP3.

## Uso

```bash
# Ver metadata de un archivo
node src/index.js info archivo.mp3

# Editar título
node src/index.js set archivo.mp3 --title "Nuevo título"

# Editar artista
node src/index.js set archivo.mp3 --artist "Nuevo artista"

# Editar álbum
node src/index.js set archivo.mp3 --album "Nuevo álbum"

# Editar año
node src/index.js set archivo.mp3 --year 2024

# Editar género
node src/index.js set archivo.mp3 --genre "Rock"

# Editar pista
node src/index.js set archivo.mp3 --track 5

# Múltiples campos a la vez
node src/index.js set archivo.mp3 --title "Título" --artist "Artista" --album "Álbum"
```

## Instalación

```bash
npm install
```