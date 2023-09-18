import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="container mx-auto flex justify-end gap-x-3">
      <Link
        to="/login"
        className="bg-gradient-to-r from-yellow-600/90 to-lime-900/90 hover:from-yellow-700 hover:to-lime-950  rounded-md py-2 px-10 text-white no-underline font-medium"
      >
        Sign in
      </Link>
      <Link
        to="/register"
        className="bg-gradient-to-r from-yellow-600/80 to-lime-900 hover:from-yellow-700 hover:to-lime-950  rounded-md py-2 px-10 text-white no-underline font-medium"
      >
        Sign up
      </Link>
    </div>
  );
};

export default Header;
