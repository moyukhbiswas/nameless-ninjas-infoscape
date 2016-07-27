require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import HeaderComponent from './HeaderComponent';
import MapComponent from './MapComponent';
import AddFilterTagDialogComponent from 'components/dialog/filtertags/AddFilterTagDialogComponent';
import AddTagDialogComponent from 'components/dialog/addtags/AddTagDialogComponent';
import $ from 'jquery';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayFilterDialog: false,
      displayAddDialog: false,
    }
    this.showAddDialog = this.showAddDialog.bind(this);
    this.handleAddDialogSubmit = this.handleAddDialogSubmit.bind(this);
  }

  showAddDialog(lat, long) {
    this.setState({displayAddDialog: true});
    this.lat = lat;
    this.long = long;
  }

  handleAddDialogSubmit(category, email, subcategory, message) {
    this.addMessageAPICall(category, this.lat, this.long, email, subcategory, message);
    
    // function from maps.js
    window.addNewPin(category, this.lat, this.long, email, subcategory, message);
    
    this.setState({displayAddDialog: false});
  }

  addMessageAPICall(cat,lat,longitude,email,subCat = "",msg = "")
  {
    $.ajax({
      type:"POST",
      url: "/api/add_msg",
      data : {
        category: cat,
        sub_cat: subCat,
        email: email,
        msg: msg ,
        lat: lat,
        longitude: longitude
      },
      success: function(data){
        console.log("Successful addMsg");
        console.log(data);
      },
      error: function(err){
        console.log("Error addMsg ");
        console.log(err);
      }

    });
  }

  render() {
    return (
      <div class = "main-component">
      {(  this.state.displayAddDialog) ? <AddTagDialogComponent
          cancelShow = {() => {this.setState({displayAddDialog: false});}}
          onSubmit = {this.handleAddDialogSubmit}
        />: ''}
      {(  this.state.displayFilterDialog) ? <AddFilterTagDialogComponent
          cancelShow = {() => {this.setState({displayFilterDialog: false});}}
        />: ''}
      <HeaderComponent onFilterClick = {() => {this.setState({displayFilterDialog: true})}}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
