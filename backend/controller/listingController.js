import Listing from '../model/listing.js';
import { mocklistings } from '../model/listing.js';

// Get all listings from DB
const getListings = async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};

// For compatibility: return mock-style listings if needed (optional)
const getMockList = async (req, res) => {
  try {
    const listings = mocklistings;
    res.json(listings);
  } catch (error) {
    console.error('Error fetching mock listings:', error);
    res.status(500).json({ error: 'Failed to fetch mock listings' });
  }
};

// Create a new listing
const createListing = async (req, res) => {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ error: 'Failed to create listing' });
  }
};

// Update listing by ID
const updateListing = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Listing.update(req.body, { where: { id } });
    if (updated) {
      const updatedListing = await Listing.findByPk(id);
      res.json(updatedListing);
    } else {
      res.status(404).json({ error: 'Listing not found' });
    }
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ error: 'Failed to update listing' });
  }
};

// Delete listing by ID
const deleteListing = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Listing.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Listing deleted' });
    } else {
      res.status(404).json({ error: 'Listing not found' });
    }
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ error: 'Failed to delete listing' });
  }
};

const getListingById = async (req, res) => {
  const id = parseInt(req.params.id);
  const listing = mocklistings.find(l => l.id === id);
  if (!listing) return res.status(404).json({ message: "Listing not found" });
  res.json(listing);
};

export default {
  getListings,
  getListingById,
  getMockList,
  createListing,
  updateListing,
  deleteListing,
};
