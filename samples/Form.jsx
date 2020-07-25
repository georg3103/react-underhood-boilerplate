import OwnReact from "../src";

class Form extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    this.props.handleSubmit(value);
    this.setState({ value: "" });
  };

  handleChange = e => {
    e.preventDefault();
    const {
      target: { value }
    } = e;
    this.setState({
      value
    });
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={value} onChange={this.handleChange} />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default Form;
