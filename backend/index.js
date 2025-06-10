import express from 'express';
import cors from 'cors';
import listingRoutes from './routes/listingRoutes.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use('/api', listingRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});