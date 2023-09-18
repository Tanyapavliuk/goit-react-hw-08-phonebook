import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import Login from 'screens/Login';
import Registeration from 'screens/Registeration';
import AddContact from 'screens/AddContact';
import Home from 'screens/Home';

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoute redirectTo="/login" />}>
          <Route path="/contacts" element={<AddContact />} />
        </Route>
        <Route path="/" element={<PublicRoute redirectTo="/" />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registeration />} />
        </Route>
      </Route>
    </Routes>
  );
};
