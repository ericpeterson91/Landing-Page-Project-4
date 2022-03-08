import React from 'react'

function Quote() {
  

   

    return (
        <div>
    <button onClick={quotes}>Motivate yourself!</button>
    <h5></h5>
    <h6 className="result"></h6>
    
    </div>
    )
}
    let quotes = () => {
        fetch("https://type.fit/api/quotes")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        let quote = data[Math.floor(Math.random() * 1643)]
        let author = document.querySelector('h5')
        let text = document.querySelector('h6')
        author.innerHTML = quote.author
        text.innerHTML = quote.text
        console.log(quote);
      });
    }

export default Quote