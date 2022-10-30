//List of buttons
const listBtn = document.querySelector('.show-btn');
const addBtn = document.querySelector('.add-btn');
const contactBtn = document.querySelector('.contact-btn');
//Content title
const contentTitle = document.querySelector('.content .title');
// 3 sections : book list , add list and contact Info
const bookList = document.querySelector('.book-list');
const addBookList = document.querySelector('.add-book');
const contactInfoList = document.querySelector('.contact-info');
// Date section
const showDate = document.querySelector('.date');
//Table of books to add dynamically a list of books
const tableBooks = document.querySelector('.book-table');
// Add button
const addButton = document.querySelector('#add-btn');
// Form element
const formElement = document.querySelector('.send-book');


// Change and show content
function showContent(title, id) {
  contentTitle.innerHTML = title;
  switch (id) {
    case 0:
      bookList.classList.add('active');
      addBookList.classList.remove('active');
      contactInfoList.classList.remove('active');
      populateBookList();
      // Remove buttons
      const removeBtns = document.querySelectorAll('.remove-btn');
      //Event listener to remove buttons 
        removeBtns.forEach((button, index) => {
          button.addEventListener('click', (event) => {
            event.preventDefault();
            bookClass.removeBook(index);
            showContent('All awesome books', 0);
          })
        });
      break;
    case 1:
      bookList.classList.remove('active');
      addBookList.classList.add('active');
      contactInfoList.classList.remove('active');
      break;
    case 2:
      bookList.classList.remove('active');
      addBookList.classList.remove('active');
      contactInfoList.classList.add('active');
      break;
  }
}

//Show date every 1 second
setInterval(() => {
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit',
  };
  showDate.innerHTML = new Date().toLocaleString('en-us', options);
}, 1000);

//Add event listener on a button
function listenEvent(button, title, id) {
  button.addEventListener('click', () => {
    showContent(title, id);
  })
}

//Event listener for add button 
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  //check if input values are not null
  if (formElement[0].value.length > 0 && formElement[1].value.length) {
    bookClass.addBook(formElement[0].value, formElement[1].value);
    formElement.reset();
  }
})

function populateBookList() {
  const listOfBooks = JSON.parse(localStorage.getItem('books')) || [];
  // Reset table from previous contents
  tableBooks.innerHTML = '';
  if(listOfBooks.length === 0) {
    tableBooks.innerHTML += `
    <tr>
      <td>No books found please add a new book</td>
    </tr>
    `;
  } else {
    listOfBooks.forEach(listbook => {
      tableBooks.innerHTML += `
      <tr>
        <td>${listbook.title} by ${listbook.author}</td>
        <td><button class="remove-btn" type="submit">Remove</button></td>
      </tr>
      `;
    })
  }
}

//Show list of books by default when loading then add listener to buttons
showContent('All awesome books', 0);
listenEvent(listBtn, 'All awesome books', 0);
listenEvent(addBtn, 'Add a new book', 1);
listenEvent(contactBtn, 'Contact information', 2);



class Books {
  constructor() {
    this.listOfBooks = JSON.parse(localStorage.getItem('books')) || [];
  }

  addBook(title, author) {
    // Add new book into the existing array of books
    this.listOfBooks.push({
      title: title,
      author: author
    });
    // Replace old object of books with the new updated one
    localStorage.setItem('books', JSON.stringify(this.listOfBooks));
  }

  removeBook(id) {
    //Remove the item that has index of id
    this.listOfBooks.splice(id, 1);
    // Replace old object of books with the new updated one
    localStorage.setItem('books', JSON.stringify(this.listOfBooks));
  }
}

const bookClass = new Books();

