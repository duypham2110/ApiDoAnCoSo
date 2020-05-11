const mongoose = require('mongoose');

const sinhVienSchema = mongoose.Schema({
    mssv: {
        type: String,
        unique: true,
        required: true
    },
    hovaten: {
        type: String,
        required: true
    },
    malop: {
        type: String,
        required: true
    },
    tinhtranghoc: {
        type: String,
        required: true
    },
    noisinh:{
        type: String,
    },
    ngaysinh:{
        type: String,
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

mongoose.model('SinhVien',sinhVienSchema);