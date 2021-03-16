import React, { useState } from 'react';

const AddBook = (props) => {
  const { onSubmitForm,isEdit } = props;


  const [formData, setFormData] = useState({...props.formData});

  const onChange = e =>{
    const temp = {...formData};
    temp[e.target.name] = e.target.value;
    setFormData(temp);
  }
  const onSubmit = (e) =>{
    e.preventDefault();
    if(!formData.name || !formData.description || !formData.counts || !formData.author ){
      alert("all Field are required");
    }else{
      onSubmitForm(formData);
    }
  }

  return (
    <div className="add-book-container">
      <h1>{isEdit ? "Edit Book": "Add Book"}</h1>
      <form onSubmit={onSubmit} className="form">
        <div className="form-control">
          <label for="title">Book Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Example: Lord of The Rings"
            value={formData.name}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <label for="author">Book Author:</label>
          <input
            type="text"
            name="author"
            placeholder="Example: J.R. Tolkien"
            value={formData.author}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <label for="total_pages">Book Descriptions</label>
          <input
            type="text"
            name="description"
            placeholder="Example: 394"
            value={formData.description}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <label for="total_pages">Counts</label>
          <input
            type="number"
            name="counts"
            placeholder="Example: 394"
            value={formData.counts}
            onChange={onChange}
          />
        </div>
        <button type="submit">{isEdit ? "Edit Book": "Add Book"}</button>
      </form>
    </div>
  )
}

export default AddBook;