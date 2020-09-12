import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher   from  'Pusher';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: '1069204',
    key: 'b6417726fe01f35b05d7',
    secret: '875ec25c0db5513dc06e',
    cluster: 'eu',
    encrypted: true
  });

  const db = mongoose.connection
  db.once('open',()=>{
      console.log('DB connected')

      const msgCollection = db.collection("messagecontents");
      const changesStream = msgCollection.watch();

      changesStream.on("change",(change)=>{
          console.log("a change occured",change);
          
          if(change.operationType === 'insert') {
              const messageDetails = change.fullDocument;
              pusher.trigger('messages','inserted',
              {
                  name: messageDetails.name,
                  message: messageDetails.message,
                  timestamp: messageDetails.timestamp,
                  received: messageDetails.received
              });
          }else {
              console.log('Error triggering pussher')
          }
      });
  });


app.use(express.json())
app.use(cors())


const connection_url = 'mongodb+srv://admin:shikhu17@cluster0.bktry.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})



app.get("/",(req,res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req,res) => {
    
    Messages.find((err,data) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    });
});

app.post("/messages/new", (req,res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err,data) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    });
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));