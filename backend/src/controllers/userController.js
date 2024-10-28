// backend/src/controllers/userController.js
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
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
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { user_id: parseInt(id) } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
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

// Send a friend request or follow another user
exports.addConnection = async (req, res) => {
  const { id } = req.params;
  const { friendId } = req.body;

  try {
    const connection = await prisma.user_connections.create({
      data: {
        user_id: parseInt(id),
        friend_id: parseInt(friendId),
        connection_status_type: 'pending', // Initial status as "pending"
      },
    });
    res.status(201).json({ message: 'Friend request sent', connection });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add connection' });
  }
};

// List user’s friends or connections
exports.getConnections = async (req, res) => {
  const { id } = req.params;
  try {
    const connections = await prisma.user_connections.findMany({
      where: {
        user_id: parseInt(id),
        connection_status_type: 'accepted', // Only fetch accepted connections
      },
      include: {
        friend: true, // Include friend details in the response
      },
    });
    res.json(connections);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve connections' });
  }
};

// Upload or update user profile picture
exports.uploadPicture = async (req, res) => {
  const { id } = req.params;
  const { profilePictureUrl } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { user_id: parseInt(id) },
      data: { profile_picture_url: profilePictureUrl },
    });
    res.json({ message: 'Profile picture updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile picture' });
  }
};
