import axios from 'axios';
import { GET_BOOKS, ADD_BOOK, UPDATE_BOOK, SEARCH_BOOK, BOOKS_LOADING, SET_MODAL } from './types';

export const getBooks = (text) => dispatch => {
  dispatch(setBooksLoading(true));
  axios
    .get('http://localhost:5000/books')
    .then(res =>{
      const books = Object.keys(res.data).map(i=> res.data[i]);
      dispatch(setBooksLoading(false));
      dispatch({
        type: GET_BOOKS,
        payload: books
      })
      if(text){
        dispatch ({
          type: SEARCH_BOOK,
          payload: {searchedText: text}
        });
      }
    })
};

export const addBook = book => dispatch => {
  axios
    .post('http://localhost:5000/books', book)
    .then(res =>{
      dispatch({
        type: SET_MODAL,
        payload:  {
          modalOpen: false,
          isEdit: false,
          selectedBook: {}
        }
      })
      dispatch(getBooks(true));
      alert("book added");
    })
};

export const updateBook = book => dispatch => {
  axios
    .put(`http://localhost:5000/books/${book.id}`, book)
    .then(res =>{
      dispatch({
        type: SET_MODAL,
        payload:  {
          modalOpen: false,
          isEdit: false,
          selectedBook: {}
        }
      })
      dispatch(getBooks());
      alert("book updated")
    })
};

export const deleteBook = id => dispatch => {
  axios
    .delete(`http://localhost:5000/books/${id}`)
    .then(res =>{
      dispatch(getBooks());
    })
};

export const setBooksLoading = (isLoading)  => dispatch => {
  dispatch ({
    type: BOOKS_LOADING,
    payload: isLoading
  });
};

export const setModal = (payload) => dispatch =>{
  dispatch({
    type: SET_MODAL,
    payload,
  })
};

export const searchBook = (text)  => dispatch => {
  dispatch ({
    type: SEARCH_BOOK,
    payload: {searchedText: text}
  });
};