const express = require("express");
const router = express.Router();
const db=require('../config/db')
const { getAllRecord,getRecordById,updateRecordById,createRecord,deleteRecordById,deleteRecordByIds } = require("../controllers/recordController");

router.get("/", async (req,res) => {
  try {
    const [rows] = await db.query("SELECT * FROM basic");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:id",getRecordById)
router.put("/:id",updateRecordById)
router.post("/create",createRecord)
router.delete("/ids",deleteRecordByIds)
router.delete("/:id",deleteRecordById)
module.exports=router