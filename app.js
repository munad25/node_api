const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();
const routerindex = require('./routers/index');
require('./config/passport')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use('/api/v1', routerindex);
app.get('/', (req, res) => {
    res.send("Hallo");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runing on PORT: ${PORT}`));

