import { Router } from "express";

const router = Router();

router.get("/",(req,res) => {
    res.send("Employee Route Working");
})

export default router;