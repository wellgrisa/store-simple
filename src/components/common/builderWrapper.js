import { Component } from "React";

export var BuilderWrapper = ComposedComponent => class extends Component {
  render() {
    return <ComposedComponent {...this.props} />;
  }
};
