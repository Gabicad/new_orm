import { createStoreon, StoreonModule } from 'storeon';
import { productService } from '../../services/api';
import { ProductEventKeys, ProductEvents } from './product.events';
import { ProductState } from './product.state';
import { IProduct, IProductList } from '../../models/Product';
import { getMaxId } from '../../libraries/utils';

const getProductById = async (id: number) => {
  try {
    const data = await productService.getProduct(id);
    return data ? data : undefined;
  } catch (e) {
    console.log('Product not found');
  }
};

export const ProductModule: StoreonModule<ProductState, ProductEvents> = (store) => {
  store.on('@init', () => ({ products: [] }));

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
        const maxValueOfY = getMaxId<IProductList>(state.products);
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
  store.on(ProductEventKeys.ClearStateEvent, (state) => ({
    currentProduct: undefined
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
