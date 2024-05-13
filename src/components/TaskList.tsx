import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { fetchTasks, nextPage, prevPage, setPage } from '../redux/actions';
import { apiClient } from '../utils/http.util';
import Button from './ui/Button';
import Card from './ui/Card';
import { TaskStatus } from '../types/task.i';
import useModal from '../hooks/useModal.hook';
import TaskForm from './TaskForm';

const getStatusColor = (status) => {
  switch (status) {
    case TaskStatus.Pending:
      return 'bg-yellow-500';
    case TaskStatus.Done:
      return 'bg-green-500';
    case TaskStatus.InProgress:
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

export default function TaskList() {
  const { open, Modal, close } = useModal();
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks);
  const currentPage = useSelector((state: any) => state.currentPage);
  const totalPages = useSelector((state: any) => state.totalPages);
  const error = useSelector((state: any) => state.error);

  useEffect(() => {
    dispatch(fetchTasks(currentPage) as any);
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(nextPage());
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(prevPage());
    }
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const deleteRequest = (id: string) => {
    withReactContent(Swal)
      .fire({
        title: 'Are you sure you sure?',
        text: 'This action is irreversible',
        showCancelButton: true,
        confirmButtonText: 'Delete',
      })
      .then((result) => {
        if (result.isConfirmed) {
          apiClient.remove(`tasks/${id}`);
          dispatch(fetchTasks(currentPage) as any);
          Swal.fire('Deleted!', '', 'success');
        }
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const viewTask = (id: string) => {
    // Implement view task functionality here
    open(<TaskForm close={close} id={id} />, 'Update task');
  };

  return (
    <div className="w-full mx-auto my-8 p-4 bg-accent/10 shadow-md rounded-md">
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks &&
          tasks.map((task) => (
            <div key={task.id}>
              <Card
                title={
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold text-white ${getStatusColor(
                      task.status
                    )} rounded-md`}
                  >
                    {task.status}
                  </span>
                }
                icon={''}
              >
                <div>
                  <h3 className="text-placeholder text-xl font-bold mb-2">
                    {task.title}
                  </h3>
                </div>
                <div className="flex justify-between">
                  <Button
                    onClick={() => deleteRequest(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </Button>
                  <Button onClick={() => viewTask(task.id)} bType="secondary">
                    View
                  </Button>
                </div>
              </Card>
            </div>
          ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </Button>
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            className={`mx-1 px-3 py-1 bg-white text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 ${
              page === currentPage ? 'font-bold' : ''
            }`}
          >
            {page}
          </Button>
        ))}
      </div>
      <Modal />
    </div>
  );
}
