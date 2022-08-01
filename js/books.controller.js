'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
}

function renderBooks() {
    const books = getBooksForDisplay()
    const strHtmls = books.map(book => `
        <tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}$</td>
        <td>${book.rate}</td>
        <td><button class="read-btn" onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button class="update-btn" onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td><button class="remove-btn" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`
    )

    document.querySelector('tbody').innerHTML = strHtmls.join('')
}

function onReadBook(bookId) {
    const book = getBookById(bookId)
    readBook(bookId)
    const elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('h4 span').innerText = book.price
    elModal.querySelector('p').innerText = book.desc
    elModal.classList.add('open')
}
// function onOpenUpdateModal() {
//     document.querySelector('.update-modal').classList.remove('hidden')
//     document.querySelector('.update-modal').classList.add('shown')

// }

// function onOpenAddBookModal() {
//     document.querySelector('.add-book-modal').classList.remove('hidden')
//     document.querySelector('.add-book-modal').classList.add('shown')
// }

function onUpdateBook(id) {
    var book = getBookById(id)
    const newPrice = +prompt('Enter new price', book.price)
    if (newPrice && book.price !== newPrice) {
        updateBook(id, newPrice)
        renderBooks()

    }
}

function onUpdateBookPrice(ev) {
    ev.preventDefault()
    const elNewPrice = document.querySelector('[update-price-txt]')
    updateBookPrice(elNewPrice)
    // closeUpdateModal()
    renderBooks()

}

function onRemoveBook(bookId) {
    console.log('bookId:', bookId)
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var title = prompt('Enter book title')
    var price = +prompt('Enter book price')

    if ((title) && (price)) {
        addBook(title, price)
        renderBooks()

    }
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function onSetSortBy(sortBy) {
    setBookSort(sortBy)
    renderBooks()

}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()

    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&search=${filterBy.search}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    // console.log(newUrl);
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: queryStringParams.get('maxPrice') || 100,
        minRate: +queryStringParams.get('minRate') || 0,
        search: +queryStringParams.get('search') || ''
    }

    if (!filterBy.maxPrice && !filterBy.minRate && !filterBy.search) return

    document.querySelector('.filter-price-range').value = filterBy.maxPrice
    document.querySelector('.filter-rate-range').value = filterBy.minRate
    document.querySelector('.search').value = filterBy.search
    setBookFilter(filterBy)
}

function onChangeRate(rate) {
    changeRate(rate)
    renderBooks()

}

function onNextPage() {
    nextPage()
    renderBooks()
}
function onPreviousPage() {
    previousPage()
    renderBooks()
}
