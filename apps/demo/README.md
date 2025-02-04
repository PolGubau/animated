# @polgubau/animated

Animated is a simple library that provides animations and transitions based on CSS3, with a focus on performance. It also exports direct classes for Tailwind CSS v4.
No JavaScript is present and the animations are triggered by adding classes to the elements.

## Installation

```bash
npm install @polgubau/animated
```

## Usage

### CSS

```css
import '@polgubau/animated';
```

### HTML

```html
<div class="animate-slide-in-top">
  Hello, world!
</div>
```

## Usage in Tailwind CSS v4

### CSS

```css
@import "tailwindcss";
@import "@polgubau/animated";
```
As this library is based on Tailwind CSS v4, you can use the classes directly in your HTML without any configuration.

```html
<div class="animate-slide-in-top">
  Hello, world!
</div>
```

## Configuration
To make it easier to configure, the animations are based in predefined css variables. You can change the default values by overriding the variables in your CSS.

These are the default values:

```css
:root {
  --smaller-scale: 0.8;
  --larger-scale: 1.2;

  --pump-amount: 1.05;

  --blur-amount: 8px;

  --slide-amount: 20px;
  --slide-amount-negative: calc(-1 * var(--slide-amount));

  --small-rotation: 3deg;
  --small-rotation-negative: calc(-1 * var(--small-rotation));

  --shake-amount: 5px;
  --shake-amount-negative: calc(-1 * var(--shake-amount));
}
```
