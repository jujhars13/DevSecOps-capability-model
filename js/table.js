/**
 * Render an HTML table onto the page using D3.js
 * Could have rendered by hand but d3 give us some nice
 * abstractions
 *
 * @param {string} id document id you want to inject table into
 * @param {obj} headings array of headings
 * @param {obj} data the data you wish to render
 * @param {obj} options options
 */
function generateTable(id, headings, data, options) {
  const cfg = { sortAscending: true };

  const table = d3
    .select(id)
    .append("table")
    .attr("class", "table table-striped");

  // table headers
  const titles = Object.values(headings);
  const headers = table
    .append("thead")
    .attr("class", "thead-dark")
    .append("tr")
    .selectAll("th")
    .data(titles)
    .enter()
    .append("th")
    .text((d) => d)
    .on("click", function (d) {
      headers.attr("class", "header");

      if (cfg.sortAscending) {
        rows.sort(function (a, b) {
          return b[d] < a[d];
        });
        cfg.sortAscending = false;
        this.className = "aes";
      } else {
        rows.sort(function (a, b) {
          return b[d] > a[d];
        });
        cfg.sortAscending = true;
        this.className = "des";
      }
    });

  const rows = table
    .append("tbody")
    .attr("class", "")
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr");

  // add row data and hovering bootstrap tooltips
  rows
    .selectAll("td")
    .data((data) => {
      return titles.map((title) => {
        return {
          value: data[title].value,
          name: title,
          description: data[title].description,
        };
      });
    })
    .enter()
    .append("td")
    .attr("data-th", (d) => d.name)
    .attr("title", (d) => d.name)
    .attr("data-content", (d) => d.description)
    .attr("data-toggle", "popover")
    .text((d) => d.value);
}
