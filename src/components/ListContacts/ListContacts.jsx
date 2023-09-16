import { useDispatch, useSelector } from 'react-redux';
import { deleteContactByID, getAllContanct } from 'redux/sliceContact';
import Table from 'react-bootstrap/Table';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';

const ListContact = () => {
  const { contacts } = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const [visibleContacts, setVisibleContacts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContanct());
  }, [dispatch]);

  useEffect(() => {
    const visibleContactList = () => {
      if (contacts.length > 0) {
        return contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        );
      }
      return contacts;
    };
    setVisibleContacts(visibleContactList());
  }, [contacts, filter]);

  return (
    <Table striped bordered hover variant="ligth">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {visibleContacts.map((contact, i) => (
          <tr key={nanoid()}>
            <td>{i + 1}</td>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
            <td
              onClick={() => {
                dispatch(deleteContactByID(contact.id));
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <span>&#215;</span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListContact;
