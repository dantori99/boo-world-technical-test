const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const UserSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true,
        lowercase: true,
    }
}, { versionKey: false })

UserSchema.plugin(mongooseDelete, { overrideMethods: "all" })

const User = mongoose.model('User', UserSchema);

module.exports = User;