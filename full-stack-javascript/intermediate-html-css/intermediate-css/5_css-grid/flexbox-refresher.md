# Flexbox

## Refresher

For **one-dimensional** layouts, Flex offers a convenient tool without having to rely on floats or CSS hacks to align your items properly.

For two-dimensional layouts, you learned a little bit about `flex-wrap`, which allows you to take your flex items and wrap them to the next line. This can be done with either a row that wraps to another row, or a column that wraps to another column.

### Flex Row Example (Main Axis)

```html
<head>
  <style>
    .flex-container {
      display: flex;
    }

    .flex-container div {
      background: peachpuff;
      border: 4px solid brown;
      height: 100px;
      flex: 1; /* or flex: 1 1 0; */
    }
  </style>
</head>
<div class="flex-container">
  <div class="one"></div>
  <div class="two"></div>
  <div class="three"></div>
</div>
```

### Flex Column (Cross Axis)

When we change the flex-direction to `column`, `flex-basis` refers to `height` instead of `width`.

```html
<head>
  <style>
    .flex-container {
      display: flex;
      flex-direction: column;
    }

    .flex-container div {
      background: peachpuff;
      border: 4px solid brown;
      height: 80px;
      flex: 1 1 auto; /* or flex: auto; */
    }
  </style>
</head>
<div class="flex-container">
  <div class="one"></div>
  <div class="two"></div>
  <div class="three"></div>
</div>
```

### Flex Property

The `flex` property is actually a shorthand for `flex-grow`, `flex-shrink` and `flex-basis`. The property of `flex: 1` equates to: `flex-grow: 1`, `flex-shrink: 1`, `flex-basis: 0`.

`flex-grow` expects a single number as its value, and that number is used as the flex-item’s “growth factor”. When we applied `flex: 1` to every div inside our container, we were telling every div to grow the same amount. The result of this is that every div ends up the exact same size. If we instead add `flex: 2` to just one of the divs, then that div would grow to 2x the size of the others.

`flex-shrink` is similar to `flex-grow`, but sets the “shrink factor” of a flex item. `flex-shrink` only ends up being applied if the size of all flex items is larger than their parent container. For example, if our 3 divs in the below example had a width declaration like: `width: 100px`, and `.flex-container` was smaller than `300px`, our divs would have to shrink to fit.

The default shrink factor is `flex-shrink: 1`, which means all items will shrink evenly. If you do _not_ want an item to shrink then you can specify `flex-shrink: 0;`. You can also specify higher numbers to make certain items shrink at a higher rate than normal.

`flex-basis` sets the initial size of a flex item, so any sort of `flex-grow`ing or `flex-shrink`ing starts from that baseline size. The shorthand value defaults to `flex-basis: 0%`. The reason we had to change it to auto in the flex-shrink example is that with the basis set to `0`, those items would ignore the item’s width, and everything would shrink evenly. Using `auto` as a flex-basis tells the item to check for a width declaration (`width: 250px`).

> [!NOTE]
> There is a difference between the default value of `flex-basis` and the way the `flex` shorthand defines it if no `flex-basis` is given. The actual default value for `flex-basis` is `auto`, but when you specify `flex: 1` on an element, it interprets that as `flex: 1 1 0`. If you want to _only_ adjust an item’s `flex-grow` you can do so directly, without the shorthand. Or you can be more verbose and use the full 3 value shorthand `flex: 1 1 auto`, which is also equivalent to using `flex: auto`.
