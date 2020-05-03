/***********************************************/
function optionChanged(newSample) {
    console.log(`Entering ${arguments.callee.name} [ ${newSample}]`)
    // Fetch new data each time a new sample is selected
    createBarchart(newSample)
    createBubbleChart(newSample);
    buildMetadata(newSample);
}
/***********************************************/
function buildMetadata(sample) {
    // write code to create the buildMetadata
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var arrayResult = metadata.filter(object => object.id == sample);
        var result = arrayResult[0];
        var selectedmeta = d3.select("#sample-metadata");
        selectedmeta.html("");
        Object.entries(result).forEach(([key, value]) => {
            selectedmeta.append("h6").text(`${key},${value}`);

        });
    });
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    // bonus only
    // buildGauge()
}
/***********************************************/
function createBubbleChart(sample) {
    // write code to create the BubbleChart
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var arrayResult = samples.filter(object => object.id == sample);
        var result = arrayResult[0];
        var otuids = result.otu_ids;
        var values = result.sample_values;
        var otulabels = result.otu_labels;
        var layout = {
            title: "Bacteria Sample Chart"
        };
        var data = [{
            x: otuids,
            y: values,
            text: otulabels,
            mode: "markers",
            marker: {
                size: values,
                color: otuids,
                colorscale: "Earth"
            }
        }];
        Plotly.newPlot("bubble", data, layout);
    });
}

/***********************************************/
function createBarchart(sample) {
    // write code to create barchart
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var arrayResult = samples.filter(object => object.id == sample);
        var result = arrayResult[0];
        var otuids = result.otu_ids;
        var values = result.sample_values;
        var otulabels = result.otu_labels;
        var layout = {
            title: "Bacteria Bar Chart"};

        var y = otuids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
            var barData = [
                {
                    y: y,
                    x: values.slice(0, 10).reverse(),
                    text: otulabels.slice(0, 10).reverse(),
                    type: "bar",
                    orientation: "h",
                }
            ];

            Plotly.newPlot("bar", barData, layout);
        });

};


/***********************************************/
function fillDropDown() {
    // write code to pupulate the dropdown
    console.log(`Entering ${arguments.callee.name}`)
    var selectedId = d3.select("#selDataset")
    d3.json("samples.json").then((data) => {
        console.log(data);
        var sample_names = data.names;
        sample_names.forEach((sample) => {
            selectedId.append("option")
                .text(sample)
                .property("value", sample);

        });
        var firstsample = sample_names[0];
        buildMetadata(firstsample)
        createBubbleChart(firstsample)
        createBarchart(firstsample)
    });


}
/***********************************************/

fillDropDown()