const Recharge = require("../models/recharge.model");
const model = new Recharge();

exports.getRecharges = (req, res) => {
  model.getRecharges((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Không nhận được dữ liệu",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

exports.getRecharge = (req, res) => {
  model.getRecharge(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Không nhận được dữ liệu",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

exports.createRecharge = (req, res) => {
  model.createRecharge(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Thay đổi không thành công",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

exports.updateRecharge = (req, res) => {
  model.updateRecharge(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Cập nhật thay đôi không thành công",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

exports.deleteRecharge = (req, res) => {
  model.deleteRecharge(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Xóa thay đổi không thành công",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};
