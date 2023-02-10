Objective:

To build an interactive dashboard to explore the "Belly Button Biodiversity" dataset, which catalogs the microbes that colonize human navels.

Steps taken:<br>
- Use the D3 library to read in the json data set from URL: https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json<br>
- Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual:<br>
        -use "sample_values" as the values for the bar chart<br>
        -use "otu_ids" as the labels for the bar chart<br>
        -use "otu_lables" as the hovertext for the chart<br>
Expected output:<br>
![image](https://user-images.githubusercontent.com/116039323/217035395-f93afa74-7dbe-4288-9580-a7a948acae56.png)<br><br>

-Create a bubble chart that displays each sample:<br>
        -use "otu_ids" for the x values<br>
        -use "sample_values" for the y values<br>
        -use "sample_values" for the marker size<br>
        -use "otu_ids" for the marker colours<br>
        -use "otu_lables" for the text values<br>
Expected output:<br>
![image](https://user-images.githubusercontent.com/116039323/217035939-cf085c16-e636-43ba-9974-11673b03efc8.png)<br><br>

-Within the dashboard, ensure that the sample metadata is displayed with the individual's demographic information. This will display each key-value pair from the JSON metadata<br>
Expected output:<br>
![image](https://user-images.githubusercontent.com/116039323/217036424-d6da363e-9aba-4544-a0f7-bdab45e3325a.png)<br><br>

-Update all the plots when a new sample is selected. Any layout for the dashboard is acceptable but below is an example:<br>
![image](https://user-images.githubusercontent.com/116039323/217036662-52b0da49-0020-4872-b143-aed2d62c6dcc.png)<br><br>

-Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file

