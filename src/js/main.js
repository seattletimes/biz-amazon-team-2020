// var paywall = require("./lib/paywall");
var $ = require('jquery');
var jQueryBridget = require('jquery-bridget');
var Isotope = require('isotope-layout');
require("component-responsive-frame/child");
var data = require('../../data/steam.sheet.json');
// setTimeout(() => paywall(12345678), 5000);

jQueryBridget( 'isotope', Isotope, $ );

var genderArray = ["F","M"];
var nameArray = [];
var tenureArray = ["0-4","5-9","10-14","15-19","20-24","25-29"];
var ageArray = ["na","40-44","45-49","50-54","55-59","60-64"];


var genderColors = ["#e5f5f9","#99d8c9"];
var nameColors = ['#001969', '#10226e', '#1c2b74', '#253379', '#2d3c7f', '#344584', '#3b4e8a', '#41588f', '#486195', '#4e6b9a', '#5474a0', '#5a7ea6', '#6088ab', '#6792b1', '#6d9cb7', '#73a6bd', '#7ab0c2', '#80bac8', '#88c4ce', '#8fcfd4', '#98d9da', '#aee0e2'];
var ageColors = ['#fdd0a2', '#fdae6b', '#fd8d3c', '#e6550d', '#a63603','#aaa'];
var tenureColors = ['#f2f0f7','#dadaeb','#bcbddc', '#9e9ac8', '#756bb1', '#54278f'];

$('.key').each(function(i, obj) {
    var number = $(this).find('div.block').length;
    var corr_colors = $( this ).attr('data-array');
    corr_colors = eval(corr_colors);
    // var thisColor = corr_colors[i];
    console.log(corr_colors);


    for ( var x = 0; x < number; x++) {
        // console.log( number + "  "  );
        $(this).find( 'div:nth-child(' + (x + 1) + ')' ).find('.block').css("background-color", corr_colors[x] );
        // $(eachBlock).append("yay" + x);
        console.log(this);
      }
});



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



$.each(data, function(index, element) {
    var member_age = element.Age;
    // member_age = member_age.toString();

    var member_tenure = element.Tenure_noper;
    // member_tenure = member_tenure.toString();


    ( nameArray.includes(element.NameLast) ) ? "" : nameArray.push(element.NameLast);
    // ( tenureArray.includes(member_tenure) ) ? "" : tenureArray.push(member_tenure);
    // ( ageArray.includes(member_age) ) ? "" : ageArray.push(member_age);
});

// function sorter(a, b) {
//   if (a < b) return -1;  // any negative number works
//   if (a > b) return 1;   // any positive number works
//   return 0; // equal values MUST yield zero
// }

nameArray.sort();
genderArray.sort();
// tenureArray.sort();
ageArray.sort();
// tenureArray.sort(sorter);
// ageArray.sort(sorter);
// tenureArray = tenureArray.map(String);
// ageArray = ageArray.map(String);

function assignColors(colorArray, classArray) {

  for (i = 0; i < colorArray.length; i++) {

    // if ( (colorArray == tenureColors) || (colorArray == ageColors)){
    // } else { }
    $('#card-holder').find(".C" + classArray[i] ).find('.color-bar').css("background",colorArray[i]);
    // console.log(".C" + classArray[i]);
    // console.log(colorArray[i]);
  }
}




assignColors(nameColors, nameArray);

var sortByValue = "";

// bind sort button click
$('#sorts').on( 'click', 'button', function() {
  sortByValue = $(this).attr('data-sort-by');

  var array = sortByValue + "Array";
  var colors = sortByValue + "Colors";




  assignColors( eval(colors), eval(array) );

  if ($(this).hasClass('active')) {

    if ($(this).hasClass('asc')) {
      $grid.isotope({ sortBy: sortByValue, sortAscending : false });

      $(this).removeClass('asc');
      $(this).addClass('desc');
      $(this).find('.fa-caret-up').hide();
      $(this).find('.fa-caret-down').show();

    } else if ($(this).hasClass('desc')) {
      $grid.isotope({ sortBy: sortByValue, sortAscending : true });

      $(this).removeClass('desc');
      $(this).addClass('asc');
      $(this).find('.fa-caret-down').hide();
      $(this).find('.fa-caret-up').show();
    } else {}

  } else {
    // display associated Key
    $('.key').hide();
    var keyID = $(this).attr('id');
    keyID = keyID + "-key";
    $('#keys').find('.' + keyID).show();





    $('.button').removeClass('active');
    $('.button').removeClass('asc');
    $('.button').removeClass('desc');
    $('.button i').hide();

    $(this).addClass('active');
    $grid.isotope({ sortBy: sortByValue, sortAscending : true });

    $(this).removeClass('desc');
    $(this).addClass('asc');
    $(this).find('.fa-caret-down').hide();
    $(this).find('.fa-caret-up').show();
  }



});

$('#sorts .button:nth-child(1)').find('.fa-caret-up').show();
// $('#keys .name-key').show();

// change is-checked class on buttons
// $('.button-group').each( function( i, buttonGroup ) {
//   var $buttonGroup = $( buttonGroup );
//   $buttonGroup.on( 'click', 'button', function() {
//     $buttonGroup.find('.is-checked').removeClass('is-checked');
//     $( this ).addClass('is-checked');
//   });
// });

// var myObj = {
//   "button1": results1,
//   "button2": results2,
// };
