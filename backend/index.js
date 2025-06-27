import express from 'express';
import cors from 'cors';
import listingRoutes from './routes/listingRoutes.js';
import sequelize from './db/db.js';
import Listing from './model/listing.js'; // Import to ensure model gets registered

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // Needed to parse POST body
app.use('/api', listingRoutes);

// Sync Sequelize and start the server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to DB:', err);
});
