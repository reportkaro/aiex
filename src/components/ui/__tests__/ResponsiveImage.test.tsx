import { render, screen } from '../../../utils/test-utils'
import ResponsiveImage from '../ResponsiveImage'

describe('ResponsiveImage Component', () => {
  const defaultProps = {
    src: '/images/test-image.webp',
    alt: 'Test image',
    width: 800,
    height: 600,
  }

  describe('Rendering', () => {
    it('renders image with correct attributes', () => {
      render(<ResponsiveImage {...defaultProps} />)
      
      const image = screen.getByRole('img', { name: /test image/i })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('alt', 'Test image')
    })

    it('applies custom className', () => {
      render(<ResponsiveImage {...defaultProps} className="custom-class" />)
      
      const image = screen.getByRole('img')
      expect(image).toHaveClass('custom-class')
    })

    it('renders with priority prop', () => {
      render(<ResponsiveImage {...defaultProps} priority />)
      
      const image = screen.getByRole('img')
      expect(image).toBeInTheDocument()
    })

    it('renders with different sizes', () => {
      render(<ResponsiveImage {...defaultProps} sizes="(max-width: 768px) 100vw, 50vw" />)
      
      const image = screen.getByRole('img')
      expect(image).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper alt text', () => {
      render(<ResponsiveImage {...defaultProps} alt="Descriptive alt text" />)
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt', 'Descriptive alt text')
    })

    it('handles empty alt text for decorative images', () => {
      render(<ResponsiveImage {...defaultProps} alt="" />)
      
      const image = screen.getByRole('presentation')
      expect(image).toHaveAttribute('alt', '')
    })
  })

  describe('Props forwarding', () => {
    it('forwards additional props to Next.js Image', () => {
      render(
        <ResponsiveImage 
          {...defaultProps} 
          loading="lazy"
        />
      )
      
      const image = screen.getByRole('img')
      expect(image).toBeInTheDocument()
    })
  })
}) 