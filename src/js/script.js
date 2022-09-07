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
			bg_one: 'linear-gradient(to bottom,  #fefcea 0%,#f1da36 100%)',
			bg_two: 'linear-gradient(to bottom,  #b4df5b 0%,#b4df5b 100%)',
			bg_three: 'linear-gradient(to bottom,  #299a0b 0%,#299a0b 100%)',
			bg_four: 'linear-gradient(to bottom,  #ff0084 0%,#ff0084 100%)',
		},
	};

	class BooksList {
		constructor() {
			const thisBooks = this;
			thisBooks.getElements();
			thisBooks.initData();
			thisBooks.initActions();
		}

		initData() {
			const thisBooks = this;
			thisBooks.data.forEach((book) => {
				book.ratingWidth = `${book.rating * 10}`;
				book.ratingBgc = thisBooks.determineRatingBgc(book.rating);
				const generatedHTML = thisBooks.template(book);
				thisBooks.element = utils.createDOMFromHTML(generatedHTML);
				thisBooks.booksContainer.appendChild(thisBooks.element);
			});
		}

		getElements() {
			const thisBooks = this;
			thisBooks.data = dataSource.books;
			thisBooks.booksContainer = document.querySelector(select.containerOf.books);
			thisBooks.template = Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML);
			thisBooks.filtersContainer = document.querySelector(select.containerOf.filters);
			thisBooks.favoriteBooks = [];
			thisBooks.filters = [];
		}

		initActions() {
			const thisBooks = this;
			thisBooks.booksContainer.addEventListener('dblclick', function (event) {
				event.preventDefault();
				const bookLinkHTML = event.target.offsetParent;
				const bookId = bookLinkHTML.getAttribute('data-id');

				if (bookLinkHTML.classList.contains('book__image')) {
					if (thisBooks.favoriteBooks.indexOf(bookId) == -1 && !bookLinkHTML.classList.contains('favourite')) {
						thisBooks.favoriteBooks.push(bookId);
						bookLinkHTML.classList.add('favorite');
					} else {
						thisBooks.favoriteBooks.splice(thisBooks.favoriteBooks.indexOf(bookId), 1);
						bookLinkHTML.classList.remove('favorite');
					}
				}
			});
			thisBooks.filtersContainer.addEventListener('click', function (event) {
				const inputHTML = event.target;
				if (inputHTML.tagName === 'INPUT' && inputHTML.type === 'checkbox' && inputHTML.name === 'filter') {
					if (inputHTML.checked) {
						thisBooks.filters.push(inputHTML.value);
					} else {
						thisBooks.filters.splice(thisBooks.filters.indexOf(inputHTML.value), 1);
					}
				}
				thisBooks.filterBooks();
			});
		}

		filterBooks() {
			const thisBooks = this;
			thisBooks.data.forEach((book) => {
				let shouldBeHidden = false;
				let image = document.querySelector('.book__image[data-id="' + book.id + '"]');
				for (let filter of thisBooks.filters) {
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
		}

		determineRatingBgc(rating) {
			const thisBooks = this;
			if (rating < 6) {
				thisBooks.ratingBgc = select.styles.bg_one;
			} else if (rating > 6 && rating <= 8) {
				thisBooks.ratingBgc = select.styles.bg_two;
			} else if (rating > 8 && rating <= 9) {
				thisBooks.ratingBgc = select.styles.bg_three;
			} else if (rating > 9) {
				thisBooks.ratingBgc = select.styles.bg_four;
			}
			return thisBooks.ratingBgc;
		}
	}
	const app = new BooksList();
}
