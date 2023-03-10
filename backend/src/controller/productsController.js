
const validation = require("../validation/index");
module.exports = {
  getAllProducts: async (req, res, next) => {
       /*
     #swagger.tags = ['PRODUCTS']
   */
    try {
      const limit = parseInt(req.query.record ?? 10);
      const page = parseInt(req.query.page ?? 1);

      const params = {
        ...req.query,
        page,
        limit,
      };
      const products = await req.productsUC.getAll(params);
      return res.status(200).json({ products });
    } catch (error) {
      next(error)
    }
  },
  getByIdProducts: async (req, res, next) => {
       /*
     #swagger.tags = ['PRODUCTS']
   */
    try {
      const { id } = req.params;
      const product = await req.productsUC.getByid(id);
      return res.status(200).json({ product });
    } catch (error) {
      return next(error)
    }
  },
  createProducts: async (req, res, next) => {
       /*
     #swagger.tags = ['PRODUCTS']
   */
    try {
        const { error } = validation.createProduct(req.body);
        if (error) {
          return res.status(400).json({ message: error.message });
        }
      const request = {
        user_id: req.user.id,
        name_product: req.body.name_product,
        price: req.body.price,
        descripition: req.body.descripition,
        image: req.file.path,
      };
      const product = await req.productsUC.create(request);
      return res.status(200).json({ product });
    } catch (error) {
      next(error)
    }
  },

  updateProducts: async (req, res, next) => {
       /*
     #swagger.tags = ['PRODUCTS']
   */
    const { error } = validation.createProduct(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const { id } = req.params;
      const request = {
        name_product: req.body.name_product,
        price: req.body.price,
        descripition: req.body.descripition,
        image: req.body.image,
      };
      const product = await req.productsUC.update(id, request);
      return res.status(200).json({ product });
    } catch (error) {
     next(error)
    }
  },

  deleteProducts: async (req, res, next) => {
       /*
     #swagger.tags = ['PRODUCTS']
   */
    try {
    const { id } = req.params;
    const user_id = req.user.id;
    await req.productsUC.delete(id, user_id);
    return res.status(200).json({ message: "Succces delete product" });
    } catch (error) {
      next(error)
    }
  },
};
