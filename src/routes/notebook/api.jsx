export function getBooks(noText) {
	let books = JSON.parse(localStorage.getItem("notebooks") || "[]")
	if (books.length < 1) return books;
	if (!noText) return books;
	return books.map(book => {
		delete book.text;
		return book;
	})
}

export function getBook(id, previewBook) {
	for (let book of getBooks()) {
		if (book.id === id) {
			if (previewBook) {
				return ({ name: book.name, desc: book.desc })
			}
			return book
		}
	}
	return null;
}

export function updateBook(id, data) {
	let book = getBook(id);
	console.log({ book, data })
	if (!book) return console.error("update Book : invalid id", { id: id })
	book = { ...book, ...data };
	let books = getBooks()
	for (let i = 0; i < books.length; i++) {
		if (books[i].id === id) {
			books[i] = book;
		}
	}
	localStorage.setItem("notebooks", JSON.stringify(books));
}

export function deleteBook(bookID){
	let book = getBook(bookID);
	// console.log({book,bookID})
	if(!book) return console.error (`bookID : "${bookID}" is invalid`);
	let books = getBooks().filter(({id}) => id !== bookID);
	localStorage.setItem("notebooks", JSON.stringify(books));
}