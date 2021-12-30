type Notification = {
  id: number;
  content: string;
  user_id: number;
  order_id: number | null;
  created_at: string;
  order: {
    id: number;
    archived_at: string | null;
  };
};

export default Notification;
