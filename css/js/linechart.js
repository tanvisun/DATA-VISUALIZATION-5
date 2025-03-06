// Add interactivity: year range filter
d3.select("#yearSelect").on("change", function(event) {
    const selectedRange = event.target.value;
    let yearsToDisplay;

    if (selectedRange === "2015-2021") {
        yearsToDisplay = [2015, 2016, 2017, 2018, 2019, 2020, 2021];
    } else if (selectedRange === "2015-2018") {
        yearsToDisplay = [2015, 2016, 2017, 2018];
    } else {
        yearsToDisplay = [2019, 2020, 2021];
    }

    const filteredData = populationData.filter(d => yearsToDisplay.includes(d.year));

    // Remove the previous chart
    d3.select("svg").remove();

    // Recreate the chart with the filtered data
    createBarChart(filteredData);
});
