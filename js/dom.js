const INCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";

function addBook() {
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  const generatedID = generateId();

  const bookObject = generateBookObject(
    generatedID,
    bookTitle,
    bookAuthor,
    parseInt(bookYear),
    isComplete
  );

  books.push(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT));

  updateDataToStorage();
}

function generateId() {
  return +new Date();
}

function makeBook(bookObject) {
  const { id, title, author, year, isComplete } = bookObject;
  const bookTitleElement = document.createElement("h3");
  bookTitleElement.innerText = title;

  const bookAuthorElement = document.createElement("p");
  bookAuthorElement.innerText = `Penulis: ${author}`;

  const bookYearElement = document.createElement("p");
  bookYearElement.innerText = `Tahun: ${year}`;

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("action");

  const undoButton = document.createElement("button");
  undoButton.classList.add("green");
  undoButton.addEventListener("click", function () {
    pindahBuku(id);
  });

  const trashButton = document.createElement("button");
  trashButton.classList.add("red");
  trashButton.addEventListener("click", function () {
    hapusBuku(id);
  });
  trashButton.innerText = "Hapus buku";

  if (isComplete) {
    undoButton.innerText = " Belum selesai di Baca";
  } else {
    undoButton.innerText = "Selesai dibaca";
  }
  actionContainer.append(undoButton, trashButton);

  const container = document.createElement("article");
  container.classList.add("book_item");
  container.append(
    bookTitleElement,
    bookAuthorElement,
    bookYearElement,
    actionContainer
  );

  return container;
}

function pindahBuku(bookId /* HTMLELement */) {
  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;

  bookTarget.isComplete = !bookTarget.isComplete;
  document.dispatchEvent(new Event(RENDER_EVENT));
  updateDataToStorage();
}

function hapusBuku(bookId /* HTMLELement */) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  updateDataToStorage();
}

document.addEventListener(RENDER_EVENT, function () {
  const incompletedBookList = document.getElementById(INCOMPLETED_LIST_BOOK_ID);
  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

  // clearing list item
  incompletedBookList.innerHTML = "";
  listCompleted.innerHTML = "";

  for (const bookItem of books) {
    console.log(bookItem);
    const bookElement = makeBook(bookItem);
    if (bookItem.isComplete) {
      listCompleted.append(bookElement);
    } else {
      incompletedBookList.append(bookElement);
    }
  }
});
