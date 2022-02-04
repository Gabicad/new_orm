import { createStoreon, StoreonModule } from 'storeon';
import { productService } from '../../services/api';
import { ProductEventKeys, ProductEvents } from './product.events';
import { ProductState } from './product.state';
import { IProduct, IProductList } from '../../models/Product';

export const ProductModule: StoreonModule<ProductState, ProductEvents> = (store) => {
  store.on('@init', () => ({ products: [] }));

  store.on(ProductEventKeys.InitProductsEvent, async (state) => {
    try {
      let data = undefined;
      if (state.products.length > 0) {
        const maxValueOfY = Math.max(...state.products.map((o: IProductList) => (o.id ? o.id : 0)));
        const lastId = await productService.getLastId();
        if (maxValueOfY !== lastId) {
          data = await productService.getAllProduct();
        }
      } else {
        data = await productService.getAllProduct();
      }

      if (data !== undefined) {
        store.dispatch(ProductEventKeys.LoadProductsEvent, data);
      }
    } catch (e) {
      console.error('Product Module Store InitProductsEvent');
    }
  });

  store.on(ProductEventKeys.LoadProductsEvent, (state, Products: IProductList[]) => ({
    products: Products
  }));
  store.on(ProductEventKeys.SaveProductEvent, (state, product: IProduct) => ({
    products: [...state.products, product]
  }));
  store.on(ProductEventKeys.UpdateProductEvent, (state, product: IProduct) => {
    const foundIndex = state.products.findIndex((x: IProductList) => x.id == product.id);
    state.products[foundIndex] = product;
    return {
      products: [...state.products]
    };
  });
};

export const ProductStore = createStoreon<ProductState, ProductEvents>([ProductModule]);
