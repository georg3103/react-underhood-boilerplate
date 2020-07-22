import OwnReact from "../src";
import ListItem from "./ListItem";
import Form from "./Form";
import { shuffle, getRussianAlphabethLetters } from "../src/utils";

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
      items: [...newLetter, ...items]
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
    console.log("render 1");
    const { items } = this.state;
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
