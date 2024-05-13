import { useState } from 'react';
import Loader from '../components/ui/Loader';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const show = () => {
    setIsLoading(true);
  };

  const hide = () => {
    setIsLoading(false);
  };

  // Render the Loader component
  return { isLoading, show, hide, Loader };
};
export default useLoader;
