import express from 'express';
import listingController from '../controller/listingController.js';

const router = express.Router();

router.get('/listings', listingController.getListings);
router.get('/mocklistings', listingController.getMockList);

export default router;
