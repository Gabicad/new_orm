import { IProductList } from '../models/Product';

export const getMaxId = <T extends Record<string, any>>(arr: T[]) =>
  Math.max(...arr.map((o: T) => (o.id ? o.id : 0)));

export const getMaxUpdatedAt = <T extends Record<string, any>>(arr: T[]) =>
  Math.max(...arr.map((e: T) => e.updated_at));
