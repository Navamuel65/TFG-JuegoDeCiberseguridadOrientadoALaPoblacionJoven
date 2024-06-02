export const mockdata = {
    "nivel": [
        {
            "nivelId": 1,
            "name": "Protege tu identidad",
            "miniature": "nivel1.JPG",
            "miniatureBlocked": null,
            "miniaturePassed": "nivel1Passed.JPG",
            "description": "Tema1.pdf",
            "video": "Nivel1.mov",
            "tematicaPrueba": "Creación de contraseñas seguras, uso responsable de las redes sociales y protección de la privacidad en Internet",
            "test": {
                "tipoPrueba": "multiplechoice",
                "minScore": 2,
                "ejercicio": [{
                    "question": "¿Cuál de estas contraseñas es la más segura?",
                    "answers": ["H0l4qU3T4l", "VivaLaVida2018", "F1M4xV3r$t4app3n", "micontraseña"],
                    "correct": 2
                },
                {
                    "question": "¿Cuál de las siguientes afirmaciones NO es correcta?",
                    "answers": ["Mis contraseñas no se comparten con nadie", "Se puede usar la misma contraseña en páginas distintas, pero cambiando el nombre de usuario", "Hay que cambiar la contraseña cada cierto tiempo", "El doble factor de autenticación es una excelente medida de seguridad"],
                    "correct": 1
                },
                {
                    "question": "¿Cuál de las siguientes acciones es una buena práctica?",
                    "answers": ["He puesto mi perfil en público porque no tengo nada que ocultar a nadie", "Acepto a todo el que me quiere seguir, así conozco a más gente", "Pongo el lugar a donde voy de vacaciones para que la gente lo sepa", "Reviso el contenido que subo a mis redes sociales antes de publicarlo"],
                    "correct": 3
                }
            ]},
            "bloqueado": {
                "isBloqueado": false,
                "monedasDesbloquear": 0
            }
        },
        {
            "nivelId": 2,
            "name": "La primera línea de defensa",
            "miniature": "nivel2.JPG",
            "miniatureBlocked": "nivel2Blocked.jpg",
            "miniaturePassed": "nivel2Passed.JPG",
            "description": "Tema2.pdf",
            "video": "Nivel2.mov",
            "tematicaPrueba": "Mantenimiento y actualización del sistema operativo del dispositivo, antivirus y cortafuegos, y descarga segura de aplicaciones en internet y extensiones del navegador",
            "test": {
                "tipoPrueba": "multiplechoice",
                "minScore": 2,
                "ejercicio": [{
                    "question": "Selecciona de qué forma se puede proteger tu dispositivo con conexión a Internet",
                    "answers": ["No hay que hacer nada en concreto", "Basta con tener el navegador actualizado a la última versión", "Ninguna respuesta es correcta", "Debemos actualizar el sistema operactivo del dispositivo, el cortafuegos, el antivirus y el navegador de Internet"],
                    "correct": 3
                },
                {
                    "question": "Si queremos descargarnos algo en Internet, ¿en qué cosas nos debemos fijar?",
                    "answers": ["Todas las respuestas son correctas", "Debemos mirar que lo estamos descargando desde la tienda oficial", "Fijarnos en el número de descargas que tiene la aplicación", "Revisar los comentarios y valoraciones que han hecho otros usuarios sobre la aplicación"],
                    "correct": 0
                },
                {
                    "question": "¿Cómo sabemos si nos podemos fiar de una aplicación o no?",
                    "answers": ["No podemos, hay que dar un voto de confianza", "Revisando los permisos que solicita la aplicación al instalarse", "Es de confianza si la descargamos de la primera página que salga en el navegador", "Es de fiar si la aplicación es originalmente de pago y la puedes descargar en otra página gratis, aunque no sea la página oficial"],
                    "correct": 1
                }
            ]},
            "bloqueado": {
                "isBloqueado": true,
                "monedasDesbloquear": 500
            }
        },
        {
            "nivelId": 3,
            "name": "Navegando de forma segura",
            "miniature": "nivel3.JPG",
            "miniatureBlocked": "nivel3Blocked.jpg",
            "miniaturePassed": "nivel3Passed.JPG",
            "description": "Tema3.pdf",
            "video": "Nivel3.mov",
            "tematicaPrueba": "Conexión segura a redes Wifi públicas, navegación segura y de incógnito e identificación de páginas falsas",
            "test": {
                "tipoPrueba": "multiplechoice",
                "minScore": 2,
                "ejercicio": [{
                    "question": "¿Cuál de las siguientes afirmaciones sobre conectarse a una red Wifi es correcta?",
                    "answers": ["Comprueba que no tenga clave de acceso para poder conectarte sin necesidad de una contraseña", "Si te conectas a una Wifi pública, no compartas información importante como contraseñas y usuarios", "Es seguro conectarse a una Wifi si tiene un nombre conocido, aunque haya varias que se llamen igual", "Ninguna de las anteriores es correcta"],
                    "correct": 1
                },
                {
                    "question": "¿Cuál de las siguientes afirmaciones NO es correcta?",
                    "answers": ["Si la dirección de la página web empieza con https, es muy probable que sea segura", "La navegación privada o 'modo incógnito' también almacena información en el navegador, como por ejemplo cookies", "Las extensiones del navegador son muy útiles para borrar cookies o anuncios automáticamente", "El navegador debe siempre estar actualizado a la última versión para evitar fallos de seguridad"],
                    "correct": 1
                },
                {
                    "question": "¿En qué debemos fijarnos para saber si hemos entrado en una página falsa?",
                    "answers": ["En la dirección de la página web", "En los anuncios de la página, observando si son apropiados y no hay una cantidad excesiva de ellos", "En la estética de la página y que está cuidada", "Todas las opciones son correctas"],
                    "correct": 3
                }
            ]},
            "bloqueado": {
                "isBloqueado": true,
                "monedasDesbloquear": 1000
            }
        },
        {
            "nivelId": 4,
            "name": "Peligros en la red",
            "miniature": "nivel4.JPG",
            "miniatureBlocked": "nivel4Blocked.jpg",
            "miniaturePassed": "nivel4Passed.JPG",
            "description": "Tema4.pdf",
            "video": "Nivel4.mov",
            "tematicaPrueba": "Medidas de seguridad para evitar phising, ataques de ingeniería social y fraudes. Identificación de noticias falsas y fuentes fiables de información",
            "test": {
                "tipoPrueba": "relaciona",
                "minScore": 2,
                "ejercicio": {
                    "grupos": ["Fraude", "De confianza"],
                    "elementos": [{
                        "elemento":"Correo electrónico de un banco pidiendo tus datos personales y bancarios para actualizar tu cuenta",
                        "correct": 0
                    },
                    {
                        "elemento":"Mensaje de un amigo en redes sociales pidiendo dinero porque ha perdido la cartera y no tiene cómo volver a casa",
                        "correct": 0
                    },
                    {
                        "elemento":"Noticia sobre un incidente en el que se citan las fuentes y se da información detallada",
                        "correct": 1
                    },
                    {
                        "elemento":"Anuncio que te pide que introduzcas tus datos personales para poder acceder a un sorteo de un móvil de última generación",
                        "correct": 0
                    },
                    {
                        "elemento":"Página web con estética cuidada y que parece tener información veraz y actualizada",
                        "correct": 1
                    },
                    {
                        "elemento":"Llamada del banco pidiendo tus datos para cancelar una compra que ha hecho un ciberdelincuente con tu tarjeta de crédito",
                        "correct": 0
                    }]
                }
            },
            "bloqueado": {
                "isBloqueado": true,
                "monedasDesbloquear": 1500
            }
        }
    ]
};