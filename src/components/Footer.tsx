import { Link } from 'react-router-dom';
import reactSvg from './../assets/react.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-center gap-4">
        <p className="text-center">&copy; 2024 Taskify. All rights reserved.</p>
        <Link to="https://vitejs.dev/guide/" target="_blank">
          <img src={reactSvg} alt="Made with react" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
