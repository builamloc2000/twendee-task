import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
    try {
        
        const response = await fetch(`https://randomuser.me/api/?results=100`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
});
