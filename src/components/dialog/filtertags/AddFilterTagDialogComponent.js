'use strict';

import React from 'react';
import SelectableButtonComponent from 'components/dialog/filtertags/SelectableButtonComponent';

require('styles/dialog/filtertags/AddFilterTagDialog.less');

class AddFilterTagDialogComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="addfiltertagdialog-component">
        <div className = "addfilterdialog-window">
          <div className = "addfilterdialog-title"> Select the tags you want to filter with
          <br/>
          <SelectableButtonComponent icon = "crowd-icon" buttontext="Crowd" />
          <SelectableButtonComponent icon = "hazard-icon" buttontext="Hazards" />
          <SelectableButtonComponent icon = "events-icon" buttontext="Events" />
          <br/>
          <SelectableButtonComponent icon = "offers-icon" buttontext="Offers" />
          <SelectableButtonComponent icon = "public-services-icon" buttontext="Public Services" />
          <SelectableButtonComponent icon = "roads-icon" buttontext="Roads" />
          <br/>
          <SelectableButtonComponent icon = "safety-icon" buttontext="Safety" />
          <br/>
          <button className = "addfilterdialog-submit">Submit</button>
          <button className = "addfilterdialog-cancel" onClick = {this.props.cancelShow}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

AddFilterTagDialogComponent.displayName = 'DialogFiltertagsAddFilterTagDialogComponent';

// Uncomment properties you need
AddFilterTagDialogComponent.propTypes = {
  cancelShow: React.PropTypes.func,
};
// AddFilterTagDialogComponent.defaultProps = {};

export default AddFilterTagDialogComponent;
