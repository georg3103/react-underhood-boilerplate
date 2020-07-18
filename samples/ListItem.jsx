import OwnReact from "../src";

class ListItem extends OwnReact.Component {
  render() {
    const { letter } = this.props;
    return <li>{letter}</li>;
  }
}

export default ListItem;
