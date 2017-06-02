import React from 'react';
export default function SizingHOC(WrappedComponent) {
  return class Sizing extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        width: null,
        height: null
      };
      this.resize = this.resize.bind(this);
      window.addEventListener('resize', this.resize); 
    }

    resize() {
      const node = document.getElementById(this.props.parentContainerID);
      this.setState({
        width: node.clientWidth,
        height: node.clientHeight
      });
    }

    componentDidMount() {
      const node = document.getElementById(this.props.parentContainerID);
      this.setState({
        width: node.clientWidth,
        height: node.clientHeight
      });
    }

    render() {
      const { width, height } = this.state;
      if(width === null || height === null) return null;
      const newProps = { width, height };
      return <WrappedComponent {...this.props} {...newProps}/>;
    }
  };
}
