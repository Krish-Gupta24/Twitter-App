import express from "express";
import  verifyJWT  from '../middlewares/verifyJWT.js';
import {
  deleteNotifications,
  getNotifications,
} from "../controllers/notification.controller.js";

const notificationRouter = express.Router();


notificationRouter.route('/').get(verifyJWT,getNotifications)
notificationRouter.route('/').delete(verifyJWT,deleteNotifications)

export default notificationRouter;
