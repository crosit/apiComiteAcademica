


import { log } from 'console';
import multer, { Multer } from 'multer';

// Configurar el almacenamiento de archivos con Multer
const storage: any = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ruta donde se guardarán los archivos recibidos
    cb(null, 'public/controlDocumentos');
  },
  filename: (req, file, cb) => {
    // Generar un nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.originalname + '-' + uniqueSuffix;
    cb(null, filename);
    console.log(file, 'filename');
    
  },
});

// Crear una instancia de Multer con la configuración de almacenamiento
const upload: Multer = multer({ storage });


export { upload };
