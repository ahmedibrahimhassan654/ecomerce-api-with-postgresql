import ProductModel from '../productModel';
import db from '../../DB';
import Product from '../../dataTypes/productType';

const productModel = new ProductModel();

describe('product model test', () => {
  describe('product methods are  exists ', () => {
    it('should get all products ', () => {
      expect(productModel.getAllProducts).toBeDefined();
    });
    it('should create new product method  ', () => {
      expect(productModel.create).toBeDefined();
    });
    it('should update product method  ', () => {
      expect(productModel.update).toBeDefined();
    });
    it('should get single product methd ', () => {
      expect(productModel.getproduct).toBeDefined();
    });
    it('should delete user method ', () => {
      expect(productModel.delete).toBeDefined();
    });
  });
  describe('Test product Model Logic', () => {
    const product = {
      name: 'product 1',
      description: 'desc prod 1',
      price: 10,
      category: 'cat 1',
    } as Product;
    beforeAll(async () => {
      const createdproduct = await productModel.create(product);
      product.id = createdproduct.id;
    });
    afterAll(async () => {
      const connection = await db.connect();
      const sql = 'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should return a New product', async () => {
      const createdProduct = await productModel.create({
        name: 'product 2',
        description: 'desc prod 2',
        price: 100.0,
        category: 'cat 2',
      });
      console.log(createdProduct);

      console.log('created product', createdProduct);

      expect(createdProduct).toEqual({
        ...product,
        id: createdProduct.id,
        name: createdProduct.name,
        description: createdProduct.description,
        category: createdProduct.category,
        price: createdProduct.price,
      } as Product);
    });

    it('Get Many method should return All available products in DB', async () => {
      const users = await productModel.getAllProducts();
      //  console.log(users);

      expect(users.length).toBe(2);
    });

    it('Get get product method should return test product when called with ID', async () => {
      const returnedproduct = await productModel.getproduct(product.id as string);
      //console.log('single product', returnedproduct);
      expect(returnedproduct.id).toBe(product.id);
      expect(returnedproduct.name).toBe(product.name);
      expect(returnedproduct.description).toBe(product.description);
      //   expect(returnedproduct.price).toBe(product.price);
      expect(returnedproduct.category).toBe(product.category);
    });

    it('Update One method should return a product with edited attributes', async () => {
      const updatedProduct = await productModel.update({
        ...product,

        name: 'prod edit',
        description: 'desc edit',
      });
      expect(updatedProduct.id).toBe(product.id);

      // expect(updatedUser.user_name).toBe('testUser Updated');
      expect(updatedProduct.name).toBe('prod edit');
      expect(updatedProduct.description).toBe('desc edit');
    });

    it('Delete One method should delete user from DB', async () => {
      const deletedproduct = await productModel.delete(product.id as string);
      expect(deletedproduct.id).toBe(product.id);
    });
  });
});
