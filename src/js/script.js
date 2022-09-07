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

	const renderBooks = () => {
		booksData.forEach((book) => {
			const generatedHTML = template(book);
			element = utils.createDOMFromHTML(generatedHTML);
			booksContainer.appendChild(element);
		});
	};
	renderBooks();
}
