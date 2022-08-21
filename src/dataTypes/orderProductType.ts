import Product from './productType';

type OrderProduct = {
  id?: number;
  quantity: number;
  orderId: number;
  productId: number;
  products?: Product[];
};

export default OrderProduct;
