const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');

const sendMessage = async (req,res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user.userId;
        console.log(message);

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId,receiverId] }
        })

        if(!conversation) {
            conversation =  await Conversation.create({
                participants : [senderId,receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

      /*   await newMessage.save();
        await conversation.save(); */

        await Promise.all([newMessage.save(),conversation.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage Function: ",error.message);
        res.status(500).json({error : "Internal server error"});
    }
};

const getMessages = async (req,res) => {

    try {

        const {id:userToChatId} = req.params;
        const senderId = req.user.userId;

        const conversation = await Conversation.findOne({
            participants : {$all: [senderId,userToChatId]}
        }).populate("messages");

        if(!conversation) return res.status()

        res.status(200).json(conversation.messages);
        
    } catch (error) {
        console.log("Error in getMessage function: ",error.message);
        res.status(500).json({error : "Internal Server Error."});
    }
}

const getContacts = async (req, res) => {
    try {
      const loggedInUser = req.user.userId;
  
      // Find conversations where the participants array contains the current user's ID
      const conversations = await Conversation.find({ participants: { $in: [loggedInUser] } })
        .populate('participants','firstname lastname picture'); // Adjust fields as necessary
  
      // Extract user objects from the populated conversations
      const users = conversations.flatMap(conversation => 
        conversation.participants.filter(participant => participant._id.toString() !== loggedInUser)
      );
  
      // Remove duplicates based on user IDs
      const uniqueUsers = Array.from(new Map(users.map(user => [user._id.toString(), user])).values());
  
      res.status(200).json(uniqueUsers);
    } catch (err) {
      console.error("Error Fetching Conversations: ", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


module.exports = { sendMessage,getMessages, getContacts };












/* const getContacts = async (req, res) => {
    try {
        const loggedInUser = req.user.userId;

        // Find conversations where the participants array contains the current user's ID
        const conversations = await Conversation.find({ participants: { $in: [loggedInUser] } });

        // Extract user IDs from the conversations
        const userIds = conversations.flatMap(conversation =>
            conversation.participants.map(participant => participant.toString())
        ).filter(userId => userId !== loggedInUser);

        // Remove duplicates (if any)
        const uniqueUserIds = [...new Set(userIds)];

        res.status(200).json(uniqueUserIds);
    } catch (err) {
        console.error("Error Fetching Conversations: ", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}; */