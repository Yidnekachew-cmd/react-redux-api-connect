import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/users/usersSlice";

const Users = () => {
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <ul>
      {isLoading && <li>Loading...</li>}
      {error && <li>{error}</li>}
      {users.map((user) => (
        <li key={user.email}>{user.name.first} {user.name.last}</li>
      ))}
    </ul>
  );
}

export default Users;