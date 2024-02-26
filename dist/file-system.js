import * as fs from 'fs';
import * as path from 'path';
export class FileSystem {
    crearArchivoHTML(html, directorio, nombreArchivo) {
        console.log('directorio : ', directorio);
        console.log('nombreArchivo : ', nombreArchivo);
        if (!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, { recursive: true });
        }
        const rutaArchivo = path.join(directorio, nombreArchivo);
        fs.writeFileSync(rutaArchivo, html.innerHTML);
    }
}
