const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tashan-backend.onrender.com' 
  : 'http://localhost:2700/api';

export default API_BASE_URL;

