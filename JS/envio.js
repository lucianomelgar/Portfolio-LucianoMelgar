
    document.getElementById('contactForm').addEventListener('submit', async function(event){
        event.preventDefault(); // Evita el envío normal del formulario

        const email = document.getElementById('email').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;

        try {
            console.log("Formulario enviado, preparando fetch...");
            const response = await fetch('http://localhost:3001/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, asunto, mensaje })
            });

            if (response.ok) {
                console.log("El popup se debería mostrar ahora.");
                // Muestra el popup de éxito
                const popup = document.getElementById('popup');
                popup.style.display = 'block';

                // Oculta el popup después de unos segundos
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 3000);

                // Limpiar el formulario
                document.getElementById('contactForm').reset();
            } else {
                alert('Error al enviar el mensaje.');
            }
        } 
        // catch (error) {
        //     alert('Hubo un problema al enviar el mensaje.'); 
        // }
        catch (error) {
            console.error('Error en la solicitud fetch:', error); // Muestra el error en la consola
            alert('Hubo un problema al enviar el mensaje.');
    }});
