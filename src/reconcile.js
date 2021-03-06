import instantiate from "./instantiate";
import updateDomProperties from "./updateDomProperties";
import profiler from "./profiler";

export default function reconcile(parentDom, instance, element) {
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
  if (typeof element.type === "string") {
    // Update instance of a DOM-element
    profiler.startTracking("update Dom Properties");
    updateDomProperties(instance.dom, instance.element.props, element.props);
    profiler.stopTracking("update Dom Properties");
    profiler.measure("update Dom Properties");
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  }
  // Update component instance
  profiler.startTracking("Update component instance");
  instance.publicInstance.props = element.props;
  const childElement = instance.publicInstance.render();
  const oldChildInstance = instance.childInstance;
  const childInstance = reconcile(parentDom, oldChildInstance, childElement);
  instance.dom = childInstance.dom;
  instance.childInstance = childInstance;
  instance.element = element;
  profiler.stopTracking("Update component instance");
  profiler.measure("Update component instance");
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
