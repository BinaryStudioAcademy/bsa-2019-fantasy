import testRoutes from './test.routes';
// register all routes
export default (app) => {
    app.use('/api/test', testRoutes);
};
