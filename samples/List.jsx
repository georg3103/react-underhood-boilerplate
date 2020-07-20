import OwnReact from "../src";
import ListItem from "./ListItem";
import { shuffle, getRussianAlphabethLetters } from "../src/utils";

class List extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      items: getRussianAlphabethLetters()
    };
  }

  handleInput = e => {
    e.preventDefault();
    const {
      target: { value }
    } = e;
    this.setState({
      value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { value, items } = this.state;
    const newLetter = value.split("");
    this.setState({
      value: "",
      items: [...newLetter, ...items]
    });
  };

  shuffleLetters = e => {
    e.preventDefault();
    const { items } = this.state;
    this.setState({
      value: "",
      items: shuffle(items)
    });
  };

  render() {
    const { items, value } = this.state;
    const listItems = items.map(item => <ListItem letter={item} />);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={value} onInput={this.handleInput} />
          <button type="submit">Add</button>
        </form>
        <ul>{listItems}</ul>
        <button type="button" onClick={this.shuffleLetters}>
          shuffle
        </button>
      </div>
    );
  }
}

export default List;
