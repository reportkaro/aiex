# Image Optimization Guide

This document provides detailed information about image optimization in this project.

## Technical Implementation

### Optimization Script (`scripts/optimize-images.js`)

The image optimization script uses the following technologies:
- `sharp` for image processing
- `ffmpeg` for video/GIF conversion
- Next.js Image Optimization

### Configuration

The optimization script is configured with the following settings:
```javascript
{
  sourceDir: './public/images',
  quality: 80,           // JPEG/WebP quality
  maxWidth: 1920,        // Maximum image width
  formats: ['webp', 'avif'], // Additional formats
  skipExisting: true,    // Skip existing optimized files
  gifThreshold: 500 * 1024 // 500KB threshold for GIF conversion
}
```

### Build Integration

The build process automatically optimizes images:
```json
{
  "scripts": {
    "build": "npm run optimize-images && next build"
  }
}
```

## Image Format Guidelines

### Static Images
- **Primary Format**: WebP (`.webp`)
- **Fallback Format**: Original format (optimized)
- **Quality Setting**: 80%
- **Maximum Width**: 1920px

### Animated Content
- **Primary Format**: WebM (`.webm`)
- **Fallback Format**: MP4 (`.mp4`)
- **Original Format**: GIF (kept as fallback)
- **Conversion Threshold**: 500KB

### High-Quality Images
- **Primary Format**: AVIF (`.avif`)
- **Fallback Format**: WebP
- **Quality Setting**: 80%
- **Use Case**: Hero images, important visuals

## Directory Structure

```
public/
  images/
    examples/     # Example images and demos
    placeholders/ # Placeholder images
    categories/   # Category-specific images
```

## Performance Metrics

### Target Metrics
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

### Image Size Guidelines
- Hero Images: < 200KB
- Thumbnails: < 50KB
- Icons: < 10KB
- Animated Content: < 2MB

## Usage Examples

### Adding a New Static Image
1. Save the image in WebP format
2. Place it in the appropriate subdirectory
3. The build process will:
   - Generate AVIF version
   - Optimize the original
   - Create responsive versions

### Adding a New Animation
1. Save the animation in WebM format
2. Place it in the appropriate subdirectory
3. The build process will:
   - Generate MP4 version
   - Optimize the original
   - Create responsive versions

## Troubleshooting

### Common Issues

1. **Large Build Size**
   - Check image dimensions
   - Verify compression settings
   - Use appropriate formats

2. **Slow Page Load**
   - Check image sizes
   - Verify optimization ran
   - Use appropriate formats

3. **Format Support Issues**
   - Check browser compatibility
   - Verify fallback formats
   - Test on multiple devices

## Maintenance

### Regular Tasks
1. Run optimization script:
   ```bash
   npm run optimize-images
   ```

2. Check performance metrics:
   - Lighthouse scores
   - Core Web Vitals
   - Page load times

3. Update formats as needed:
   - Monitor browser support
   - Update optimization settings
   - Test new formats

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [WebP Documentation](https://developers.google.com/speed/webp)
- [AVIF Documentation](https://aomediacodec.github.io/av1-avif/)
- [WebM Documentation](https://www.webmproject.org/) 