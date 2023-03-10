const { Op } = require('sequelize')
const { products } = require("../models");


class ProductsRepository {
  constructor() {
    this._productsModel = products;
  }
  async getAll(params, options) {
    const filters = {};

    if (params) {
      const search = params.q;
      if (search) {
        filters[Op.or] = [
          {
            name_product: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ];
      }
    }

    const result = await this._productsModel.findAndCountAll({
      where: filters,
      ...options,
      distinct: true,
    });

    return result;
    }

  async getByid(id, options = {}) {
    const result = await this._productsModel.findOne({
      where : {
        id
      },
      attributes: { exclude: ["password"] },
      ...options,
    });
    return result;
  }

  async create(products) {
    const result = await this._productsModel.create(products);
    return result;
  }

  async update(id, products) {
    const result = await this._productsModel.update(products, {
      where: {
        id
      }
    });
    return result;
  }
  async delete(id) {
    const result = await this._productsModel.destroy({
      where: {
        id
      }
    });
    return result;
  }
}

module.exports = ProductsRepository;
