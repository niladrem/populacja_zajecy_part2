var headers = [];
var linedata = [];

function drawChart(){
    dataChart = Highcharts.chart('container',{
        /*chart: {
            type: 'line'
        },*/
		title: {
            text: 'Wizualizacja danych cz. 1' 
        },
		xAxis: {
			categories: headers
		},
/*		plotOptions: {
			line: {
				dataLabels: {
                    enabled: true
                }
            },
		},*/
		tooltip: {
			shared: true,
		    crosshairs: true
        },
        legend: {
            layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
			borderWidth: 0
        },
		series: linedata
	});
}

function processData(allText){
    var record_num = 501;
    var allTextLines = allText.split(/\r\n|\n/);
    headers.length = 0;
    linedata.length = 0;
    for(var i = 1; i <= 500; i++){
        headers.push(i);
    }
    var start = 0;
    for(var i = start; i < 100; i++){
        var row = allTextLines[i].split(',');
        for(var j = 0; j < record_num; j++){
            if(j == 0){
                var pom = {name: row[0], data: []}
                linedata.push(pom);
            }
            else{
                linedata[i - start].data.push(parseFloat(row[j]));
            }
        }
    }
    console.log(linedata);
    
    drawChart();
}

$(document).ready(function() {
    console.log("IDE PO DANE");
    $.ajax({
        type: "GET",
        url: "cz1_2.csv",
        dataType: "text",
        success: function(data) {
            console.log("PRZYNIOSLEM DANE");

            processData(data);}
     });
     
});
