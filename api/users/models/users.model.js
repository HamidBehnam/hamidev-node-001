const mongoose = require('../../common/services/mongoose.service').mongoose;

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: {
        type: Number,
        enum: [100, 200, 300],
        default: 100
    }
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.password;
    }
});

const User = mongoose.model('User', userSchema, 'users');

exports.create = (userData) => {
    // TODO: Approach 1
    // then method is not a real promise in mongoose api, so you'll need to call the toJSON manually.
    // const user = new User(userData);
    // return user.save().then(result => result.toJSON());

    // TODO: Approach 2
    return User.create(userData);
};

exports.findById = (userId) => {
    // TODO: Approach 1
    // then method is not a real promise in mongoose api, so you'll need to call the toJSON manually.
    // return User.findById(userId).then(result => result.toJSON());

    // TODO: Approach 2
    // exec method will return a real promise so calling the toJSON will be done behind the scene.
    return User.findById(userId);
};

exports.findByIdAndUpdate = (userId, userData) => {
    // new: true is to declare that the updated document should be returned not the old one
    return User.findByIdAndUpdate(userId, userData, {
        new: true
    });
};

exports.findAll = (limit, page) => {
    return User.find()
        .limit(limit)
        .skip(--page * limit);
};

exports.findByIdAndDelete = (userId) => {
    // TODO: Approach 1
    // return User.deleteOne({_id: userId});

    // TODO: Approach 2
    // More info: https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete
    // there are 2 methods: findByIdAndDelete and findByIdAndRemove
    // based on the docs: 'You should use findByIdAndDelete except if you have a good reason not to'
    return User.findByIdAndDelete(userId);
};

exports.findByEmail = (userEmail) => {
    return User.findOne({ email: userEmail });
};
