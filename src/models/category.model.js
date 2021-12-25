const { connect, sql } = require("../config/dbconfig");

module.exports = function () {
  // Get all category
  this.getCategories = async (result) => {
    const pool = await connect;
    const sqlString = "SELECT * FROM Category";
    return await pool.request().query(sqlString, (err, data) => {
      if (data.recordset.length > 0) {
        result(null, data.recordset);
      } else {
        result(true, null);
      }
    });
  };

  // Get category by id
  this.getCategory = async (id, result) => {
    const pool = await connect;
    const sqlString = "SELECT * FROM Category WHERE ID_Category = @varId";
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

  // Post category (require signin, admin)
  this.createCategory = async (category, result) => {
    const pool = await connect;
    const sqlString = "INSERT INTO Category ( Name ) VALUES( @name )";
    return await pool
      .request()
      .input("name", sql.NVarChar, category.Name)
      .query(sqlString, (err, data) => {
        if (err) {
          result(true, null);
        } else {
          result(null, {
            success: true,
            message: "Created category successfully",
            category,
          });
        }
      });
  };

  // Update category (require signin, admin)
  this.updateCategory = async (category, result) => {
    const pool = await connect;
    const sqlString =
      "UPDATE Category SET Name = @name WHERE ID_Category=@varId";
    return await pool
      .request()
      .input("name", sql.NVarChar, category.Name)
      .input("varId", sql.Int, category.ID_Category)
      .query(sqlString, (err, data) => {
        if (err) {
          result(true, null);
        } else {
          result(null, {
            success: true,
            message: "Updated category successfully",
            category,
          });
        }
      });
  };

  // Delete category (require signin, admin)
  this.deleteCategory = async (id, result) => {
    const pool = await connect;
    const sqlString = "DELETE FROM Category WHERE ID_Category = @varId";
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
