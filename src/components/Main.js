require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import HeaderComponent from './HeaderComponent';
import MapComponent from './MapComponent';
import AddFilterTagDialogComponent from 'components/dialog/filtertags/AddFilterTagDialogComponent';
import AddTagDialogComponent from 'components/dialog/addtags/AddTagDialogComponent';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayFilterDialog: false,
      displayAddDialog: false,
    }
    this.showAddDialog = this.showAddDialog.bind(this);
  }

  showAddDialog(lat, long) {
    this.setState({displayAddDialog: true});
    console.log(lat);
    console.log(long);
  }

  render() {
    return (
      <div class = "main-component">
      {(  this.state.displayAddDialog) ? <AddTagDialogComponent
          cancelShow = {() => {this.setState({displayAddDialog: false});}}
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
