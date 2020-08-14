targetList = document.getElementById('mw-content-text')
nextTarget = document.getElementById('toc');
const mycanvas = document.createElement('canvas');
this.targetList.insertBefore(mycanvas, nextTarget);
mycanvas.setAttribute('id', 'dynamicGraph');
mycanvas.style.width = "600px"
mycanvas.style.height = "250px"
let ctx = document.getElementById('dynamicGraph').getContext('2d');

window.onload = function () {
    let dataPoints = [];
    let chart;
    let label = []; 
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json", function (data) {
        $.each(data, function (key, value) {
            dataPoints.push({ x: value[0], y: parseInt(value[1]) });
            label.push(value[0])
        });
        chart = new Chart(ctx, {
            type: 'line',

            // The data for our dataset
            data: {
                labels: label,
                datasets: [{
                    label: 'Dynamic Graph',
                    borderColor: '#92A8D1',
                    backgroundColor:'#92A8D1',
                    tension: 0,
                    fill: false,
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
            chart.update();
            setTimeout(function () { updateChart() }, 1000);
        });
    }
}





