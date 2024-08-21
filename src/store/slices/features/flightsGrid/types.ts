import type { ApiFilter } from '@/types/api/Filter';

export interface FlightsGridState {
  filter: ApiFilter | null;
}
