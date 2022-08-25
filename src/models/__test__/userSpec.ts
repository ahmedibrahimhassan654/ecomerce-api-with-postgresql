import UserModel from '../userModel';
import db from '../../DB';
import User from '../../dataTypes/userType';

const userModel = new UserModel();

describe('user model test', () => {
  describe('user methods are  exists ', () => {
    it('should get all users ', () => {
      expect(userModel.getAllUsers).toBeDefined();
    });
    it('should create new user method  ', () => {
      expect(userModel.create).toBeDefined();
    });
    it('should update user method  ', () => {
      expect(userModel.updateUser).toBeDefined();
    });
    it('should get single user methd ', () => {
      expect(userModel.getUser).toBeDefined();
    });
    it('should delete user method ', () => {
      expect(userModel.deleteUser).toBeDefined();
    });
  });
  describe('Test User Model Logic', () => {
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
      const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should return a New User', async () => {
      const createdUser = await userModel.create({
        email: 'test2@test.com',
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123',
      });
      // console.log('created user', createdUser);

      expect(createdUser).toEqual({
        id: createdUser.id,
        email: 'test2@test.com',
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
      } as User);
    });

    it('Get Many method should return All available users in DB', async () => {
      const users = await userModel.getAllUsers();
      //  console.log(users);

      expect(users.length).toBe(2);
    });

    // it('Get One method should return testUser when called with ID', async () => {
    //   const returnedUser = await userModel.getUser(user.id as string);
    //   console.log(returnedUser);

    //   //   expect(returnedUser.id).toBe(user.id);
    //   //   expect(returnedUser.email).toBe(user.email);
    //   //   expect(returnedUser.user_name).toBe(user.user_name);
    //   //   expect(returnedUser.first_name).toBe(user.first_name);
    //   //   expect(returnedUser.last_name).toBe(user.last_name);
    // });

    // it('Update One method should return a user with edited attributes', async () => {
    //   const updatedUser = await userModel.updateUser({
    //     ...user,
    //     user_name: 'testUser Updated',
    //     first_name: 'Mohammed',
    //     last_name: 'Elzanaty',
    //   });
    //   expect(updatedUser.id).toBe(user.id);
    //   expect(updatedUser.email).toBe(user.email);
    //   expect(updatedUser.user_name).toBe('testUser Updated');
    //   expect(updatedUser.first_name).toBe('Mohammed');
    //   expect(updatedUser.last_name).toBe('Elzanaty');
    // });

    // it('Delete One method should delete user from DB', async () => {
    //   const deletedUser = await userModel.deleteUser(user.id as number);
    //   expect(deletedUser.id).toBe(user.id);
    // });
  });
});
