export class NodeFactory {
    createNode(item) {
        switch (item.element.split(':')[0]) {
            case 'input':
                return this.createInputNode(item);
            case 'button':
                return this.createButtonNode(item);
        }
        return document.createElement('div');
    }
    createInputNode(item) {
        const [element, type] = item.element.split(':');
        const htmlElement = document.createElement(element);
        htmlElement.setAttribute('type', type);
        htmlElement.setAttribute('placeholder', item.text);
        htmlElement.setAttribute('id', item.id);
        htmlElement.setAttribute('name', item.name);
        return htmlElement;
    }
    createButtonNode(item) {
        const htmlElement = document.createElement(item.element);
        htmlElement.setAttribute('id', item.id);
        htmlElement.setAttribute('name', item.name);
        htmlElement.innerText = item.text;
        htmlElement.classList.add(item.class);
        this.applyEvents(htmlElement, item.events);
        return htmlElement;
    }
    applyEvents(node, events) {
        for (let eventType in events) {
            const eventConfig = events[eventType];
            node.addEventListener(eventType, function () {
                const values = [];
                eventConfig.values.forEach(function (id) {
                    const inputNode = document.getElementById(id);
                    if (inputNode) {
                        values.push(inputNode.value);
                    }
                    else {
                        console.warn(`No se pudo encontrar el nodo con ID: ${id}`);
                    }
                });
                const event = new CustomEvent(eventConfig.eventName, { detail: values });
                document.dispatchEvent(event);
            });
        }
    }
}
