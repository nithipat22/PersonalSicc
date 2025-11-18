const { pool } = require("../config");

const query = (sql, params = []) =>
  new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });

const TABLE_NAME = "`user`";
const UPDATABLE_FIELDS = ["username", "password", "fullname", "email", "role"];

const userModels = {
  async create(data) {
    const sql = `INSERT INTO ${TABLE_NAME} (username, password, fullname, email, role) VALUES (?,?,?,?,?)`;
    const role = data.role || "Evaluatees";
    const result = await query(sql, [
      data.username,
      data.password,
      data.fullname,
      data.email,
      role,
    ]);
    return this.findById(result.insertId);
  },

  async update(id, data) {
    const updates = [];
    const values = [];

    UPDATABLE_FIELDS.forEach((field) => {
      if (
        Object.prototype.hasOwnProperty.call(data, field) &&
        typeof data[field] !== "undefined"
      ) {
        updates.push(`${field} = ?`);
        values.push(data[field]);
      }
    });

    if (!updates.length) {
      return null;
    }

    values.push(id);
    const sql = `UPDATE ${TABLE_NAME} SET ${updates.join(", ")} WHERE user_id = ?`;
    const result = await query(sql, values);

    if (!result.affectedRows) {
      return null;
    }

    return this.findById(id);
  },

  async deleteById(id) {
    const sql = `DELETE FROM ${TABLE_NAME} WHERE user_id = ? LIMIT 1`;
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  },

  async findAll() {
    const sql = `SELECT * FROM ${TABLE_NAME}`;
    return query(sql);
  },

  async findById(id) {
    const sql = `SELECT * FROM ${TABLE_NAME} WHERE user_id = ? LIMIT 1`;
    const rows = await query(sql, [id]);
    return rows[0] || null;
  },

  async findByColumn(column, value) {
    const sql = `SELECT * FROM ${TABLE_NAME} WHERE ?? = ? LIMIT 1`;
    const rows = await query(sql, [column, value]);
    return rows[0] || null;
  },

  async checkAuthLogin(data) {
    const sql = `SELECT * FROM ${TABLE_NAME} WHERE username = ? AND password = ? LIMIT 1`;
    const rows = await query(sql, [data.username, data.password]);
    return rows[0] || null;
  },
};

module.exports = userModels;
