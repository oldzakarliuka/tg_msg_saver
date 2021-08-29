const User = require("../services/user.service");
const Msg = require("../services/msg.service");
const { send2tg } = require("../services/api.service");
const webhookHandler = async (req, res) => {
  try {
    const { from: user, date, text } = req.body?.message;
    if (text?.[0] == "/") {
      return;
    }

    const { _id: user_id } = await User.saveOrUpdate(user);
    const { _id: msg_id } = await Msg.save({
      user: user_id,
      date: `${date}000`,
      msg: text,
    });
    await User.updateRelationship({ user_id, msg_id });
    await send2tg(
      user.id,
      `😍  Угу, сохранил! ${user.first_name}, что-нибудь еще?`
    );
  } catch (e) {
    console.log(e);
  } finally {
    res.send(req.body);
  }
};

module.exports = {
  webhookHandler,
};
