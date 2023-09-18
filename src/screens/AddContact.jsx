import Filter from 'components/Filter/Filter';
import FormContact from 'components/Form/Form';
import ListContact from 'components/ListContacts/ListContacts';

const AddContact = () => {
  return (
    <main className="container mx-auto w-full py-3 grid md:grid-cols-2 md:gap-x-20">
      <FormContact />
      <div>
        <Filter />
        <ListContact />
      </div>
    </main>
  );
};

export default AddContact;
