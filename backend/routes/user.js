import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    firstname: "Tim",
    lastname: "Al",
    email: "tim.al@gmail.com",
  });
});

export default router;
