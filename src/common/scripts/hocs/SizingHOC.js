import React from 'react';
import * as tete from 'react-dom';
export default function SizingHOC(WrappedComponent) {
  return class Sizing extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        width: null,
        height: null
      }

    }

    componentDidMount() {
      const node = document.getElementById(this.props.parentContainerID);
      this.setState({
        width: node.clientWidth / 2,
        height: node.clientHeight
      });
    }

    render() {
      const { width, height } = this.state;
      if(width === null || height === null) return null;
      const newProps = { width, height };
      return <WrappedComponent {...this.props} {...newProps}/>;
    }
  }
}
