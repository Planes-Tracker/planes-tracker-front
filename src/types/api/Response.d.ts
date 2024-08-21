export interface Response<T = unknown> {
  ok: boolean;
  data: T;
}
