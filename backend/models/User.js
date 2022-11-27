const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please provide username'],
    minLength: 3,
    maxLength: 20,
  },
  email: {
    type: String,
    // required: [true, 'please provide email'],
    unique: [true, 'this email is already exists'],
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: [true, 'please provide user password'],
  },
  country: {
    type: String,
  },
  type: {
    type: String,
    required: [true, 'please provide type'],
    enum: ['Instructor', 'Individual trainee', 'Admin', 'Corporate trainee'],
    message:
      'type must be Instructor or Individual trainee or Admin or Corporate trainee',
  },
  biography: {
    type: String,
  },
  courses: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const hashedPassword = await bcrypt.hash(
    this.password,
    await bcrypt.genSalt(10)
  );
  this.password = hashedPassword;
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
