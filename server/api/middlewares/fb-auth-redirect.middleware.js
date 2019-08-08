import passport from "passport";

export default passport.authenticate("facebook", {
    failureRedirect: "/login"
});
