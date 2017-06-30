'use strict';

(function () {
   console.log("happening");

   const searchButton = document.querySelector('#btn-search');
   const bars = document.querySelector("#bars");
   function updateBars (data) {
      console.log("hello");
      const clicksObject = JSON.parse(data);
      const barsHTML = "";
      // Generate html here
      bars.innerHTML = barsHTML;
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', '/', updateBars));

   searchButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', '/', function () {
         ajaxFunctions.ajaxRequest('GET', '/', updateBars);
      });

   }, false);

})();
