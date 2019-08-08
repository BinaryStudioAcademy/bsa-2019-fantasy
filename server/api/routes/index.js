import testRoutes from "./test.routes";
import authRoutes from "./auth.routes";
// register all routes
export default app => {
    app.use("/api/test", testRoutes);
    app.use("/auth", authRoutes);
};
