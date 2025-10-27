# Advanced SVG Techniques for Web Developers

Once you've mastered the basics of SVG, it's time to explore advanced techniques that can take your graphics to the next level.

## SVG Sprites for Better Performance

Instead of loading multiple SVG files, combine them into a sprite:

```xml
<svg style="display: none;">
  <symbol id="icon-home" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  </symbol>
  <symbol id="icon-user" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
  </symbol>
</svg>

<!-- Use the icons -->
<svg class="icon">
  <use href="#icon-home"/>
</svg>
```

## CSS Animations with SVG

Animate SVG properties using CSS:

```css
.animated-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 2s forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
```

## SVG Filters for Visual Effects

Create stunning effects with SVG filters:

```xml
<svg>
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <circle cx="50" cy="50" r="30" filter="url(#glow)"/>
</svg>
```

## Responsive SVG with viewBox

Make SVG responsive while maintaining aspect ratio:

```xml
<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
  <!-- content -->
</svg>
```

## Inline SVG vs External Files

### Inline SVG Benefits

- No HTTP request
- Can be styled with CSS
- Can be animated with JavaScript
- Better for critical graphics

### External SVG Benefits

- Browser caching
- Reusable across pages
- Cleaner HTML
- Better for non-critical graphics

## Performance Best Practices

1. **Minimize path complexity** - fewer points = faster rendering
2. **Use `<use>` for repeated elements** - reduces DOM size
3. **Optimize with SVGO** - remove unnecessary data
4. **Consider lazy loading** - for below-the-fold SVGs
5. **Use CSS transforms** - hardware accelerated

## Accessibility Considerations

Make your SVG accessible:

```xml
<svg role="img" aria-labelledby="title desc">
  <title id="title">Company Logo</title>
  <desc id="desc">A blue circle with white text</desc>
  <!-- content -->
</svg>
```

## JavaScript Integration

Manipulate SVG with JavaScript:

```javascript
const circle = document.querySelector('circle');
circle.setAttribute('r', 50);
circle.style.fill = 'red';

// Animate with GSAP or other libraries
gsap.to(circle, {
  attr: { r: 100 },
  duration: 1
});
```

## Conclusion

SVG is a powerful format with endless possibilities. By mastering these advanced techniques, you can create performant, accessible, and visually stunning graphics for the web.

Keep experimenting and don't forget to optimize your SVG files with Tiny SVG!
