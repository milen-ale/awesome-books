/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-dupe-class-members */
/* eslint-disable linebreak-style */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// local Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
}
// Display Books
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector(".book-container");
    const addedbook = document.createElement("div");
    addedbook.innerHTML = `
    <div class="texts">
        <p>"${book.title}" by </p>
        <p>${book.author}</p>
        </div>
        <button type="submit" class="delete">Remove</button>
        <hr>
        </div>
      `;
    list.appendChild(addedbook);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
  }
}

document.addEventListener("DOMContentLoaded", UI.displayBooks);
document.querySelector("form").addEventListener("submit", () => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const book = new Book(title, author);
  UI.addBookToList(book);
  Store.addBook(book);
  UI.clearFields();
});
document.querySelector(".book-container").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
