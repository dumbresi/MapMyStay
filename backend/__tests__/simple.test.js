// Simple tests for basic functionality
import { mocklistings } from '../model/listing.js';

describe('Simple Functionality Tests', () => {
  describe('Mock Data', () => {
    it('should have mock listings data', () => {
      expect(mocklistings).toBeDefined();
      expect(Array.isArray(mocklistings)).toBe(true);
      expect(mocklistings.length).toBeGreaterThan(0);
    });

    it('should have listings with required properties', () => {
      const firstListing = mocklistings[0];
      
      expect(firstListing).toHaveProperty('id');
      expect(firstListing).toHaveProperty('title');
      expect(firstListing).toHaveProperty('lat');
      expect(firstListing).toHaveProperty('lng');
      expect(firstListing).toHaveProperty('price');
      expect(firstListing).toHaveProperty('rating');
    });

    it('should have valid data types', () => {
      mocklistings.forEach(listing => {
        expect(typeof listing.id).toBe('number');
        expect(typeof listing.title).toBe('string');
        expect(typeof listing.lat).toBe('number');
        expect(typeof listing.lng).toBe('number');
        expect(typeof listing.price).toBe('number');
        expect(typeof listing.rating).toBe('number');
      });
    });

    it('should have unique IDs', () => {
      const ids = mocklistings.map(listing => listing.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('Data Validation', () => {
    it('should have realistic coordinates for NYC', () => {
      mocklistings.forEach(listing => {
        // NYC coordinates should be within reasonable bounds
        expect(listing.lat).toBeGreaterThan(40.5);
        expect(listing.lat).toBeLessThan(41.0);
        expect(listing.lng).toBeGreaterThan(-74.1);
        expect(listing.lng).toBeLessThan(-73.7);
      });
    });

    it('should have reasonable prices', () => {
      mocklistings.forEach(listing => {
        expect(listing.price).toBeGreaterThan(0);
        expect(listing.price).toBeLessThan(10000);
      });
    });

    it('should have valid ratings', () => {
      mocklistings.forEach(listing => {
        expect(listing.rating).toBeGreaterThanOrEqual(0);
        expect(listing.rating).toBeLessThanOrEqual(5);
      });
    });
  });
}); 