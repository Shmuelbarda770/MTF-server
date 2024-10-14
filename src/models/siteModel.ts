import mongoose, { Schema, Document } from 'mongoose';


interface ISite extends Document {
  name: string;
  address: string;
  creationDate: Date;
  lastUpdated: Date;
}

const SiteSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // This option automatically adds `createdAt` and `updatedAt` fields
  }
);


SiteSchema.pre<ISite>('save', function (next) {
  this.lastUpdated = new Date();
  next();
});

// Export the model
const Site = mongoose.model<ISite>('Site', SiteSchema);

export default Site;
