import React, { Component } from 'react';

export default class MatchService
{
  static getMatches(){
   var _this = this;
   var matchesUrl = 'https://www.tapinguide.com/api/activematches?format=json';

   return fetch(matchesUrl)
      .then((response) => response.json())
      .then((results) => {
        var notCompleted = [];
        var completed = [];
          for(var i = 0, numResults = results.length; i < numResults; i++){
              if(results[i].status.description.toLowerCase() === "ft" || results[i].status.description.toLowerCase() === "aet"){
                completed.push(results[i]);
              }
              else{
                notCompleted.push(results[i]);
              }
          }

          completed.sort(function(a,b){
            return new Date(b.matchTime) - new Date(a.matchTime);
          });

          return notCompleted.concat(completed);
      });
  }

  static getLinks(){
    var linksUrl = 'https://www.tapinguide.com/api/links/?format=json'
    
    return fetch(linksUrl)
        .then((response) => response.json())
        .then((responseData) => {
          return responseData
        });
  }
}
    