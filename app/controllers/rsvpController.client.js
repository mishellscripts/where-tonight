'use strict';

(function () {
   // Get instances of all envelopes (Add/remove RVSP)
   var add = document.querySelectorAll('.fa-envelope-open');
   var remove = document.querySelectorAll('.fa-envelope');

   var ajaxMethods = {
      get: function(bar) {
         var barID = bar.parentNode.getAttribute("barid");
         var barURL = window.location.origin + '/api/get/' + barID;
         ajaxFunctions.ajaxRequest('GET', barURL, updateRSVPCount(bar));
      },
      add: function(bar) {
         var barID = bar.parentNode.getAttribute("barid");
         var barURL = window.location.origin + '/api/add/' + barID;
         ajaxFunctions.ajaxRequest('POST', barURL, function () {
            ajaxFunctions.ajaxRequest('GET', barURL, updateRSVPCount(bar));
         });
      },
      remove: function(bar) {
         var barID = bar.parentNode.getAttribute("barid");
         var barURL = window.location.origin + '/api/remove/' + barID;
         ajaxFunctions.ajaxRequest('DELETE', barURL, function () {
            ajaxFunctions.ajaxRequest('GET', barURL, updateRSVPCount(bar));
         });
      }
   }
   
   /*var sendAjaxRequest = function(bar, type) {
      console.log(type);
      var barID = bar.parentNode.getAttribute("barid");
      var barURL = window.location.origin + '/api/' + type.toLowerCase() + '/' + barID;
      var requestToSend = type.toUpperCase();
      ajaxFunctions.ajaxRequest(requestToSend, barURL, function () {
         if (requestToSend != 'GET')
            ajaxFunctions.ajaxRequest('GET', barURL, updateRSVPCount(bar));
      });
   }*/
   
   var updateRSVPCount = function(bar) {
      return function(data, textStatus, jqXHR) {
         var numRSVPs = JSON.parse(data);
         bar.parentNode.firstChild.innerHTML = numRSVPs + ' RSVPs';
      };
   };

   ajaxFunctions.ready(function() {
      add.forEach(function (startAdd) {
         ajaxMethods.get(startAdd);
      })
   });

   add.forEach(function(bar) {
      bar.addEventListener('click', function() {
         if (bar.classList.contains('fa-envelope-open')) {
            ajaxMethods.add(bar, 'add');
         } else if (bar.classList.contains('fa-envelope')) {
            ajaxMethods.remove(bar, 'remove');
         }
      }, false);
   });

})();
