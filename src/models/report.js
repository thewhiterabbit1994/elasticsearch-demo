import mongoose, {
  Schema
} from 'mongoose'

const ReportSchema = new Schema({
  title: String,
  description: String,
  location: {
    lat: Number,
    lon: Number
  }
}, {
  timestamps: true
});

export default mongoose.model('Report', ReportSchema);