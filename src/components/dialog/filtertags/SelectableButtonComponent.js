'use strict';

import React from 'react';

require('styles/dialog/filtertags/SelectableButton.less');

class SelectableButtonComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    }
    this.select = this.select.bind(this);
    this.deselect = this.deselect.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.getName = this.getName.bind(this);
  }

  select() {
    this.setState({ selected: true });
  }

  getName() {
    return this.props.name;
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
        }}
      >

        <div className = {`selectable-button-icon ${this.props.icon}`}></div>
        <div className = "selectable-button-text"> {this.props.buttontext}</div>
      </button>
    );
  }
}

SelectableButtonComponent.displayName = 'DialogFiltertagsSelectableButtonComponent';

// Uncomment properties you need
SelectableButtonComponent.propTypes = {
  icon: React.PropTypes.string,
  buttontext: React.PropTypes.string,
  name: React.PropTypes.string,
};
// SelectableButtonComponent.defaultProps = {};

export default SelectableButtonComponent;
