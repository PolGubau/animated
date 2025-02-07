# @polgubau/animated

A collection of modern CSS animations for Tailwind CSS 4, designed to enhance your frontend projects. 🚀  

## 📦 Installation

Install the package via npm or pnpm:

```sh
npm install @polgubau/animated
# or
pnpm add @polgubau/animated
```

## 🎨 Usage with tailwind >4

1. Import the CSS file in your index css file:

```css
  @import "tailwindcss";
  @import "@polgubau/animated";
```

2. Use the animations in your Tailwind classes:

```html
  <div class="animate-fade-in">
    Hello, world!
  </div>
```

## 🎨 Usage without tailwind or old majors

1. Import the CSS file in your main tsx file:
```css
import '@polgubau/animated';
```
Now you can use all keyframes to build you own animations.

```css
.fade-in {
  animation: 3s infinite alternate slide-in-top;
}
```


## 📋 Available Animations

@polgubau/animated provides a variety of CSS animations categorized into different groups:

- **Blur**: `animate-blur`, `animate-blur-pulse`, `animate-blur-flash`
- **Fade**: `animate-fade-in`, `animate-fade-out`, `animate-fade-pulse`
- **Grow**: `animate-grow`, `animate-grow-pulse`
- **Pump**: `animate-pump`, `animate-pump-pulse`
- **Shake**: `animate-shake-x`, `animate-shake-y`
- **Shrink**: `animate-shrink`, `animate-shrink-pulse`
- **Slide**: `animate-slide-left`, `animate-slide-right`, `animate-slide-up`, `animate-slide-down`
- **Wiggle**: `animate-wiggle`
- **Flip**: `animate-flip-x`, `animate-flip-y`, `animate-flip-pulse`
- **Roll**: `animate-roll-left`, `animate-roll-right`, `animate-roll-pulse`
- *(More categories coming soon!)*

## ⚡ Customization

You can customize animation durations and other properties using Tailwind’s utility classes:

```html
<div class="animate-slide-left duration-1000 ease-in-out">
  Sliding effect!
</div>
```

## Configuration
To make it easier to configure, the animations are based in predefined css variables. You can change the default values by overriding the variables in your CSS.

These are the default values:

```css
:root {
  --smaller-scale: 0.8;
  --larger-scale: 1.2;
  --pump-amount: 1.1;
  --pump-soft-amount: 1.05;
  --pump-hard-amount: 1.2;
  --pump-x-amount: 1.1;
  --pump-y-amount: 1.1;
  --pump-bounce-amount: 1.15;
  --blur-amount: 8px;
  --slide-amount: 20px;
  --slide-amount-negative: calc(-1 * var(--slide-amount));
  --rotation: 10deg;
  --rotation-negative: calc(-1 * var(--rotation));
  --small-rotation: calc(0.5 * var(--rotation));
  --small-rotation-negative: calc(-1 * var(--small-rotation));
  --shake-amount: 5px;
  --shake-amount-negative: calc(-1 * var(--shake-amount));
  --movement-distance: 10px;
  --fade-scale: 0.95;
  --rolled-degree: 360deg;
  --rolled-degree-negative: calc(-1 * var(--rolled-degree));
  --rolled-distance: 100%;
  --rolled-distance-negative: calc(-1 * var(--rolled-distance));
}

## 📄 Summary File

If you need a programmatic way to access the available animations, you can import the summary JSON:

```js
import animationSummary from '@polgubau/animated/summary';
console.log(animationSummary);
```

## 🛠 Development

### Building the project

The easiest way to work with the project monorepo is to run

```sh
pnpm dev
```
in the root directory. This will start a watch build for the package and start a local server to preview the documentation page.

## 📜 License

This project is licensed under the **MIT** License.  

---

Made with ❤️ by [Pol Gubau Amores](https://polgubau.com)
