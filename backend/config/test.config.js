// Test configuration
export const testConfig = {
  database: {
    name: 'mapmystay_test',
    username: 'test_user',
    password: 'test_password',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  server: {
    port: 3001,
    host: 'localhost'
  },
  test: {
    timeout: 10000,
    retries: 1
  }
};

export default testConfig; 