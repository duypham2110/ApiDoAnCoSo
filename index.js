require('./src/models/User');
require('./src/models/ThongTinCaNhan');
require('./src/models/ThongBao');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes=require('./src/routes/authRoutes'); 
const updateRoutes=require('./src/routes/updateRoutes');   
const notifyRoutes=require('./src/routes/notifyRoutes');  
const requireAuth=require('./src/middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(updateRoutes);
app.use(notifyRoutes);

const mongoUri = 'mongodb+srv://admin:2110@cluster0-30ryd.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error',(err)=>{
    console.error('Error connecting to mongo',err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
})