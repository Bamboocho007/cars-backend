export const environment = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DATABSE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSWORD,
  },
  jwtSecret: process.env.JWT_SECRET,
});

export type EnvType = {
  port: number;
  database: {
    type: string;
    host: string;
    port: number;
    username: string;
    database: string;
    password: string;
  };
  jwtSecret: string;
};
