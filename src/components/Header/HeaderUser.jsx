import { Link } from 'react-router-dom';
import { Avatar, AvatarBadge } from '@chakra-ui/react';
import { useLogOutUserMutation } from 'redux/userRTKQuery';
import { resetToken, resetUserInfos } from '../../redux/sliceUser';
import { useDispatch, useSelector } from 'react-redux';

const HeaderUser = () => {
  const user = useSelector(state => state.token.name);
  const [resetUser] = useLogOutUserMutation();

  const dispatch = useDispatch();

  const handelClickLogOut = () => {
    resetUser();
    dispatch(resetToken());
    dispatch(resetUserInfos());
  };
  return (
    <div className="container mx-auto flex justify-end items-center gap-x-3">
      <div className="flex gap-x-2 items-center rounded-md bg-gradient-to-r from-yellow-600/90 to-lime-900/90 py-1 px-3">
        <Avatar size="sm">
          <AvatarBadge boxSize="1.25em" bg="green.700" />
        </Avatar>
        <p className="m-0 text-white">{user}</p>
      </div>

      <Link
        onClick={handelClickLogOut}
        to="/"
        className="bg-gradient-to-r from-yellow-600/90 to-lime-900/90 hover:from-yellow-700 hover:to-lime-950  rounded-md py-2 px-10 text-white no-underline font-medium"
      >
        Log out
      </Link>
    </div>
  );
};

export default HeaderUser;
