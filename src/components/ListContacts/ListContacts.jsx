import { useEffect } from 'react';
import {
  useDeleteContactMutation,
  useGetAllContactsQuery,
} from '../../redux/sliceContact';
import { Skeleton } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const ListContact = () => {
  const { data, isFetching, isError, refetch } = useGetAllContactsQuery();
  const [fnDelete] = useDeleteContactMutation();
  const filter = useSelector(state => state.filter);
  console.log(filter);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = e => {
    fnDelete(e.target.id);
    refetch();
  };

  const visibleContacts = () => {
    if (filter) {
      return data.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return data;
  };

  if (isError) return <div>An error has occurred!</div>;

  if (isFetching)
    return <Skeleton startColor="#ac8813" endColor="#0b5301" height="20px" />;

  return (
    <ul className="p-0 flex flex-col gap-y-3">
      {visibleContacts().map(el => (
        <li
          key={el.id}
          className="flex justify-between items-center bg-lime-700/40  px-3"
        >
          <div className="flex gap-x-2 items-center">
            <p className="m-0 text-lg">{el.name}:</p>
            <p className="m-0">{el.number}</p>
          </div>

          <span
            id={el.id}
            className=" text-[30px] cursor-pointer"
            onClick={handleDelete}
          >
            &#215;
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ListContact;
