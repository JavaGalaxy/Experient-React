import './App.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import type { User } from './types/user';
import { useState } from 'react';
import { useUsers } from './hooks/useUsers';
import { getFormattedName } from './utils/parseNameComponent';

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
    <>
      <div>
        <Autocomplete
          disablePortal
          options={users}
          value={selected}
          onChange={onUserSelected}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Name" />}
        />
      </div>

      {selected && (
        <Box sx={{ textAlign: 'left' }}>
          <p>{getFormattedName(selected.name)}</p>
          <p>{selected.address.street}</p>
          <p>{selected.address.suite}</p>
          <p>{selected.address.zipcode}</p>
        </Box>
      )}
    </>
  );
};

export default App;
