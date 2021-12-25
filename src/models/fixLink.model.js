const { connect, sql } = require("../config/dbconfig");

module.exports = function () {
  this.getFixLinks = async (result) => {
    const pool = await connect;
    const sqlString = "SELECT * FROM Fix_Link";
    return await pool.request().query(sqlString, (err, data) => {
      if (data.recordset.length > 0) {
        result(null, data.recordset);
      } else {
        result(true, null);
      }
    });
  };

  this.getFixLink = async (id, result) => {
    const pool = await connect;
    const sqlString = "SELECT * FROM Fix_Link WHERE ID_Fix = @varId";
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

  this.createFixLink = async (newData, result) => {
    const pool = await connect;
    const sqlString =
      "INSERT INTO Fix_Link ( ID_Link, Content ) VALUES( @idLink, @content )";
    return await pool
      .request()
      .input("idLink", sql.Int, newData.ID_Link)
      .input("content", sql.NVarChar, newData.Content)
      .query(sqlString, (err, data) => {
        if (err) {
          result(true, null);
        } else {
          result(null, newData);
        }
      });
  };

  this.updateFixLink = async (newData, result) => {
    const pool = await connect;
    const sqlString =
      "UPDATE Fix_Link SET ID_Link = @idLink, Content = @content WHERE ID_Fix=@varId)";
    return await pool
      .request()
      .input("idLink", sql.Int, newData.ID_Link)
      .input("content", sql.NVarChar, newData.Content)
      .input("varId", sql.Int, newData.ID_Fix)
      .query(sqlString, (err, data) => {
        if (err) {
          result(true, null);
        } else {
          result(null, newData);
        }
      });
  };

  this.deleteFixLink = async (id, result) => {
    const pool = await connect;
    const sqlString = "DELETE FROM Fix_Link WHERE ID_Fix = @varId";
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
