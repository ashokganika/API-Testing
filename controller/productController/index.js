const productList = require("../../utility/constants");

function ProductController(req, res, next) {

  try {
    return res.status(200).json({ productList });
  } catch (error) {
    return next({ status: 500, msg: error });
  }
}

module.exports = ProductController;

