type Task = {
  id?: string;
  user_id: number | null;
  user_name?: string | null;
  title: string;
  description: string;
  validation_terms: string;
  validation_comments: string;
  notes: string;
  column_number: number;
};

export default Task;
