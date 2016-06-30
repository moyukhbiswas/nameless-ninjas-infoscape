'use strict';

import React from 'react';
import SelectableRadioButtonComponent from 'components/dialog/addtags/SelectableRadioButtonComponent';

require('styles/dialog/addtags/AddTagDialog.less');

class AddTagDialogComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showsecondscreen: false,
      selectedcategory: 'None',
      currentIndex: 0,
    };

    this.subcategories = [
        ['Heavy Crowd', 'Medium Crowd', 'Low Crowd'],
        ['Waterlogging', 'Pollution', 'Others'],
        ['Waterlogging', 'Pollution', 'Others'],
        ['Waterlogging', 'Pollution', 'Others'],
        ['Waterlogging', 'Pollution', 'Others'],
        ['Waterlogging', 'Pollution', 'Others'],
        ['Waterlogging', 'Pollution', 'Others'],
    ];

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(name, index) {
    console.log(name);
    this.setState({showsecondscreen: true, selectedcategory: name, currentIndex: index});
  }

  render() {
    return (
      <div className="addtagdialog-component">
        <div className = "adddialog-window">
          <div className = "adddialog-title"> Got something new?
          <br/>
          What is it about?
          <br/>
          <div style = {{'display': (this.state.showsecondscreen) ? 'none': ''}} >
          <SelectableRadioButtonComponent index = {0} onClick = {this.clickHandler} ref = "button1" name = "Crowds" icon = "crowd-icon" buttontext="Crowd" />
          <SelectableRadioButtonComponent index = {1} onClick= {this.clickHandler} ref = "button2" name = "Hazard" icon = "hazard-icon" buttontext="Hazards" />
          <SelectableRadioButtonComponent index = {2} onClick= {this.clickHandler} ref = "button3" name = "Events" icon = "events-icon" buttontext="Events" />
          <br/>
          <SelectableRadioButtonComponent index = {3} onClick= {this.clickHandler} ref = "button4" name = "Offers" icon = "offers-icon" buttontext="Offers" />
          <SelectableRadioButtonComponent index = {4} onClick= {this.clickHandler} ref = "button5" name = "Public Services" icon = "public-services-icon" buttontext="Public Services" />
          <SelectableRadioButtonComponent index = {5} onClick= {this.clickHandler} ref = "button6" name = "Roads" icon = "roads-icon" buttontext="Roads" />
          <br/>
          <SelectableRadioButtonComponent index = {6} onClick= {this.clickHandler} ref = "button7" name = "Safety" icon = "safety-icon" buttontext="Safety" />
          <br/>
          <button className = "adddialog-cancel" onClick = {this.props.cancelShow}>Cancel</button>
          </div>
          </div>
          <div style = {{'display': (this.state.showsecondscreen) ? '': 'none'}} >
          <table className = "second-screen-table">
          <tr>
          <td>Selected Category:</td>
          <td>
            <input type="text" value = {this.state.selectedcategory} className="form-control" id="usr" disabled = "true"/>
          </td>
          </tr>
          <tr>
          <td>Select Subcategory:</td>
          <td>
          <select className = "form-control">
            {this.subcategories[this.state.currentIndex].map( element =>
              <option value = "fdsf">{element}</option>
            )}
          </select>
          </td>
          </tr>
          <tr>
          <td>What is it about?:</td>
          <td><div className = "second-screen-select">
            <textarea className="form-control" rows="5" id="comment"></textarea>
          </div></td>
          </tr>
          <tr>
          <td>
          </td>
          <td>          <button className = "addfilterdialog-submit">Submit</button>
                    <button className = "addfilterdialog-cancel" onClick = {this.props.cancelShow}>Cancel</button>
          </td>
          </tr>
          </table>


          </div>
        </div>
      </div>
    );
  }
}

AddTagDialogComponent.displayName = 'DialogAddtagsAddTagDialogComponent';

// Uncomment properties you need
AddTagDialogComponent.propTypes = {
  cancelShow: React.PropTypes.func,
};
// AddTagDialogComponent.defaultProps = {};

export default AddTagDialogComponent;
