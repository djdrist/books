/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
	('use strict');
	const select = {
		templateOf: {
			menuBooks: '#template-book',
		},
		containerOf: {
			books: '.books-list',
			filters: '.filters',
		},
		styles: {
			bg_one: 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)',
			bg_two: 'linear-gradient(to bottom,  #b4df5b 0%,#b4df5b 100%)',
			bg_three: 'linear-gradient(to bottom,  #299a0b 0%, #299a0b 100%)',
			bg_four: 'linear-gradient(to bottom,  #ff0084 0%,#ff0084 100%)',
		},
	};

	const booksData = dataSource.books;
	const booksContainer = document.querySelector(select.containerOf.books);
	const template = Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML);
	const filtersContainer = document.querySelector(select.containerOf.filters);
	const favoriteBooks = [];
	const filters = [];

	const renderBooks = () => {
		booksData.forEach((book) => {
			if (book.rating < 6) {
				book.ratingBgc = select.styles.bg_one;
			} else if (book.rating > 6 && book.rating <= 8) {
				book.ratingBgc = select.styles.bg_two;
			} else if (book.rating > 8 && book.rating <= 9) {
				book.ratingBgc = select.styles.bg_three;
			} else if (book.rating > 9) {
				book.ratingBgc = select.styles.bg_four;
			}
			book.ratingWidth = `${book.rating * 10}`;
			const generatedHTML = template(book);
			element = utils.createDOMFromHTML(generatedHTML);
			booksContainer.appendChild(element);
		});
	};

	const filteredBooks = () => {
		booksData.forEach((book) => {
			let shouldBeHidden = false;
			let image = document.querySelector('.book__image[data-id="' + book.id + '"]');
			for (let filter of filters) {
				if (!book.details[filter]) {
					shouldBeHidden = true;
					break;
				}
			}
			if (shouldBeHidden) {
				image.classList.add('hidden');
			} else {
				image.classList.remove('hidden');
			}
		});
	};

	const initActions = () => {
		booksContainer.addEventListener('dblclick', function (event) {
			event.preventDefault();
			const bookLinkHTML = event.target.offsetParent;
			const bookId = bookLinkHTML.getAttribute('data-id');

			if (bookLinkHTML.classList.contains('book__image')) {
				if (favoriteBooks.indexOf(bookId) == -1 && !bookLinkHTML.classList.contains('favourite')) {
					favoriteBooks.push(bookId);
					bookLinkHTML.classList.add('favorite');
				} else {
					favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
					bookLinkHTML.classList.remove('favorite');
				}
			}
		});
		filtersContainer.addEventListener('click', function (event) {
			const inputHTML = event.target;
			if (inputHTML.tagName === 'INPUT' && inputHTML.type === 'checkbox' && inputHTML.name === 'filter') {
				if (inputHTML.checked) {
					filters.push(inputHTML.value);
				} else {
					filters.splice(filters.indexOf(inputHTML.value), 1);
				}
			}
			filteredBooks();
		});
	};
	renderBooks();
	initActions();
	// console.log(booksData);
	// console.log(booksData[1].details.adults);
}
