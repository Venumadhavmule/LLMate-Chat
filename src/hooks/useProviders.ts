import { useQuery } from '@tanstack/react-query';
import { providersApi } from '../api/providers.api';
import { useModelStore } from '../store';
import { useEffect } from 'react';

export function useProviders() {
  const { setAvailableProviders } = useModelStore();

  const query = useQuery({
    queryKey: ['providers'],
    queryFn: providersApi.getProviders,
    refetchInterval: 30000, // 30 seconds
    // Optional config depending on query client setup defaults
  });

  useEffect(() => {
    if (query.data) {
      setAvailableProviders(query.data);
    }
  }, [query.data, setAvailableProviders]);

  return query;
}
