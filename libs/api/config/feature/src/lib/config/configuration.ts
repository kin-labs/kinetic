export default () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
})
