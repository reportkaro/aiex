# Testing Documentation

## Overview

This project uses a comprehensive testing setup with Jest and React Testing Library to ensure code quality and reliability. Our testing infrastructure covers unit tests, component tests, and data validation.

## Testing Stack

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom Jest matchers for DOM testing
- **Zod**: Schema validation for data integrity
- **Playwright**: End-to-end testing (configured but not yet implemented)

## Test Coverage Status

### Current Coverage (as of latest run)
- **Total Tests**: 110 passing
- **Test Suites**: 5 passing
- **Components with 100% Coverage**:
  - Button component
  - CodeBlock component
- **Data with 100% Coverage**:
  - Pattern data validation
  - Category data validation
- **Components with Partial Coverage**:
  - ResponsiveImage (75% coverage)

### Coverage Thresholds
- **Statements**: 70% (currently 9.98% - below threshold due to many untested files)
- **Branches**: 70% (currently 2.25%)
- **Functions**: 70% (currently 6.25%)
- **Lines**: 70% (currently 10.01%)

*Note: Low overall coverage is expected as we've focused on critical components and data validation first.*

## Test Structure

### Component Tests (`src/components/ui/__tests__/`)

#### Button.test.tsx
- ✅ Rendering with different variants (primary, secondary, outline, gradient)
- ✅ Size variations (sm, md, lg)
- ✅ Full width functionality
- ✅ Click interactions and disabled state
- ✅ Accessibility features
- ✅ Props forwarding

#### CodeBlock.test.tsx
- ✅ Code rendering and syntax highlighting
- ✅ Language class application
- ✅ Copy to clipboard functionality
- ✅ Copy state management (copied/not copied)
- ✅ Timeout reset functionality
- ✅ Accessibility structure

#### ResponsiveImage.test.tsx
- ✅ Image rendering with correct attributes
- ✅ Custom className application
- ✅ Priority prop handling
- ✅ Alt text accessibility (including empty alt for decorative images)
- ✅ Props forwarding to Next.js Image

### Data Validation Tests (`src/data/__tests__/`)

#### patterns.test.ts
- ✅ Schema validation against Zod schemas
- ✅ Unique ID and slug validation
- ✅ Content quality checks (description length, comprehensive content)
- ✅ Example structure validation
- ✅ Code example validation
- ✅ Cross-pattern consistency
- ✅ Individual pattern structure testing

#### categories.test.ts
- ✅ Schema validation
- ✅ Unique ID and slug validation
- ✅ Content quality (titles, descriptions)
- ✅ Valid color and image validation
- ✅ Individual category structure testing

### Schema Validation (`src/schemas/`)

#### pattern.schema.ts
- ✅ Zod schemas for Pattern, Example, CodeExample, Category
- ✅ Validation functions (both throwing and safe variants)
- ✅ Type exports for TypeScript integration
- ✅ Comprehensive validation rules

## Test Configuration

### Jest Configuration (`jest.config.js`)
- Next.js integration with `next/jest`
- TypeScript support
- Module path mapping for `@/` aliases
- Coverage collection from `src/` directory
- Proper handling of CSS modules and static assets
- ESM module transformation for react-syntax-highlighter

### Jest Setup (`jest.setup.js`)
- React Testing Library matchers
- Next.js router and navigation mocks
- Next.js Image component mock
- Framer Motion mocks for animations
- React Syntax Highlighter mocks
- Global test utilities (ResizeObserver, IntersectionObserver)
- Clipboard API mock for copy functionality
- Console error suppression for known warnings

### Test Utilities (`src/utils/test-utils.tsx`)
- Custom render function with providers
- Mock data factories for patterns, examples, code examples
- Helper functions for common assertions
- Async test helpers
- Pattern structure validation helpers

## Running Tests

### Available Scripts
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode
npm run test:ci

# Run specific test suites
npm run test:patterns      # Pattern data tests only
npm run test:components    # Component tests only
```

### Test Commands
```bash
# Run specific test file
npm test Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="Button"

# Run tests with verbose output
npm test -- --verbose

# Update snapshots (if using)
npm test -- --updateSnapshot
```

## Testing Best Practices

### Component Testing
1. **Test user interactions**, not implementation details
2. **Use semantic queries** (getByRole, getByLabelText) over test IDs when possible
3. **Test accessibility** features (ARIA attributes, keyboard navigation)
4. **Mock external dependencies** (APIs, complex libraries)
5. **Test error states** and edge cases

### Data Testing
1. **Validate against schemas** to ensure data integrity
2. **Test uniqueness constraints** (IDs, slugs)
3. **Verify content quality** (length, format, required fields)
4. **Check cross-references** between related data

### Mock Strategy
1. **Mock Next.js components** (Image, Router, Navigation)
2. **Mock animation libraries** (Framer Motion) to avoid timing issues
3. **Mock browser APIs** (Clipboard, ResizeObserver, IntersectionObserver)
4. **Mock complex syntax highlighting** to avoid ESM issues

## Future Testing Priorities

### High Priority
1. **Page component tests** (app/page.tsx, app/patterns/page.tsx)
2. **Layout component tests** (Navbar, Hero, PatternCategories)
3. **Interactive demo component tests**
4. **End-to-end tests with Playwright**

### Medium Priority
1. **Hook testing** (useSmoothScroll)
2. **Utility function tests**
3. **Error boundary testing**
4. **Performance testing**

### Low Priority
1. **Visual regression testing**
2. **Accessibility testing automation**
3. **Cross-browser testing**

## Troubleshooting

### Common Issues

#### ESM Module Errors
- **Problem**: `SyntaxError: Unexpected token 'export'`
- **Solution**: Add problematic modules to `transformIgnorePatterns` in Jest config
- **Example**: react-syntax-highlighter requires special handling

#### Next.js Component Mocks
- **Problem**: Next.js components not rendering in tests
- **Solution**: Mock in `jest.setup.js` with simplified implementations
- **Example**: Next.js Image component mocked as regular `<img>`

#### Async State Updates
- **Problem**: "not wrapped in act(...)" warnings
- **Solution**: Use `waitFor` for async operations or suppress specific warnings

#### TypeScript Import Issues
- **Problem**: Cannot find module errors
- **Solution**: Check module path mapping in Jest config and tsconfig.json

## Contributing to Tests

### Adding New Component Tests
1. Create test file in `src/components/[category]/__tests__/`
2. Follow existing patterns for describe blocks and test structure
3. Include rendering, interaction, and accessibility tests
4. Add to appropriate npm script if needed

### Adding New Data Tests
1. Create test file in `src/data/__tests__/`
2. Use Zod schemas for validation
3. Test data integrity and cross-references
4. Include content quality checks

### Updating Mocks
1. Add new mocks to `jest.setup.js`
2. Keep mocks simple but functional
3. Document any special mock requirements
4. Test mocks work with actual component usage

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)
- [Zod Documentation](https://zod.dev/) 