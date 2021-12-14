type Order = {
  id?: string;
  title: string;
  client: string;
  shipping_address: string;
  shipping_deadline: string;
  notes: string;
  created_at?: string;
  updated_at?: string;
  archived_at: string | null;
};

export default Order;
