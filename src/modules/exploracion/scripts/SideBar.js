import React, { PropTypes } from 'react';

export default class SideBar extends React.Component {
  render() {
    return (
      <div className="explore-sidebar">
        {this.props.children}
      </div>
    );
  }
}
