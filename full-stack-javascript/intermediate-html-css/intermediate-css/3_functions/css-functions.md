# Built-in CSS Functions

## Example Functions

### The `calc()` CSS Function

Powerful use cases for the calc() function are to **mix units** and the ability to **nest** `calc(calc() - calc())`.

**Example**:

```html
<head>
  <style>
    :root {
      --header: 3rem;
      --footer: 40px;
      --main: calc(100vh - calc(var(--header) + var(--footer)));
    }

    body {
      margin: 0;
      padding: 0;
      border: 0px solid transparent;
      background: #7a7a7a;
    }

    #container {
      border: 0px solid transparent;
      height: 100vh;
      color: white;
    }
    #container > * {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #header {
      height: var(--header);
      background: #111111;
    }
    #mainContent {
      height: var(--main);
      background: #343434;
      margin-right: auto;
      margin-left: auto;
    }
    #footer {
      height: var(--footer);
      background: #232323;
    }
  </style>
</head>
<body>
  <div id="container">
    <header id="header">< header /></header>
    <main id="mainContent">< main content /></main>
    <footer id="footer">< footer /></footer>
  </div>
</body>
```

Setting main to equal the outcome of: `100vh - (3rem + 40px)`. To put it another way: `main = 100vh - (header + footer)`. `calc()` is handling the math for us even though we are mixing vh, rem and px units. Combined with CSS variables, `calc()` can save us from the headache of repeating CSS rules.

### The `min()` CSS Function

`min()` does an excellent job of helping us create responsive websites. Take a look at this **example**:

```html
<head>
  <style>
    #container {
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 6px solid black;
      resize: both;
      overflow: auto;
      max-width: 100%;
      max-height: 100%;
    }

    #iconHolder {
      width: min(150px, 100%);
      height: min(150px, 100%);
      box-sizing: border-box;
      border: 6px solid blue;
    }
  </style>
</head>
<body>
  <div id="text">resize me by clicking in the bottom right</div>
  <div id="container">
    <img
      id="iconHolder"
      src="https://avatars.githubusercontent.com/u/4441966?s=200&v=4"
      alt="odin"
    />
  </div>
</body>
```

This checks whether `100%` of the parent element’s width is smaller than `150px`. If `100%` would be narrower than `150px`, the element will take up the full width of the container (`100%`). Otherwise, it will be `150px` wide.

You are able to do basic math inside a `min()`. For example, width: `min(80ch, 100vw - 2rem);` (you don’t even need `calc()` in this case).

### The `max()` CSS Function

`max()` works the same way as `min()`, only in **reverse**, and is like JavaScript’s `Math.max()` and Ruby’s `Array#max` methods. It will select the largest possible value from within the parentheses.

`width: max(100px, 4em, 50%);`

The above compares all three values and sets the element’s width to whichever is largest. If `50%` of the parent container is bigger than `100px` and `4em`, the width will be `50%`. If `4em` is larger than the others, it will use `4em`.

### The `clamp()` CSS Function

`clamp()` is a great way to make elements fluid and responsive. `clamp()` takes 3 values:

```css
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
```

The `clamp()` CSS function uses these values to set the minimum value, scaling value and maximum value. In the above example, this would mean the minimum acceptable font-size would be `1.5rem` and the maximum would be `3rem`.

A font-size of `5vw` is set in-between. The value `5vw` allows the font-size to scale according to the viewport’s width, but the size is restricted by the minimum and maximum values we’ve set.

## Reference

[Complete List of CSS Functions](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/Functions)

[In-Depth Look at CSS Functions](https://web.dev/articles/min-max-clamp)
