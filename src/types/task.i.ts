export enum TaskStatus {
  None = '',
  Pending = 'pending',
  ToDo = 'todo',
  InProgress = 'in_progress',
  Review = 'review',
  Test = 'test',
  Done = 'done',
}

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
}
