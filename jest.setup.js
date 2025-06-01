import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
      isLocaleDomain: true,
      isReady: true,
      defaultLocale: 'en',
      domainLocales: [],
      isPreview: false,
    }
  },
}))

// Mock Next.js navigation (App Router)
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock react-syntax-highlighter to avoid ESM issues
jest.mock('react-syntax-highlighter', () => ({
  Prism: ({ children, language, ...props }) => (
    <pre {...props}>
      <code role="code" className={`language-${language}`}>
        {children}
      </code>
    </pre>
  ),
  PrismLight: ({ children, language, ...props }) => (
    <pre {...props}>
      <code role="code" className={`language-${language}`}>
        {children}
      </code>
    </pre>
  ),
}))

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  atomDark: {},
  vscDarkPlus: {},
}))

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    article: ({ children, ...props }) => <article {...props}>{children}</article>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
}))

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock clipboard API for CodeBlock tests
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
})

// Suppress console errors during tests (optional)
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
       args[0].includes('React does not recognize'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
}) 