# Modern Business Website Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from modern SaaS platforms like Linear, Vercel, and Stripe - emphasizing clean typography, generous spacing, and purposeful minimalism. The dark aesthetic combined with professional clarity positions this as a premium business solution.

## Typography System
**Font Stack**: Inter (primary), JetBrains Mono (code/technical elements)
- Hero Headlines: 4xl-6xl, font-weight 700, tight leading (leading-tight)
- Section Headers: 3xl-4xl, font-weight 600
- Subsections: xl-2xl, font-weight 600
- Body Text: base-lg, font-weight 400, relaxed leading (leading-relaxed)
- Captions/Meta: sm, font-weight 400

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, 20, 24, 32 (e.g., p-8, mb-16, gap-12)
**Container Strategy**: 
- Full-width sections with inner max-w-7xl for content
- Text-heavy sections: max-w-4xl centered
- Asymmetric layouts to break monotony

## Core Components

### Navigation
Fixed header with subtle backdrop blur, logo left, navigation center/right, CTA button right-most. Height: h-16 to h-20. Use ghost buttons for nav links.

### Hero Section
Full-width, min-h-screen initial viewport with large hero image (architectural/tech workspace showing modern business environment). Overlay content: compelling headline (left-aligned or centered), supporting subheadline, primary CTA with blurred background, secondary ghost CTA. Image should use object-cover with subtle gradient overlay for text legibility.

### Feature Showcase (3 sections minimum)
**Section 1**: 2-column split - large feature image right, content left. Highlight primary capability.
**Section 2**: 3-column grid of feature cards, each with icon, title, description. Icons use ghost backgrounds.
**Section 3**: Alternating image-content rows for detailed features (2-3 features).

### Social Proof
Logo cloud of client/partner logos (8-12 logos), grayscale with slight opacity, arranged in responsive grid.

### Stats/Metrics Bar
4-column grid (single column mobile) displaying key numbers. Large numerals (4xl-5xl), small descriptive text below.

### Testimonials
2-column layout with customer quotes, including avatar placeholder, name, title, company. Use cards with subtle borders.

### CTA Section
Centered content block with compelling headline, supporting text, and dual CTAs (primary + secondary). Background can feature abstract tech pattern or gradient treatment.

### Footer
Multi-column layout: Company info, Product links, Resources, Legal, Contact. Newsletter signup integrated. Social icons. Copyright and links bottom.

## Component Specifications

**Cards**: Subtle borders, rounded corners (rounded-lg to rounded-xl), padding p-6 to p-8, minimal shadows
**Buttons**: Primary (solid, blurred background when on images), Secondary (ghost/outline style), rounded-md to rounded-lg, px-6 py-3
**Forms**: Input fields with subtle borders, focus states with border emphasis, rounded-md, p-3
**Icons**: Use Heroicons (outline style for consistency), size-5 to size-6 standard

## Images Section

**Hero Image** (Required): 
Modern office space, tech workspace, or abstract tech visualization. Full-width, high-quality, professional photography. Should convey innovation and professionalism. Use gradient overlay (bottom-to-top) for content legibility.

**Feature Images** (3-4 images):
- Dashboard screenshot/mockup showing product interface
- Team collaboration or modern workspace setting  
- Abstract data visualization or tech-forward imagery
- Product detail or close-up technical shot

**Placement Strategy**: Hero (full-width), feature sections (50% width in 2-column layouts), cards (thumbnails), testimonials (customer avatars - use placeholder circles size-12 to size-16)

## Interaction Patterns
Subtle transitions (200-300ms), hover states lift cards slightly (translate-y-1), link underlines on hover, smooth scrolling for anchor links. Minimize animations - focus on polish over motion.

## Vertical Rhythm
Section padding: py-20 to py-32 desktop, py-12 to py-16 mobile. Consistent gap-12 to gap-16 between major content blocks. Establish clear visual hierarchy through spacing, not just typography.

## Page Structure Completeness
Deliver 7-8 complete sections: Navigation, Hero, Feature Highlight, Feature Grid, Detailed Features, Social Proof, Stats, Testimonials, CTA, Footer. Each section fully designed, no placeholders.