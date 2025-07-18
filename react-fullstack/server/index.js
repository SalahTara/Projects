const express = require('express')
const app = express()
const cors = require("cors");

app.use(express.json());
app.use(cors());
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
	app.listen(3001, () => {
	console.log('Server is running... on port 3001')
})}
)


