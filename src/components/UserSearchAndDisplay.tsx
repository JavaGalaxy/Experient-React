import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import type { User } from '../types/user';
import { getFormattedName } from '../utils/parseNameComponent';

interface UserSearchAndDisplayProps {
  users: User[];
  selected: User | null;
  onUserSelected: (_: React.SyntheticEvent, newValue: User | null) => void;
}

export const UserSearchAndDisplay = ({
  users,
  selected,
  onUserSelected,
}: UserSearchAndDisplayProps) => {
  return (
    <>
      <div>
        <Autocomplete
          disablePortal
          options={users}
          value={selected}
          onChange={onUserSelected}
          getOptionLabel={(option) => getFormattedName(option.name)}
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
