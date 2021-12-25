const Account = require("../../models/admin/account.model");
const model = new Account();

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

exports.signin = async (req, res) => {
  model.login(req.body, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};
