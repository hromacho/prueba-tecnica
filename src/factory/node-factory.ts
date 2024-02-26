export interface Validations {
  errorClass: string;
  successClass: string;
  fns: string[];
}


interface Event {
  click: {
    eventName: string;
    values: string[];
  };
}

export interface Node {
  id: string;
  name: string;
  element: string;
  type: string;
  text: string;
  class: string;
  events: Event;
  validations: Validations;
}


export class NodeFactory {
  createNode(item: Node) {
    switch (item.element.split(':')[0]) {
      case 'input':
        return this.createInputNode(item);
      case 'button':
        return this.createButtonNode(item);
    }
    return document.createElement('div')
  }

  createInputNode(item: Node): HTMLElement {
    const [element, type] = item.element.split(':')
    const htmlElement: HTMLElement = document.createElement(element)
    htmlElement.setAttribute('type', type);
    htmlElement.setAttribute('placeholder', item.text)
    htmlElement.setAttribute('id', item.id)
    htmlElement.setAttribute('name', item.name)
    return htmlElement;
  }

  createButtonNode(item:Node): HTMLElement{
    const htmlElement: HTMLElement = document.createElement(item.element);
    htmlElement.setAttribute('id', item.id)
    htmlElement.setAttribute('name', item.name)
    htmlElement.innerText=item.text
    htmlElement.classList.add(item.class)
    this.applyEvents(htmlElement,item.events)
    return htmlElement;
  }

  private applyEvents(node: HTMLElement, events: any) {

    for (let eventType in events) {
      const eventConfig = events[eventType];

      node.addEventListener(eventType, function () {
        const values:any[] = [];

        eventConfig.values.forEach(function (id:string) {
          const inputNode = document.getElementById(id) as HTMLInputElement;
          if (inputNode) {
            values.push(inputNode.value);
          } else {
            console.warn(`No se pudo encontrar el nodo con ID: ${id}`);
          }
        });


        const event = new CustomEvent(eventConfig.eventName, {detail: values});
        document.dispatchEvent(event);
      });
    }
  }
}