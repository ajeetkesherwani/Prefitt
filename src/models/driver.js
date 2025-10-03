const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true
    },
    dob: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: false
    },
    email: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    mobile: {
        type: Number,
        unique: true,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid 10-digit number!`,
        },
    },
    vehicleType: {
        type: String,
        enum: ["Bike", "Bicycle ", "Car", "Auto"]
    },
    otp: {
        type: String,
        default: ""
    },
    otpExpire: {
        type: Date,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    commission: {
        type: Number,
        default: 0,
    },
    walletBalance: {
        type: Number,
        default: 0
    },
    location: {
        latitude: {
            type: String,
            default: ""
        },
        longitude: {
            type: String,
            default: ""
        }
    },
    frontPhoto: {
        type: String,
        required: false,
        trim: true
    },

    status: {
        type: Boolean,
        default: false
    },
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DriverDetail",
    },
    accounts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DriverAccountDetail",
    },
    fcmToken: {
        type: String,
        default: false
    },
    deviceId: {
        type: String,
        default: false
    }

}, { timestamps: true });

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;