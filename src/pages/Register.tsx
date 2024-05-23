import { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { apiClient } from '../utils/http.util';
import { cn } from '../utils/tw.util';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    let valid = true;
    const newErrors = { ...errors };
    if (formData.username.trim() === '') {
      newErrors.username = 'Username is required';
      valid = false;
    }
    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
      valid = false;
    }
    if (formData.confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Confirm password is required';
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    if (!valid) {
      setErrors(newErrors);
      return;
    }
    apiClient.post('auth/register', formData).then(() => navigate('/login'));
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-2"
          >
            Username
          </label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`${
              errors.username
                ? 'border-red-500'
                : 'border-gray-300 focus:border-accent'
            }`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>

          <Input
            name="password"
            id="password"
            type="password"
            onChange={handleChange}
            placeholder="Enter your password"
            value={formData.password}
            className={cn(
              errors.password && 'border-red-500',
              !errors.password && 'border-gray-300 focus:border-accent'
            )}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-medium mb-2"
          >
            Confirm Password
          </label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={cn(
              errors.confirmPassword && 'border-red-500',
              !errors.confirmPassword && 'border-gray-300 focus:border-accent'
            )}
            placeholder="Confirm your password"
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <div className="text-center">
          <Button type="submit" bType="secondary" className="w-full">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
