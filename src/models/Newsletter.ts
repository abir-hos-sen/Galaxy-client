import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);

export default Newsletter;
