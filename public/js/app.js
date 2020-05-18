console.log('Clientside javascript file is loaded')

const weatherForm = document.querySelector('form')                      //Select the element for the HTML document that we need to work with
const search = document.querySelector('input')                          //Get the address the user provided and fetch the forecast
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//Creating the eventlistener onto the element/form
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()                                              //Prevent the browser from refreshing the page hence clearing content

    const location = search.value                                       //Get the value of search submitted by the user

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    //fetch the forecast data using location
    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error)
            {
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }        
        })
    })
})















// //Should be able to fetch the forecast data
// //We have to use the FETCH API which is only accessible to clientside js
// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error)
//         {
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }        
//     })
// })