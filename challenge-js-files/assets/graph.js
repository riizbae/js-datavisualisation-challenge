function addChart() {

    const targetList = document.getElementById('mw-content-text')
    const nextTarget = document.getElementById('table1');
    const mycanvas = document.createElement('canvas');
    targetList.insertBefore(mycanvas, nextTarget);
    mycanvas.setAttribute("id", "myChart");
    mycanvas.style.width = "600px"
    mycanvas.style.height = "600px"


    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        // The type of chart we want to create


        // The data for our dataset
        // data: {
        //     labels: year,
        //     datasets: [{
        //         label: 'Belgique',
        //         borderColor: 'rgb(255, 99, 132)',
        //         data: [0, 10, 5, 2, 20, 30, 45, 30]
        //     }, {
        //         label: 'Hongrie',
        //         borderColor: 'green',
        //         data: [0, 15, 5, 2, 20, 30, 45,10]
        //     }]
        // },
        type: 'line',
        data: {
            labels: year,
            datasets: [{
                label: country[0],
                borderColor: 'red',
                data: Math.round(getCrimesByCountry([country]))
            }]
        }

        // Configuration options go here
    });

}

document.body.onload = addChart;

let data = table_to_array('table1');
let year = [];
let country = [];

function table_to_array(table1) {
    myData = document.getElementById(table1).rows
    my_array = []
    for (let i = 0; i < myData.length; i++) {
        el = myData[i].children
        my_el = []
        for (let j = 0; j < el.length; j++) {
            my_el.push(el[j].innerText);
        }
        my_array.push(my_el);
    }
    return my_array;
}

function getYear() {
    for (let i = 0; i < data[1].length; i++) {
        year.push(data[1][i]);
    }
}

function getCountry() {
    data.forEach(element => {
        country.push(element[1]);
    })
}

function getCrimesByCountry(country) {
    let crimesByCountry = [];
    data.forEach(element => {
        if (element.includes(country)) {
            for (i = 0; i < element.length; i++) {
                crimesByCountry.push(element[i]);
            }
        }
    })
    crimesByCountry.splice(0, 2);
    return crimesByCountry;
}

getYear();
getCountry();
year.splice(0, 2);
country.splice(0, 2);


getCrimesByCountry(country[0]).forEach(element => {
    element = parseInt(element);
    Math.round(element);
    console.log(element)
})
console.log(year);
console.log(country);
console.log(data);

console.log(getCrimesByCountry(country[0]));


// creation function 

/*function count(){
    if ()

}*/

