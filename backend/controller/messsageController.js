const Conversation = require("../model/conversation.js");
const Message = require("../model/message.js");

module.exports = {
  sendmessasgeController: async (req, res) => {
    try {
      const { id: recieverId } = req.params;
      const { message } = req.body;
      const senderId = req.user._id;

      let Conversations = await Conversation.findOne({
        participents: { $all: [senderId, recieverId] },
      });
      if (!Conversations) {
        Conversations = await Conversation.create({
          participents: [senderId, recieverId],
        });
      }
      const newMessage = new Message({
        senderId,
        message,
        recieverId,
      });
      if (newMessage) {
        Conversations.messages.push(newMessage._id);
      }
      await Promise.all([newMessage.save(), Conversations.save()]);
      res.status(200).json({
        data: {
          newMessage,
        },
      });
    } catch (err) {
      res.status(500).json({ err: `Internal Server err ${err.message}` });
    }
  },
  getMessage: async (req, res) => {
    const { id: recieverId } = req.params;
    const senderId = req.user._id;
    let Conversations = await Conversation.findOne({
      participents: { $all: [senderId, recieverId] },
    }).populate("messages");
    if(!Conversations) return res.status(400).json("No message found!");
    console.log(Conversations, "--con");
    res.status(200).json(Conversations.messages);
  },
};
