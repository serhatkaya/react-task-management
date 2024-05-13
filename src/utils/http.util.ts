import { StorageSet } from './storage-set.util';

// Define a generic type for error data
type ErrorResponse = {
  message: string;
};

// Base URL for your API
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define a function to handle errors
const handleError = (error: any): ErrorResponse => {
  return { message: error.message || 'An error occurred' };
};

const getToken = () => {
  const store = new StorageSet('auth');

  return store.get() ? store.get()['token'] : '';
};

const getHeaders = () => {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `${token}`;
  }

  return headers;
};

// Define functions for common HTTP methods

const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    throw handleError(error);
  }
};

const post = async <T>(url: string, data: any): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to post data');
    }
    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    throw handleError(error);
  }
};

const put = async <T>(url: string, data: any): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to put data');
    }
    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    throw handleError(error);
  }
};

const patch = async <T>(url: string, data: any): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to patch data');
    }
    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    throw handleError(error);
  }
};

const remove = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to delete data');
    }
    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    throw handleError(error);
  }
};

export const apiClient = {
  remove,
  patch,
  put,
  post,
  get,
};
