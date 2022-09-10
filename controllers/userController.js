const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  getUsers(req, res) {
    Users.find()
      .then(async (Users) => {
        const usersObj = {
          Users
        };
        return res.json(usersObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.UsersId })
      .select('-__v')
      .then(async (Users) =>
        !Users
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
            Users,
              github: await github(req.params.UsersId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createUser(req, res) {
    Users.create(req.body)
      .then((Users) => res.json(Users))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    Users.findOneAndRemove({ _id: req.params.UserId })
      .then((Users) =>
        !Users
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
              { Users: req.params.UserId },
              { $pull: { Users: req.params.UserId } },
              { new: true }
            )
      )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
