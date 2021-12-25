// GỌI HÀM Ở MODEL
const Account = require("../models/account.model");
const model = new Account();

// Điều hướng đến model và trả về json nhận từ model

// Get list users (Quyền admin)
exports.getUsers = (req, res) => {
  model.getUsers((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Access not define",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

// Get account detail Lấy id từ param
exports.getAccount = (req, res) => {
  model.getAccount(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Data not received",
      });
    } else {
      return res
        .status(201)
        .json({ success: true, message: "Get account successfully", data });
    }
  });
};

// Đăng ký tài khoản
exports.signup = (req, res) => {
  model.createAccount(req.body, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      return res.status(201).json(data);
    }
  });
};

// Lây dữ liệu từ token, kiểm tra tính xác thực của user khi đăng nhập
exports.user = async (req, res) => {
  model.user(req.decoded, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

// User đăng nhập
exports.signin = async (req, res) => {
  model.login(req.body, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

// Cập nhật tài khoản user
exports.updateAccount = (req, res) => {
  model.updateAccount(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Update account falure",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

// Xóa tài khoản user (Quyền admin)
exports.deleteAccount = (req, res) => {
  model.deleteAccount(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Delete account falure",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

// Cập nhật tài khoản amount
exports.updateAmount = (req, res) => {
  model.updateAmount(req.body, (err, data) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(201).json(data);
    }
  });
};
