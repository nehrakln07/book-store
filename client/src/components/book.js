import React from 'react';


const Book = (props) =>{
  const { editBook, book } = props;
  const {name, description, author, counts} = book;

  const onEdit = () =>{
    editBook(book);
  }
  
  return(
    <div className="book-container">
      <div className="book-wrapper">
        <h2 className="book-name">{name}</h2>
        <p className="book-desc">{description}</p>
        <p className="book-author">{"- By "+author}</p>
      </div>
      <div className="book-info">
        <span className="count">{"Count: "+counts}</span>
        <button className="" onClick={onEdit}>Edit</button>
      </div>
    </div>
  )
}

export default Book;