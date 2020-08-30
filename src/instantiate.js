import updateDomProperties from "./updateDomProperties";

function createPublicInstance(element, internalInstance) {
  const { type: Type, props } = element;
  const publicInstance = new Type(props);
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
}

export default function instantiate(element) {
  const { type, props } = element;
  const isDomElement = typeof type === "string";
  if (isDomElement) {
    // Create instance of a DOM-element
    const isTextElement = type === "TEXT ELEMENT";
    const dom = isTextElement
      ? document.createTextNode("")
      : document.createElement(type);
    updateDomProperties(dom, [], props);

    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));
    const instance = { dom, element, childInstances };
    return instance;
  }
  // Create component instance
  const instance = {};
  const publicInstance = createPublicInstance(element, instance);
  const childElement = publicInstance.render();
  const childInstance = instantiate(childElement);
  const { dom } = childInstance;
  // didMount hook
  if (publicInstance.didMount) {
    publicInstance.didMount();
  }
  Object.assign(instance, { dom, element, childInstance, publicInstance });
  return instance;
}
