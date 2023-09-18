import Header from 'components/Header/Header';
import HeaderUser from 'components/Header/HeaderUser';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const isUser = useSelector(state => state.token.token);
  return (
    <div>
      <header className="shadow-md py-2">
        {!isUser ? <Header /> : <HeaderUser />}
      </header>
      <Suspense fallback={<div>Loading main content...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
