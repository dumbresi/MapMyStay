// Simplified controller tests
import listingController from '../controller/listingController.js';
import { mocklistings } from '../model/listing.js';

describe('Listing Controller - Simplified Tests', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    // Create simple mock objects
    mockReq = {
      params: {},
      body: {},
      query: {}
    };
    
    mockRes = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.data = data;
        return this;
      },
      send: function(data) {
        this.data = data;
        return this;
      }
    };
  });

  describe('getMockList', () => {
    it('should return mock listings', async () => {
      await listingController.getMockList(mockReq, mockRes);
      
      expect(mockRes.data).toBeDefined();
      expect(Array.isArray(mockRes.data)).toBe(true);
      expect(mockRes.data.length).toBeGreaterThan(0);
    });

    it('should return correct data structure', async () => {
      await listingController.getMockList(mockReq, mockRes);
      
      const firstListing = mockRes.data[0];
      expect(firstListing).toHaveProperty('id');
      expect(firstListing).toHaveProperty('title');
      expect(firstListing).toHaveProperty('lat');
      expect(firstListing).toHaveProperty('lng');
      expect(firstListing).toHaveProperty('price');
    });
  });

  describe('getListingById', () => {
    it('should return a listing when ID exists', async () => {
      const testId = 1;
      mockReq.params = { id: testId };
      
      await listingController.getListingById(mockReq, mockRes);
      
      expect(mockRes.data).toBeDefined();
      expect(mockRes.data.id).toBe(testId);
    });

    it('should return 404 for non-existent ID', async () => {
      const testId = 999;
      mockReq.params = { id: testId };
      
      await listingController.getListingById(mockReq, mockRes);
      
      expect(mockRes.statusCode).toBe(404);
      expect(mockRes.data).toHaveProperty('message');
    });

    it('should handle string ID parameters', async () => {
      const testId = '1';
      mockReq.params = { id: testId };
      
      await listingController.getListingById(mockReq, mockRes);
      
      expect(mockRes.data).toBeDefined();
      expect(mockRes.data.id).toBe(parseInt(testId));
    });
  });

  describe('Data Validation', () => {
    it('should return listings with valid coordinates', async () => {
      await listingController.getMockList(mockReq, mockRes);
      
      mockRes.data.forEach(listing => {
        expect(listing.lat).toBeGreaterThan(40.5);
        expect(listing.lat).toBeLessThan(41.0);
        expect(listing.lng).toBeGreaterThan(-74.1);
        expect(listing.lng).toBeLessThan(-73.7);
      });
    });

    it('should return listings with valid prices', async () => {
      await listingController.getMockList(mockReq, mockRes);
      
      mockRes.data.forEach(listing => {
        expect(listing.price).toBeGreaterThan(0);
        expect(listing.price).toBeLessThan(10000);
      });
    });

    it('should return listings with valid ratings', async () => {
      await listingController.getMockList(mockReq, mockRes);
      
      mockRes.data.forEach(listing => {
        expect(listing.rating).toBeGreaterThanOrEqual(0);
        expect(listing.rating).toBeLessThanOrEqual(5);
      });
    });
  });
}); 