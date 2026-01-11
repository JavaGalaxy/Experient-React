import {useEffect, useState} from 'react'
import {getUsers} from '../services/userService'
import type {User} from '../types/user'

export const useUsers = () => {
     const [users, setUsers] = useState<User[]>([]);
    
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

      return {users}
}