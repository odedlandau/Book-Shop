'use strict'
const STORAGE_KEY = 'booksDB'
var gBooks
var gTitleSortAscending = true
var gPriceSortAscending = true
var gRateSortAscending = true
var gCurrBookReadId

var gFilterBy = { maxPrice: 100, minRate: 0, search: '' }

const PAGE_SIZE = 8
var gPageIdx = 0


_createBooks()

function _createBook(title = getRandomTitle(4), price = getRandomIntInclusive(15, 90).toFixed(2), rate = getRandomIntInclusive(0, 10)) {
    return {
        id: makeId(),
        title: title,
        price: price,
        desc: makeLorem(),
        rate: rate
    }
}




function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    // if nothing in storage, create demo data
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < 20; i++) {
            books.push(_createBook())
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(txt, price) {
    // console.log('txt:', txt)
    const book = _createBook(txt, price.toFixed(2))
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice.toFixed(2)
    _saveBooksToStorage()

}

function setBookSort(sortBy) {
    if (sortBy === 'title') {
        if (gTitleSortAscending) {
            gBooks.sort((b1, b2) => b1.title.localeCompare(b2.title))
            gTitleSortAscending = !gTitleSortAscending
        } else {
            gBooks.sort((b1, b2) => b1.title.localeCompare(b2.title) * -1)
            gTitleSortAscending = !gTitleSortAscending
        }

    } else if (sortBy === 'price') {
        if (gPriceSortAscending) {
            gBooks.sort((b1, b2) => (b1.price - b2.price))
            gPriceSortAscending = !gPriceSortAscending
        } else {
            gBooks.sort((b1, b2) => (b1.price - b2.price) * -1)
            gPriceSortAscending = !gPriceSortAscending
        }
    } else if (sortBy === 'rate') {
        if (gRateSortAscending) {
            gBooks.sort((b1, b2) => (b1.rate - b2.rate))
            gRateSortAscending = !gRateSortAscending
        } else {
            gBooks.sort((b1, b2) => (b1.rate - b2.rate) * -1)
            gRateSortAscending = !gRateSortAscending
        }
    }

}

function setBookFilter(filterBy = {}) {
    // console.log('setBookFilter');
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if (filterBy.search !== undefined) gFilterBy.search = filterBy.search

    return gFilterBy
}

function readBook(id) {
    gCurrBookReadId = id
}

function changeRate(rate) {
    // console.log('rate:', rate)
    // console.log('gCurrBookReadId:', gCurrBookReadId)
    const book = gBooks.find(book => book.id === gCurrBookReadId)
    book.rate = rate
    _saveBooksToStorage()
}

function updateBookPrice(newPrice) {
    const book = gBooks.find(book => book.id === gCurrUpdateBookPriceId)
    book.price = +newPrice
    _saveBooksToStorage()
}


function getBooksForDisplay() {
    var books = gBooks.filter(book => book.price <= gFilterBy.maxPrice &&
        book.rate >= gFilterBy.minRate && book.title.includes(gFilterBy.search))


    const startIdx = gPageIdx * PAGE_SIZE
    return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
        
    }
}
function previousPage() {
    console.log(gPageIdx);
    if (gPageIdx < 0) return
    gPageIdx--
}