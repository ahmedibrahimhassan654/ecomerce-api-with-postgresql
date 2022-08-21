import OrderProduct from './orderProductType';

type Order = {
  id?: number;
  status: string;
  user_id: number;
  userName?: string;
  products?: OrderProduct[];
};

export default Order;
