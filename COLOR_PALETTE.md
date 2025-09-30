# Color Palette System Documentation

## Overview
The CodeJhon website uses a comprehensive CSS custom properties (variables) system for flexible color management and theme switching.

## Color Scales

### Primary Colors (Blue)
```css
--primary-50: #eff6ff   /* Lightest blue */
--primary-100: #dbeafe
--primary-200: #bfdbfe
--primary-300: #93c5fd
--primary-400: #60a5fa
--primary-500: #3b82f6  /* Base blue */
--primary-600: #2563eb  /* Default primary */
--primary-700: #1d4ed8
--primary-800: #1e40af
--primary-900: #1e3a8a  /* Darkest blue */
```

### Secondary Colors (Purple)
```css
--secondary-50: #faf5ff
--secondary-100: #f3e8ff
--secondary-200: #e9d5ff
--secondary-300: #d8b4fe
--secondary-400: #c084fc
--secondary-500: #a855f7
--secondary-600: #9333ea  /* Default secondary */
--secondary-700: #7c3aed
--secondary-800: #6b21a8
--secondary-900: #581c87
```

### Neutral Colors (Gray)
```css
--neutral-50: #f8fafc   /* Lightest gray */
--neutral-100: #f1f5f9
--neutral-200: #e2e8f0
--neutral-300: #cbd5e1
--neutral-400: #94a3b8
--neutral-500: #64748b  /* Mid gray */
--neutral-600: #475569
--neutral-700: #334155
--neutral-800: #1e293b
--neutral-900: #0f172a  /* Darkest gray */
```

### Success Colors (Green)
```css
--success-50: #f0fdf4
--success-100: #dcfce7
--success-200: #bbf7d0
--success-300: #86efac
--success-400: #4ade80
--success-500: #22c55e
--success-600: #16a34a  /* Default success */
--success-700: #15803d
--success-800: #166534
--success-900: #14532d
```

## Semantic Color Variables

### Primary Colors
- `--color-primary`: Main brand color (blue-600)
- `--color-primary-hover`: Hover state for primary elements
- `--color-primary-light`: Light variant for backgrounds
- `--color-secondary`: Secondary brand color (purple-600)
- `--color-secondary-hover`: Hover state for secondary elements

### Text Colors
- `--color-text-primary`: Main text color
- `--color-text-secondary`: Secondary text (less prominent)
- `--color-text-muted`: Muted text (least prominent)
- `--color-text-inverse`: Text on dark backgrounds

### Background Colors
- `--color-bg-primary`: Main background (white/dark)
- `--color-bg-secondary`: Secondary background (light gray)
- `--color-bg-tertiary`: Tertiary background (lighter gray)
- `--color-bg-inverse`: Inverse background (dark/light)

### Border Colors
- `--color-border-light`: Light borders
- `--color-border-medium`: Medium borders
- `--color-border-dark`: Dark borders

### Shadow Colors
- `--color-shadow-light`: Light shadows (5% opacity)
- `--color-shadow-medium`: Medium shadows (10% opacity)
- `--color-shadow-dark`: Dark shadows (15% opacity)

### Status Colors
- `--color-success`: Success states and confirmations
- `--color-success-bg`: Success background
- `--color-warning`: Warning states (#f59e0b)
- `--color-warning-bg`: Warning background
- `--color-error`: Error states (#ef4444)
- `--color-error-bg`: Error background

## Gradients
- `--gradient-primary`: Primary gradient (blue to purple)
- `--gradient-secondary`: Secondary gradient (darker variant)
- `--gradient-hero`: Hero section gradient

## Theme Support

### Light Theme (Default)
The default theme uses the base color palette with:
- White backgrounds
- Dark text
- Blue primary colors

### Dark Theme
Activated with `data-theme="dark"` attribute:
- Dark backgrounds (neutral-900, neutral-800)
- Light text (neutral-100, neutral-300)
- Adjusted shadows and borders
- Modified gradients for better contrast

### Color Theme Variants
Additional theme classes for different color schemes:

#### Blue Theme (Default)
```css
.theme-blue {
    --color-primary: var(--primary-600);
    --color-secondary: var(--secondary-600);
}
```

#### Green Theme
```css
.theme-green {
    --color-primary: #059669;
    --color-secondary: #0d9488;
}
```

#### Purple Theme
```css
.theme-purple {
    --color-primary: #7c3aed;
    --color-secondary: #8b5cf6;
}
```

#### Orange Theme
```css
.theme-orange {
    --color-primary: #ea580c;
    --color-secondary: #f97316;
}
```

## Usage Examples

### Basic Color Usage
```css
.my-component {
    background: var(--color-bg-primary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-light);
}
```

### Theme-Aware Styling
```css
.button-primary {
    background: var(--color-primary);
    color: var(--color-text-inverse);
}

.button-primary:hover {
    background: var(--color-primary-hover);
}
```

### Responsive to Theme Changes
```css
.card {
    background: var(--color-bg-primary);
    box-shadow: 0 4px 20px var(--color-shadow-medium);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
```

## Implementation Notes

1. **CSS Custom Properties**: All colors use CSS custom properties for dynamic theming
2. **Automatic Theme Switching**: Dark/light theme toggle with localStorage persistence
3. **Semantic Naming**: Color variables use semantic names rather than specific color values
4. **Accessibility**: Proper contrast ratios maintained across all themes
5. **Consistency**: Standardized color scales ensure visual harmony

## Browser Support
- Modern browsers supporting CSS custom properties
- Fallback values provided where necessary
- Progressive enhancement approach

## Customization
To add new themes or modify colors:
1. Define new CSS custom properties in `:root` or theme-specific selectors
2. Update semantic color assignments
3. Test contrast ratios for accessibility
4. Add theme toggle functionality if needed