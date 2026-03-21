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

### Lines

Whenever we create grid tracks, grid lines are created _implicitly_. This is important. Grid lines are only created after our grid tracks have been defined. We can not explicitly create grid lines.

Every track has a start line and an end line. The lines are numbered from left to right and top to bottom starting at 1. So a 3x3 grid has vertical lines for columns ranging from 1 to 4 and horizontal lines for rows ranging from 1 to 4.

### Cells

The space in a grid shared by a single row track and a single column track is called a grid _cell_. You can think of a grid cell like a cell in a spreadsheet: a space defined by a _row, column_ coordinate.

### Positioning

To get a feel for how items can be positioned we will create a mock floor plan for an apartment. Let’s start with a total area of our apartment (the grid container) divided into a 5x5 grid. To make this example a little clearer, we’ll use a background color to distinguish our container space. Note that we’re also using `display: inline-grid` here so that our container does not stretch to take up space the way a block-level box would. This will just help us better visualize the space.

Most of our rooms represent a single grid cell. But we have given ourselves a large living room. (Yay!) We positioned this item using `grid-column-start` and `grid-column-end`. Their property values represent the column grid lines we wish it to start and end with.

Now we have the blueprints for our full apartment. If you take a look at the `#kitchen` selector you will see we used shorthand properties here. `grid-column` is just a combination of `grid-column-start` and `grid-column-end` with a slash between the two values. And `grid-row` is the shorthand version for setting an item’s row positioning.

```html
<head>
  <style>
    .container {
      display: inline-grid;
      grid-template: 40px 40px 40px 40px 40px / 40px 40px 40px 40px 40px;
      background-color: lightblue;
    }

    .room {
      border: 1px solid;
      font-size: 50%;
      text-align: center;
    }

    #living-room {
      grid-column-start: 1;
      grid-column-end: 6;
      grid-row-start: 1;
      grid-row-end: 3;
    }

    #kitchen {
      grid-column: 4 / 6;
      grid-row: 3 / 6;
    }

    #bedroom {
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 3;
      grid-row-end: 5;
    }

    #bathroom {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 3;
      grid-row-end: 6;
    }

    #closet {
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 5;
      grid-row-end: 6;
    }
  </style>
</head>
<div class="container">
  <div class="room" id="living-room">Living Room</div>
  <div class="room" id="kitchen">Kitchen</div>
  <div class="room" id="bedroom">Bedroom</div>
  <div class="room" id="bathroom">Bathroom</div>
  <div class="room" id="closet">Closet</div>
</div>
```

#### `grid-area`

You now know how to position your grid items using row and column lines. But there are other ways to position items and this is where things can get a little confusing.

There is an even shorter shorthand for positioning grid items with start and end lines. You can combine `grid-row-start` / `grid-column-start` / `grid-row-end` / `grid-column-end` into one line using `grid-area`.

Our living room above can be written out like this:

```css
/* styles.css */

#living-room {
  grid-area: 1 / 1 / 3 / 6;
}
```

But `grid-area` can also refer to a few different things. Instead of using the grid lines to position all the items in a grid, we can create a visual layout of the grid in words. To do this we give each item on the grid a name using `grid-area`.

So our living room can be written just like this:

```css
/* styles.css */

#living-room {
  grid-area: living-room;
}
```

We could do this to all of our grid items and give each room a `grid-area` value as a name. Then we can map out the whole structure with the grid container using `grid-template-areas`.

We can even use `.` to indicate empty cells. Say our apartment might be getting a water heater and washer/dryer. We might not be sure of the exact layout but we can visualize some space easily by removing more room in the bathroom and kitchen:

```html
<head>
  <style>
    .container {
      display: inline-grid;
      grid-template: 40px 40px 40px 40px 40px / 40px 40px 40px 40px 40px;
      background-color: lightblue;
      grid-template-areas:
        'living-room living-room living-room living-room living-room'
        'living-room living-room living-room living-room living-room'
        'bedroom bedroom bathroom kitchen kitchen'
        'bedroom bedroom bathroom kitchen kitchen'
        'closet closet . . .';
    }

    .room {
      border: 1px solid;
      font-size: 50%;
      text-align: center;
    }

    #living-room {
      grid-area: living-room;
    }

    #kitchen {
      grid-area: kitchen;
    }

    #bedroom {
      grid-area: bedroom;
    }

    #bathroom {
      grid-area: bathroom;
    }

    #closet {
      grid-area: closet;
    }
  </style>
</head>
<div class="container">
  <div class="room" id="living-room">Living Room</div>
  <div class="room" id="kitchen">Kitchen</div>
  <div class="room" id="bedroom">Bedroom</div>
  <div class="room" id="bathroom">Bathroom</div>
  <div class="room" id="closet">Closet</div>
</div>
```

## Advanced Grid Properties

Let’s set up a grid with five columns and two rows and apply some styling so everything is easy to see.

For our container, we are obviously using `display: grid` to render the container as a CSS Grid. But the next property might be unfamiliar to you: `resize: both`. This is a property that allows the user to resize the container by clicking and dragging from the bottom right corner. This will be beneficial to us when we start using properties that resize our grid tracks based on the size of the grid.

We use `overflow: auto` to enable scrolling if we resize the container to be smaller than our grid can accommodate.

```html
<head>
  <style>
    .grid-container {
      resize: both;
      overflow: auto;
      display: grid;
      gap: 4px;
      padding: 4px;
      border: 1px solid grey;
      background-color: skyblue;
      grid-template-rows: 150px 150px;
      grid-template-columns: 150px 150px 150px 150px 150px;
    }

    .grid-item {
      background-color: #444;
      text-align: center;
      color: #ddd;
      font-family: sans-serif;
      font-size: 1.5rem;
      padding: 12px;
    }

    p {
      margin: 12px auto 24px;
    }

    img {
      height: 60px;
    }
  </style>
</head>
<div class="grid-container">
  <div class="grid-item">
    <p>Odin 1</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 2</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 3</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 4</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 5</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 6</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 7</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 8</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 9</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 10</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
</div>
```

### Repeat

`repeat()` is a CSS function available to the CSS Grid template properties that allows us to define a number of rows or columns and the size we want them to be without having to manually type out each individual track’s size. For example, in our setup above:

```css
.grid-container {
  grid-template-rows: 150px 150px;
  grid-template-columns: 150px 150px 150px 150px 150px;
}

/* can be rewritten as: */

.grid-container {
  grid-template-rows: repeat(2, 150px);
  grid-template-columns: repeat(5, 150px);
}
```

### Fractional units

Now that we know how to quickly create many grid tracks, it’s time to learn how to start making them _dynamic_. Dynamic, in this context means “flexible” or “responsive in some way.” The opposite of dynamic is _static_, or fixed at a certain defined height, like `150px`, which we used in the setup of this sample grid.

The most basic way to make our grid items dynamic is by using **fractional units**, also known as `fr`.

The `fr` unit is a way of distributing whatever remaining space is left in the grid. For example, if we have a four-column grid with a total width of `400px` and four grid items each on a column track assigned `1fr` as their size, all of the grid items should be given **one fraction** of that `400px` of space, which is 100 pixels.

Let’s take a look at what happens if we give our column and row tracks in the sample grid we created a dynamic width of `1fr` instead of a static width of 150px.

We can also tell our grid items to distribute the remaining space disproportionately. For example, if we divide the 5 columns up by giving the first two a track size of `2fr` and the remaining three a track size of `1fr`, the first two tracks will be given twice as much remaining space as the others.

You can also mix static units (like `px`) and dynamic units (like `fr`).

```html
<head>
  <style>
    .grid-container {
      resize: both;
      overflow: auto;
      display: grid;
      gap: 4px;
      padding: 4px;
      border: 1px solid grey;
      background-color: skyblue;
      grid-template-rows: repeat(2, 1fr);
      /* grid-template-columns: repeat(5, 1fr); */
      grid-template-columns: repeat(2, 2fr) repeat(3, 1fr);
    }

    .grid-item {
      background-color: #444;
      text-align: center;
      color: #ddd;
      font-family: sans-serif;
      font-size: 1.5rem;
      padding: 12px;
    }

    p {
      margin: 12px auto 24px;
    }

    img {
      height: 60px;
    }
  </style>
</head>
<div class="grid-container">
  <div class="grid-item">
    <p>Odin 1</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 2</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 3</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 4</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 5</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 6</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 7</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 8</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 9</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 10</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
</div>
```

### Minimum and maximum track sizes: `min()` and `max()`

Both of these functions will return a value based on the arguments you supply them. `min()` will return the smallest of all the values passed in, and `max()` will return the largest. For example, `min(100px, 200px)` will return a value of `100px` every time, while `max(100px, 200px)` will return a value of `200px` every time.

You can supply as many arguments to these functions as you want:

```css
.grid-container {
  grid-template-rows: repeat(2, min(100px, 200px, 300px, 400px, 500px));
  grid-template-columns: repeat(5, max(100px, 200px, 300px, 400px, 500px));
}

/* But when we provide a dynamic value as one of these arguments, we unlock the real potential of these functions, especially in the context of Grid: */
.grid-container {
  grid-template-rows: repeat(2, min(200px, 50%));
  grid-template-columns: repeat(5, max(120px, 15%));
}
```

In this case, the grid row size will be calculated from the values `200px` and `50%` grid container’s height. In realtime, the browser will compare both of these values and apply whichever is smallest to the size of our grid row. Essentially, what this tells this grid is that the track size should be 50% of the grid’s total vertical space (because we are defining a row size), _unless_ that number would exceed `200px`. Essentially, you’re setting a _max-height_ for the track.

Conversely, the grid column size will be calculated based on the larger of the two values `120px` and `15%` of the grid container’s width. In doing so, we are essentially setting a _minimum_ width of our grid column size at `120px`. Check out the example here, and try clicking and dragging to change the grid’s dimensions to see how the grid items respond:

```html
<head>
  <style>
    .grid-container {
      resize: both;
      overflow: auto;
      display: grid;
      gap: 4px;
      padding: 4px;
      border: 1px solid grey;
      background-color: skyblue;
      grid-template-rows: repeat(2, min(200px, 50%));
      grid-template-columns: repeat(5, max(120px, 15%));
    }

    .grid-item {
      background-color: #444;
      text-align: center;
      color: #ddd;
      font-family: sans-serif;
      font-size: 1.5rem;
      padding: 12px;
    }

    p {
      margin: 12px auto 24px;
    }

    img {
      height: 60px;
    }
  </style>
</head>
<div class="grid-container">
  <div class="grid-item">
    <p>Odin 1</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 2</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 3</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 4</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 5</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 6</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 7</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 8</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 9</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 10</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
</div>
```

### Dynamic minimum and maximum sizes

`minmax()` is a CSS function that is specifically used with Grid. It can only be used with the following CSS properties:

- `grid-template-columns`
- `grid-template-rows`
- `grid-auto-columns`
- `grid-auto-rows`

It is a relatively straightforward function that only takes in two arguments:

1. The _minimum_ size the grid track can be
2. The _maximum_ size the grid track can be

Unlike `min()` and `max()`, it _can_ make sense to use static values for both arguments. Here is an example of the grid we’ve been using written with `minmax()` and some static values:

```css
.grid-container {
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(5, minmax(150px, 200px));
}
```

With our `grid-template-columns` set with `minmax()` values, each grid item’s width will grow and shrink with the grid container as it resizes horizontally. However, as the grid shrinks, the column tracks will stop shrinking at `150px`, and as the grid grows, they will stop growing at `200px`.

#### `clamp()`

Unlike `minmax()`, `clamp()` is a CSS function that can be used anywhere, not just within a grid container.

`clamp(minimum-size, ideal-size, maximum-size)`

What this does is allow our item to resize itself until it reaches one of the minimum or maximum threshold values. Since `clamp()`’s purpose is to create a flexibly sized track with constraints, we want to use a dynamic value for the “ideal size” argument, and _typically_ a static size for the minimum and maximum size, although it is possible to use a dynamic value here too.

```html
<head>
  <style>
    .grid-container {
      resize: both;
      overflow: auto;
      display: grid;
      gap: 4px;
      padding: 4px;
      border: 1px solid grey;
      background-color: skyblue;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(5, clamp(150px, 20%, 200px));
    }

    .grid-item {
      background-color: #444;
      text-align: center;
      color: #ddd;
      font-family: sans-serif;
      font-size: 1.5rem;
      padding: 12px;
    }

    p {
      margin: 12px auto 24px;
    }

    img {
      height: 60px;
    }
  </style>
</head>
<div class="grid-container">
  <div class="grid-item">
    <p>Odin 1</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 2</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 3</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 4</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 5</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 6</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 7</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 8</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 9</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 10</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
</div>
```

Notice how the tracks stay at `20%` of the width of the container until they hit the minimum or maximum thresholds? Using `clamp()` and `minmax()` are fantastic methods for making grids more responsive while ensuring we don’t hit critical breakpoints that make our website look bad. This is imperative when using images and elements that may have a tendency to overflow or render in undesirable ways when pushed to extreme sizes.

### auto-fit and auto-fill

These two values are actually a part of the `repeat()` function specification, but they were saved for the end of the lesson because their usefulness is not apparent until after you understand the `minmax()` function. Here’s the use case: You want to give your grid a number of columns that is flexible based on the size of the grid. For example, if our grid is only `200px` wide, we may only want one column. If it’s `400px` wide, we may want two, and so on.

Both of these functions will return “the largest possible positive integer” without the grid items overflowing their container. Here is an example:

```css
.example {
  display: grid;
  width: 1000px;
  grid-template-columns: repeat(auto-fit, 200px);
}
```

For this grid, we have a set width of `1000px` and we are telling it to fill in our columns with tracks of `200px` each. As long as there are at least five grid items, this will result in a 5-column layout no matter what. In this case, `auto-fill` would actually do the same thing.

The real magic of `auto-fit` and `auto-fill` comes when we incorporate `minmax()` into the equation. With `minmax()`, we can tell our grid that we want to have as many columns as possible, using the constraints of our `minmax()` function to determine each column’s size, without it overflowing our grid.

```html
<head>
  <style>
    .grid-container {
      resize: both;
      overflow: auto;
      display: grid;
      gap: 4px;
      padding: 4px;
      border: 1px solid grey;
      background-color: skyblue;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }

    .grid-item {
      background-color: #444;
      text-align: center;
      color: #ddd;
      font-family: sans-serif;
      font-size: 1.5rem;
      padding: 12px;
    }

    p {
      margin: 12px auto 24px;
    }

    img {
      height: 60px;
    }
  </style>
</head>
<div class="grid-container">
  <div class="grid-item">
    <p>Odin 1</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 2</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 3</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 4</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 5</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 6</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 7</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 8</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 9</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
  <div class="grid-item">
    <p>Odin 10</p>
    <img src="https://www.theodinproject.com/mstile-70x70.png" alt="top logo" />
  </div>
</div>
```

So what’s going on here specifically with `repeat(auto-fit, minmax(150px, 1fr));`? Remember that `auto-fit` will return the **highest positive integer** without overflowing the grid. So first, the browser has to know how wide our grid is: in this case, it’s just the window’s width (minus margins) because we didn’t explicitly set it. For the sake of this example, let’s pretend like our window is currently `500px` wide. Second, the browser needs to know how many grid column tracks could possibly fit in that width. To do this, it uses the minimum value in our `minmax()` function, since that will yield the highest number of items, which is `150px`. If our window is `500px` wide, this means our grid will render 3 columns. But wait, there’s more! Once the browser has determined how many columns we can fit, it then resizes our columns up to the maximum value allowed by our `minmax()` function. In this case, our max size is `1fr`, so all three columns will be given an equal allotment of the space available. As we resize our window, these calculations happen in realtime.

#### `auto-fill`

In most cases, `auto-fill` is going to work exactly the same way as `auto-fit`. The difference is only noticeable when there are fewer items than can fill up the entirety of the grid row once. When the grid is expanded to a size where another grid item _could_ fit, but there aren’t any left, `auto-fit` will keep the grid items at their `max` size. Using `auto-fill`, the grid items will snap back down to their `min` size once the space becomes available to add another grid item, even if there isn’t one to be rendered. They will continue their pattern of growing to `max` and snapping back to their `min` as the grid expands and more room becomes available for new grid tracks.

```css
.grid-container {
  resize: both;
  overflow: auto;
  display: grid;
  gap: 4px;
  padding: 4px;
  border: 1px solid grey;
  background-color: skyblue;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}

.grid-item {
  background-color: #444;
  text-align: center;
  color: #ddd;
  font-family: sans-serif;
  font-size: 1.5rem;
  padding: 12px;
}

p {
  margin: 12px auto 24px;
}

img {
  height: 60px;
}
```

## Combining flexbox and grid

If you have one-dimensional content, Flexbox can make it easier to control how that content is positioned in a Flex container. If, on the other hand, you want to accurately place content on a complex layout in two-dimensions, Grid can be easier to use.

```html
<head>
  <style>
    .layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 8px;
    }
    .child {
      background: orange;
      text-align: center;
      padding: 25px;
      display: flex;
      justify-content: space-between;
    }
    .last-row {
      grid-column: 1 / 3;
    }
    .child > div {
      height: 50px;
      background: darkred;
      flex: 0 1 30%;
    }
  </style>
</head>
<div class="layout">
  <div class="child">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="child">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="child last-row">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```
