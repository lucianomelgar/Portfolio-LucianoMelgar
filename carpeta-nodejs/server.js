// Importación de módulos necesarios

const express = require('express');         //Express: Es un framework para manejar rutas y respuestas HTTP. Aquí lo usamos para crear el servidor.

const nodemailer = require('nodemailer');   //Se usa para enviar correos electrónicos a través de Mailjet.

const bodyParser = require('body-parser');  // Se usa para analizar el cuerpo de las solicitudes HTTP (los datos que vienen del formulario)

const cors = require('cors');           // añadiendo CORS

//1) Servidor Express: Se crea el servidor Express y se configura para escuchar en un puerto (3000 por defecto, 3001 en este caso)
//2) body-parser: Se usa para interpretar los datos enviados por el formulario (el correo del emisor, el asunto, y el mensaje).
//3) Nodemailer: Configurado con Mailjet para autenticar y enviar correos desde tu formulario.
//4) Ruta /send-email: Esta ruta se activa cuando se hace un POST desde el formulario, tomando los datos (email, asunto, mensaje), y llamando a la función enviarCorreo().

// Crear la aplicación de Express
const app = express();

//configuración de CORS
app.use(cors());    

// Configuración de body-parser para procesar los datos enviados desde el formulario
app.use(bodyParser.urlencoded({ extended: true }));     //es necesario para poder procesar los datos de un formulario enviado por POST.

app.use(bodyParser.json());                             //permite procesar solicitudes en formato JSON.



// Configuración de Mailjet con Nodemailer
// nodemailer Se usa para enviar correos electrónicos a través de Mailjet.
const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',    // El host SMTP de Mailjet
    
    port: 587,                    // Puerto SMTP para Mailjet (TLS)
    
    auth: {
        user: 'f62bc231e47ad4c5475df58c857a31c1',    // Tu API Key de Mailjet
        pass: 'a94f6605320d8db66941d0024306e5e7',   // Tu API Secret de Mailjet
    }
});

// Función para enviar el correo
async function enviarCorreo(email, asunto, mensaje) {
    const mailOptions = {
        from: email,                       // Correo del remitente
        to: 'luciano.melgar22@gmail.com',  // El correo donde recibirás los mensajes
        subject: asunto,                   // Asunto del correo
        text: mensaje                      // Mensaje del correo
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado exitosamente');
    } 
    catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}

// Ruta para recibir los datos del formulario y enviar el correo
app.post('/send-email', (req, res) => {
    const { email, asunto, mensaje } = req.body;
    console.log("Datos recibidos:", { email, asunto, mensaje });    //impresión por consola para verificar

    enviarCorreo(email, asunto, mensaje)
    .then(() => {
        console.log('Correo enviado exitosamente');             //impresión por consola para verificar
        res.status(200).send('Correo enviado exitosamente!');
    })
    .catch((error) => {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo.');
    });
});

// Configurar el servidor para escuchar en un puerto (ej. 3001)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
