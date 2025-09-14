# Using Nurui Bars-Background in Your Website

The nurui bars-background is implemented using the `GradientBars` component. Here's how to use it in different sections of your website.

## Home Page Hero Section

The bars-background has already been implemented in your home page hero section:

```jsx
<section id="home" className="px-4 relative">
  {/* Gradient Bars Background */}
  <GradientBars bars={15} colors={['#3ca2faD9', 'transparent']} />
  <div className="container mx-auto max-w-5xl py-16 sm:py-24 relative z-10">
    {/* Your content here */}
  </div>
</section>
```

## Other Sections Where You Can Use It

### 1. Services Section
```jsx
<section id="services" className="px-4 py-16 relative">
  <GradientBars bars={25} colors={['#a855f7', 'transparent']} />
  <div className="container mx-auto max-w-5xl relative z-10">
    {/* Services content */}
  </div>
</section>
```

### 2. Blog Section
```jsx
<section id="blog" className="px-4 py-16 relative">
  <GradientBars bars={10} colors={['#10b981', 'transparent']} />
  <div className="container mx-auto max-w-5xl relative z-10">
    {/* Blog content */}
  </div>
</section>
```

### 3. Contact Section
```jsx
<section id="contact" className="px-4 py-16 relative">
  <GradientBars bars={20} colors={['#f59e0b', 'transparent']} />
  <div className="container mx-auto max-w-5xl relative z-10">
    {/* Contact content */}
  </div>
</section>
```

## Customization Options

1. **Adjust bar count**: Use the `bars` prop to control how many bars are displayed
2. **Change colors**: Use the `colors` prop to customize the gradient colors
3. **Modify animation**: The animation speed can be adjusted in the component file

## Best Practices

1. Always use `relative` on the parent container and `absolute inset-0 z-0` on the GradientBars
2. Ensure your content has `relative z-10` to appear above the background
3. Choose colors that complement your site's color scheme
4. Adjust the number of bars based on the section size (fewer bars for smaller sections)