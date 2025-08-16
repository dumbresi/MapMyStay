// Basic test to verify testing setup
describe('Basic Test Suite', () => {
  it('should run basic tests', () => {
    expect(true).toBe(true);
  });

  it('should handle basic math', () => {
    expect(2 + 2).toBe(4);
    expect(10 - 5).toBe(5);
    expect(3 * 4).toBe(12);
    expect(15 / 3).toBe(5);
  });

  it('should handle arrays', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
    expect(numbers[0]).toBe(1);
    expect(numbers[numbers.length - 1]).toBe(5);
  });

  it('should handle objects', () => {
    const person = {
      name: 'John',
      age: 30,
      city: 'New York'
    };
    
    expect(person).toHaveProperty('name');
    expect(person.name).toBe('John');
    expect(person.age).toBe(30);
    expect(typeof person.city).toBe('string');
  });

  it('should handle async operations', async () => {
    const result = await Promise.resolve('success');
    expect(result).toBe('success');
  });

  it('should handle errors', () => {
    expect(() => {
      throw new Error('Test error');
    }).toThrow('Test error');
  });
}); 