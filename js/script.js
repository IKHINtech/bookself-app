document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  function clearForm() {
    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";
    document.getElementById("inputBookIsComplete").checked = false;
  }

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
    clearForm();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }

  const searchForm = document.getElementById("searchBook");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const query = document
      .getElementById("searchBookTitle")
      .value.toLowerCase();

    const books = document.querySelectorAll(".book_item");

    books.forEach((book) => {
      const bookDesc = book.childNodes[0];
      const bookTitle = bookDesc.firstChild.textContent.toLowerCase();
      console.log(bookTitle);
      if (bookTitle.indexOf(query) === -1) {
        book.style.display = "none";
      } else {
        book.style.display = "block";
      }
    });
  });
});

document.addEventListener("saved-book", () => {
  console.log("Data buku berhasil disimpan.");
});
