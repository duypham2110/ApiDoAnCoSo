const mongoose = require('mongoose');

const lopSchema = mongoose.Schema({
    MaLop: {
        type: String,
        unique: true,
        required: true
    },
    TenLop: {
        type: String
    },
    MaKhoa:{
        type: String
    },
    NamNhapHoc:{
        type: Number
    }
});

mongoose.model('Lop',lopSchema);