import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import footballClubRoutes from "./football-club.routes";
import playerMatchRoutes from "./player-match.routes";
import leagueRoutes from "./league.routes";
import gameweekHistoryRoutes from "./gameweek-history.routes";
import eventRoutes from "./event.routes";
import gameRoutes from "./game.routes";

// register all routes
export default app => {
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/teams", footballClubRoutes);
    app.use("/api/player-match-stats", playerMatchRoutes);
    app.use("/api/leagues", leagueRoutes);
    app.use("/api/gameweek-history", gameweekHistoryRoutes);
    app.use("/api/events", eventRoutes);
    app.use("/api/games", gameRoutes);
};
