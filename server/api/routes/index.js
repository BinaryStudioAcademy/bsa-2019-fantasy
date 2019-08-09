import authRoutes from './auth.routes';
import userRoutes from './user.routes';
// register all routes
export default app => {
    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
};
