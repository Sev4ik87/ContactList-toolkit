import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createContactAsync,
  updateContactAsync,
  deleteContactAsync,
  selectContactForEdit,
} from '../../store/slices/contactSlice';
import './ContactForm.css';

function ContactForm() {
  const contactForEdit = useSelector(selectContactForEdit);
  const dispatch = useDispatch();
  const [editContact, setEditContact] = useState(contactForEdit);

  useEffect(() => {
    setEditContact(contactForEdit);
  }, [contactForEdit]);

  const onInputChange = (e) => {
    setEditContact({ ...editContact, [e.target.name]: e.target.value });
  };

  const onClearField = (fieldName) => {
    setEditContact({ ...editContact, [fieldName]: '' });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!editContact.id) {
      dispatch(createContactAsync(editContact));
    } else {
      dispatch(updateContactAsync(editContact));
    }
  };

  const onContactDelete = () => {
    if (editContact.id) {
      dispatch(deleteContactAsync(editContact.id));
    }
  };

  return (
    <form id='contact-form' onSubmit={onFormSubmit}>
      <div className='form-container'>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='First name'
            required
            name='firstName'
            value={editContact.firstName}
            onChange={onInputChange}
          />
          <span className='clear' onClick={() => onClearField('firstName')}>
            X
          </span>
        </div>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='Last name'
            required
            name='lastName'
            value={editContact.lastName}
            onChange={onInputChange}
          />
          <span className='clear' onClick={() => onClearField('lastName')}>
            X
          </span>
        </div>
        <div className='contact-info'>
          <input
            type='email'
            className='text-field'
            placeholder='Email'
            required
            name='email'
            value={editContact.email}
            onChange={onInputChange}
          />
          <span className='clear' onClick={() => onClearField('email')}>
            X
          </span>
        </div>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='Phone'
            required
            name='phone'
            value={editContact.phone}
            onChange={onInputChange}
          />
          <span className='clear' onClick={() => onClearField('phone')}>
            X
          </span>
        </div>
      </div>

      <div className='btns'>
        <button id='save' type='submit'>
          Save
        </button>
        {editContact.id && (
          <button id='delete' type='button' onClick={onContactDelete}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
