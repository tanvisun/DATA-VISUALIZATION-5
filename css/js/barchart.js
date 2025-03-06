// Create the bar chart function
function createBarChart(data) {
    // Set the dimensions for the chart
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create the SVG element
    const svg = d3.select("#chart-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set the x scale for the grouped bars (for both countries within each year)
    const x0 = d3.scaleBand()
        .domain([2015, 2016, 2017, 2018, 2019, 2020, 2021]) // One group per year
        .range([0, width])
        .padding(0.1);

    const x1 = d3.scaleBand()
        .domain(["United States", "India"]) // Two bars per year (for each country)
        .rangeRound([0, x0.bandwidth()])
        .padding(0.05);

    // Set the y scale for the population values
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.population)])
        .nice()
        .range([height, 0]);

    // Append the X-axis (for years)
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));

    // Append the Y-axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Create the bars for each country
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x0(d.year) + x1(d.country)) // Position based on year and country
        .attr("y", d => y(d.population))
        .attr("width", x1.bandwidth()) // Width for each country's bar within a year
        .attr("height", d => height - y(d.population))
        .attr("fill", d => d.country === "United States" ? "blue" : "pink");

    // Add labels to the bars
    svg.selectAll(".text")
        .data(data)
        .enter().append("text")
        .attr("x", d => x0(d.year) + x1(d.country) + x1.bandwidth() / 2) // Position label in the middle of the bar
        .attr("y", d => y(d.population) - 5)
        .attr("text-anchor", "middle")
        .text(d => d.population.toLocaleString())
        .style("font-size", "10px");

    // Add a legend
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width - 100) + ", 0)");

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", "blue");

    legend.append("text")
        .attr("x", 25)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text("United States");

    legend.append("rect")
        .attr("y", 20)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", "pink");

    legend.append("text")
        .attr("x", 25)
        .attr("y", 29)
        .attr("dy", ".35em")
        .text("India");
}
