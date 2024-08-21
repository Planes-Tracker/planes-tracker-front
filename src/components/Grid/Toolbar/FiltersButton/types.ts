import type { ApiFilter } from '@/types/api/Filter';

export interface FilterOption {
  icon: React.ReactElement | null;
  label: string;
  value: ApiFilter;
}
