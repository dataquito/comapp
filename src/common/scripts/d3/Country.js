import React from 'react';

class Country extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const id = nextProps.POP_CNTRY !== this.props.POP_CNTRY;
    const selected = nextProps.selected !== this.props.selected;
    return (id || selected);
  }

  render() {
    console.log('rendering');
    const { className, d, onClick, selected } = this.props;
    const selectedClass = selected ? 'country--selected' : '';
    const classes = [className, selectedClass].join(' ');
    return (
      <path 
        className={classes}
        d={d}
        onClick={onClick}
      />
    );
  }
};
// const Country = ({ className, d, onClick, selected }) => {
//   const selectedClass = selected ? 'country--selected' : '';
//   const classes = [className, selectedClass].join(' ');
//   return (
//     <path 
//       className={classes}
//       d={d}
//       onClick={onClick}
//     />
//   );
// };

export default Country;

