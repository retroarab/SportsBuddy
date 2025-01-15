// backend/src/controllers/userController.js
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password, skill_level } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        skill_level // Ensure skill_level is included here
      },
    });
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: 'Registration failed' });
  }
};
exports.searchUsers = async (req, res) => {
  const { query } = req.query;

  // Debug logging
  console.log('Request received in searchUsers');
  console.log(`Query: ${query}`);
  console.log(`Decoded User ID from token (req.userId): ${req.userId}`);

  if (!query) {
    console.error('Search query is missing');
    return res.status(400).json({ error: 'Search query is required' });
  }

  if (!req.userId) {
    console.error('User ID missing from request');
    return res.status(400).json({ error: 'Invalid or missing user ID' });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        user_id: true,
        username: true,
        email: true,
        profile_picture_url: true,
      },
    });

    console.log('Search results:', users);
    res.json(users);
  } catch (error) {
    console.error('Error during searchUsers:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
};




exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, userId: user.user_id });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
exports.getUser = async (req, res) => {
  const { id } = req.params; // Extract user ID from request params

  try {
    // Validate the ID
    if (!id || isNaN(parseInt(id, 10))) {
      return res.status(400).json({ error: 'Invalid or missing user ID' });
    }

    const userId = parseInt(id, 10); // Parse the ID to integer
    const user = await prisma.user.findUnique({
      where: { user_id: userId }, // Pass the parsed ID
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user); // Return the user data
  } catch (error) {
    console.error('Error in getUser:', error); // Log the error
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Update user profile (e.g., skill level, profile picture)
exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { skillLevel, profilePictureUrl } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { user_id: parseInt(id) },
      data: { skill_level: skillLevel, profile_picture_url: profilePictureUrl },
    });
    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
exports.updatePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { user_id: parseInt(id, 10) },
    });

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: { user_id: parseInt(id, 10) },
      data: { password: hashedPassword },
    });

    res.json({ message: 'Password updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error in updatePassword:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
};


// Send a friend request or follow another user
exports.addConnection = async (req, res) => {
  const { id } = req.params;
  const { friendId } = req.body;

  console.log('Debug: Received addConnection request');
  console.log(`Debug: User ID (id): ${id}, Friend ID: ${friendId}`);
  
  try {
    if (!id || !friendId) {
      console.error('Debug: Missing user ID or friend ID');
      return res.status(400).json({ error: 'User ID and Friend ID are required' });
    }

    const userId = parseInt(id, 10);
    const friendUserId = parseInt(friendId, 10);

    // Validate user and friend existence
    const user = await prisma.user.findUnique({ where: { user_id: userId } });
    const friend = await prisma.user.findUnique({ where: { user_id: friendUserId } });

    if (!user || !friend) {
      console.error('Debug: User or friend not found');
      return res.status(404).json({ error: 'User or friend not found' });
    }

    // Insert connection
    const connection = await prisma.userConnection.create({
      data: {
        user_id: userId,
        friend_id: friendUserId,
        connection_status: 'pending',
      },
    });

    console.log('Debug: Connection created successfully:', connection);
    res.status(201).json({ message: 'Friend request sent', connection });
  } catch (error) {
    console.error('Debug: Error in addConnection:', error);
    res.status(500).json({ error: 'Failed to add connection' });
  }
};

// List user’s friends or connections
exports.getConnections = async (req, res) => {
  console.log('Debug: Received getConnections request');
  const { id } = req.params;

  try {
    if (!id) {
      console.error('Debug: Missing user ID in request');
      return res.status(400).json({ error: 'User ID is required' });
    }

    const userId = parseInt(id, 10);

    console.log(`Debug: Fetching connections for user ID: ${userId}`);

    const connections = await prisma.userConnection.findMany({
      where: {
        user_id: userId,
        OR: [
          { connection_status: 'accepted' },
          { connection_status: 'pending' }, // Include pending connections
        ],
      },
      include: {
        friend: {
          select: {
            user_id: true,
            username: true,
            email: true,
            profile_picture_url: true,
          },
        },
      },
    });

    console.log('Debug: Retrieved connections:', connections);

    res.json(connections);
  } catch (error) {
    console.error('Debug: Error in getConnections:', error);
    res.status(500).json({ error: 'Failed to retrieve connections' });
  }
};


// Upload or update user profile picture
exports.uploadPicture = async (req, res) => {
  const { id } = req.params;
  const { profilePictureUrl } = req.body;

  console.log('Debug: Received data in uploadPicture:', { id, profilePictureUrl });

  if (!profilePictureUrl) {
    return res.status(400).json({ error: 'No profile picture URL provided' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { user_id: parseInt(id, 10) },
      data: { profile_picture_url: profilePictureUrl },
    });
    console.log('Debug: User updated with new profile picture:', updatedUser);
    res.json({ message: 'Profile picture updated', user: updatedUser });
  } catch (error) {
    console.error('Error in uploadPicture:', error);
    res.status(500).json({ error: 'Failed to update profile picture' });
  }
};
