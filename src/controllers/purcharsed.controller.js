const Purcharsed = require("../models/purcharsed.model");
const model = new Purcharsed();

exports.getPurcharsed = (req, res) => {
  model.getPurcharsed((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Không nhận được dữ liệu",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

exports.getOnePurcharsed = (req, res) => {
  model.getOnePurcharsed(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Không nhận được dữ liệu",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

exports.createPurcharsed = (req, res) => {
  model.createPurcharsed(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Nhận sản phẩm không thành công",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

exports.updatePurcharsed = (req, res) => {
  model.updatePurcharsed(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Cập nhật thông tin nhận sản phẩm không thành công",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

exports.deletePurcharsed = (req, res) => {
  model.deletePurcharsed(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Xóa nhận sản phẩm không thành công",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};
