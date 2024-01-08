const { app, expressConfig } = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const dbConnect = require('./config/dbConfig');

const { PORT } = require('./constants');

const routes = require('./router');

const errorHandleMiddleware = require('./middlewares/errorHandleMiddleware');

dbConnect()
    .then(() => console.log(`connected to db`))
    .catch(err => console.log(`err while connecting to db: ${err.message}`));

handlebarsConfig(app);
expressConfig(app);

app.use(routes);
app.use(errorHandleMiddleware);

app.listen(PORT, () => console.log('server is running on port 3000'));