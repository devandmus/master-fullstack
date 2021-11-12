import mongoose from 'mongoose';

// - id: string
// - createdAt: Date
// - updatedAt: Date
// - title: string, requerido, más de 5 caracteres
// - text: string, requerido, más de 5 caracteres
// - author: string, requerido
const PostSchema = new mongoose.Schema({
  id: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  text: {
    type: String,
    required: true,
    minlength: 5
  },
  author: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.identifier = doc._id // lo configuré para simplificar get detail en postman
      delete ret._id;
      delete ret.__v;
    }
  }
});


export default mongoose.model('Post', PostSchema);
