const { hasOwnProperty } = Object.prototype;

function shallowEqual(objA, objB) {
  // check if it is the same object
  if (Object.is(objA, objB)) {
    return true;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i += 1) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !Object.is(objA[keysA[i]], objB[keysB[i]])
    ) {
      return false;
    }
  }

  return true;
}

export default shallowEqual;
