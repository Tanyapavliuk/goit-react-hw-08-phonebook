//------------асинхронна функція запиту на бекенд-----------
export const getContacts = async () => {
  const BASE_URL = 'https://64fb18ddcb9c00518f7aa3b2.mockapi.io/api';
  try {
    const response = await fetch(`${BASE_URL}/contacts`);
    if (!response.ok) throw new Error('Smth was wrong');
    return response.json();
  } catch (error) {
    return error;
  }
};
