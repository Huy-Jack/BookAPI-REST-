const setEditModal = (isbn) => {
  // Get information about the book using isbn
  const xhttp = new XMLHttpRequest();
  // Setting up the action url for the book
  xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
  xhttp.setRequestHeader("content-type", "json");
  xhttp.send();

  const book = JSON.parse(xhttp.responseText);

  const { title, author, publisher, published, pages } = book;

  // Filling information about the book in the form inside the modal
  document.getElementById("isbn").value = isbn;
  document.getElementById("title").value = title;
  document.getElementById("author").value = author;
  document.getElementById("publisher").value = publisher;
  document.getElementById("publish_date").value = published;
  document.getElementById("numOfPages").value = pages;

  document.getElementById(
    "editForm"
  ).action = `http://localhost:3000/book/${isbn}`;
};

const deleteBook = (isbn) => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);
  xhttp.send();

  // Reloading the page
  location.reload();
};

const loadBooks = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/books", false);
  xhttp.send();
  const books = JSON.parse(xhttp.responseText);
  for (let book of books) {
    const x = `
        <div class="col-6 mb-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>
                    <div>Author: ${book.author}</div>
                    <div>Publisher: ${book.publisher}</div>
                    <div>Published: ${book.published}</div>
                    <div>Number Of Pages: ${book.pages}</div>
                    <hr>
                    <button type="button" class="btn btn-danger" onClick="deleteBook(${book.isbn})">Delete</button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editBookModal" onClick="setEditModal(${book.isbn})">Edit</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById("books").innerHTML += x;
  }
};
loadBooks();
