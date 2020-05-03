const mongoose = require('mongoose');

const thongTinSchema = mongoose.Schema({
    mssv: {
        type: String,
        unique: true,
        required: true
    },
    noisinh:{
        type: String,
    },
    ngaysinh:{
        type: Date,
    },
    dantoc:{
        type: String,
    },
    gioitinh:{
        type: String,
    },
    sdt:{
        type: String,
    },
    email:{
        type: String,
    },
    cmnd:{
        type: String,
    },
    diachi:{
        type: String,
    }
});

mongoose.model('ThongTinCaNhan',thongTinSchema);