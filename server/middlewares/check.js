let checkLogin = function checkLogin(req, res, next) {
    if (!req.session.userid) {
        res.json({
            result: false,
            message: '未登录'
        });
    } else {
        next();
    }
    
}

let checkNotLogin = function checkNotLogin(req, res, next) {
    if (req.session.userid) {
        res.json({
            result: false,
            message: '已登录'
        });
    } 
    next();
}
let checkAdmin = function checkAdmin (req, res, next) {
    if (req.session.userid  !== 'admin') {
        res.json({
            result: false,
            message: '暂无权限'
        });
    } 
    next();
}

export default {
    checkLogin,
    checkNotLogin,
    checkAdmin
};