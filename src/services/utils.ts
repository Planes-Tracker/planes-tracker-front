import type { Response } from '@/types/api/Response';

export const transformApiResponse = <T>(response: Response<T>) => response.data;
