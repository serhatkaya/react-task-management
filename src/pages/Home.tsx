import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  const nav = useNavigate();
  return (
    <div>
      <section className="bg-blue-500 text-white py-16 text-center rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">Effortless Task Management</h1>
        <p className="text-lg">
          Simplify your life with our intuitive task management app.
        </p>
      </section>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-placeholder text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card icon="📝" title="Task Creation">
              Easily create and organize tasks with our intuitive interface.
            </Card>
            <Card icon="🔄" title="Task Tracking">
              Keep track of your tasks and monitor their progress effortlessly.
            </Card>
            {/* <Card icon="🗂️" title="Categorization">
              Organize tasks into categories for better management and
              prioritization.
            </Card> */}
          </div>
        </div>
      </section>

      <section className="bg-blue-500 text-white py-16 text-center rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Start Organizing Today</h2>
        <p className="text-lg">
          Sign up now and experience the power of efficient task management.
        </p>
        <Button
          onClick={() => nav('register')}
          className="bg-white text-blue-500 px-6 py-3 rounded-full mt-8 font-bold hover:bg-blue-400 hover:text-white"
        >
          Get Started
        </Button>
      </section>
    </div>
  );
};

export default Home;
