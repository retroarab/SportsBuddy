import axios from 'axios';

const API_URL = 'http://192.168.1.103:5000/api';

axios.defaults.withCredentials = true;

const fetchCsrfToken = async () => {
  const response = await axios.get(`${API_URL}/csrf-token`);
  return response.data.csrfToken;
};

export const registerUser = async (userData) => {
  const csrfToken = await fetchCsrfToken();
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData, {
      headers: { 'X-CSRF-Token': csrfToken },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export const searchUsers = async (query, token) => {
  try {
    const response = await axios.get(`${API_URL}/users/search`, {
      params: { query }, // `query` is passed correctly
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('Search response:', response.data); // Debug the response
    return response.data;
  } catch (error) {
    console.error('Error in searchUsers:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};



export const getConnections = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/connections`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const sendFriendRequest = async (userId, friendId, token) => {
  try {
    console.log('Debug: Preparing to send friend request');
    console.log(`Debug: userId = ${userId}, friendId = ${friendId}, token = ${token}`);

    const csrfToken = await fetchCsrfToken();
    console.log(`Debug: Fetched CSRF token: ${csrfToken}`);

    const response = await axios.post(
      `${API_URL}/users/${userId}/connections`,
      { friendId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-CSRF-Token': csrfToken,
        },
      }
    );

    console.log('Debug: Friend request sent successfully');
    console.log(`Debug: Response data: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    console.error('Debug: Error in sendFriendRequest');
    console.error(`Debug: Error message: ${error.message}`);
    console.error(`Debug: Error response data: ${JSON.stringify(error.response?.data)}`);
    console.error(`Debug: Error config: ${JSON.stringify(error.config)}`);

    throw error.response?.data || error.message;
  }
};


export const loginUser = async (credentials) => {
  const csrfToken = await fetchCsrfToken();
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials, {
      headers: { 'X-CSRF-Token': csrfToken },
    });

    const user = await getUserDetails(response.data.userId, response.data.token);
    console.log('Debug: User details fetched after login:', user);

    return { token: response.data.token, user };
  } catch (error) {
    console.error('Debug: loginUser error:', error);
    throw error.response ? error.response.data : error;
  }
};

export const getUserDetails = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/users/${parseInt(userId, 10)}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // Ensure cookies are included
    });

    console.log('Debug: Cookie sent with request:', response.config.headers['Cookie']);
    console.log('Debug: Response data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error in getUserDetails:', error.response?.data || error.message);
    throw error.response ? error.response.data : error;
  }
};


export const uploadProfilePicture = async (userId, token, profilePictureUrl) => {
  try {
    const csrfToken = await fetchCsrfToken();
    const response = await axios.post(
      `${API_URL}/users/${userId}/upload-picture`,
      { profilePictureUrl }, // Ensure this is sent
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Debug: Upload response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in uploadProfilePicture:', error.response?.data || error.message);
    throw error.response ? error.response.data : error;
  }
};
export const getVenues = async () => {
  try {
    const response = await axios.get(`${API_URL}/venues`);
    return response.data;
  } catch (error) {
    console.error('Error fetching venues:', error.response?.data || error.message);
    throw error.response ? error.response.data : error;
  }
};

export const getVenueDetails = async (venueId) => {
  try {
    const response = await axios.get(`${API_URL}/venues/${venueId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching venue details:', error.response?.data || error.message);
    throw error.response ? error.response.data : error;
  }
};
