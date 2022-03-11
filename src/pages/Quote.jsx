import React from "react";
import "./css/Quote.css";

function Quote() {
  return (
    <div className="container">
      <button className="btn-quote" onClick={quotes}>
        Click for motivation
      </button>
      <h6 className="quote"></h6>
      <h5 className="author"></h5>
    </div>
  );
}
let quotes = () => {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let quote = data[Math.floor(Math.random() * 1643)];
      let author = document.querySelector("h5");
      let text = document.querySelector("h6");
      author.innerHTML = quote.author;
      text.innerHTML = quote.text;
      console.log(quote);
    });
};

export default Quote;
