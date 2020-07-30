/* eslint-disable no-restricted-syntax */
export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function getRussianAlphabethLetters() {
  return "йцукенгшщзхъфывапролджэячсмитьбю".split("");
}

export function isEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 == null ||
    obj2 == null
  )
    return false;

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) return false;

  for (const key of obj1Keys) {
    if (!obj2Keys.includes(key)) return false;

    if (typeof obj1[key] === "function" && typeof obj2[key] === "function") {
      console.log(obj1[key].toString());
      console.log(obj2[key].toString());
      if (obj1[key].toString() !== obj2[key].toString()) return false;
      return isEqual(obj1[key], obj2[key]);
    }
    console.log(obj1, key);
    if (!isEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}
