# Prueba técnica Bankinter

## Contexto

En este ejercicio, se requiere la creación de un script que pueda generar elementos HTML dinámicamente y colocarlas en la carpeta correspondiente. Éstos deben generarse a partir de archivos JSON ubicados en "json". En estos JSON pueden venir diferentes nodos HTML (en los ejemplos, vienen sólo input y button, pero pudieran venir de cualquier tipo)

## Ejemplo de JSON

A continuación se muestra un ejemplo de la estructura de un archivo JSON:

    {
        "name": "login-template",
        "items": [
         {
          "id": "email1",
          "name": "email",
          "element": "input:text",
          "type": "string",
          "text": "Escribe tu email",
          "validations": {
           "fns": ["letters", "numbers"],
           "errorClass": "error-element",
           "successClass": "success-element"
          }
         },
         {
          "id": "password1",
          "name": "password",
          "element": "input:password",
          "type": "string",
          "text": "Escribe tu contraseña",
          "validations": {
           "fns": ["letters", "numbers"],
           "errorClass": "error-element",
           "successClass": "success-element"
          }
         },
         {
          "id": "Submit",
          "name": "Submit",
          "element": "button",
          "class": "btn-primary",
          "text": "Registrar",
          "events": {
           "click": {
            "eventName": "login-event",
            "values": ["email1", "password1"]
           }
          }
         }
        ],
        "functions": [
         {
          "name": "letters",
          "fn": "(value)=>/([a-zA-Z])/.test(value)"
         },
         {
          "name": "numbers",
          "fn": "(value)=>/[0-9]/.test(value)"
         }
        ]
    }

\*Puede que haya propiedades de los JSON que no se necesiten para crear propiedades de los elementos

### Index.html

    <!DOCTYPE  html>
    <html  lang="es">
    <head>
    <meta  charset="UTF-8">
    <meta  name="viewport"  content="width=device-width, initial-scale=1.0">
    </head>
    <body>
    <main  id="container"></main>
    <script  src="./init.ts"></script>
    </body>
    </html>

En el archivo `index.html`, contiene un elemento `main#container` donde se cargarán las vistas, y se hace referencia a `init.ts` para la lógica de carga.

### Init.js

    (() => {
        const  paths  = {
         register:  './templates/register-template/register-template.html',
         login:  './templates/login-template/login-template.html'
        }
        function  listenEvents() {
         window.addEventListener('register-event', ({ detail }) => {
         console.log(detail);
         loadView(paths.login);
        })
        window.addEventListener('login-event', ({ detail }) => {
         console.log(detail);
        })
        }
        async  function  loadView(path) {
         const  html  =  await (await  fetch(path)).text();
         const  main  =  document.getElementById('container');
         // Inserte su código aquí

        }
        loadView(paths.register);
        listenEvents();
    })()

El archivo `init.ts` es una función autoejecutada que carga una vista de registro ubicada en `./templates/register-template/register-template.html`. Se requiere completar la función `loadView` para mostrar la vista del path recibido por parámetro en el elemento `main#container`.

## Objetivos

1. Crear un script capaz de generar elementos HTML funcionales y colocarlas en su carpeta correspondiente
2. Modificar `init.ts` para que pueda inyectar los elementos en `main#container` e interactuar con ellos ( como verás en el `init.ts`, se están escuchando eventos para cambiar la vista)

```javascript
window.addEventListener("register-event", ({ detail }) => {
  console.log(detail);
  loadView(paths.login);
});
```

## Restricciones

- Se pueden crear todos los archivos necesarios.
- No se puede modificar ni los archivos JSON ni `index.html`.
- Se puede utilizar JavaScript o TypeScript.
- Se pueden incluir comentarios "// TO DO" para indicar qué falta por hacer y cómo se realizaría.
- La creación de los elementos HTML puede ser en runtime o en contrucción
- Siéntete libre para innovar
