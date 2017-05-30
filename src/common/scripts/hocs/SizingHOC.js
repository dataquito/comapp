import React from 'react';
import * as tete from 'react-dom';
export default function SizingHOC(WrappedComponent) {
  return class Sizing extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        width: '',
        height: ''
      }

    }

    componentDidMount() {
      console.log(tete);
      // console.log(findDOMNode(this.node___));
      // console.log(findDOMNode(this));
    }

    render() {
      const newProps = {
        width: this.state.width,
        height: this.state.height
      }
      return <WrappedComponent {...this.props} {...newProps} ref={(input) => { this.node___ = input }} />
    }
  }
}
