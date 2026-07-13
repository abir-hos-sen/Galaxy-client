import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    entryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SpaceEntry', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

ReviewSchema.index({ entryId: 1, userId: 1 }, { unique: true });

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export default Review;
