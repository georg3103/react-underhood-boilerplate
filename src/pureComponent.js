import Component from "./component";
import shallowEqual from "./utils/shallowEqual";

class PureComponent extends Component {
  shouldComponentUpdate(nextProps, prevProps = this.props) {
    if (shallowEqual(prevProps, nextProps)) {
      return false;
    }
    return true;
  }
}

export default PureComponent;
