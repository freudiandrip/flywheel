//-----------------------------------------------------------------------
// D3 Script for spin cycle leaderboard rankings
// SuperHi Unit 4 coursework - Jan 2023
//-----------------------------------------------------------------------
// selecting the dropdown, selected option value + text field (corresponding data.js key)
const selectTag = document.querySelector('select.rank')
var selectKey = selectTag.value
var selectText = selectTag.options[selectTag.selectedIndex].text


// D3 PORTION ---------------------------------------------------
// sorting our raw data by ascending seat #
// https://observablehq.com/@d3/d3-ascending
const sortedData = data.slice().sort((a,b) => d3.ascending(a.seat, b.seat))

// setting up SVG selection + dimensions
const svgChart = d3.select('svg.chart')
svgChart.attr("viewBox", `0 0 820 ${ data.length * 32 + 32 }`)

const svgAxis = d3.select('svg.axis')
  svgAxis.attr('viewBox', '0 0 820 56')

// setting up axis group to append
const xAxisGroup = svgAxis
  .append('g')
  .attr('class', 'xAxis')
  .attr('transform', 'translate(40, 48)')



// the meat of the script
function seatBars(input, dropdown) {






}





// 1. calling our function on pageload
// seatBars(selectKey, selectText)

// 2. running seatBars function on new dropdown input selected
// selectTag.addEventListener('input', event => { 
//   // updating the dropdown value input
//   selectKey = selectTag.value
//   selectText = selectTag.options[selectTag.selectedIndex].text

//   // running function with updated input
//   seatBars(selectKey, selectText) })


