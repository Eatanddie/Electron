const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
const path = require('path')

let musicFilePath = []

$('select-music-button').addEventListener('click', () => {
    ipcRenderer.send('open-music-file')
})

$('add-music-button').addEventListener('click', () => {
    ipcRenderer.send('add-tracks', musicFilePath)
})

const renderListHTML = (pathes) => {
    const musicList = $('music-list')
    const musicItemsHTML = pathes.reduce((html, music) => {
        return html += `<li class="list-group-item">${path.basename(music)}</li>`
    }, '')
    musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`
}

ipcRenderer.on('selected-file', (event, path) => {
    if (Array.isArray(path)) {
        renderListHTML(path)
        musicFilePath = path
    }
})