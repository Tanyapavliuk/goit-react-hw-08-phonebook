import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'redux/sliceFilter';

import { Form } from 'react-bootstrap';

const Filter = () => {
  const dispatch = useDispatch();
  const value = useSelector(state => state.filter);

  return (
    <Form.Control
      className="py-3 mb-4"
      type="text"
      name="query"
      onChange={e => dispatch(changeFilter(e.target.value))}
      value={value}
      placeholder="Search..."
      aria-describedby="passwordHelpBlock"
    />
  );
};

export default Filter;
