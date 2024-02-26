import { NodeFactory } from "./node-factory.js";
export class TemplateFactory {
    nodeFactory;
    constructor() {
        this.nodeFactory = new NodeFactory();
    }
    createTemplate(jsonLocation, father) {
        let newFather = father.cloneNode();
        let validationFunctions = jsonLocation.functions;
        for (const node of jsonLocation.items) {
            const htmlNode = this.nodeFactory.createNode(node);
            this.applyValidations(htmlNode, node.validations, validationFunctions);
            newFather.appendChild(htmlNode);
        }
        return newFather;
    }
    //Se meteria en la clase del NODO:INPUT pero por ahora
    applyValidations(node, validations, validationFunctions) {
        node.addEventListener('input', function () {
            node.classList.remove(validations.errorClass);
            node.classList.remove(validations.successClass);
            validations.fns.forEach((validationName) => {
                //PROBLEMA Tenemos que buscar en la lista de funciones de validacion
                //SOLUCION A la hora de crear el nodo, tambien encontrar las dos funciones
                //y convertir el array fns de nombes al array de funciones a ejecutar
                //Tambien se podria comprobar si ya es el nodo erroneo para evitar hacer mas comprobaciones
                const validation = validationFunctions.find((functions) => functions.name == validationName).fn;
                const validationFunction = Function(`return ${validation}`)();
                if (!validationFunction(node.value)) {
                    node.classList.add(validations.errorClass);
                    return;
                }
            });
            if (!node.classList.contains(validations.errorClass))
                node.classList.add(validations.successClass);
        });
    }
}
