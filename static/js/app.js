
// Get the samples from biodiversity endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
//---------------------function build section---------------------------

//function to update charts when dropdown selection is made
function selectionMade(selectedSample) {
    //bring in the JSON data
    d3.json(url).then((data) => {

        //----------------data collection and organization----------------

        //create array to hold sample data from dataset
        let samples = data.samples;
        //create array that holds the rest of the data associated with the object selected by "id"
        let resultArray = samples.filter(sampleObj => sampleObj.id == selectedSample);
        //take the first selection and store in variable for further splitting
        let result = resultArray[0];

        //create variables and store data based on selectedSample for graphing
        var resSample_value = result.sample_values;
        var resOtu_id = result.otu_ids;
        var resOtu_label = result.otu_labels;

        //-----------------bar chart build------------------------------

        //Bar graph info and format requirements
        selectedBar = [{
            //set x axis to sample values. limit of 10, in descending order
            x: resSample_value.slice(0, 10).reverse(),
            //set y axis to OTU ids. limit of 10, in descending order
            y: resOtu_id.slice(0, 10).reverse().map(labelFormat),
            //format and set chart to bar
            orientation: "h",
            type: "bar",
            //set hover text to OTU label
            text: resOtu_label
        }];

        //Graph labeling requirements
        selectedBar_layout = {
            title: "Top 10 OTUs",
            showlegend: false,
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU ID" }
        };

        // Create the bar plot
        Plotly.newPlot("bar", selectedBar, selectedBar_layout);

        //-----------------bubble chart build------------------------------

        //Bubble graph info and format requirements
        selectedBubble = [{
            //set x to OTU ids
            x: resOtu_id,
            //set y values to sample values
            y: resSample_value,
            //format chart
            mode: 'markers',
            marker: {
                size: resSample_value,
                color: resOtu_id
            },
            text: resOtu_label
        }];

        // Create the layout for the Bubble plot
        selectedBubble_layout = {
            title: "Individual Samples",
            showlegend: false,
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Value" }
        };

        // Create the bubble plot
        Plotly.newPlot("bubble", selectedBubble, selectedBubble_layout);

        //-----------------demographic tables build------------------------------
        //find the data associated with the selection from dropdown and store for further processing
        let metaArray = data.metadata.filter(sampleObj => sampleObj.id == selectedSample);
        let metaResults = metaArray[0];

        //table data population
        d3.selectAll("li").remove()
        d3.select('#sample-metadata').append("li").text(`id: ${metaResults.id}`);
        d3.select('#sample-metadata').append("li").text(`ethnicity: ${metaResults.ethnicity}`);
        d3.select('#sample-metadata').append("li").text(`gender: ${metaResults.gender}`);
        d3.select('#sample-metadata').append("li").text(`age: ${metaResults.age}`);
        d3.select('#sample-metadata').append("li").text(`location: ${metaResults.location}`);
        d3.select('#sample-metadata').append("li").text(`bbtype: ${metaResults.bbtype}`);
        d3.select('#sample-metadata').append("li").text(`wfreq: ${metaResults.wfreq}`);

        //table formatting
        d3.selectAll("li").style("font", "20px");
        d3.selectAll("li").style("list-style-type", "none");
    });
}

//binarySearch to get the data based on selection made in the dropdown menu

let BinarySearch = (list, val) => {
    let left = 0;
    let right = list.length - 1;
    let mid = Math.floor((left + right) / 2);

    while (list[mid] !== val && left <= right) {
        if (val < list[mid]) {
            right = mid - 1
        } else {
            left = mid + 1
        }
        mid = Math.floor((left + right) / 2);
    }
    if (list[mid] === val) {
        return mid;
    } else {
        return -1
    }

};

//function dropDownOptions to populate the dropdown menu
function dropDownOptions() {

    //pull in data
    d3.json(url).then((data) => {
        //use d3 library to select and link the dropdown menu in the html file
        let dropdown = d3.select("#selDataset");
        // create an array of all the names
        let names = data.names;
        // for loop thought the names to add to the dropdown
        for (var i = 0; i < names.length; i++) {
            dropdown.append("option").text(names[i]).property("value", names[i]);
        };
    });
}

//create functions to format yaxis of bar chart
function labelFormat(numb) {
    return 'OTU ' + numb;
}

//call dropdown menu function to populate dropdownmenu
dropDownOptions()

d3.json(url).then(function (data) {

    // Create variables for all the metadata
    var meta_id = data.metadata[0].id;
    var meta_ethnicity = data.metadata[0].ethnicity;
    var meta_gender = data.metadata[0].gender;
    var meta_age = data.metadata[0].age;
    var meta_location = data.metadata[0].location;
    var meta_bbtype = data.metadata[0].bbtype;
    var meta_wfreq = data.metadata[0].wfreq;

    demographic_obj = {
        'id': meta_id,
        'ethnicity': meta_ethnicity,
        'gender': meta_gender,
        'age': meta_age,
        'location': meta_location,
        'bbtype': meta_bbtype,
        'wfreq': meta_wfreq
    };

    // Create the list "li" to appear in the Demographic Info
    d3.select('#sample-metadata').append("li").text(`id: ${meta_id}`);
    d3.select('#sample-metadata').append("li").text(`ethnicity: ${meta_ethnicity}`);
    d3.select('#sample-metadata').append("li").text(`gender: ${meta_gender}`);
    d3.select('#sample-metadata').append("li").text(`age: ${meta_age}`);
    d3.select('#sample-metadata').append("li").text(`location: ${meta_location}`);
    d3.select('#sample-metadata').append("li").text(`bbtype: ${meta_bbtype}`);
    d3.select('#sample-metadata').append("li").text(`wfreq: ${meta_wfreq}`);
    // Select all list items, then change their font color
    d3.selectAll("li").style("font", "20px");
    d3.selectAll("li").style("list-style-type", "none");


    // Fetch and create values for samplevalues otuid and labels
    var sample_value = data.samples[0].sample_values;
    var otu_id = data.samples[0].otu_ids;
    var otu_label = data.samples[0].otu_labels;


    function init() {
        plotData1 = [{
            x: sample_value.slice(0, 10).reverse(),
            y: otu_id.slice(0, 10).reverse().map(labelFormat),
            orientation: "h",
            type: "bar",
            text: otu_label
        }];
        // Create the layout for the barplot
        bar_layout = {
            title: "Top 10 OTUs",
            showlegend: false,
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU ID" }
        };

        // Create the bar plot
        Plotly.newPlot("bar", plotData1, bar_layout);

        // Create the trace for the Bubble plot
        plotData2 = [{
            x: otu_id,
            y: sample_value,
            mode: 'markers',
            marker: {
                size: sample_value,
                color: otu_id
            },
            text: otu_label
        }];

        // Create the layout for the Bubble plot
        bubble_layout = {
            title: "Individual Samples",
            showlegend: false,
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Value" }
        };
        // Create the Plot
        Plotly.newPlot("bubble", plotData2, bubble_layout);
    }

    // Fuction called by DOM changes
    function getData() {
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a let
        let dataset = dropdownMenu.property("value");
        console.log(dataset)
        // Initailize an empty array for the country's data

        let names = data.names;
        console.log(names)
        numb = BinarySearch(names, '1601')
        console.log(numb)

        let data = [];

        var meta_id = data.metadata[numb].id;
        var meta_ethnicity = data.metadata[numb].ethnicity;
        var meta_gender = data.metadata[numb].gender;
        var meta_age = data.metadata[numb].age;
        var meta_location = data.metadata[numb].location;
        var meta_bbtype = data.metadata[numb].bbtype;
        var meta_wfreq = data.metadata[numb].wfreq;
    }

    init();

});