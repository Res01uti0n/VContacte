import express from "express"

import userCtrl from "../controllers/user.controller"
import authCtrl from '../controllers/auth.controller'

const router = express.Router()
router.route("/api/users")
  .get(userCtrl.list)
  .post(userCtrl.create)

router.param("userId", userCtrl.userByID)

router.route("/api/users/:userId")
  .get(userCtrl.read)
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userCtrl.update
  )
  .delete(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userCtrl.remove
  )

router.route("/api/users/photo/:userId")
  .get(userCtrl.photo, userCtrl.defaultPhoto)
router.route("/api/users/defaultphoto")
  .get(userCtrl.defaultPhoto)

router.route("/api/users/follow/")
  .put(authCtrl.signin, userCtrl.addFollowing, userCtrl.addFollower)
router.route("/api/users/unfollow/")
  .put(authCtrl.signout, userCtrl.removeFollowing, userCtrl.removeFollower)
  
export default router