let checkLogin = function checkLogin(req, res, next) {
    if (!req.session.userid) {
        res.json({
            error: '未登录'
        });
    }
    next();
}

let checkNotLogin = function checkNotLogin(req, res, next) {
    if (req.session.userid) {
        res.json({
            error: '已登录'
        });
    }
    next();
}
let checkAdmin = function checkAdmin (req, res, next) {
    if (req.session.userid === 'admin') {
        res.json({
            error: '暂无权限'
        });
    }

    next();
}

export default {
    checkLogin,
    checkNotLogin,
    checkAdmin
};