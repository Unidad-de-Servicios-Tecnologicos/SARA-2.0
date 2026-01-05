/**
 * SCRIPT DE RENOMBRADO COMPLETO SARA (CARPETAS + ARCHIVOS + IMPORTS)
 * ---------------------------------------------------------------
 * ✔ Renombra features español → inglés
 * ✔ Renombra archivos internos español → inglés
 * ✔ Actualiza imports automáticamente
 * ✔ Funciona en Windows / Mac / Linux
 */

import fs from "fs";
import path from "path";

// 🔥 Diccionario español → inglés (carpetas)
const folderMap = {
  actividades: "activities",
  aprendices: "learners",
  asistencia: "attendance",
  auth: "auth",
  dashboard: "dashboard",
  documentos: "documents",
  fichas: "records",
  horarios: "schedules",
  instructores: "instructors",
  landing: "landing",
  practicas: "practices",
  reservas: "reservations",
};

// 🔥 Diccionario para renombrar archivos (base)
const fileMap = {
  Actividad: "Activity",
  Actividades: "Activities",

  Aprendiz: "Learner",
  Aprendices: "Learners",

  Asistencia: "Attendance",
  Horario: "Schedule",
  Horarios: "Schedules",

  Ficha: "Record",
  Fichas: "Records",

  Instructor: "Instructor",
  Instructores: "Instructors",

  Documento: "Document",
  Documentos: "Documents",

  Practica: "Practice",
  Practicas: "Practices",

  Reserva: "Reservation",
  Reservas: "Reservations",
};

// 🔧 Función para renombrar texto español → inglés
function translateName(name) {
  let newName = name;

  for (const [es, en] of Object.entries(fileMap)) {
    const regex = new RegExp(es, "gi");
    newName = newName.replace(regex, en);
  }

  return newName;
}

// 🔧 Renombrar carpetas
function renameFolders(basePath) {
  for (const [es, en] of Object.entries(folderMap)) {
    const oldPath = path.join(basePath, es);
    const newPath = path.join(basePath, en);

    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`📁 Carpeta: ${es} → ${en}`);
    }
  }
}

// 🔧 Renombrar archivos internos
function renameFilesRecursively(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      renameFilesRecursively(fullPath);
    } else {
      const newName = translateName(item);

      if (newName !== item) {
        const newPath = path.join(dir, newName);
        fs.renameSync(fullPath, newPath);
        console.log(`📄 Archivo: ${item} → ${newName}`);
      }
    }
  }
}

// 🔧 Actualiza TODOS los imports dentro de .js y .jsx
function updateImportsRecursively(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      updateImportsRecursively(fullPath);
    } else if (/\.(js|jsx)$/.test(item)) {
      let content = fs.readFileSync(fullPath, "utf8");
      let newContent = content;

      for (const [es, en] of Object.entries(fileMap)) {
        const regex = new RegExp(es, "gi");
        newContent = newContent.replace(regex, en);
      }

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`🔗 Import actualizado en: ${item}`);
      }
    }
  }
}

// 🔥 EJECUCIÓN DEL SCRIPT
const featuresPath = "./src/features";

console.log("🚀 Renombrando carpetas...");
renameFolders(featuresPath);

console.log("📄 Renombrando archivos...");
renameFilesRecursively(featuresPath);

console.log("🔗 Corrigiendo imports...");
updateImportsRecursively("./src");

console.log("✨ PROCESO COMPLETO: Carpetas, archivos e imports renombrados.");
