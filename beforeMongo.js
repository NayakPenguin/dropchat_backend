// const express = require('express')
// const cors = require('cors')
// const path = require('path')
// const app = express()
// const port = 8000;
// const mongoose = require('mongoose');


// app.use(cors());
// app.use(express.json());

// const schema = new mongoose.Schema({
//   roomId: String,
//   message: String,
// });


// var Messages = mongoose.model('messages',schema);

// app.get('/', (req, res) => {
//     Messages.find({},(err,result)=>{res.status(200).json(result.reverse())});
// })

// const CONNECTION_URL = 'mongodb+srv://snape:snape@cluster0.1t67b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


// app.post('/response', (req, res) => {
//   const { roomId, message, } = req.body; 
//   console.log(req.body);
// //   res.json(req.body);

//   const obj = new Messages(
//       {
//         roomId,
//         message,
//       }
//     );

//     obj.save().then(() => {
//     res.json(req.body);
//   }).catch((err) => res.json({error : "Can't save to mongo!"}));
// })

// app.listen(port || process.env.PORT, ()=> {
//   console.log(`Example app listening at http://localhost:${port}`)
//   // mongoose.connect(CONNECTION_URL,{
//   //     useNewUrlParser: true ,
//   //     useUnifiedTopology: true
//   // }).then(()=>{
//   //     console.log('Connection Succesful !!!')
//   // }).catch((err)=> console.log(err))
// })

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

const apiRoutes = [
  {
    allRooms : "/all/rooms",
    createRoom : "/create/room",
    specificRoom : "/all/rooms/:roomID",
    postRespond : "/all/rooms/:roomID/respond",
    viewResponses : "/all/rooms/:roomID/view-responses",
    login : "/user/login/room",
  }
]

const rooms = [];
const responses = [];



app.get('/', (req, res) => {
    res.send(apiRoutes);
});

app.get('/all/rooms', (req, res) => {
  res.send(rooms);
});

app.post('/create/room/', (req, res) => {
    const room = {
        roomCount : rooms.length + 1,
        roomID : req.body.roomID,
        // token
        owner: req.body.owner,
        topic: req.body.topic,
        password: req.body.password,
        // date: req.body.date,
    }

    rooms.push(room);

    res.send(room);
});

app.get('/all/rooms/:roomID', (req, res) => {
  const room = rooms.find(e => e.roomID == req.params.roomID);
  if(room) res.send(room);
  else res.send("Sorry the room couldn't be found! Kindly check the spelling.");
});

app.post('/all/rooms/:roomID/respond', (req, res) => {
  const response = {
      responseCount : responses.length + 1,
      roomID : req.params.roomID,
      // token
      responseMsg: req.body.response,
      date: req.body.date,
      // date
  }

  responses.push(response);

  res.send(response);
});

app.get('/all/rooms/:roomID/view-responses', (req, res) => {
  const response = responses.filter(e => e.roomID == req.params.roomID);
  if(response) {
    res.send(response);
  }
  else res.send("Sorry the room responses couldn't be found! Kindly check the spelling.");
});

app.post('/user/login/room', (req, res) => {
  const room = rooms.find(e => e.roomID == req.body.roomID);
  if(room){
    if(room.password != req.body.password){
      res.send("0");
    }else res.send(room);
  }
  else res.send("-1");
  // -1 ---> when room not found
  // 0 ----> password doesnot match
  // object ----> room and password match! R A R E   S E L E N A    G O M E Z
});



app.listen(port, ()=> {
    console.log(`Listening at port ${port}...`);
})
