import { IProductImages } from '../models/Product';

export const getImageSrc = (Image: IProductImages) =>
  `https://mgm1.biogames.hu/storage/img/${Image.product_id}/${Image.id}.jpg`;
