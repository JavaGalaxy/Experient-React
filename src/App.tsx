import './App.css'
import { useState, useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import type { User, ParsedName } from './types/user'
import {getUsers} from './services/userService'

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers()
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const onUserSelected = (_: React.SyntheticEvent, newValue: User | null) => {
    setSelected(newValue)
  }

  const parseNameComponents = (name: string): ParsedName => {
    const parts = name.split(' ');

    let title = '';
    let firstName = '';
    let middleParts = [];
    let lastName = '';
    let suffix: string | undefined = '';

    const titles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'];
    if (titles.some(t => parts[0]?.includes(t))) {
      title = parts[0];
      parts.shift();
    }


    const suffixes = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'V'];
    if (suffixes.some(s => parts[parts.length - 1]?.includes(s))) {
      suffix = parts.pop();
    }

    firstName = parts[0];

    lastName = parts[parts.length - 1];

    middleParts = parts.slice(1, -1);

    return { title, firstName, middleParts, lastName, suffix };
  }

  const getFormattedName = (name: string) => {
    const { title, firstName, lastName, suffix } = parseNameComponents(name);

    let formatted = lastName;
    if (suffix) {
      formatted += ` ${suffix}`;
    }
    formatted += `, ${firstName}`;
    if (title) {
      formatted += ` (${title})`;
    }

    return formatted;
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
            renderInput={
            (params) => <TextField {...params} label="Name" />
         }
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
  )
}

export default App
