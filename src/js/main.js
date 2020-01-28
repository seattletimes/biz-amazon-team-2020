var $ = require('jquery');
var jQueryBridget = require('jquery-bridget');
var Isotope = require('isotope-layout');
require("component-responsive-frame/child");
var data = require('../../data/steam.sheet.json');

jQueryBridget( 'isotope', Isotope, $ );

var genderArray = ["F","M"];
var nameArray = [];
var tenureArray = ["0-4","5-9","10-14","15-19","20-24","25-29"];
var ageArray = ["na","40-44","45-49","50-54","55-59","60-64"];


var genderColors = ["#c7e9c0","#006d2c"];
var nameColors = ['#001969', '#10226e', '#1c2b74', '#253379', '#2d3c7f', '#344584', '#3b4e8a', '#41588f', '#486195', '#4e6b9a', '#5474a0', '#5a7ea6', '#6088ab', '#6792b1', '#6d9cb7', '#73a6bd', '#7ab0c2', '#80bac8', '#88c4ce', '#8fcfd4', '#98d9da', '#aee0e2'];
var ageColors = ['#fdd0a2', '#fdae6b', '#fd8d3c', '#e6550d', '#a63603','#aaa'];
var tenureColors = ['#bbb3d2', '#9c8dba', '#7e68a2', '#5f458b', '#402473', '#1b005c'];

var myObj = {
  "name": nameArray,
  "tenure": tenureArray,
  "age": ageArray,
  "gender": genderArray,
  "nameC": nameColors,
  "tenureC": tenureColors,
  "ageC": ageColors,
  "genderC": genderColors
};

$('.key').each(function(i, obj) {
    var number = $(this).find('div.block').length;
    var corr_colors = $( this ).attr('data-color-by');
    corr_colors = myObj[corr_colors];

    for ( var x = 0; x < number; x++) {
        $(this).find( '.keyItem:nth-child(' + (x + 2) + ')' ).find('.block').css("background-color", corr_colors[x] );
      }
});



var $grid = $('#card-holder').isotope({
  itemSelector: '.card',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.last',
    age: '[data-age]',
    tenure: '.bar parseInt',
    gender: '[data-gender]'
  }
});

var cardWidth = $('.card').width();
console.log(cardWidth);

$.each(data, function(index, element) {
    var member_age = element.Age;
    var member_ten = element.Tenure;
    console.log(member_ten);
    var percentage = (member_age / 62)*100;
    var percentageTen = (member_ten / 25.5)*100;
    console.log(percentageTen);

    var member_tenure = element.Tenure_noper;
    ( nameArray.includes(element.NameLast) ) ? "" : nameArray.push(element.NameLast);



    // $('#card-holder').find(`.C${ element.NameLast}`).find('.ageBar .bar').css('width',`${percentage}%`);

    $('#card-holder').find(`.C${ element.NameLast}`).find('.tenureBar .bar').css('width',`${percentageTen}%`);
});


nameArray.sort();
genderArray.sort();
// tenureArray.sort();
ageArray.sort();


function assignColors(colorArray, classArray) {
  for (i = 0; i < colorArray.length; i++) {
    $('#card-holder').find(".C" + classArray[i] ).find('.color-bar').css("background",colorArray[i]);
  }
}

assignColors(nameColors, nameArray);

// bind sort button click
$('#sorts').on( 'click', 'button', function() {
  var sortByValue = $(this).attr('data-sort-by');
  var colorByValue = $(this).attr('data-color-by');


  assignColors( myObj[colorByValue], myObj[sortByValue] );

  if ($(this).hasClass('active')) {

    if ($(this).hasClass('asc')) {
      $grid.isotope({ sortBy: sortByValue, sortAscending : false });

      $(this).removeClass('asc');
      $(this).addClass('desc');
      $(this).find('.up').hide();
      $(this).find('.down').show();

    } else if ($(this).hasClass('desc')) {
      $grid.isotope({ sortBy: sortByValue, sortAscending : true });

      $(this).removeClass('desc');
      $(this).addClass('asc');
      $(this).find('.down').hide();
      $(this).find('.up').show();
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
    $('.button .up').hide();
    $('.button .down').hide();

    $(this).addClass('active');
    $grid.isotope({ sortBy: sortByValue, sortAscending : true });

    $(this).removeClass('desc');
    $(this).addClass('asc');
    $(this).find('.down').hide();
    $(this).find('.up').show();
  }
});

$('#sorts .button:nth-child(1)').find('.up').show();
