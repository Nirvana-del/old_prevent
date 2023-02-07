import { useContext } from 'react';
import { AuthContext } from '@/components/Auth/AuthProvider';

export const useAuthContext = () => {
    return useContext(AuthContext);
};
