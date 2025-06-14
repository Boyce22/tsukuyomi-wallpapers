import express from "express";
const router = express.Router();

import wallpapersRoutes from "./wallpapers";

router.use("/wallpapers", wallpapersRoutes);

export default router;
