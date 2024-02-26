import { TemplateFactory } from "./factory/template-factory.js";
(() => {
    const paths = {
        register: {
            urlHtml: './templates/register-template/register-template.html',
            urlJson: './json/register.json'
        },
        login: {
            urlHtml: './templates/login-template/login-template.html',
            urlJson: './json/login.json'
        }
    };
    function listenEvents() {
        window.addEventListener('register-event', (detail) => {
            loadView(paths.login);
        }, true);
        window.addEventListener('login-event', (detail) => {
        }, true);
    }
    async function loadView(pageInfo) {
        //const html = await (await fetch(pageInfo.urlHtml)).text();
        const main = document.getElementById('container');
        // Inserte su código aquí
        main.innerHTML = ""; //Eliminamos todos los posibles hijos
        const factory = new TemplateFactory();
        const response = await fetch(pageInfo.urlJson);
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
        }
        const json = await response.json();
        const newMain = factory.createTemplate(json, main);
        document.body.replaceChild(newMain, main);
        //const fileSystem = new FileSystem()
        const arrayOfHtml = pageInfo.urlHtml.split('/');
        const directory = arrayOfHtml.slice(0, arrayOfHtml.length - 1).join('/');
        const fileName = arrayOfHtml.pop();
        //PROBLEMA dado que la ejecucion es con http-server y no con node, esto imposibilita el acceso al directorio de archivos
        // ya que http-server esta pensado para servir archivos estaticos, no para andar creando nuevos archivos de forma dinamica
        //fileSystem.crearArchivoHTML(newMain,directory,fileName)
    }
    listenEvents();
    loadView(paths.register);
})();
