import { apiClient } from './client';
import type { ProviderInfoDto } from '../types/api.types';

export const providersApi = {
  getProviders: async (): Promise<ProviderInfoDto[]> => {
    const res = await apiClient.get<ProviderInfoDto[]>('/api/v1/providers');
    return res.data;
  },

  getHealth: async (): Promise<any> => {
    const res = await apiClient.get<any>('/api/v1/health', {
      timeout: 5000
    });
    return res.data;
  }
};
