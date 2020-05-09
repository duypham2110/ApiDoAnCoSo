const mongoose = require('mongoose');

const sinhVienSchema = mongoose.Schema({
    MSSV: {
        type: String,
        unique: true,
        required: true
    },
    HoVaTen: {
        type: String,
        required: true
    },
    MaLop: {
        type: String,
        required: true
    },
    TinhTrangHoc: {
        type: String,
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

mongoose.model('SinhVien',sinhVienSchema);