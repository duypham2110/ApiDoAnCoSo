const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const thongBaoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },content: {
        type: String,
        required: true
    },
    author:{
        type: String
    }
});

thongBaoSchema.plugin(AutoIncrement, {inc_field: 'id'});

mongoose.model('ThongBao', thongBaoSchema);