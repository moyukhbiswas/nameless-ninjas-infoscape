'use strict';

import React from 'react';
import SelectableButtonComponent from 'components/dialog/filtertags/SelectableButtonComponent';

require('styles/dialog/filtertags/AddFilterTagDialog.less');

class AddFilterTagDialogComponent extends React.Component {

  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler() {
    let categories = [];
    for(let i=1; i< 8;i++) {
      if (this.refs[`button${i}`].isSelected()) {
        categories.push(this.refs[`button${i}`].getName());
      }
    }

    // write function here
    window.filterPins(categories);

    this.props.cancelShow();
  }

  render() {
    return (
      <div className="addfiltertagdialog-component">
        <div className = "addfilterdialog-window">
          <div className = "addfilterdialog-title"> Select the tags you want to filter with
          <br/>
          <SelectableButtonComponent name = "Crowds" ref = "button1" icon = "crowd-icon" buttontext="Crowds" />
          <SelectableButtonComponent name = "Hazard" ref = "button2" icon = "hazard-icon" buttontext="Hazard" />
          <SelectableButtonComponent name = "Events" ref = "button3" icon = "events-icon" buttontext="Events" />
          <br/>
          <SelectableButtonComponent name = "Offers" ref = "button4" icon = "offers-icon" buttontext="Offers" />
          <SelectableButtonComponent name = "PublicServices" ref = "button5" icon = "public-services-icon" buttontext="Public Services" />
          <SelectableButtonComponent name = "Roads" ref = "button6" icon = "roads-icon" buttontext="Roads" />
          <br/>
          <SelectableButtonComponent name = "Safety" ref = "button7" icon = "safety-icon" buttontext="Safety" />
          <br/>
          <button className = "addfilterdialog-submit" onClick = {this.submitHandler}>Submit</button>
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
