d3.csv("data/twocountries.csv").then(function(data) {
    // Filter the data for Population, total and only for India and the US
    const filteredData = data.filter(d => 
        (d['Series Name'] === "Population, total") && 
        (d['Country Name'] === "United States" || d['Country Name'] === "India")
    );

    // Reshape the data into an array of objects for easier plotting
    populationData = [];  // Assign the global variable

    filteredData.forEach(d => {
        // For each country, create a data object with Year and Population values
        for (let year = 2015; year <= 2021; year++) {
            populationData.push({
                country: d['Country Name'],
                year: year,
                population: +d[`${year} [YR${year}]`]
            });
        }
    });

    // Log the reshaped data to check it
    console.log("Population Data:", populationData);

    // Call the function to create the bar chart
    createBarChart(populationData);
});
