'use strict';

import React from 'react';
import FilterButtonComponent from 'components/buttons/FilterButtonComponent';

require('styles/Header.less');

class HeaderComponent extends React.Component {

  render() {
    console.log(window.innerWidth);
    return (
      <div className="header-component">
        <div className = "logo">Infoscape</div>
        <div className="header-options dropdown">
          <button className="header-options-button dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {(window.innerWidth >=480) ? 'See posts from':''}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" style = {{'margin-left': (window.innerWidth >=480) ? '0px':'-150px'}}>
            <li><a href="#">Friends only</a></li>
            <li><a href="#">Trusted sources only</a></li>
            <li><a href="#">Everyone on the web</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Save my preferences</a></li>
          </ul>
        </div>
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
