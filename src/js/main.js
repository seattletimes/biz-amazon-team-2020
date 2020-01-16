// var paywall = require("./lib/paywall");
var $ = require('jquery');
var jQueryBridget = require('jquery-bridget');
var Isotope = require('isotope-layout');
require("component-responsive-frame/child");
var data = require('../../data/steam.sheet.json');
// setTimeout(() => paywall(12345678), 5000);

jQueryBridget( 'isotope', Isotope, $ );

$( document ).ready(function() {
    console.log( "ready!" );
});
console.log("hi mom");



var $grid = $('#card-holder').isotope({
  itemSelector: '.card',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.last',
    age: '[data-age]',
    tenure: '.tenure parseInt',
    // gender: '.gender',
    gender: '[data-gender]',
    // age: function( itemElem ) {
    //   var weight = $( itemElem ).attr('[data-age]');
    //   return parseInt( weight );
    // }
  }
});



var genderArray = ["F","M"];
var nameArray = [];
var tenureArray = [];
var ageArray = [];

var genderColors = ["#e5f5f9","#99d8c9"];
var nameColors = ['#001969', '#10226e', '#1c2b74', '#253379', '#2d3c7f', '#344584', '#3b4e8a', '#41588f', '#486195', '#4e6b9a', '#5474a0', '#5a7ea6', '#6088ab', '#6792b1', '#6d9cb7', '#73a6bd', '#7ab0c2', '#80bac8', '#88c4ce', '#8fcfd4', '#98d9da', '#aee0e2'];
var ageColors = ['#001969', '#192872', '#29387c', '#364786', '#41588f', '#4c6899', '#5779a3', '#628aad', '#6d9cb7', '#78adc1', '#84bfcb', '#91d1d6', '#aee0e2'];
var tenureColors = ['#001969', '#162671', '#253379', '#304181', '#3b4e8a', '#455c92', '#4e6b9a', '#5779a3', '#6088ab', '#6a97b4', '#73a6bd', '#7db5c5', '#88c4ce', '#93d4d7', '#aee0e2'];

$.each(data, function(index, element) {
    var member_age = element.Age;
    // member_age = member_age.toString();

    var member_tenure = element.Tenure_noper;
    // member_tenure = member_tenure.toString();


    ( nameArray.includes(element.NameLast) ) ? "" : nameArray.push(element.NameLast);
    ( tenureArray.includes(member_tenure) ) ? "" : tenureArray.push(member_tenure);
    ( ageArray.includes(member_age) ) ? "" : ageArray.push(member_age);
});

function sorter(a, b) {
  if (a < b) return -1;  // any negative number works
  if (a > b) return 1;   // any positive number works
  return 0; // equal values MUST yield zero
}

nameArray.sort();
genderArray.sort();
tenureArray.sort(sorter);
ageArray.sort(sorter);
tenureArray = tenureArray.map(String);
ageArray = ageArray.map(String);

function assignColors(colorArray, classArray) {
  console.log("i run");
  for (i = 0; i < colorArray.length; i++) {
    $('#card-holder').find(".C" + classArray[i] ).css("background",colorArray[i]);
    console.log(".C" + classArray[i]);
    console.log(colorArray[i]);
  }
}




assignColors(nameColors, nameArray);

// bind sort button click
$('#sorts').on( 'click', 'button', function() {
  var sortByValue = $(this).attr('data-sort-by');
  var array = sortByValue + "Array";
  var colors = sortByValue + "Colors";
  $grid.isotope({ sortBy: sortByValue });

  console.log(colors + " " + array );

  assignColors(eval(colors), eval(array));
});

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});
