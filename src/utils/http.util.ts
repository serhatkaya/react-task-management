// Define a generic type for error data
type ErrorResponse = {
  message: string;
};

// Base URL for your API
const BASE_URL = 'https://api-gamma-flax.vercel.app';

// Define a function to handle errors
const handleError = (error: any): ErrorResponse => {
  return { message: error.message || 'An error occurred' };
};

// Define functions for common HTTP methods

const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`);
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
      headers: {
        'Content-Type': 'application/json',
      },
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
      headers: {
        'Content-Type': 'application/json',
      },
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
      headers: {
        'Content-Type': 'application/json',
      },
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
