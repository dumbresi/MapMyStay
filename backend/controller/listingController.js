const Listing = require('../models/Listing');
const mocklistings = require('../models/listing');
class ListingController {
  async getListings(req, res) {
    try {
      const type = req.query.type || 'restaurant';
      const keyword = req.query.keyword || 'Indian';
      
      const results = await Promise.all(
        listings.map(async (listing) => {
          try {
            const nearby = await Listing.getNearbyPlaces(
              listing.lat,
              listing.lng,
              type,
              keyword
            );
            return {
              ...listing,
              nearby
            };
          } catch (err) {
            return {
              ...listing,
              nearby: [],
              error: err.message
            };
          }
        })
      );

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMockList(req,res){
    const listing = mocklistings;
    res.json(listing);
  }
}

module.exports = new ListingController();