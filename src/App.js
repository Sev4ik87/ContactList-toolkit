// src/App.js
import React from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import './App.css';

function App() {
 

  return (
    <div className='container'>
      <h1 className='header'>Contact List</h1>
      <div className='main'>
        <ContactList />
        <ContactForm/>
      </div>
    </div>
  );
};

export default App;
