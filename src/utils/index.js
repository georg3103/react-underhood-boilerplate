export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function getRussianAlphabethLetters() {
  return "йцукенгшщзхъфывапролджэячсмитьбю".split("");
}
