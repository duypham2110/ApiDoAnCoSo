require('./src/models/User');
require('./src/models/ThongBao');
require('./src/models/Sinhvien');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes=require('./src/routes/authRoutes'); 
const statisticRoutes=require('./src/routes/statisticRoutes');   
const manageRoutes=require('./src/routes/manageRoutes');  
const requireAuth=require('./src/middlewares/requireAuth');

const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(authRoutes);
app.use(statisticRoutes);
app.use(manageRoutes);

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

app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('index'))
.listen(PORT, () => console.log(`Listening on ${ PORT }`))