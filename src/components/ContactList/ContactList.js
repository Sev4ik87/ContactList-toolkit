import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import './ContactList.css';
import {
  addNewContact,
  selectContact,
  getContactsAsync,
  deleteContactAsync, 
} from '../../store/slices/contactSlice';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contact.contacts);
  

  useEffect(() => {
    dispatch(getContactsAsync()); 
  }, [dispatch]);

  function onAddNewContact() {
    dispatch(addNewContact());
  }

  function onDeleteContact(id) {

    dispatch(deleteContactAsync(id)); 
  }

  function onEditContact(contact) {
    dispatch(selectContact(contact));
  }

  return (
    <div className='list-container'>
      <div className='item-container'>
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDelete={() => onDeleteContact(contact.id)}
            onEdit={() => onEditContact(contact)}
          />
        ))}
      </div>
      <button id='new' onClick={onAddNewContact}>
        New
      </button>
    </div>
  );
}

export default ContactList;