// seatBars(input, dropdown) - draws bar chart + tooltips on hover
// GENERAL UPDATE PATTERN USING MERGE
// input (String) - dropdown selectTag input change
// dropdown (String) - mousemove co-ordinates from eventListener
function seatBars(input, dropdown) {
  // confirming correct input
  console.log('key: ' + input + '\ntext: ' + dropdown)

  // setting up our barplot scale                   
  const max = d3.max(sortedData, d => { return d[input] })
  const upperLimit = max * 1.15

  const barScale = d3.scaleLinear()
   .domain([0, upperLimit]) 
   .range([0, 720])

  // axis styling
  const xAxis = d3.axisTop(barScale)

  //Creating x-axis by calling it
  xAxisGroup.call(xAxis)
	
  // sigdig formatting for measurements
  // https://github.com/d3/d3-format
  const round = d3.format('<.3r')
  
  // GENERAL UPDATE PATTERN PORTION OF FUNCTION ======================
  // selecting + defining parent group
  const seats = svgChart
    .selectAll('g.seat')
    .data(sortedData, d => { return d.seat });

  // entering + updating seats (parent group)
  const enterSeats = seats
    .enter()
    .append('g');

  // storing updated seats in variable to access
  const seatsMerged = enterSeats.merge(seats);

  seatsMerged
    .attr('class', 'seat')
    .attr('transform', (d,i) => { return `translate(40, ${ (i * 36) + 48})` });

  enterSeats
    .append('text')
      .attr('class', 'seatNumber')
      .attr('x', 0)
      .attr('y', 16)
    .text(d => d.seat);

  // entering + updating bars (child rect of parent group)
  const bars = seats.select('rect.bar');

  enterSeats
    .append('rect')
      .attr('class', 'bar')
      .attr('height', 28)
      .attr('width', 0)
      .attr('fill', '#ff0000')
    .merge(bars)
      .transition(d3.easeCubic)
      .duration(1000)
      .attr('width', d => { return barScale(d[input]) });
  
  // entering + updating measurements (child text of parent group)
  const measurements = seats.select('text.measurement');

  enterSeats 
    .append('text')
      .attr('class', 'measurement')
      .attr('y', 14)
    .merge(measurements)
      .attr('x', d => { return barScale(d[input]) * 0.9 - 24 })
      .text(d => { return round(d[input]) });

  // entering + updating tooltips (child group of parent group)
  const tooltip = seats.select('g.tooltip');

  const enterTooltip = enterSeats
    .append('g')
      .attr('class', 'tooltip');
  
  const tooltipMerged = enterTooltip.merge(tooltip);

  // entering + updating tooltip background (child rect of child group)
  // const tooltipBG = tooltip.select('rect.tooltip');

  enterTooltip
    .append('rect')
      .attr('class', 'tooltip')
      .attr('height', '80')
      .attr('fill', '#eeeeee')
      .attr('width', '132');
  
  // entering + updating tooltip text (child element of child group)
  const tooltipText = tooltip.select('text.tooltip');

  enterTooltip
    .append('text')
      .attr('class', 'tooltip')
      .attr('x', '4')
      .attr('y', '12')
    .merge(tooltipText)
      .text(d => { return `${dropdown}: ` + round(d[input]) })

  enterTooltip 
    .append('text')
      .attr('class', 'tooltip')
      .attr('x', '4')
      .attr('y', '24')
    .text(d => { return 'Seat number: ' + d.seat })
  
  enterTooltip
    .append('text')
      .attr('class', 'tooltip')
      .attr('x', '4')
      .attr('y', '36')
    .text(d => { return 'Average rpm: ' + d.average_rpm })

  enterTooltip
    .append('text')
      .attr('class', 'tooltip')
      .attr('x', '4')
      .attr('y', '48')
    .text(d => { return 'Max rpm: ' + d.max_rpm })

  enterTooltip 
    .append('text')
      .attr('class', 'tooltip')
      .attr('x', '4')
      .attr('y', '60')
    .text(d => { return 'Average torque: ' + d.average_torque })

  enterTooltip 
    .append('text')
      .attr('class', 'tooltip')
      .attr('x', '4')
      .attr('y', '72')
    .text(d => { return 'Max torque: ' + d.max_torque })
    
    // NOTE: POSITION NEEDED TO BE APPLIED TO THE MERGED SEATS AND TOOLTIPS; NEEDED TO COMBINE BOTH INTO SINGLE VARIABLE TO CALL.
    // IMPORTANT: d3.pointer() needs an event object as variable input to read position. Implicit d3.pointer(this) RETURNS UNDEFINED.`
    seatsMerged
      .on('mousemove', function(e) {
        const position = d3.pointer(e)

        const mouseX = position[0] + 8
        const mouseY = position[1] - 56
        
        tooltipMerged
          .attr('transform', `translate(${mouseX}, ${mouseY})`)
        
      });
}
