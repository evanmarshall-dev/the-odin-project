function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    if (isRead === true) {
      return `${title} by ${author}, ${pages} pages; completed reading.`;
    }
    return `${title} by ${author}, ${pages} pages; not read yet.`;
  };
}

const HarryPotterOne = new Book(
  "Harry Potter and the Philosopher's Stone",
  'J.K. Rowling',
  352,
  true,
);

console.log(HarryPotterOne.info());
