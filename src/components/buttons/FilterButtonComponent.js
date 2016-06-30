'use strict';

import React from 'react';

require('styles/buttons/FilterButton.less');

class FilterButtonComponent extends React.Component {
  render() {
    return (
      <button type="button" className="filterbutton-component" onClick = {this.props.onFilterClick}>
        Filter
      </button>
    );
  }
}

FilterButtonComponent.displayName = 'ButtonsFilterButtonComponent';

// Uncomment properties you need
FilterButtonComponent.propTypes = {
  onFilterClick: React.PropTypes.func,
};
// FilterButtonComponent.defaultProps = {};

export default FilterButtonComponent;
