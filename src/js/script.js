/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
	('use strict');
	const select = {
		templateOf: {
			menuBooks: '#template-book',
		},
		containerOf: {
			books: '.books-list',
		},
	};
	const booksData = dataSource.books;
	const booksContainer = document.querySelector(select.containerOf.books);
	const template = Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML);
	const favoriteBooks = [];

	const renderBooks = () => {
		booksData.forEach((book) => {
			const generatedHTML = template(book);
			element = utils.createDOMFromHTML(generatedHTML);
			booksContainer.appendChild(element);
		});
	};

	const initActions = () => {};
	booksContainer.addEventListener('dblclick', function (event) {
		event.preventDefault();
		const bookLinkHTML = event.target.offsetParent;
		const bookId = bookLinkHTML.getAttribute('data-id');
		if (favoriteBooks.indexOf(bookId) == -1) {
			favoriteBooks.push(bookId);
			bookLinkHTML.classList.add('favorite');
		} else {
			favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
			bookLinkHTML.classList.remove('favorite');
		}
	});
	renderBooks();
	initActions();
}
