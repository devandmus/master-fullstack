import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT = 10;
const PASSWORD_PATTERN = /^.{8,}$/;
const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserSchema = new mongoose.Schema({
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    match: EMAIL_PATTERN
  },
  password: {
    type: String,
    required: true,
    match: PASSWORD_PATTERN
  },
  bio: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    }
  }
});


UserSchema.pre('save', function(next) {
  if(this.isModified('password'))
    bcrypt
      .genSalt(SALT)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(err => next(err));
});


UserSchema.methods.hasValidPassword = function(password) {
  return bcrypt.compare(password, this.password);
}


export default mongoose.model('User', UserSchema);
