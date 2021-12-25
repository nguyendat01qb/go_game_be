const { connect, sql } = require("../config/dbconfig");

module.exports = function () {
  this.getRecharges = async (result) => {
    const pool = await connect;
    const sqlString = "SELECT * FROM Recharge";
    return await pool.request().query(sqlString, (err, data) => {
      if (data.recordset.length > 0) {
        result(null, data.recordset);
      } else {
        result(true, null);
      }
    });
  };

  this.getRecharge = async (id, result) => {
    const pool = await connect;
    const sqlString = "SELECT * FROM Recharge WHERE ID_Recharge = @varId";
    return await pool
      .request()
      .input("varId", sql.Int, id)
      .query(sqlString, (err, data) => {
        if (data.recordset.length > 0) {
          result(null, data.recordset);
        } else {
          result(true, null);
        }
      });
  };

  this.createRecharge = async (newData, result) => {
    const pool = await connect;
    const sqlString =
      "INSERT INTO Recharge ( ID_DLer, Image_Recharge ) VALUES( @idDLer, @image )";
    return await pool
      .request()
      .input("idDLer", sql.Int, newData.ID_DLer)
      .input("image", sql.Image, newData.Image_Recharge)
      .query(sqlString, (err, data) => {
        if (err) {
          result(true, null);
        } else {
          result(null, newData);
        }
      });
  };

  this.updateRecharge = async (newData, result) => {
    const pool = await connect;
    const sqlString =
      "UPDATE Recharge SET ID_DLer = @idDLer, Image_Recharge = @image WHERE ID_Recharge = @varId";
    return await pool
      .request()
      .input("idDLer", sql.Int, newData.ID_DLer)
      .input("image", sql.Image, newData.Image_Recharge)
      .input("varId", sql.Int, newData.ID_Recharge)
      .query(sqlString, (err, data) => {
        if (err) {
          result(true, null);
        } else {
          result(null, newData);
        }
      });
  };

  this.deleteRecharge = async (id, result) => {
    const pool = await connect;
    const sqlString = "DELETE FROM Recharge WHERE ID_Recharge = @varId";
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
