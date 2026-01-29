import { useQuery } from '@tanstack/react-query';
import { getUserStats } from '../lib/services/userServices';

const userKeys = {
  stats: ['users', 'stats'] as const,
};

export const useUserStats = () => {
  return useQuery({
    queryKey: userKeys.stats,
    queryFn: getUserStats,
  });
};