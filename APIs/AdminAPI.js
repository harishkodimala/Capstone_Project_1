import exp from 'express'
import { UserTypeModel } from '../models/UserModel.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { checkAdmin } from '../middleware/checkAdmin.js'

export const adminRoute = exp.Router()

// Block User
adminRoute.put('/block/:userId', verifyToken, checkAdmin, async (req, res) => {
  try {
    const userID = req.params.userId

    const user = await UserTypeModel.findById(userID)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (!user.isActive) {
      return res.status(400).json({ message: "User already blocked" })
    }

    const updatedUser = await UserTypeModel.findByIdAndUpdate(
      userID,
      { $set: { isActive: false } },
      { new: true }
    )

    res.status(200).json({
      message: "User blocked successfully",
      payload: updatedUser
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


// Unblock User
adminRoute.put('/unblock/:userId', verifyToken, checkAdmin, async (req, res) => {
  try {
    const userID = req.params.userId

    const user = await UserTypeModel.findById(userID)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (user.isActive) {
      return res.status(400).json({ message: "User already active" })
    }

    const updatedUser = await UserTypeModel.findByIdAndUpdate(
      userID,
      { $set: { isActive: true } },
      { new: true }
    )

    res.status(200).json({
      message: "User unblocked successfully",
      payload: updatedUser
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
