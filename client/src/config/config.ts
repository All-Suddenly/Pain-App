const { REACT_APP_API_URL } = process.env;

export const config = {
  apiHost: REACT_APP_API_URL || 'http://localhost:4000/api/v1',
};
