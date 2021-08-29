require("dotenv").config();

module.exports.MONGODB_URL = process.env.MONGODB_URL;
module.exports.TGBOT_URL = process.env.TGBOT_URL;
module.exports.BOT_TOKEN = process.env.BOT_TOKEN;
module.exports.ADMIN_EMAIL = process.env.ADMIN_EMAIL
module.exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
module.exports.COOKIE = process.env.COOKIE
module.exports.PORT = process.env.PORT