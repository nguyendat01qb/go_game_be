const { connect, sql } = require("../config/dbconfig");

module.exports = function () {
  this.getPurcharsed = async (result) => {
    const pool = await connect;
    const sqlString = "SELECT * FROM Purcharsed";
    return await pool.request().query(sqlString, (err, data) => {
      if (data.recordset.length > 0) {
        result(null, data.recordset);
      } else {
        result(true, null);
      }
    });
  };

  this.getOnePurcharsed = async (id, result) => {
    const pool = await connect;
    const sqlString = "SELECT * FROM Purcharsed WHERE ID_Purcharsed = @varId";
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

  this.createPurcharsed = async (newData, result) => {
    const pool = await connect;
    const sqlString =
      "INSERT INTO Purcharsed ( ID_DLer, Name, ID_Product ) VALUES( @idDLer, @name, @idProduct )";
    return await pool
      .request()
      .input("idDLer", sql.Int, newData.ID_DLer)
      .input("name", sql.NVarChar, newData.Name)
      // .input("date", sql.Date, newData.Date_purchase)
      .input("idProduct", sql.Int, newData.ID_Product)
      .query(sqlString, (err, data) => {
        if (err) {
          result(true, null);
        } else {
          result(null, newData);
        }
      });
  };

  this.updatePurcharsed = async (newData, result) => {
    const pool = await connect;
    const sqlString =
      "UPDATE Purcharsed SET ID_DLer = @idDLer, Name = @name, ID_Product = @idProduct WHERE ID_Purcharsed = @varId";
    return await pool
      .request()
      .input("idDLer", sql.Int, newData.ID_DLer)
      .input("name", sql.NVarChar, newData.Name)
      // .input("date", sql.NVarChar, newData.Date_purchase)
      .input("idProduct", sql.Int, newData.ID_Product)
      .input("varId", sql.Int, newData.ID_Purcharsed)
      .query(sqlString, (err, data) => {
        if (err) {
          result(true, null);
        } else {
          result(null, newData);
        }
      });
  };

  this.deletePurcharsed = async (id, result) => {
    const pool = await connect;
    const sqlString = "DELETE FROM Purcharsed WHERE ID_Purcharsed = @varId";
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
