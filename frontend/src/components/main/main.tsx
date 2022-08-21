import './styles.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { authActions } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/user';

const Main = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/login');
  };

  const handleGetUsers = () => {
    dispatch(userActions.getAllUsers());
  };

  return (
    <main className="main-page">
      Home page
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <button onClick={handleGetUsers}>Get users</button>
      {users?.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </main>
  );
};

export default Main;
