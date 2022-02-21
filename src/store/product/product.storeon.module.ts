import { createStoreon, StoreonModule } from 'storeon';
import { productService } from '../../services/api';
import {
  GetAllManufacturersEvent,
  ProductEventKeys,
  ProductEvents,
  SaveProductEvent
} from './product.events';
import { ProductState } from './product.state';
import { IManufacturer, IProduct, IProductList } from '../../models/Product';
import { getMaxId, getMaxUpdatedAt } from '../../libraries/utils';

const getProductById = async (id: number) => {
  try {
    const data = await productService.getProduct(id);
    return data ? data : undefined;
  } catch (e) {
    console.log('Product not found');
  }
};
const getAllManufacturers = async () => {
  try {
    const data = await productService.getAllManufacturers();
    return data ? data : undefined;
  } catch (e) {
    console.log('manufacturers not found');
  }
};

export const ProductModule: StoreonModule<ProductState, ProductEvents> = (store) => {
  store.on('@init', () => ({ products: [], manufacturers: [] }));

  store.on(ProductEventKeys.DeleteProductImageEvent, async (state, id: number) => {
    try {
      await productService.deleteImage(id);
    } catch (e) {
      console.error('Product Module Store InitProductsEvent');
    }
  });

  store.on(ProductEventKeys.InitProductsEvent, async (state) => {
    try {
      let data = undefined;
      if (state.products.length > 0) {
        const localMaxUpdatedAt: any = getMaxUpdatedAt<IProductList>(state.products);
        const lastModifyDate = await productService.getLastModifyDateTime();
        if (localMaxUpdatedAt !== lastModifyDate) {
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
  store.on(ProductEventKeys.ClearStateEvent, (state) => ({
    currentProduct: undefined
  }));
  store.on(ProductEventKeys.GetAllManufacturersEvent, async (state) => {
    if (state.manufacturers.length > 0) {
      return;
    }
    const manu = await getAllManufacturers();
    if (manu !== undefined) {
      store.dispatch(ProductEventKeys.LoadManufacturersEvent, manu);
    }
  });
  store.on(ProductEventKeys.LoadManufacturersEvent, (state, manu: IManufacturer[]) => ({
    manufacturers: manu
  }));
  store.on(ProductEventKeys.GetProductsEvent, async (state, product_id: number) => {
    const product = await getProductById(product_id);
    if (product !== undefined) {
      store.dispatch(ProductEventKeys.LoadCurrentProductEvent, product);
    }
  });
  store.on(ProductEventKeys.LoadCurrentProductEvent, (state, Product: IProduct) => ({
    currentProduct: Product
  }));
  store.on(ProductEventKeys.LoadProductsEvent, (state, Products: IProductList[]) => ({
    products: Products
  }));

  store.on(ProductEventKeys.AddProductEvent, (state, Product: IProduct) => ({
    products: [...state.products, Product]
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
