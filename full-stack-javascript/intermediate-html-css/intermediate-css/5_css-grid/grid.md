# CSS Grid

## Intro

You will notice a lot of similarities between Flex and Grid. Both use parent containers with child items. They have similar property names for alignment and positioning. But you will also come across a lot of differences between the two and opinions on how each module should be used. For example, if you’ve been struggling to get your Flex items to all match evenly in size, Grid can make this type of layout much easier.

## Creating a Grid

### Grid container

We can think about CSS Grid in terms of a container and items. When you make an element a grid container, it will “contain” the whole grid. In CSS, an element is turned into a grid container with the property `display: grid` or `display: inline-grid`.

```html
<head>
  <style>
    .container {
      display: grid;
    }
  </style>
</head>
<div class="container">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

Note that only the direct child elements will become grid items here. If we had another element as a child under one of these child elements, it would not be a grid item. In the example below, the paragraph element is not a grid item:

```html
<div class="container">
  <div>Item 1</div>
  <div>
    Item 2
    <p>I am not a grid item!</p>
  </div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

But just as you learned in the flexbox lessons, grid items can _also_ be grid containers. So you could make grids inside of grids if you wanted.

### Columns and rows

Now that we have our grid container with several grid items all set up, it’s time to specify our columns and rows. This will define the grid track (the space between lines on a grid). So we could set a column track to give us space between our columns and a row track to give us space between our rows.

The properties `grid-template-columns` and `grid-template-rows` make defining column and row tracks easy. For this lesson, we’ll stick to defining our columns and rows using pixels. In the upcoming lessons, you’ll learn more about defining with percentages and fractional units too.

```html
<head>
  <style>
    .container {
      display: grid;
      /* grid-template-columns: 50px 50px 50px; */ /* If we wanted a third column */
      /* grid-template-rows: 50px 50px; */
      grid-template: 50px 50px / 250px 50px 50px; /* Shorthand for rows / columns. Columns and rows do not have to be the same values */
    }
  </style>
</head>
<div class="container">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

### Explicit vs implicit grid

Let’s go back to our original example of a 2x2 layout for four grid items. What happens if we add a fifth item to our container without changing our `grid-template-columns` or `grid-template-rows` properties? You’ll notice our fifth item was placed on the grid and it’s been slotted into a third row we did not define. This is because of the implicit grid concept and it’s how CSS Grid is able to automatically place grid items when we haven’t explicitly defined the layout for them.

When we use the `grid-template-columns` and `grid-template-rows` properties, we are explicitly defining grid tracks to lay out our grid items. But when the grid needs more tracks for extra content, it will implicitly define new grid tracks. Additionally, the size values established from our `grid-template-columns` or `grid-template-rows` properties are not carried over into these implicit grid tracks. But we can define values for the implicit grid tracks.

We can set the implicit grid track sizes using the `grid-auto-rows` and `grid-auto-columns` properties. In this way we can ensure any new tracks the implicit grid makes for extra content are set at values that we defined.

```html
<head>
  <style>
    .container {
      display: grid;
      grid-template-columns: 50px 50px;
      grid-template-rows: 50px 50px;
      grid-auto-rows: 50px;
    }
  </style>
</head>
<div class="container">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
</div>
```

### Gap

The gap between grid rows and columns is known as the gutter or alley. Gap sizes can be adjusted separately for rows and columns using the `column-gap` and `row-gap` properties. Furthermore, we can use a shorthand property called `gap` to set both `row-gap` and `column-gap`.

```html
<head>
  <style>
    .container {
      display: grid;
      grid-template-columns: 50px 50px;
      grid-template-rows: 50px 50px;
      column-gap: 10px;
      row-gap: 30px;
    }

    .container > div {
      border: 1px solid blue;
    }
  </style>
</head>
<div class="container">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

## Positioning Grid Elements
