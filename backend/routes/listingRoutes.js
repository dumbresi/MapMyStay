import express from 'express';
import listingController from '../controller/listingController.js';

const router = express.Router();

router.get('/listings', listingController.getListings);
router.post('/listings', listingController.createListing);
router.get('/listings/:id', listingController.getListingById);
router.put('/listings/:id', listingController.updateListing);
router.delete('/listings/:id', listingController.deleteListing)
router.get('/mocklistings', listingController.getMockList);

export default router;
