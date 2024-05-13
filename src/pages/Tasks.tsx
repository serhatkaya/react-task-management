import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, nextPage, prevPage, setPage } from '../redux/actions';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks);
  const currentPage = useSelector((state: any) => state.currentPage);
  const totalPages = useSelector((state: any) => state.totalPages);
  // const loading = useSelector((state: any) => state.loading);
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

  return (
    <div className="w-full mx-auto my-8 p-4 bg-accent/10 shadow-md rounded-md">
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className="flex"></div>
      {tasks &&
        tasks.map((task) => (
          <>
            <Card title={task.task_number} icon={''}>
              {task.title}
            </Card>
          </> 
        ))}
      {/* <ul>
        <li className="flex justify-between font-bold shadow-md border text-placeholder">
          <span>Title</span>
          <span>Task Number</span>
          <span>Status</span>
        </li>
        {tasks &&
          tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center">
              <span>{task.title}</span>
              <span>{task.status}</span>
              <span>{task.task_number}</span>
            </li>
          ))}
      </ul> */}
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
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            className={`mx-1 px-3 py-1 bg-white text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 ${
              page === currentPage ? 'font-bold' : ''
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
