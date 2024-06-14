# TFG-JuegoDeCiberseguridadOrientadoALaPoblacionJoven

Descripción de la aplicación:

Se trata de un juego cuyo objetivo es enseñar de forma lúdica ciberseguridad básica a jóvenes y adolescentes.
El proyecto está abierto a futuras mejoras y permite cambiar la temática del juego para que se adapte a cualquier contenido.

Avisos importantes:

La aplicación está pensada para funcionar usando la inteligancia artificail de OpenAI para generar las pruebas, por lo que será necesario tener una "API Key" para usar esta función. Si dispone de una, abra el fichero "config.js" situado en "src/config" en el proyecto. Una vez abierto el fichero, sustituya el valor de "apiKey" por su clave y cambie el valor de "use_gpt" a true si desea abilitar la inteligencia artificial. Si no dispone de una clave, mantenga el valor de "use_gpt" a false para evitar errores de ejecución. Se mostrarán preguntas ya creadas en lugar de preguntas generadas por la inteligencia artificial.

Instrucciones para instalar e iniciar la aplicación:

1. Tras descargar el proyecto, colóquelo en la carpeta donde lo quiera ejecutar.
2. Abriendo un terminal y situándose en la carpeta que ha creado, escriba en la terminal "npm install" para instalar las dependencias necesarias para que funcione la aplicación.
3. Una vez instaladas las dependencias, escriba en la misma terminal "npm start" para iniciar la apliación. Tras unos breves instántes, debería abrirse el navegador con la apliación. En caso de no ser así, abra su navegador de confianza y escriba en la barra de búsqueda la siguiente URL: "http://localhost:3000" (esta es la dirección que cargaría el navegador si se hubiera abierto automáticamente).
