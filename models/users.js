let { pool } = require("../config");

const userModels = {
  async create(data) {
    let sql = `INSERT INTO user(username, password, fullname, email, role) 
                    VALUES (?,?,?,?, 'Evaluatees')`;
    let query = await pool.query(
      sql,
      [data.username, data.password, data.fullname, data.email],
      (error, result) => {
        if (error) {
          throw error;
        }
        return result;
      }
    );
    if (query.OkPacket) {
        console.log("User created successfully");
        return true
    }
  },

  async update(data,id) {   
    let sql = `UPDATE user SET username= ?,password= ?,fullname= ?,email= ?,role= ? WHERE user_id = ?`;
        let query = await pool.query(
        sql,
        [data.user_id, data.username, data.password, data.fullname, data.email, data.role, id],
        (error, result) => {
            if (error) {
            throw error;
            }
            return result;
        }
    );
    if (query.OkPacket) {
      console.log("User updated successfully");
      return true
    }
  },

  async checkAuthLogin(data){
    let sql = `SELECT * FROM user WHERE username = ? AND password = ?`;
    let query = await pool.query(
      sql,
      [data.username, data.password],
      (error, result) => {
        if (error) {
          throw error;
        }
        return result;
      }
    );
    return query;
  },

  async findByColumn(column,value){
    let sql = `SELECT * FROM user WHERE ${column} = ?`;
    let query = await pool.query(
      sql,
      [value],
      (error, result) => {
        if (error) {
          throw error;
        }
        return result;
      }
    );
    return query;
  }
};

module.exports = userModels;
