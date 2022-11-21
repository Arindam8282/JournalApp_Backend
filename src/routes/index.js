const taskRoutes = require('./taskRoutes')
const userRoutes = require('./userRoutes')
const contactRoutes = require('./contactRoutes')

const Routes = (app) => {
  app.use('/user', userRoutes);
  app.use('/task', taskRoutes);
  app.use('/contact', contactRoutes);

}

module.exports = Routes