import {useEffect, useState} from 'react'
import {getUsers} from '../services/userService'
import type {User} from '../types/user'

export const useUsers = () => {
     const [users, setUsers] = useState<User[]>([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getUsers()
            setUsers(data);
          } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users. Please try again.');
          } finally {
            setLoading(false)
          }
        }

        fetchData();
      }, []);

      return { users, loading, error };
}