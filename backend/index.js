const express = require('express');
const cors = require('cors');
const listingRoutes = require('./routes/listingRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use('/api', listingRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});