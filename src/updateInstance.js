import reconcile from "./reconcile";
import profiler from "./profiler";

export default function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const { element } = internalInstance;
  profiler.startTracking("full dom update");
  reconcile(parentDom, internalInstance, element);
  profiler.stopTracking("full dom update");
  profiler.measure("full dom update");
}
