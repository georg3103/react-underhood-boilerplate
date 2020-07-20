import reconcile from "./reconcile";

export default function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const { element } = internalInstance;
  reconcile(parentDom, internalInstance, element);
}
