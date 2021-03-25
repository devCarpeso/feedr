import { create_card } from './modules/qcard.js';

// App constants
const maxlength = 250;

window.addEventListener('load', event => {
    _watchers();
    _events();
    _send('http://localhost:8888/index.php', {
        'mode': 'get'
    });
});

function _events() {

    // Post button events
    document.getElementById('post').addEventListener('click', event => {
        document.querySelector('.modal-bg').classList.toggle('show');
    });
    document.querySelector('.modal-exit').addEventListener('click', event => {
        event.preventDefault();
        document.querySelector('.modal-bg').classList.toggle('show');
    });
    /////////////

    // Menu enter and exit events
    document.querySelectorAll('#menu, .side-exit').forEach(element => {
        element.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector(".sidebar").classList.toggle('show-bar');
            document.querySelector("body > aside > nav").classList.toggle('show-box');
        });
    });
    document.querySelector('.sidebar').addEventListener('click', event => {
        event.stopPropagation();
        document.querySelector(".sidebar").classList.remove('show-bar');
        document.querySelector("body > aside > nav").classList.remove('show-box');
    });
    document.querySelectorAll('.sidebox > a').forEach(link => {
        link.addEventListener('click', event => {
            event.stopPropagation();
        })
    });
    /////////////

    

}

function _watchers() {
    const textBox = document.getElementById('post_content');
    textBox.addEventListener('input', event => {
        var textlength = textBox.value.length;
        document.querySelector(".modal-subtext").innerText = maxlength - textlength;
    });
}

function _send(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}