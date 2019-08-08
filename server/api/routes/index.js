import testRoutes from "./test.routes";
import authRoutes from "./auth.routes";
// register all routes
export default app => {
    app.use("/api/test", testRoutes);
    app.use("/api/auth", authRoutes);
};
