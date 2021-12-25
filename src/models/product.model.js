const { connect, sql } = require("../config/dbconfig");

module.exports = function () {
  // Get all products
  this.getProducts = async (result) => {
    const pool = await connect;
    // const sqlString =
    // "SELECT * FROM Product AS pb JOIN Request AS rq ON pb.ID_Request = rq.ID_Request";
    const sqlString = "SELECT * FROM Product";
    return await pool.request().query(sqlString, (err, product) => {
      if (product.recordset.length > 0) {
        const products = product.recordset;
        result(null, {
          success: true,
          message: "Get products successfully",
          products,
        });
      } else {
        result(true, null);
      }
    });
  };

  // Get top 4 new products
  this.getNewsProduct = async (result) => {
    const pool = await connect;
    const sqlString = "SELECT TOP 4 * FROM Product ORDER BY ID_Product DESC";
    return await pool.request().query(sqlString, (err, product) => {
      if (product.recordset.length > 0) {
        const products = product.recordset;
        result(null, {
          success: true,
          message: "Get top 4 products successfully",
          products,
        });
      } else {
        result(true, null);
      }
    });
  };

  // Get product details (Consists of request and links Product)
  this.getProduct = async (id, result) => {
    const pool = await connect;
    const sqlString = "SELECT * FROM Product WHERE Product.ID_Product = @varId";
    return await pool
      .request()
      .input("varId", sql.Int, id)
      .query(sqlString, (err, data) => {
        if (data.recordset.length > 0) {
          const productDetail = data.recordset[0];
          result(null, {
            success: true,
            message: "Get product detail successfully",
            productDetail,
          });
        } else {
          result(true, null);
        }
      });
  };

  // Get product by category
  this.getProductByCategory = async (id, result) => {
    const pool = await connect;
    const sqlString = "SELECT * FROM Product WHERE ID_Category = @varId";
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

  // Create new product (middleware required signin, admin)
  this.createNewProduct = async (newProduct, id, result) => {
    const pool = await connect;
    newProduct.Point_Rare = 0;
    // newProduct.ID_DLer = id;
    // const sqlString =
    //   "INSERT INTO Product ( Name, Game_genre, Decription, Video_Game, Free_Space, Time_Update, Image_1, Image_2, Image_3, Point_Rare, ID_Category, ID_Request, ID_DLer ) VALUES( @name, @gameGenre, @description, @videoGame, @freeSpace, @timeUpdate, @image1, @image2, @image3, @pointRare, @idCategory, @idRequest, @idDler )";
    const sqlString =
      "INSERT INTO Product ( Name, Game_genre, Decription, Video_Game, Free_Space, Time_Update, Image_1, Image_2, Image_3, Point_Rare, Ram, OS, Languages, Player, Link_Fshare, Link_Vip, ID_Category ) VALUES(  @name, @gameGenre, @description, @videoGame, @freeSpace, @timeUpdate, @image1, @image2, @image3, @pointRare, @ram, @os, @languages, @player, @linkFshare, @linkVip, @IDCategory )";

    return await pool
      .request()
      .input("name", sql.NVarChar, newProduct.Name)
      .input("gameGenre", sql.NVarChar, newProduct.Game_genre)
      .input("description", sql.NVarChar, newProduct.Decription)
      .input("videoGame", sql.NVarChar, newProduct.Video_Game)
      .input("freeSpace", sql.Float, newProduct.Free_Space)
      .input("timeUpdate", sql.Date, newProduct.Time_Update)
      .input("image1", sql.NVarChar, newProduct.Image_1)
      .input("image2", sql.NVarChar, newProduct.Image_2)
      .input("image3", sql.NVarChar, newProduct.Image_3)
      .input("pointRare", sql.NVarChar, newProduct.Point_Rare)
      .input("ram", sql.Int, newProduct.Ram)
      .input("os", sql.NVarChar, newProduct.OS)
      .input("languages", sql.NVarChar, newProduct.Languages)
      .input("player", sql.NVarChar, newProduct.Player)
      .input("linkFshare", sql.NVarChar, newProduct.Link_Fshare)
      .input("linkVip", sql.NVarChar, newProduct.Link_Vip)
      .input("IDCategory", sql.Int, newProduct.ID_Category)
      .query(sqlString, (err, data) => {
        if (err) {
          console.log(err);
          result(true, null);
        } else {
          result(null, newProduct);
        }
      });
  };

  // Update product (middleware required signin, admin)
  this.updateProduct = async (newData, result) => {
    const pool = await connect;
    const sqlCheck = "SELECT * FROM Product WHERE ID_Product = @varId";
    const sqlString =
      "UPDATE Product SET Name = @name, Game_genre = @gameGenre, Decription = @description, Video_Game = @videoGame, Free_Space = @freeSpace, Time_Update = @timeUpdate, Image_1 = @image1, Image_2 = @image2, Image_3 = @image3, Point_Rare = @pointRare, Ram = @ram, OS = @os, Languages = @languages, Player = @player, Link_Fshare = @linkFshare, Link_Vip = @linkVip, ID_Category = @IDCategory WHERE ID_Product = @varId";
    pool
      .request()
      .input("varId", sql.Int, newData.ID_Product)
      .query(sqlCheck, (err, data) => {
        if (!data.recordset[0]) {
          result({
            success: false,
            message: "Product not found",
          });
        } else {
          pool
            .request()
            .input("name", sql.NVarChar, newData.Name)
            .input("gameGenre", sql.NVarChar, newData.Game_genre)
            .input("description", sql.NVarChar, newData.Decription)
            .input("videoGame", sql.NVarChar, newData.Video_Game)
            .input("freeSpace", sql.Float, newData.Free_Space)
            .input("timeUpdate", sql.Date, newData.Time_Update)
            .input("image1", sql.NVarChar, newData.Image_1)
            .input("image2", sql.NVarChar, newData.Image_2)
            .input("image3", sql.NVarChar, newData.Image_3)
            .input("pointRare", sql.NVarChar, newData.Point_Rare)
            .input("ram", sql.Int, newData.Ram)
            .input("os", sql.NVarChar, newData.OS)
            .input("languages", sql.NVarChar, newData.Languages)
            .input("player", sql.NVarChar, newData.Player)
            .input("linkFshare", sql.NVarChar, newData.Link_Fshare)
            .input("linkVip", sql.NVarChar, newData.Link_Vip)
            .input("IDCategory", sql.Int, newData.ID_Category)
            .input("varId", sql.Int, newData.ID_Product)
            .query(sqlString, (err, data) => {
              if (err) {
                result(
                  { success: false, message: "Update product falure" },
                  null
                );
              } else {
                result(null, newData);
              }
            });
        }
      });
  };

  // Delete product (middleware required signin, admin)
  this.deleteProduct = async (id, result) => {
    const pool = await connect;
    const sqlCheck = "SELECT * FROM Product WHERE ID_Product = @varId";
    const sqlString = "DELETE FROM Product WHERE ID_Product = @varId";
    pool
      .request()
      .input("varId", sql.Int, id)
      .query(sqlCheck, (err, data) => {
        if (!data.recordset[0]) {
          result({
            success: false,
            message: "Product not found",
          });
        } else {
          pool
            .request()
            .input("varId", sql.Int, id)
            .query(sqlString, (err, data) => {
              if (err) {
                result(true, null);
              } else {
                result(null, {
                  success: true,
                  message: "Deleted product successfully",
                });
              }
            });
        }
      });
  };
};
