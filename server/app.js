const express = require('express');
const cors = require('cors');
const userRoutes = require('.routes/userRoutes');
const messageRoutes = require('.routes/messageRoutes');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello to my app');
});

app.use(userRoutes);
app.use(messageRoutes);

app.listen(PORT, () => console.log('server running on PORT ' + PORT));
