import { createData } from '../utils';

async function createProviders(data) {
  const formattedData = createData(data);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/providers/create`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllProviders() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/providers/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

async function getProviderById(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/providers/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

async function updateProviderById(id, data) {
  const formattedData = createData(data);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/providers/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData),
    });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteProviderById(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/providers/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

async function activeProviderById(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/providers/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

export {
  createProviders,
  getAllProviders,
  getProviderById,
  updateProviderById,
  deleteProviderById,
  activeProviderById,
}