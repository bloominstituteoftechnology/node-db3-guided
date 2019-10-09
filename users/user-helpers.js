module.exports = {
    isValidUser,
}

function isValidUser(user) {
    return !!user.username; // user.username !== '';
}