'use strict';

import React from 'react';

require('styles/dialog/addtags/SelectableRadioButton.less');

class SelectableRadioButtonComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    }
    this.select = this.select.bind(this);
    this.deselect = this.deselect.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  select() {
    this.setState({ selected: true });
  }

  deselect() {
    this.setState({ selected: false});
  }

  isSelected() {
    return this.state.selected;
  }

  render() {
    return (
      <button className={(this.state.selected) ? "selectablebutton-component selectablebutton-component-active": "selectablebutton-component"}
        onClick = {() => {
          this.setState({ selected: !this.state.selected });
          this.props.onClick(this.props.name, this.props.index);
        }}
      >

        <div className = {`selectable-button-icon ${this.props.icon}`}></div>
        <div className = "selectable-button-text"> {this.props.buttontext}</div>
      </button>
    );
  }
}

SelectableRadioButtonComponent.displayName = 'DialogFiltertagsSelectableRadioButtonComponent';

// Uncomment properties you need
SelectableRadioButtonComponent.propTypes = {
  name: React.PropTypes.string,
  icon: React.PropTypes.string,
  buttontext: React.PropTypes.string,
  onClick: React.PropTypes.func,
};
// SelectableRadioButtonComponent.defaultProps = {};

export default SelectableRadioButtonComponent;
