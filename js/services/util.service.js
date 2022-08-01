'use strict'

function getRandomPrice(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.random() * (max - min + 1) + min //The maximum is inclusive and the minimum is inclusive 
}

function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function getRandomTitle(wordCount) {
    var words = ['the', 'wind', 'big', 'small', 'is', 'sky', 'blue', 'bird', 'love', 'great', 'again', 'day', 'night', 'morning', 'hope', 'after', 'boy', 'girl', 'man', 'mother']
    var title = ''
    for (var i = 0; i < wordCount; i++) {
        title += words[getRandomIntInclusive(0, words.length - 1)] + ' '

    }
    return title
}

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}