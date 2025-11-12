// src/api.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export function getUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export function saveAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// Auth endpoints
export async function register(userData) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Registration failed');
  return data;
}

export async function login(email, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
}

// User endpoints
export async function fetchCurrentUser() {
  const response = await fetch(`${API_BASE}/users/me`, {
    headers: { ...authHeaders() }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch user');
  return data;
}

// Doctor endpoints
export async function fetchDoctors(specialization = '') {
  const url = specialization 
    ? `${API_BASE}/doctors?specialization=${encodeURIComponent(specialization)}`
    : `${API_BASE}/doctors`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch doctors');
  return data;
}

export async function fetchDoctorById(id) {
  const response = await fetch(`${API_BASE}/doctors/${id}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch doctor');
  return data;
}

// Appointment endpoints
export async function fetchAppointments(upcoming = false) {
  const url = upcoming 
    ? `${API_BASE}/appointments?upcoming=true`
    : `${API_BASE}/appointments`;
  const response = await fetch(url, {
    headers: { ...authHeaders() }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch appointments');
  return data;
}

export async function createAppointment(payload) {
  const response = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders()
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to create appointment');
  return data;
}

export async function cancelAppointment(id, reason = '') {
  const response = await fetch(`${API_BASE}/appointments/${id}/cancel`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders()
    },
    body: JSON.stringify({ reason })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to cancel appointment');
  return data;
}

export async function fetchAppointmentById(id) {
  const response = await fetch(`${API_BASE}/appointments/${id}`, {
    headers: { ...authHeaders() }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch appointment');
  return data;
}
