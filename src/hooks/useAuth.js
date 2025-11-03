import { useSelector } from 'react-redux';
import { useAuth as useRootAuth } from '@/layouts/Root';

export const useAuth = () => {
  const { user, isAuthenticated } = useSelector(state => state.user);
  const { logout } = useRootAuth();
  
  return {
    user,
    loading: false,
    isAuthenticated: () => isAuthenticated,
    logout
  };
};