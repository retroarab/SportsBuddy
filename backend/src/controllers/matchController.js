// backend/src/controllers/matchController.js
const prisma = require('../prisma');

exports.createMatch = async (req, res) => {
  const { sport, date, time, maxPlayers } = req.body;
  try {
    const match = await prisma.match.create({
      data: {
        sport,
        date,
        time,
        maxPlayers,
        creatorId: req.userId, // Assuming `req.userId` is set by auth middleware
      },
    });
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create match' });
  }
};

exports.listMatches = async (req, res) => {
  try {
    const matches = await prisma.match.findMany();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
};

exports.getMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await prisma.match.findUnique({ where: { match_id: parseInt(id) } });
    if (!match) return res.status(404).json({ error: 'Match not found' });
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch match' });
  }
};

exports.joinMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const participation = await prisma.activity_participants.create({
      data: {
        match_id: parseInt(id),
        user_id: req.userId,
      },
    });
    res.status(201).json(participation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to join match' });
  }
};

exports.leaveMatch = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.activity_participants.delete({
      where: {
        match_id_user_id: {
          match_id: parseInt(id),
          user_id: req.userId,
        },
      },
    });
    res.json({ message: 'Left match' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to leave match' });
  }
};

exports.inviteToMatch = async (req, res) => {
  const { id } = req.params;
  const { userIdToInvite } = req.body;
  try {
    const invite = await prisma.activity_invites.create({
      data: {
        match_id: parseInt(id),
        user_id: userIdToInvite,
        invited_by: req.userId,
      },
    });
    res.status(201).json(invite);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send invite' });
  }
};

exports.sendMessage = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const newMessage = await prisma.messages.create({
      data: {
        match_id: parseInt(id),
        sender_id: req.userId,
        content: message,
      },
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};
