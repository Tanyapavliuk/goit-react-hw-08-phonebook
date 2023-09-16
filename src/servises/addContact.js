import { nanoid } from '@reduxjs/toolkit';

export const addNewContact = async (name, phone) => {
  const BASE_URL = 'https://64fb18ddcb9c00518f7aa3b2.mockapi.io/api';

  try {
    const response = await fetch(`${BASE_URL}/contacts`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        phone: Number(phone),
        uid: nanoid(),
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    if (!response.ok) throw new Error('Wrong');
    return response.json();
  } catch (error) {
    return error.message;
  }
};
