import OwnReact from "../src";
import ListItem from "./ListItem";
import Form from "./Form";
import { shuffle, getRussianAlphabethLetters } from "../src/utils";

const mixLetters = (letters, newLetters) => {
  const newLettersIndexes = newLetters
    .reduce((acc, item) => [...acc, letters.indexOf(item)], [])
    .sort((a, b) => a - b);

  return newLetters.reduce((acc, item, index) => {
    const newLetterIndex = newLettersIndexes[index];
    if (newLetterIndex !== -1) {
      acc[newLetterIndex] = item;
    }
    return acc;
  }, letters.slice());
};

class List extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getRussianAlphabethLetters()
    };
  }

  handleSubmit = value => {
    const { items } = this.state;
    const newLetter = value.split("");
    this.setState({
      items: mixLetters(items, newLetter)
    });
  };

  shuffleLetters = e => {
    e.preventDefault();
    const { items } = this.state;
    this.setState({
      items: shuffle(items)
    });
  };

  render() {
    const { items } = this.state;
    console.error("items", items);
    const listItems = items.map(item => <ListItem letter={item} />);
    return (
      <div>
        <Form handleSubmit={this.handleSubmit} />
        <ul>{listItems}</ul>
        <button type="button" onClick={this.shuffleLetters}>
          shuffle
        </button>
      </div>
    );
  }
}

export default List;
