'use strict';

import React from 'react';

require('styles//Map.less');

class MapComponent extends React.Component {

  componentDidMount() {
  }


  render() {
    return (
      <div id="map-component" style = {{height: (window.innerHeight - 100)}} className="map-component">
      </div>
    );
  }
}

MapComponent.displayName = 'MapComponent';

// Uncomment properties you need
// MapComponent.propTypes = {};
// MapComponent.defaultProps = {};

export default MapComponent;
