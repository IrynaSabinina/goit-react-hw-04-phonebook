import { useState } from 'react';
import { Form } from './Form/Form';
import { ContactsList } from './Contacts/ContactsList';
import { FindElement } from './FindElement/FindElement';
import { useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return localStorage.getItem('contacts')
      ? JSON.parse(localStorage.getItem('contacts'))
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitHandlerAddContacts = data => {
    contacts.find(contact => contact.name === data.name)
      ? alert('This contacts allrady in')
      : setContacts(prevState => [...prevState, data]);
  };

  const hendleChangeFindElement = ({ target: { value } }) => {
    setFilter(value);
  };

  const addAvaliableList = () => {
    return contacts.filter(({ name }) =>
      name.toUpperCase().includes(filter.toUpperCase())
    );
  };

  const contactDelete = key => {
    setContacts(contacts.filter(contact => contact.id !== key));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={onSubmitHandlerAddContacts} />
      <FindElement
        filter={filter}
        hendleChangeFindElement={hendleChangeFindElement}
      />
      <ContactsList
        contacts={addAvaliableList()}
        contactDelete={contactDelete}
      />
    </div>
  );
};
