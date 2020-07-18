/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/** @jsx createElement */

class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    updateInstance(this.__internalInstance);
  }
}

Component.isClass = true;

function createPublicInstance(element, internalInstance) {
  const { type: Type, props } = element;
  const publicInstance = new Type(props);
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
}

function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const { element } = internalInstance;
  reconcile(parentDom, internalInstance, element);
}

let rootInstance = null;

function render(element, container) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
}

function reconcile(parentDom, instance, element) {
  if (instance == null) {
    // Create instance
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  }
  if (element == null) {
    // Remove Instance
    parentDom.removeChild(instance.dom);
    return null;
  }
  // if (instance.element.type === element.type) {
  //   // Update instance
  //   updateDomProperties(instance.dom, instance.element.props, element.props);
  //   instance.childInstances = reconcileChildren(instance, element);
  //   instance.element = element;
  //   return instance;
  // }
  if (typeof element.type === "string") {
    // Update instance of a DOM-element
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  }
  // Update component instance
  instance.publicInstance.props = element.props;
  const childElement = instance.publicInstance.render();
  const oldChildInstance = instance.childInstance;
  const childInstance = reconcile(parentDom, oldChildInstance, childElement);
  instance.dom = childInstance.dom;
  instance.childInstance = childInstance;
  instance.element = element;
  return instance;
}

function reconcileChildren(instance, element) {
  const { dom } = instance;
  const { childInstances } = instance;
  const nextChildElements = element.props.children || [];
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);
  for (let i = 0; i < count; i += 1) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances.filter(childInstance => childInstance != null);
}

function instantiate(element) {
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
  // didMount hook
  if (publicInstance.didMount) {
    publicInstance.didMount();
  }
  const childInstance = instantiate(childElement);
  const { dom } = childInstance;
  Object.assign(instance, { dom, element, childInstance, publicInstance });
  return instance;
}

function updateDomProperties(dom, prevProps, nextProps) {
  const isEvent = name => name.startsWith("on");
  const isAttribute = name => !isEvent(name) && name !== "children";

  // Delete listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Delete props
  Object.keys(prevProps)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = null;
    });

  // Set props
  Object.keys(nextProps)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = nextProps[name];
    });

  // Add listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

function createElement(type, attrs, ...children) {
  const props = {
    ...attrs,
    children: children.flat().map(child => {
      return typeof child === "object"
        ? child
        : {
            type: "TEXT ELEMENT",
            props: { nodeValue: child }
          };
    }),
  }
  // functional components
  if (typeof type === "function") {
    if (!type.isClass) {
      return new type(props);
    }
  }

  return {
    type,
    props
  };
}

export default {
  Component,
  render,
  createElement
};
