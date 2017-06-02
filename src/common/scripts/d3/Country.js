import React from 'react';

class Country extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
    const id = nextProps.POP_CNTRY !== this.props.POP_CNTRY;
    const selected = nextProps.selected !== this.props.selected;
    const width = nextProps.width !== this.props.width;
    const height = nextProps.height !== this.props.height;
    return (id || selected || width || height);
  }

  render() {
    const { className, selectedClassName, d, onClick, selected, empty, emptyClass } = this.props;
    const selectedClass = selected ? selectedClassName : '';
    const emptyFeaClass = empty ? emptyClass : '';
    const classes = [className,selectedClass,emptyFeaClass].join(' ');
    return (
      <path 
        className={classes}
        d={d}
        onClick={onClick}
      />
    );
  }
}

export default Country;

