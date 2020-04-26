export const setupEnvVariables = async () => {
  const env = {
    DB_NAME: "test",
    DB_USER: "root",
    DB_PASSWORD:"",
    DB_HOST: "localhost",
    DB_DIALECT: "mysql",
    DB_HOST_PORT: "3306",
  };
  process.env = { ...process.env, ...env };
}