const { getUser } = require("../service/auth.service");

function checkForAuthentication(req, res, next) {
    const tokenCookie = req?.cookies?.token;
    req.user = null;

    if(!tokenCookie) return next();

    const user = getUser(tokenCookie);

    req.user = user;
    next();
}

 function restrictTo(roles=[]) {
    return function (req, res, next) {
        if(!req.user) return res.redirect('/login')
        console.log('Roles : ', req.user)
        if(!roles.includes(req.user.role)) return res.send("Unauthorized access!");

        return next();
    }
}

module.exports = {restrictTo, checkForAuthentication};