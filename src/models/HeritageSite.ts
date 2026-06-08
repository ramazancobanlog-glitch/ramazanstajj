import { Schema, model, models } from 'mongoose';

export interface IHeritageSite {
  name: string;
  description: string;
  location: string;
  country: string;
  imageUrl: string;
  category: 'Cultural' | 'Natural' | 'Mixed';
  yearListed: number;
}

const HeritageSiteSchema = new Schema<IHeritageSite>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, enum: ['Cultural', 'Natural', 'Mixed'], required: true },
  yearListed: { type: Number, required: true },
}, { timestamps: true });

const HeritageSite = models.HeritageSite || model<IHeritageSite>('HeritageSite', HeritageSiteSchema);

export default HeritageSite;
