const { Router } = require('express');
const  dogsRoutes  = require('./dogsRoutes');
const temperamentsRoutes = require('./temperamentsRoutes')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', dogsRoutes);
router.use("/", temperamentsRoutes);

module.exports = router;


