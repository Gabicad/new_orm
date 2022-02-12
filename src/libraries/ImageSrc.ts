import { IProductImages } from '../models/Product';

export const getImageSrc = (Image: IProductImages) =>
  `https://www.mgmbackend.biogames.hu/storage/img/${Image.product_id}/${Image.id}.jpg`;
