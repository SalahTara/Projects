const express = require('express')
const app = express()
const cors = require("cors");
require("dotenv").config();
app.use(express.json());

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const db = require('./models');

// Routers
const postRouter = require('./routes/posts')
app.use('/posts', postRouter)

const commentsRouter = require('./routes/Comments')
app.use('/comments', commentsRouter)

const userRouter = require('./routes/Users');
app.use("/auth", userRouter)

const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter)

db.sequelize.sync().then(() => {
	app.get("/", (req, res) => {
  		res.send("API is working ✅");
	});
	app.listen(process.env.PORT || 3005, () => {
	console.log('Server is running... on port 3005')
	});
})
.catch((err) => {
	console.log(err)
});


