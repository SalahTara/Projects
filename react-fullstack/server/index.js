const express = require('express')
const app = express()
const cors = require("cors");
require("dotenv").config();

app.use(express.json());

app.use(cors({
  origin: 'https://effervescent-puppy-32554e.netlify.app',
  credentials: true, // if you use cookies/auth
}));
app.use(express.json());


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
	app.listen(process.env.PORT || 3001, () => {
	console.log('Server is running... on port 3001')
	});
})
.catch((err) => {
	console.log(err)
});


