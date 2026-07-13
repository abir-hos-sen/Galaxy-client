import mongoose from 'mongoose';

const SpaceEntrySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    category: {
      type: String,
      enum: ['Mission', 'Planet', 'Star', 'Galaxy', 'Nebula', 'Astronaut'],
      required: true,
      index: true,
    },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    imageUrl: { type: String, required: true },
    additionalImages: { type: [String], default: [] },
    date: { type: Date, required: true },
    distanceFromEarth: { type: String, required: true },
    agency: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    status: {
      type: String,
      enum: ['Active', 'Completed', 'Planned'],
      required: true,
      index: true,
    },
    location: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const SpaceEntry = mongoose.models.SpaceEntry || mongoose.model('SpaceEntry', SpaceEntrySchema);

export default SpaceEntry;
