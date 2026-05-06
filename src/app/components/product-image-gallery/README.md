# Product Image Gallery Component

A reactive, signal-based image gallery component for product details pages with lightbox carousel functionality.

## Features

- ✅ Displays multiple product images in a main view with thumbnail strip
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Keyboard navigation (arrow keys, Escape)
- ✅ Lightbox/modal view with carousel
- ✅ Zoom functionality in lightbox
- ✅ Built with Angular signals for reactive updates
- ✅ Uses Material Dialog for lightbox
- ✅ Smooth animations and transitions

## Components

### ProductImageGallery (Main Component)
- Displays main image with navigation controls
- Shows thumbnail strip for quick image selection
- Opens lightbox on image click or fullscreen button

**Inputs:**
- `mainImage: string` (required) - Main product image URL
- `images: string[]` - Array of product images (optional, defaults to mainImage)
- `productName: string` - Product name for alt text

### ProductImageLightboxComponent (Lightbox/Modal)
- Full-screen image viewer with carousel
- Keyboard shortcuts:
  - `←` / `→` - Navigate between images
  - `Esc` - Close lightbox
- Zoom in/out functionality
- Touch-friendly on mobile devices

## Usage

### 1. Add multiple images to ProductModel

```typescript
// In your product data:
const product: ProductModel = {
  id: '1',
  name: 'Green Cardamom Powder',
  imageUrl: 'main-image.jpg',
  images: [
    'main-image.jpg',
    'side-angle.jpg',
    'packaging-front.jpg',
    'packaging-back.jpg'
  ],
  // ... other properties
};
```

### 2. Use in Component

```html
<app-product-image-gallery 
    [mainImage]="product.imageUrl"
    [images]="product.images || [product.imageUrl]"
    [productName]="product.name"
></app-product-image-gallery>
```

## Styling

The component uses Tailwind CSS for main styling and SCSS for additional customization.

### Customizable classes:
- `.product-gallery` - Main container
- `.main-image-container` - Main image wrapper
- `.thumbnail-button` - Individual thumbnail
- `.lightbox-container` - Lightbox container

## Example Data Structure

```typescript
export interface ProductImage {
  images?: string[]; // Array of image URLs
  imageUrl: string; // Primary/fallback image
}
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| ← | Previous image |
| → | Next image |
| Esc | Close lightbox |

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Keyboard navigation fully supported
- Proper alt text for all images
- ARIA labels on buttons
- Focus management in modal

## Performance

- Lazy loading on images
- Efficient signal-based reactivity
- Smooth CSS transitions
- Optimized animations
