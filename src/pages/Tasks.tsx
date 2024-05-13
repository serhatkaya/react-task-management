import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Button from '../components/ui/Button';
import useModal from '../hooks/useModal.hook';

const Tasks = () => {
  const { open, Modal, close } = useModal();
  const handleNewTask = () => {
    open(
      <div>
        <TaskForm close={close} />
      </div>,
      'Create new task'
    );
  };
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button bType="secondary" onClick={handleNewTask}>
          New Task
        </Button>
      </div>

      <TaskList />
      <Modal />
    </>
  );
};

export default Tasks;
