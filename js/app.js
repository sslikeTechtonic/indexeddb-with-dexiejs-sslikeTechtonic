function onDatabaseReady() {
    populateTableUI() // DO NOT TOUCH THIS LINE until step #4

    console.log(db);
    document.querySelector('form').addEventListener('submit', function(e){
      e.preventDefault();
      var myObj = {}
      console.log(e.target.length);
      for (var i = 0; i < e.target.length-1; i++) {
        myObj[e.target[i].name] = e.target[i].value
      }
      addBook(myObj);
    });

    // DexieJS docs: https://dexie.org/
}


function deleteBook(event) {
  var deletedBook  = db.books.delete(event.target.dataset.title);

  deletedBook.then(function(resolved) {
    console.log(resolved);
    populateTableUI();
  }).catch(function(rejected) {
    console.log(rejected);
  });
}

var samBook = {
  author: 'Sam Slike',
  numberOfPages: 60000000,
  publishDate: '1993-10-25',
  rating: 10,
  synopsis: 'This boook is so good that after reading it you might die. Other than that, I do not know what to say',
  title: 'The best book on earth'
}

function addBook(event) {
    var addedBook = db.books.put(event);

    // Hint: Once you've added the book to your database, call populateTableUI with the added book's title
    // Check out the Table.put() method and what it returns at: https://dexie.org/docs/Table/Table.put()
    addedBook.then(function(resolved){
      console.log(resolved);
    }).catch(function(rejected) {
      console.log(rejected);
    });

    populateTableUI(db.books.get(addedBook));
}




function editBook(event, obj) {
  var updatedBook = db.books.update(event, obj)

  updatedBook.then(function(resolved){
    console.log(resolved);
  }).catch(function(rejected){
    console.log(rejected);
  });
}


// ************ 4. (BONUS) Comment out line 67 in ../index.HTML and write your own 'populateTableUI' function in app.js ************
//
async function populateTableUI(){
  let tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  let books = await db.books.toArray();
  // let columns = ['cover', 'title', 'author', 'numberOfPages', 'synopsis', 'publishDate', 'rating'];
  console.log(books.length);
  for (var i = 0; i < books.length; i++) {
    var row = document.createElement('tr');
    for (var key in books[i]) {
      var td = document.createElement('td');
      var words = document.createTextNode(books[i][key]);
      td.append(words)
      row.append(td);
    }
      let btn = document.createElement('button');
      btn.innerText = 'DeleteMe';
      btn.className = 'deleteBtn';
      btn.dataset.title = books[i].title;
      btn.addEventListener('click', function(e){
        deleteBook(e);
      })
      row.append(btn)
      tbody.append(row);
  }
}


// Now that you’ve cloned your project lets start by testing our code. Let's start live
//server and open up our project in the browser. Open up your console and you should see
//some logs outputting book objects. These object are predefined in books.json and added to
//our database called library_database in indexedDB. We can also navigate to the
//application tab in the chrome console (storage in firefox) and take a look at the indexedDB
//storage We created this for you in indexedDB.js if you feel inclined to take a look.

// We've populated the table so the UI reflects what's currently in our local
// library_database in indexedDB.  We've logged the database above so you can see exactly
// what you're working with


// 1.) Now add functionality to remove a row  which will need remove the object from the books store in
//indexedDB database as well as the UI once the delete operation is complete. This will take some
//effort on the UI. Use the title as your UID (Unique identifier) which you can find in the application console
//in Chrome (storage in Firefox).

// 2.) From here we want to be able to add a book. Hook up the form below the table to add a
//book to the books store in indexedDB and auto-update the table without refreshing the page.
//Hint: This add operation is on the front page of DexieJS.  Both is and Table.put() can be
// used to add this book.

// 3.) Now make each table row editable and update the database when the edit is complete. This will
//take a lot of effort from the html to the js. Use the title as your UID (Unique identifier)
//which you can find in the application console
