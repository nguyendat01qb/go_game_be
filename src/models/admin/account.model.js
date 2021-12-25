const { connect, sql } = require("../../config/dbconfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const multer = require("multer");
const { config } = require("dotenv");
config();

module.exports = function () {
  this.createAccount = async (user, result) => {
    const pool = await connect;
    const password = user.Password;
    const encryptedPassword = await bcrypt.hash(password, 10);
    user.Role = 1;
    user.Amount = 6789;
    const sqlString =
      "INSERT INTO Account ( Password, Phone, Email, Role, CreateAt, Amount) VALUES( @password, @phone, @email, @role, @createdAt, @amount)";
    pool
      .request()
      .input("password", sql.NVarChar, (user.Password = encryptedPassword))
      .input("phone", sql.NVarChar, user.Phone)
      .input("email", sql.NVarChar, user.Email)
      .input("role", sql.Int, user.Role)
      .input("createdAt", sql.Date, user.CreatedAt)
      .input("amount", sql.Int, user.Amount)
      .query(sqlString, (err, data) => {
        if (err) {
          result({ message: "Signup not found" });
        } else {
          let token = jwt.sign(user, process.env.SECRET, {
            expiresIn: "2 days",
          });
          result(null, {
            user,
            token,
            message: "Create admin successfully!",
          });
        }
      });
  };

  this.login = async (user, result) => {
    const pool = await connect;
    const email = user.Email;
    const password = user.Password;
    const sqlString = "SELECT * FROM Account WHERE email=@email";
    pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(sqlString, async (err, data) => {
        const user = data.recordset[0];
        if (!user) {
          result({
            success: false,
            message: "Authenticate failed, not found user!",
          });
        } else {
          const match = await bcrypt.compare(password, user.Password);
          if (match) {
            let token = jwt.sign(user, process.env.SECRET, {
              expiresIn: "2 days",
            });
            result(null, {
              success: true,
              message: "Admin login successfully",
              user,
              token,
            });
          } else {
            result({
              success: false,
              message: "Authenticate failed, wrong password!",
            });
          }
        }
      });
  };

  this.updateAccount = async (newData, result) => {
    const pool = await connect;
    const sqlString =
      "UPDATE Account SET Password = @password, Phone=@phone, Email=@email, Role=@role WHERE ID_DLer=@varId";
    return await pool
      .request()
      .input("password", sql.NVarChar, newData.Password)
      .input("phone", sql.NVarChar, newData.Phone)
      .input("email", sql.NVarChar, newData.Email)
      .input("role", sql.Int, newData.Role)
      .input("varId", sql.Int, newData.ID_DLer)
      .query(sqlString, (err, data) => {
        if (err) {
          result(true, null);
        } else {
          result(null, newData);
        }
      });
  };

  this.deleteAccount = async (id, result) => {
    const pool = await connect;
    const sqlString = "DELETE FROM Account WHERE ID_DLer = @varId";
    return await pool
      .request()
      .input("varId", sql.Int, id)
      .query(sqlString, (err, data) => {
        if (err) {
          result(true, null);
        } else {
          result(null, data);
        }
      });
  };
};
