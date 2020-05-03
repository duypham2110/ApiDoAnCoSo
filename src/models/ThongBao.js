const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const thongBaoSchema = mongoose.Schema({
    noidung: {
        type: String,
        required: true
    },
    nguoidang:{
        type: String
    }
});

thongBaoSchema.plugin(AutoIncrement, {inc_field: 'id'});

mongoose.model('ThongBao', thongBaoSchema);