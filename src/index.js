#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const musicMetadata = require('music-metadata');
const NodeID3 = require('node-id3');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pregunta(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

async function mostrarMenu() {
  console.log('\n🎵 === musicMetadata ===');
  console.log('  1. Ver metadata');
  console.log('  2. Modificar archivo');
  console.log('  3. Modificación por lotes');
  console.log('  4. Salir');
  
  const opcion = await pregunta('\n👉 Opción: ');
  return opcion.trim();
}

async function obtenerMetadata(ruta) {
  try {
    const metadata = await musicMetadata.parseFile(ruta);
    return {
      title: metadata.common.title || '',
      artist: metadata.common.artist || '',
      album: metadata.common.album || '',
      year: metadata.common.year || '',
      genre: metadata.common.genre?.[0] || '',
      track: metadata.common.track?.no || ''
    };
  } catch (err) {
    console.log('❌ Error:', err.message);
    return null;
  }
}

async function verMetadata() {
  const ruta = await pregunta('📁 Ruta del archivo MP3: ');
  
  if (!fs.existsSync(ruta)) {
    console.log('❌ El archivo no existe.');
    return;
  }
  
  const meta = await obtenerMetadata(ruta);
  if (!meta) return;
  
  console.log('\n📀 Metadata actual:\n');
  console.log(`  📝 Título:   ${meta.title || '(vacío)'}`);
  console.log(`  👤 Artista:  ${meta.artist || '(vacío)'}`);
  console.log(`  💿 Álbum:    ${meta.album || '(vacío)'}`);
  console.log(`  📅 Año:      ${meta.year || '(vacío)'}`);
  console.log(`  🎵 Género:   ${meta.genre || '(vacío)'}`);
  console.log(`  🔢 Pista:    ${meta.track || '(vacío)'}`);
  console.log('');
}

async function modificarArchivo() {
  const ruta = await pregunta('📁 Ruta del archivo MP3: ');
  
  if (!fs.existsSync(ruta)) {
    console.log('❌ El archivo no existe.');
    return;
  }
  
  const meta = await obtenerMetadata(ruta);
  if (!meta) return;
  
  console.log('\n📀 Metadata actual (presiona Enter para mantener el valor actual):\n');
  
  const nuevo = {};
  
  const title = await pregunta(`  📝 Título   [${meta.title || 'vacío'}]: `);
  nuevo.title = title.trim() || meta.title;
  
  const artist = await pregunta(`  👤 Artista  [${meta.artist || 'vacío'}]: `);
  nuevo.artist = artist.trim() || meta.artist;
  
  const album = await pregunta(`  💿 Álbum    [${meta.album || 'vacío'}]: `);
  nuevo.album = album.trim() || meta.album;
  
  const year = await pregunta(`  📅 Año      [${meta.year || 'vacío'}]: `);
  nuevo.year = year.trim() || meta.year;
  
  const genre = await pregunta(`  🎵 Género   [${meta.genre || 'vacío'}]: `);
  nuevo.genre = genre.trim() || meta.genre;
  
  const track = await pregunta(`  🔢 Pista    [${meta.track || 'vacío'}]: `);
  nuevo.trackNumber = track.trim() || meta.track;
  
  const confirm = await pregunta('\n✅ ¿Guardar cambios? (s/n): ');
  if (confirm.toLowerCase() !== 's') {
    console.log('❌ Cancelado.');
    return;
  }
  
  const success = NodeID3.write(nuevo, ruta);
  if (success) {
    console.log('✅ Metadata actualizada.');
  } else {
    console.log('❌ Error al guardar.');
  }
}

async function modificacionPorLotes() {
  const dir = await pregunta('📁 Ruta de la carpeta con MP3s: ');
  
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    console.log('❌ La carpeta no existe.');
    return;
  }
  
  const archivos = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.mp3'));
  
  if (archivos.length === 0) {
    console.log('❌ No hay archivos MP3 en la carpeta.');
    return;
  }
  
  console.log(`\n📂 ${archivos.length} archivos encontrados:\n`);
  archivos.forEach((a, i) => console.log(`  ${i + 1}. ${a}`));
  
  console.log('\n📀 Ingresa los nuevos valores (presiona Enter para dejar vacío):\n');
  
  const nuevo = {};
  
  const title = await pregunta(`  📝 Título: `);
  if (title.trim()) nuevo.title = title.trim();
  
  const artist = await pregunta(`  👤 Artista: `);
  if (artist.trim()) nuevo.artist = artist.trim();
  
  const album = await pregunta(`  💿 Álbum: `);
  if (album.trim()) nuevo.album = album.trim();
  
  const year = await pregunta(`  📅 Año: `);
  if (year.trim()) nuevo.year = year.trim();
  
  const genre = await pregunta(`  🎵 Género: `);
  if (genre.trim()) nuevo.genre = genre.trim();
  
  const track = await pregunta(`  🔢 Pista: `);
  if (track.trim()) nuevo.trackNumber = track.trim();
  
  if (Object.keys(nuevo).length === 0) {
    console.log('❌ No se especificó ningún cambio.');
    return;
  }
  
  console.log(`\n🔧 Aplicando a ${archivos.length} archivos...`);
  
  let ok = 0, fail = 0;
  for (const archivo of archivos) {
    const ruta = path.join(dir, archivo);
    if (NodeID3.write(nuevo, ruta)) ok++;
    else fail++;
  }
  
  console.log(`\n✅ Completado: ${ok} ok, ${fail} errores.\n`);
}

async function main() {
  console.clear();
  console.log('🎵 Bienvenido a musicMetadata\n');
  
  while (true) {
    const opcion = await mostrarMenu();
    
    if (opcion === '4' || opcion === 's') {
      console.log('👋 ¡Hasta luego!\n');
      rl.close();
      break;
    }
    
    switch (opcion) {
      case '1':
        await verMetadata();
        break;
      case '2':
        await modificarArchivo();
        break;
      case '3':
        await modificacionPorLotes();
        break;
      default:
        console.log('❌ Opción inválida.\n');
    }
  }
}

main();