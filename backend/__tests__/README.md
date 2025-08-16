# Testing Guide for MapMyStay Backend

This directory contains comprehensive tests for the MapMyStay backend application, covering unit tests, integration tests, and model validation.

## 🏗️ Test Structure

```
__tests__/
├── setup.js                 # Global test configuration
├── utils/
│   └── testUtils.js        # Common test utilities and helpers
├── mocks/
│   └── listingMock.js      # Mock implementations for testing
├── integration/
│   └── listingRoutes.test.js # API endpoint integration tests
├── model/
│   └── listing.test.js     # Model validation and data tests
├── db/
│   └── db.test.js          # Database configuration tests
├── routes/
│   └── listingRoutes.test.js # Route definition tests
└── listingController.test.js # Controller unit tests
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
cd backend
npm install
```

2. Install testing dependencies:

```bash
npm install --save-dev jest supertest @types/jest
```

## 🧪 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test files
npx jest listingController.test.js

# Run tests matching a pattern
npx jest --testNamePattern="should create"
```

### Using the Test Runner Script

```bash
# Run all tests
node scripts/test.js

# Run tests in watch mode
node scripts/test.js --watch

# Run tests with coverage
node scripts/test.js --coverage

# Run only unit tests
node scripts/test.js --unit

# Run only integration tests
node scripts/test.js --integration

# Show help
node scripts/test.js --help
```

## 📊 Test Coverage

The test suite covers:

### Unit Tests

- **Controller Functions**: All CRUD operations with error handling
- **Model Validation**: Data structure and business logic
- **Database Configuration**: Connection setup and environment variables
- **Route Definitions**: Express router configuration

### Integration Tests

- **API Endpoints**: Complete request/response cycles
- **Error Handling**: HTTP status codes and error messages
- **Data Flow**: Controller to model interactions

### Test Categories

#### 1. Listing Controller Tests (`listingController.test.js`)

- `getListings()` - Fetch all listings
- `getMockList()` - Fetch mock data
- `createListing()` - Create new listings
- `updateListing()` - Update existing listings
- `deleteListing()` - Remove listings
- `getListingById()` - Fetch specific listings

#### 2. Model Tests (`model/listing.test.js`)

- Sequelize model definition
- Mock data validation
- Data type verification
- Business logic validation

#### 3. Database Tests (`db/db.test.js`)

- Environment variable loading
- Sequelize configuration
- Connection parameters

#### 4. Route Tests (`routes/listingRoutes.test.js`)

- Express router setup
- Route definitions
- Middleware integration

#### 5. Integration Tests (`integration/listingRoutes.test.js`)

- End-to-end API testing
- Request/response validation
- Error scenario handling

## 🛠️ Test Utilities

### Mock Objects

The test suite includes comprehensive mocks:

```javascript
import {
  createMockRequest,
  createMockResponse,
  createMockListing,
} from "./utils/testUtils.js";

// Create mock request
const req = createMockRequest({ id: 1 }, { title: "Test" });

// Create mock response with spies
const res = createMockResponse();

// Create mock listing data
const listing = createMockListing({ price: 1500 });
```

### Test Helpers

```javascript
// Wait utility for async operations
import { wait } from "./utils/testUtils.js";
await wait(100); // Wait 100ms

// Create multiple mock listings
import { createMockListings } from "./utils/testUtils.js";
const listings = createMockListings(5); // Create 5 mock listings
```

## 🔧 Configuration

### Jest Configuration

The project uses a custom Jest configuration (`jest.config.js`) optimized for:

- ES modules support
- Test coverage reporting
- Custom test patterns
- Environment setup

### Environment Variables

Tests use a separate test environment:

- Database: `mapmystay_test`
- Logging: Disabled
- Timeout: 10 seconds

## 📈 Coverage Reports

Generate coverage reports:

```bash
npm run test:coverage
```

Coverage reports are generated in:

- **Console**: Summary in terminal
- **HTML**: Detailed report in `coverage/` directory
- **LCOV**: For CI/CD integration

## 🐛 Debugging Tests

### Verbose Output

```bash
npm test -- --verbose
```

### Debug Specific Tests

```bash
# Debug a specific test file
npx jest --runInBand --detectOpenHandles listingController.test.js

# Debug with Node.js debugger
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Common Issues

1. **ES Module Issues**: Ensure `--experimental-vm-modules` flag is used
2. **Timeout Errors**: Increase timeout in `jest.config.js`
3. **Mock Issues**: Clear mocks between tests with `jest.clearAllMocks()`

## 🧹 Test Maintenance

### Adding New Tests

1. Create test file in appropriate directory
2. Follow naming convention: `*.test.js`
3. Import required mocks and utilities
4. Use descriptive test names
5. Group related tests in `describe` blocks

### Test Best Practices

- **Arrange-Act-Assert**: Structure tests clearly
- **Mock External Dependencies**: Don't hit real databases
- **Test Edge Cases**: Include error scenarios
- **Keep Tests Fast**: Avoid unnecessary I/O
- **Use Descriptive Names**: Make test purpose clear

### Updating Mocks

When adding new functionality:

1. Update mock implementations in `mocks/` directory
2. Ensure test utilities support new data structures
3. Update existing tests if interfaces change

## 🚀 CI/CD Integration

The test suite is designed for continuous integration:

```yaml
# Example GitHub Actions
- name: Run Tests
  run: |
    cd backend
    npm install
    npm test
    npm run test:coverage
```

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Sequelize Testing Guide](https://sequelize.org/docs/v6/other-topics/testing/)

## 🤝 Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain test coverage above 80%
4. Update this README if needed

---

Happy Testing! 🧪✨
