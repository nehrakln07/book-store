import { GET_BOOKS, ADD_BOOK, UPDATE_BOOK, SEARCH_BOOK, BOOKS_LOADING, SET_MODAL } from '../actions/types';

const initialState = {
  books: [],
  loading: false,
  modalProps: {
    modalOpen: false,
    isEdit: false,
    selectedBook: null
  }
};


export default function(state = initialState, action) {
  switch(action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [action.payload, ...state.books]
      };
    case UPDATE_BOOK:
      const updatedBooks = state.books.map(book => {
        if (book._id === undefined) {
          if(book.id === action.payload.id){
            return { ...book, ...action.payload}
          }
        } else {
          if(book._id === action.payload._id){
            return { ...book, ...action.payload}
          }
        }
        return book;
      });
      return {
        books: updatedBooks
      };
    case BOOKS_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_MODAL:
      return {
        ...state,
        modalProps: {
          ...action.payload
        }
      };
    case SEARCH_BOOK:
      const filteredBooks = state.books.filter(book => {
        if (book.name.toLowerCase().includes(action.payload.searchedText.toLowerCase())) {
          return book;
        }
      });
      return {
        books: filteredBooks
      };
    default:
      return state;
  }
}