function generateTable(id, data, options) {
  const cfg = {};
  console.log(data);
  const rowHeaders = data.map((el) => {
    return el.title;
  });

  var sortAscending = true;
  const table = d3.select(id).append("table");
  var titles = d3.values(rowHeaders);
  var headers = table
    .append("thead")
    .append("tr")
    .selectAll("th")
    .data(titles)
    .enter()
    .append("th")
    .text(function (d) {
      return d;
    })
    .on("click", function (d) {
      headers.attr("class", "header");

      if (sortAscending) {
        rows.sort(function (a, b) {
          return b[d] < a[d];
        });
        sortAscending = false;
        this.className = "aes";
      } else {
        rows.sort(function (a, b) {
          return b[d] > a[d];
        });
        sortAscending = true;
        this.className = "des";
      }
    });

  var rows = table
    .append("tbody")
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr");

  rows
    .selectAll("td")
    .data(function (d) {
      return titles.map(k => {
        return { value: d.description, name: d.title };
      });
    })
    .enter()
    .append("td")
    .attr("data-th", function (d) {
      return d.name;
    })
    .text(function (d) {
      return d.value;
    });
}
