import fs from 'fs';
import path from 'path';

function renameToLowerCase(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const currentPath = path.join(dir, item);
    const stats = fs.statSync(currentPath);

    if (stats.isDirectory()) {
      const lowerName = item.toLowerCase();
      const newPath = path.join(dir, lowerName);

      // Renombrar sólo si el nombre cambia
      if (item !== lowerName) {
        console.log(`Renombrando: ${currentPath} → ${newPath}`);
        fs.renameSync(currentPath, newPath);
      }

      renameToLowerCase(newPath);
    }
  }
}

// SOLO toca las features
renameToLowerCase('./src/features');
console.log("✔ Carpetas renombradas a minúsculas");
