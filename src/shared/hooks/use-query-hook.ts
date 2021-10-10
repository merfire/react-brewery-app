import { useLocation } from 'react-router';

// useQuery hook helper for easier access to query params
export const useQuery = () => new URLSearchParams(useLocation().search);
