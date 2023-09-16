import { Container, Row, Col } from 'react-bootstrap';
import Filter from './Filter/Filter';
import FormContact from './Form/Form';
import ListContact from './ListContacts/ListContacts';

export const App = () => {
  return (
    <Container className="py-10">
      <Row>
        <Col xs={12} md={6} className="pb-10">
          <FormContact />
        </Col>
        <Col md={6}>
          <Filter />
          <ListContact />
        </Col>
      </Row>
    </Container>
  );
};
