console.log(process.env);

module.exports = {
  db: process.env.MONGO_URI,
  jwtSecret: process.env.JWTSECRET
};
