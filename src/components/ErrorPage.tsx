import { useNavigate, useRouteError } from 'react-router-dom';
import Button from './ui/Button';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Oops!</h1>
        <p className="text-lg text-gray-800">
          Sorry, an unexpected error has occurred.
        </p>
        <Button onClick={() => navigate('/')}>Go to home</Button>
      </div>
    </div>
  );
}
