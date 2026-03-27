# musicMetadata 🎵

Herramienta de consola interactiva para editar metadata de archivos MP3.

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
git clone https://github.com/yersonreyes/musicmetadata.git
cd musicmetadata
npm install
```

## Uso

Ejecuta el programa:

```bash
node src/index.js
```

### Menú principal

```
🎵 === musicMetadata ===
  1. Ver metadata
  2. Modificar archivo
  3. Modificación por lotes
  4. Salir
```

---

### 1. Ver metadata

Selecciona un archivo MP3 y muestra toda su información:

- Título
- Artista
- Álbum
- Año
- Género
- Pista
- Duración
- Tamaño

---

### 2. Modificar archivo

Permite editar la metadata de un archivo específico campo por campo.

**Flujo:**
1. Ingresa la ruta del archivo MP3
2. Para cada campo, ingresa el nuevo valor o presiona Enter para mantener el actual
3. Confirma los cambios antes de guardar

**Ejemplo:**

```
📁 Ruta del archivo MP3: /musica/cancion.mp3

📀 Metadata actual (presiona Enter para mantener el valor actual):

  📝 Título   [Mi canción]: 
  👤 Artista  [Artista Original]: Nuevo Artista
  💿 Álbum    [Álbum Original]: 
  ...

✅ ¿Guardar cambios? (s/n): s
✅ Metadata actualizada.
```

---

### 3. Modificación por lotes

Aplica los mismos cambios de metadata a varios archivos MP3 de una carpeta.

**Flujo:**
1. Ingresa la ruta de la carpeta con archivos MP3
2. Lista todos los archivos encontrados
3. Ingresa los nuevos valores (los campos vacíos no se modifican)
4. Aplica los cambios a todos los archivos

**Caso de uso común:**统一ar artista/álbum a una carpeta completa de canciones.

**Ejemplo:**

```
📁 Ruta de la carpeta con MP3s: /musica/album2024

📂 12 archivos encontrados:

  1. track01.mp3
  2. track02.mp3
  ...

📀 Ingresa los nuevos valores (presiona Enter para dejar vacío):

  📝 Título: 
  👤 Artista: Nuevo Artista
  💿 Álbum: Greatest Hits 2024
  📅 Año: 2024
  🎵 Género: 
  🔢 Pista: 

🔧 Aplicando a 12 archivos...

✅ Completado: 12 ok, 0 errores.
```

---

## Errores comunes

| Error | Solución |
|-------|----------|
| `ENOENT: no such file` | Verifica que la ruta del archivo/carpeta sea correcta |
| `Invalid MP3 file` | El archivo no es un MP3 válido |
| `Error al escribir` | Verifica permisos de escritura en el archivo |

## Dependencias

- [music-metadata](https://github.com/mood这种感觉/projetos/tree/master/music-metadata) - Lectura de metadata
- [node-id3](https://github.com/Michael-Lyon/node-id3) - Escritura de tags ID3

---

⌨️ Ejecutado desde terminal con menú interactivo