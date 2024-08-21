import type { ApiFilter } from '@/types/api/Filter';

export interface PaginatedQuery {
  page?: number;
  pageSize?: number;
  order?: 'asc' | 'desc';
  sort?: string;
  filter?: ApiFilter | null;
}
