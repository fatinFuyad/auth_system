import { User } from "../models/User.js";

export const getAllUsers = async function (req, res, next) {
  try {
    const users = await User.find().sort({
      createdAt: "desc",
    });

    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

export const getUser = async function (req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("No user found with the provided user ID!");
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

export const deleteUser = async function (req, res) {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

export const updateUser = async function (req, res) {
  try {
    const { userId } = req.params;
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(userId, {
      name,
    });

    res.status(204).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
