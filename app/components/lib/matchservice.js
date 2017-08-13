import React, { Component } from 'react';

export default class MatchService
{
  static getMatches(){
   var _this = this;
   var matchesUrl = 'https://api.tapinguide.demo.nordicdev.io/api/activematches/';

   return fetch(matchesUrl)
      .then((response) => response.json())
      .then((matches) => {
        var notCompleted = [];
        var completed = [];
        for(var i = 0, numResults = matches.length; i < numResults; i++){
          if(matches[i].status.description.toLowerCase() === "ft" 
            || matches[i].status.description.toLowerCase() === "aet" 
            || matches[i].status.description.toLowerCase() === "pen."
            || matches[i].status.description.toLowerCase() === "cancl."){
            completed.push(matches[i]);
          }
          else{
            notCompleted.push(matches[i]);
          }
      }

      notCompleted.sort(function(a,b){
         return new Date(b.matchTime) - new Date(a.matchTime) || a.id - b.id;
      }).reverse();

      completed.sort(function(a,b){
        return new Date(b.matchTime) - new Date(a.matchTime) || a.id - b.id;
      });

           return notCompleted.concat(completed);
      });
  }

  static getLinks(){
    var linksUrl = 'https://api.tapinguide.demo.nordicdev.io/api/links/'
    
    return fetch(linksUrl)
        .then((response) => response.json())
        .then((responseData) => {
          return responseData
        });
  }
}
    