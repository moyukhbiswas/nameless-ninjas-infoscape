'use strict';

import React from 'react';
import FilterButtonComponent from 'components/buttons/FilterButtonComponent';

require('styles/Header.less');

class HeaderComponent extends React.Component {
  render() {
    return (
      <div className="header-component">
        Logo Goes Here! :D
        <FilterButtonComponent onFilterClick= {this.props.onFilterClick} />
      </div>
    );
  }
}

HeaderComponent.displayName = 'HeaderComponent';

// Uncomment properties you need
HeaderComponent.propTypes = {
  onFilterClick: React.PropTypes.func,
};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
