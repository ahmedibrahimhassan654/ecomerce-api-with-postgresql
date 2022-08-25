import UserModel from '../userModel';
import db from '../../DB';
import User from '../../dataTypes/userType';

const userModel = new UserModel();

describe('auth model ', () => {
  describe('test of th function is exist', () => {
    it('should have login method in user model ', () => {
      expect(userModel.LoginUser).toBeDefined();
    });
  });
  describe('test login logic', () => {
    const user = {
      email: 'test@test.com',
      user_name: 'testUser',
      first_name: 'Test',
      last_name: 'User',
      password: 'test123',
    } as User;

    beforeAll(async () => {
      const createdUser = await userModel.create(user);
      user.id = createdUser.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql = 'DELETE FROM users;';
      await connection.query(sql);
      connection.release();
    });
    it('login  method should return the authenticated user', async () => {
      const authenticatedUser = await userModel.LoginUser(user.email, user.password as string);
      console.log(authenticatedUser);
      expect(authenticatedUser?.email).toBe(user.email);
      expect(authenticatedUser?.user_name).toBe(user.user_name);
      expect(authenticatedUser?.first_name).toBe(user.first_name);
      expect(authenticatedUser?.last_name).toBe(user.last_name);
    });

    it('Authenticate method should return null for wrong credentials', async () => {
      const authenticatedUser = await userModel.LoginUser('ahmed@ibrahim.com', 'fake-password');
      expect(authenticatedUser).toBe(null);
    });
  });
});
