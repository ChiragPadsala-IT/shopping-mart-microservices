import dotEnv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  APP_SECRET: process.env.APP_SECRET,
};
