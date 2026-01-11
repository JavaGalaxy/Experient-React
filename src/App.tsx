import './App.css';
import type { User } from './types/user';
import { useState } from 'react';
import { useUsers } from './hooks/useUsers';
import { UserSearchAndDisplay } from './components/UserSearchAndDisplay';

const App = () => {
  const { users, loading, error } = useUsers();
  const [selected, setSelected] = useState<User | null>(null);

  const onUserSelected = (_: React.SyntheticEvent, newValue: User | null) => {
    setSelected(newValue);
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <UserSearchAndDisplay
      users={users}
      selected={selected}
      onUserSelected={onUserSelected}
    />
  );
};

export default App;
