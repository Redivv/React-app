type Task = {
  id?: string;
  user_id: number | null;
  title: string;
  description: string;
  validation_terms: string;
  validation_comments: string;
  notes: string;
  column_number: number;
  user?: { id: number; email: string } | null;
};

export default Task;
