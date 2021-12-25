const FixLink = require("../models/fixLink.model");
const model = new FixLink();

exports.getFixLinks = (req, res) => {
  model.getFixLinks((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Không nhận được dữ liệu",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

exports.getFixLink = (req, res) => {
  model.getFixLink(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Không nhận được dữ liệu",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

exports.createFixLink = (req, res) => {
  model.createFixLink(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Tạo fix link không thành công",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

exports.updateFixLink = (req, res) => {
  model.updateFixLink(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Cập nhật fix link không thành công",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

exports.deleteFixLink = (req, res) => {
  model.deleteFixLink(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Xóa fix link không thành công",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};
