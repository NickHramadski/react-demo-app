const dev = {
  AUTH_API_URL: `http://127.0.0.1:3001/api/`,
  NOTES_API_URL: `https://react-demo-app-4899d.firebaseio.com/`,
};

const prod = {
  AUTH_API_URL: `http://127.0.0.1:3001/api/`,
  NOTES_API_URL: `https://react-demo-app-4899d.firebaseio.com/`,
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  ...config
};
