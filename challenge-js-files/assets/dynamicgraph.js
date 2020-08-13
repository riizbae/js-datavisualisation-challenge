targetList = document.getElementById('mw-content-text')
nextTarget = document.getElementById('toc');
const mycanvas = document.createElement('canvas');
this.targetList.insertBefore(mycanvas, nextTarget);
mycanvas.setAttribute('id', 'dynamicGraph');
mycanvas.style.width = "600px"
mycanvas.style.height = "600px"
let ctx = document.getElementById('dynamicGraph').getContext('2d');

window.onload = function () {
    var dataPoints = [];
    var chart;
    let label = ["1","2","3","4","5","6","7","8","9","10"]; 
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json", function (data) {
        $.each(data, function (key, value) {
            dataPoints.push({ x: value[0], y: parseInt(value[1]) });
        });
        chart = new Chart(ctx, {
            type: 'line',

            // The data for our dataset
            data: {
                labels: label,
                datasets: [{
                    label: 'Dynamic Graph',
                    borderColor: 'rgb(64,224,208)',
                    data: dataPoints
                }]
            },

        });
        chart.update();
        updateChart();
    });
    function updateChart() {
        $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json", function (data) {
            $.each(data, function (key, value) {
                dataPoints.push({
                    x: parseInt(value[0]),
                    y: parseInt(value[1])
                });
                label.push(value[0]);
            });
            console.log(dataPoints)
            chart.update();
            setTimeout(function () { updateChart() }, 1000);
        });
    }
}




