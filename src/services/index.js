'use server'
import { createData } from '../utils';

async function createProviders(data) {
  const formattedData = createData(data);
        
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/create`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formattedData),
  });
  return response.json();
}

async function getAllProviders() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/providers/all`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  });
  return response.json();
}

async function getProviderById(id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/providers/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  });
  return response.json();
}

async function updateProviderById(id, data) {
  const formattedData = createData(data);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/providers/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formattedData),
  });
  return response.json();
}

export {
  createProviders,
  getAllProviders,
  getProviderById,
  updateProviderById,
}