const { connect, sql } = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const multer = require("multer");
const { config } = require("dotenv");
config();

module.exports = function () {
  // Model nhận list user (Quyền admin)
  this.getUsers = async (result) => {
    // Đặt mặc định role user
    const role = 0;
    // Kết nối database sql
    const pool = await connect;
    const sqlString = "SELECT * FROM Account WHERE Role = @role";
    // Hàm nhận list user
    return await pool
      .request()
      .input("role", sql.Int, role)
      .query(sqlString, (err, data) => {
        if (data.recordset.length > 0) {
          result(null, data.recordset);
        } else {
          result(true, null);
        }
      });
  };

  // Model nhận user detail (Quyền admin) id lấy từ params
  this.getAccount = async (id, result) => {
    // Gọi hàm kết nối sql
    const pool = await connect;
    const sqlString = "SELECT * FROM Account WHERE ID_DLer = @varId";
    // Hàm
    return await pool
      .request()
      .input("varId", sql.Int, id)
      .query(sqlString, (err, data) => {
        if (data.recordset.length > 0) {
          // Trả dữ liệu về controller
          result(null, data.recordset);
        } else {
          // Trả dữ liệu về controller
          result(true, null);
        }
      });
  };

  // Đăng ký user
  this.createAccount = async (user, result) => {
    // Gọi hàm kết nối sql
    const pool = await connect;
    const password = user.Password;
    // Password mã hóa
    const encryptedPassword = await bcrypt.hash(password, 10);
    // Role user
    user.Role = 0;
    user.Amount = 0;
    const sqlString =
      "INSERT INTO Account ( Password, Phone, Email, Role, CreateAt, Amount) VALUES( @password, @phone, @email, @role, @createdAt, @amount)";
    // Hàm
    pool
      .request()
      .input("password", sql.NVarChar, (user.Password = encryptedPassword))
      .input("phone", sql.NVarChar, user.Phone)
      .input("email", sql.NVarChar, user.Email)
      .input("role", sql.Int, user.Role)
      .input("createdAt", sql.Date, user.CreateAt)
      .input("amount", sql.Int, user.Amount)
      .query(sqlString, (err, data) => {
        if (err) {
          // Trả dữ liệu về controller
          result({ success: false, message: "Signup not found", err });
        } else {
          // Khi đăng ký thành công
          // Tạo token với secret tùy ý
          let token = jwt.sign({ user }, process.env.SECRET, {
            expiresIn: "2 days",
          });
          // Trả dữ liệu về controller
          result(null, {
            user,
            token,
            message: "Created user successfully!",
          });
        }
      });
  };

  this.user = async (user, result) => {
    // Gọi hàm kết nối sql
    const pool = await connect;
    const ID_DLer = user.ID_DLer;
    const sqlString = "SELECT * FROM Account WHERE ID_DLer = @ID_DLer";
    // Hàm
    pool
      .request()
      .input("ID_DLer", sql.Int, ID_DLer)
      .query(sqlString, (err, data) => {
        const user = data.recordset[0];
        if (!user) {
          // Trả dữ liệu về controller
          result({
            success: false,
            message: "Authenticate failed, not found user!",
          });
        } else {
          // Trả dữ liệu về controller
          result(null, {
            success: true,
            message: "Get user successfully",
            user,
          });
        }
      });
  };

  this.login = async (user, result) => {
    // Gọi hàm kết nối sql
    const pool = await connect;
    const email = user.Email;
    const password = user.Password;
    const sqlString = "SELECT * FROM Account WHERE email=@email";
    // Hàm search email
    pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(sqlString, async (err, data) => {
        const user = data.recordset[0];
        if (!user) {
          // Trả dữ liệu về controller
          result({
            success: false,
            message: "Authenticate failed, not found user!",
          });
        } else {
          // Kiểm tra password có match ko
          const match = await bcrypt.compare(password, user.Password);
          if (match) {
            // Tạo token nếu login thành công
            let token = jwt.sign(user, process.env.SECRET, {
              expiresIn: "2 days",
            });
            // Trả dữ liệu về controller
            result(null, {
              success: true,
              message: "Login successfully",
              user,
              token,
            });
          } else {
            // Trả dữ liệu về controller
            result({
              success: false,
              message: "Authenticate failed, wrong password!",
            });
          }
        }
      });
  };

  // Cập nhật thông tin user
  this.updateAccount = async (user, result) => {
    const pool = await connect;
    const encryptedPassword = await bcrypt.hash(user.Password, 10);
    const sqlString =
      "UPDATE Account SET Password = @password, Phone=@phone, Email=@email WHERE ID_DLer=@varId";
    // Hàm
    return await pool
      .request()
      .input("password", sql.NVarChar, encryptedPassword)
      .input("phone", sql.NVarChar, user.Phone)
      .input("email", sql.NVarChar, user.Email)
      .input("varId", sql.Int, user.ID_DLer)
      .query(sqlString, (err, data) => {
        if (err) {
          // Trả dữ liệu về controller
          result({ success: false, message: "Update falure" }, null);
        } else {
          // Trả dữ liệu về controller
          result(null, {
            success: true,
            message: "Updated user successfully!",
            user,
          });
        }
      });
  };

  // Xóa account user (Quyền admin)
  this.deleteAccount = async (id, result) => {
    const pool = await connect;
    const sqlString = "DELETE FROM Account WHERE ID_DLer = @varId";
    // Hàm
    return await pool
      .request()
      .input("varId", sql.Int, id)
      .query(sqlString, (err, data) => {
        if (err) {
          // Trả dữ liệu về controller
          result({ success: false, message: "Delete falure" }, null);
        } else {
          // Trả dữ liệu về controller
          result(null, {
            success: true,
            message: "Deleted user successfully!",
          });
        }
      });
  };

  // Cập nhật tài khoản amount
  this.updateAmount = async (user, result) => {
    const pool = await connect;
    const sqlString =
      "UPDATE Account SET Amount = @amount WHERE ID_DLer=@varId";
    const sqlStringGet = "SELECT * FROM Account WHERE ID_DLer=@varId";
    // Hàm
    pool
      .request()
      .input("varId", sql.Int, user.ID_DLer)
      .query(sqlStringGet, (err, data) => {
        if (err) {
          result({ success: false, message: "User not found" }, null);
        } else {
          const oldAmount = data.recordset[0].Amount;
          const newAmount = user.Amount;
          const amountUpdated = parseInt(oldAmount) + parseInt(newAmount);
          return pool
            .request()
            .input("amount", sql.Int, amountUpdated)
            .input("varId", sql.Int, user.ID_DLer)
            .query(sqlString, (err, data) => {
              if (err) {
                // Trả dữ liệu về controller
                result({ success: false, message: "Recharge failed" }, null);
              } else {
                // Trả dữ liệu về controller
                result(null, {
                  success: true,
                  message: "Recharge successfully!",
                  user,
                  amountUpdated,
                });
              }
            });
        }
      });
  };
};
