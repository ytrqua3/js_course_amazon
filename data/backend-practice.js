const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/products'); //GET POST PUT DELETE are common http protocols
//using broswer is same as get request, the browser display the response
xhr.send();