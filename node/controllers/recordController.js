const db = require("../config/db");
const getAllRecord = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM basic");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getRecordById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM basic WHERE id=?", [
      req.params.id,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateRecordById = async (req, res) => {
  const { text, value } = req.body;
  try {
    const [rows] = await db.query(
      "UPDATE basic SET text=?,value=? WHERE id=?",
      [text, value, req.params.id]
    );
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "no update rows" });
    }
    const [uploadedRecord] = await db.query("SELECT * FROM basic WHERE id=?", [
      req.params.id,
    ]);
    res.status(200).json(uploadedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createRecord = async (req, res) => {
  const { text, value } = req.body;
  try {
    const [newRecord] = await db.query(
      "INSERT INTO basic (text,value) VALUES (?,?)",
      [text, value]
    );
    const [record] = await db.query("SELECT * FROM basic WHERE id=?", [
      newRecord.insertId,
    ]);
    if (record.length === 0) {
      return res.status(404).json({ error: "created failed" });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteRecordById = async (req, res) => {
  try {
    const [deleteRecord] = await db.query("DELETE FROM basic WHERE id=?", [
      req.params.id,
    ]);
    if (deleteRecord.affectedRows === 0) {
      return res.status(500).json({ error: "not found record" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteRecordByIds = async (req, res) => {
  try {
    const { ids } = req.body; // 从请求体获取 ID 数组
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "ID 数组不能为空" });
    }
    const numericIds = ids.map(Number).filter((id) => !isNaN(id));
    const placeholders = numericIds.map(() => "?").join(",");
    const sql = `DELETE FROM basic WHERE id IN (${placeholders})`;
    const [result] = await db.query(sql, numericIds);
    res.status(200).json({ message: `删除 ${result.affectedRows} 条记录` });
  } catch (error) {
    res.status(500).json({ error: error.success });
  }
};
module.exports = {
  getAllRecord,
  getRecordById,
  updateRecordById,
  createRecord,
  deleteRecordById,
  deleteRecordByIds,
};
