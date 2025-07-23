const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const sequelize = require('./config/db');
const routes = require('./routes');
const cron = require('node-cron');
const { updateFixtures } = require('./seed/updater');
const { initCache } = require('./middleware/cache');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
initCache();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

app.use('/api', routes);

const PORT = process.env.PORT || 4000;

io.on('connection', socket => {
  console.log('socket connected');
});

sequelize.sync().then(() => {
  if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
});

cron.schedule('0 5 * * *', updateFixtures);

module.exports = { io };
module.exports.app = app;
