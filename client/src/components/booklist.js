import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getBooks, addBook, updateBook, setModal } from '../actions/bookactions';
import PropTypes from 'prop-types';
import Book from './book';
import AddBook from './addBook';
import GenericModal from "./modal";

class BookList extends Component {

  state = {
    searchedText: ""
  }

  componentDidMount() {
    this.props.getBooks();
  };

  handleSearchText = (e) =>{
    this.setState({searchedText: e.target.value})
  }

  onEdit = (_b) =>{
    this.props.setModal({
      modalOpen: true,
      isEdit: true,
      selectedBook: _b
    })
  }

  closeModal = () =>{
    this.props.setModal({
      modalOpen: false,
      isEdit: false,
      selectedBook: {}
    })
  }

  onSubmitForm = (data) =>{
    if(this.props.modalProps.isEdit){
      this.props.updateBook(data);
    }else{
      this.props.addBook(data);
    }
  }

  searchBook = () =>{
  this.props.getBooks(this.state.searchedText);
  }


  render() {

    const { books, modalProps={}, loading } = this.props;
    const {isEdit, modalOpen, selectedBook} = modalProps;

    if(loading){
      return(
        <div className="loading">Loading...</div>
      )
    }

    return (
      <div className="main-container">
         <GenericModal onClose={this.closeModal} isOpen={modalOpen}>
          <AddBook isEdit={isEdit} formData={selectedBook} onSubmitForm={this.onSubmitForm} />
        </GenericModal>

        <div className="search-book">
          <input type="text" placeholder="Search book by name" value={this.state.searchedText} onChange={this.handleSearchText} />
          <button onClick={this.searchBook}>Search Book</button>
        </div>

        {
          books && books.length ?
          <div className="book-list">
            {
              books.map((item, key)=>{
                return (
                <Book 
                  key={item.id} 
                  book={item}
                  editBook={this.onEdit}
                  ></Book>
                )
              })
            }
          </div>: 
          <div className="book-list">
            {this.state.searchedText ? "No books available matching your query" :"Book Stor Is Empty!"}
          </div>
        }
       </div>
    );
  }
}

BookList.propTypes = {
  getBooks: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  books: state.books,
  modalProps: state.modalProps,
  loading: state.loading,
});

export default connect(mapStateToProps,
  { getBooks,
    addBook,
    updateBook,
    setModal,
  }
)(BookList);