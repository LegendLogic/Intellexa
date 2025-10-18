import express from 'express';
import {

  loginAdmin,

} 
from '../controllers/adminController.js';

import upload from '../middlewares/multer.js';

const AdminRouter = express.Router();


//
// ✅ ADMIN LOGIN
//
AdminRouter.post('/login', loginAdmin);

export default AdminRouter;
