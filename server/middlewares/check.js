let checkLogin = function checkLogin(req, res, next) {
    if (!req.session.user) {
        res.json({
            error: '未登录'
        });
    }
    console.log(req.session.user);
    next();
}

let checkNotLogin = function checkNotLogin(req, res, next) {
    if (req.session.user) {
        res.json({
            error: '已登录'
        });
    }
    console.log(req.session.user);
    next();
}

export default {
    checkLogin,
    checkNotLogin
};