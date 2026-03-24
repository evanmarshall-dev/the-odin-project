# Object Constructors

Manually typing out the contents of all of our objects with object literals is not always feasible. When you have a specific type of object that you need to make multiple of, a better way to create them is using an object constructor, which is really just a function.

The only difference is that you use it by calling the function with the keyword `new`. This is not the same as calling `Player("steve", "X")` (without the `new` keyword). When we call a function with `new`, it creates a new object, makes `this` inside the function refer to that object, and makes that object inherit from the function’s `.prototype` property (more on that later). The new object is then returned (even though we don’t specify a `return` value in the constructor function).

```javascript
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.sayName = function () {
    console.log(this.name);
  };
}

const player = new Player('steve', 'X');
console.log(player.name); // "steve"
const player1 = new Player('steve', 'X');
const player2 = new Player('also steve', 'O');
// Just like with objects created using the object literal method, you can add functions to the object.
player1.sayName(); // logs "steve"
player2.sayName(); // logs "also steve"
```

> [!WARNING] Safeguarding constructors
> Since constructors can be called without using `new` by mistake, which would cause hard-to-track errors as it won’t do all the new object and `this` binding stuff, we should safeguard them. You can use the `new.target` meta-property like this, which will throw an error if `Player` is called without `new`:
>
> ```javascript
> function Player(name, marker) {
>   if (!new.target) {
>     throw Error("You must use the 'new' operator to call the constructor");
>   }
>   this.name = name;
>   this.marker = marker;
>   this.sayName = function () {
>     console.log(this.name);
>   };
> }
> ```

## Exercise

### Reference

Working [HTML File][1] and working [JavaScript File][2].

[1]: ./exercise/book-exercise.html
[2]: ./exercise/book-exercise.js

Write a constructor for making “Book” objects. We will revisit this in the next project. Your book objects should have the book’s `title`, `author`, the number of `pages`, and whether or not you have `read` the book.

Put a function `info()` into the constructor that can report the book info like so: `console.log(theHobbit.info()); // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"`

> [!TIP] console.log vs return
> We use examples of functions that call `console.log()` for demonstration, but instead of making functions directly log things, it’s generally more sensible to make them `return` values. That way, you can pass the values wherever you wish without being tied to whatever that function does; you may not always want to log the value.
