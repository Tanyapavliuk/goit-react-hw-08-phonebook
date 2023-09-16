export const deleteContact = async id => {
  const BASE_URL = 'https://64fb18ddcb9c00518f7aa3b2.mockapi.io/api';

  const response = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Smth was wrong');
  return response.json();
};
