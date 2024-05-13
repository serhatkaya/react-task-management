import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { fetchTasks } from '../redux/actions';
import { Task, TaskStatus } from '../types/task.i';
import { apiClient } from '../utils/http.util';
import Button from './ui/Button';
import Input from './ui/Input';

const TaskForm = ({ close, id = '' }) => {
  const [task, setTask] = useState<Task>({
    title: '',
    description: '',
    status: TaskStatus.None,
  });

  useEffect(() => {
    if (id) {
      apiClient.get(`tasks/${id}`).then((c) => {
        setTask(c as Task);
      });
    }
  }, [id]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (!id) {
      await apiClient.post('tasks', task);
    } else {
      await apiClient.put(`tasks/${id}`, task);
    }

    dispatch(fetchTasks(1) as any);
    close();

    Swal.fire({
      text: id ? 'Task Updated' : 'Task Created',
      icon: 'success',
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!task.title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }

    if (!task.status.trim()) {
      newErrors.status = 'Status is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>
      <div className="mb-4">
        <textarea
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-4">
        <select
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="pending">Pending</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="review">Review</option>
          <option value="test">Test</option>
          <option value="done">Done</option>
        </select>
        {errors.status && <p className="text-red-500">{errors.status}</p>}
      </div>
      <div className="flex justify-end">
        <Button type="submit">{id ? 'Save' : 'Create'}</Button>
      </div>
    </form>
  );
};

export default TaskForm;
