import React, { Component } from 'react';
import { setModal } from '../actions/bookactions';

import { connect } from 'react-redux';

const AppNavbar = (props) => {

  const onAdd = () =>{
    props.setModal({
      modalOpen: true,
      isEdit: false,
      selectedBook: {}
    })
  }
  return (
    <div className="navbar">
      <div className="">
        Book Store
      </div>
      <div className="add-book">
        <button className="" onClick={onAdd}>+Add Book</button>
      </div>
    </div>
  );

}

export default connect(null,
  { setModal }
)(AppNavbar);