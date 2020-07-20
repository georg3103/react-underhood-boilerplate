import OwnReact from "../src";
import ListItem from "./ListItem";
import { shuffle, getRussianAlphabethLetters } from "../src/utils";

class List extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.state = { items: getRussianAlphabethLetters() };
  }

  didMount() {
    const { items } = this.state;
    setInterval(() => {
      this.setState({ items: shuffle(items) });
    }, 2000);
  }

  render() {
    const { items } = this.state;
    const listItems = items.map(item => <ListItem letter={item} />);
    return <ul>{listItems}</ul>;
  }
}

export default List;
