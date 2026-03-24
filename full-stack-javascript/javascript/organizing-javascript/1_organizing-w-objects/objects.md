# Organizing Code with Objects

## Refresher

There are multiple ways to define objects in JavaScript, but in many cases **object literal** syntax is used as follows.

There are also 2 ways to get information out of an object: **dot notation** and **bracket notation**.

Which method you use will depend on context. Dot notation is cleaner and is usually preferred, but there are plenty of circumstances when it is not possible to use it. For example, `myObject."obnoxious property"` won’t work because that property is a string with a space in it. Likewise, you cannot use variables in dot notation:

```javascript
const myObject = {
  property: 'Value!',
  otherProperty: 77,
  'obnoxious property': function () {
    // do stuff!
  },
};

// dot notation
console.log(myObject.property); // "Value!"

// bracket notation
console.log(myObject['obnoxious property']); // [Function]

const variable = 'property';

// "undefined" because it's looking for a property named "variable" in our object
console.log(myObject.variable);

// this is equivalent to myObject["property"] and returns "Value!"
console.log(myObject[variable]);
```

## Objects as a data structure

You’ve already been introduced to the basic use of a JavaScript object - storing related information with key/value pairs. This is one of the simplest ways you can begin to organize your code! Take these examples from a ‘tic tac toe’ game - first without objects.

At first glance, the first doesn’t seem so bad, but the benefits of the second approach are huge! Since the values are assigned to keys in objects, instead of a bunch of long and isolated variable names, we can use briefer variable names that are arguably easier to read at a glance, where the object name helps give context. Normally, `name` and `marker` would not be reusable in the same scope, but via “namespacing”, we can still use them as part of `playerOne.name` or `playerTwo.marker`, etc.

But naming isn’t the only benefit. Grouping related data together into objects allows you to pass all the data around more easily. Instead of having to have separate parameters for the name and the marker, we have just the one for the entire object and now we have access to all the properties within. If we end up adding more properties to the player objects and needing them in the `gameOver` function, again, we have access to that already since we passed the whole object in, rather than into individual parameters.

```javascript
// without objects
const playerOneName = 'tim';
const playerTwoName = 'jenn';
const playerOneMarker = 'X';
const playerTwoMarker = 'O';

// with objects
const playerOne = {
  name: 'tim',
  marker: 'X',
};

const playerTwo = {
  name: 'jenn',
  marker: 'O',
};

function gameOver(winningPlayer) {
  console.log('Congratulations!');
  console.log(`${winningPlayer.name} (${winningPlayer.marker}) is the winner!`);
}
```

## Objects as a design pattern

The grouping power of objects isn’t just useful for organizing data, it’s useful for organizing _functionality_ as well! Using objects for this purpose is one of the core tenets of Object Oriented Programming (OOP), which is a programming paradigm based on the concept of “objects”, which can contain data and code: data in the form of fields (often known as attributes or properties), and code in the form of procedures (often known as methods). In OOP, computer programs are designed by making them out of objects that interact with one another.

This means we’re not limited to storing data in objects, we can store logic as well via **methods** (which are just functions that are part of an object), then use those methods to interact with the data.

The properties or attributes of a _thing_ are expressed as **properties**, and the ways you can interact with that thing are expressed as **methods**. Let’s take an example of some _thing_ - we’ll choose a car. A car can have a make, model, registration year, color and price. These might be expressed as properties of an object.

You may want to have the ability to apply a discount to the car, or get a summary of all of the details in one go. For this, you may want to use methods. The easiest way to get started creating methods to interact with your objects might be combining object literal syntax with JavaScript’s `this` keyword. The `this` keyword is used to refer to the object a particular method is called from.

```javascript
const car = {
  make: 'Volkswagen',
  model: 'Golf',
  year: 2026,
  color: 'blue',
  priceUSD: 40000,

  // a method is just a function assigned to a property
  applyDiscount: function (discountPercentage) {
    const multiplier = 1 - discountPercentage / 100;
    this.priceUSD *= multiplier;
  },
  // shorthand way to add a method to an object literal
  getSummary() {
    return `${this.year} ${this.make} ${this.model} in ${this.color}, priced at $${this.priceUSD} (USD).`;
  },

  // ...any other methods...
};
```

> [!WARNING] Arrow functions and “this”
> The `this` keyword behaves differently inside arrow functions compared to traditional function expressions (which includes the shorthand syntax).

These methods use the `this` keyword to refer to the object they get called from (`car`). The `this` keyword can be used to read and assign properties of an object in exactly the same way you would for any other variable that points to an object, and we use methods just the same as we might use a function - creating reusable code under an intuitive name. Much nicer than manually writing the logic out each and every time we want to do some of those things.

### Objects for more abstract concepts

Moving past physical items, we could also try to describe something a little bit more abstract like a game as an object. Since we’ve already explored Rock Paper Scissors in Foundations, let’s use that as an example.

A rock paper scissors game might involve a couple of basic things:

- Players’ scores
- The ability to play a round (and playing a round should update a player’s score)

And might also include a couple nice-to-haves:

- The ability to determine the current winning player
- The ability to restart the game

> [!NOTE] Underscore properties
> Out in the wild, you may see code with object properties that start with `_` e.g. `_someProperty`. This is purely a developer convention that indicates the property is intended to be “private”. A private property is one that’s only meant for internal use and not meant to be read or called outside of the object itself (such as helper methods).
> JavaScript does not actually have the concept of real private properties for objects, at least not for object literals. Developers historically would add a leading `_` to indicate a property should be treated as if it was private, even if technically they’d still be accessible outside of the object internals (“public”). There are ways to implement actual privacy (which would actually prevent accessing something outside of the object itself) but they involve more advanced things.

## Objects as machines

As we’ve just seen, we can use objects to represent not just physical things but conceptual things too, such as the game of Rock Paper Scissors. Objects can be used to represent almost anything you can think of. It’ll be impossible to give a comprehensive list of examples, but some uses include:

- An object that manages other objects, such as an “inventory” object that contains item objects in an array, and methods that can be done to interact with that array of items
- An object that can listen for events that happen and respond appropriately (think of `.addEventListener` on DOM elements)
- An object that manages all things relating to the DOM, by setting event listeners that call other objects’ methods, and displaying data from other objects on the web page.

One way you might conceptualize these objects though, might be to imagine them as little “machines” you’re making out of code. The **properties** of the machine could be thought as if they were displays that might show information such as:

- A list of the items you’ve collected and the maximum number of items you can carry
- A list of functions that are listening for an event
- The DOM elements for the buttons for interaction, and elements for displaying data

The **methods** of your machine might be akin to buttons and such that make the machine _do_ a specific thing, such as:

- Remove an item you own from a list and add new items
- Fire all the functions that are listening to a “click” event, or add a new function to listen to the “click” event
- Read data from somewhere else and set the `.textContent` of certain DOM elements
