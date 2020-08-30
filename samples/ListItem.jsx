import OwnReact from "../src";

class ListItem extends OwnReact.PureComponent {
  render() {
    console.log("render", this.props.letter);
    return <li>{this.props.letter}</li>;
  }
}

export default ListItem;
