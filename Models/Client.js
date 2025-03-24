const { default: validate } = require("deep-email-validator");
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        phone: {
            type: String,
            // validate: {
            //     validator: function(v) {
            //         return /(\d{3})\s\d{3}-\d{4}/.test(v);
            //     },
            //     message: props => `${props.value} is not a valid phone number!`
            // },
            required: [true, "User phone number required"]
        },
        method: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /[South Carolina]/.test(v);
                },
                message: props => `${props.value} is not a required state`
            },
            default: () => "South Carolina"
        },
        address: {
            type: String,
            required: true
        },
        zipcode: {
            type: Number,
            minLength: 5,
            maxLength: 5
        },
        services: [String],
        message: {
            type: String
        },
        appointmentType: String,
        createdAt: {
            type: Date,
            default: () => new Date().toLocaleString()
        }
    },


)

const client = mongoose.model("client", clientSchema)


module.exports = client;