const path = require('path')

exports.getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'landing.html'))
};
exports.getSignup = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'signup.html'))
};
exports.getSignin = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'signin.html'))
};

exports.superadmin = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'superadmin.html'))
};

exports.hrhome = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'adminpage1.html'))
};
exports.postjob = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'adminpostjob.html'))
};
exports.details = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'detail.html'))
};
exports.joblist = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'joblist.html'))
};
exports.result = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'result.html'))
};
exports.userDetails = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'userDetail.html'))
};
exports.adminUsers = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'admin_user.html'))
}
exports.adminHr = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'admin_hr.html'))
}
exports.profile = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'profile.html'))
}



