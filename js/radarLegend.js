/**
 * Render legend titles
 *
 * @see http://bl.ocks.org/nbremer/6506614
 *
 * @param {string} id div element
 * @param {array} titles legend titles
 * @param {int} width
 * @param {int} height
 * @param {obj} colours d3 colour object
 */
function renderChartLegends(id, titles, width, height, colours) {
  const legendContainer = d3
    .select(id)
    .selectAll("svg")
    .append("svg")
    .attr("id", "radar-legend")
    .attr("width", width + 300)
    .attr("height", height);

  // Initiate Legend
  const legend = legendContainer
    .append("g")
    .attr("class", "legend")
    .attr("height", 100)
    .attr("width", 200)
    .attr("transform", "translate(90,20)");

  // Create colour squares
  legend
    .selectAll("rect")
    .data(titles)
    .enter()
    .append("rect")
    .attr("x", width - 65)
    .attr("y", (d, i) => i * 20)
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", (d, i) => colours(i));

  // Create text next to squares
  legend
    .selectAll("text")
    .data(titles)
    .enter()
    .append("text")
    .attr("x", width - 50)
    .attr("y", (d, i) => i * 20 + 9)
    .attr("font-size", "18px")
    .attr("fill", "#737373")
    .attr("class", "capitalize")
    .text((d) => d);
}
