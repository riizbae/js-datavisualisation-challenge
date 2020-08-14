class Charts {
    constructor(targetList, nextTarget, id, typeOfChar, numberOfCountryByDefault) {

        this.id = id;
        this.targetList = document.getElementById(targetList)
        this.nextTarget = document.getElementById(nextTarget);
        const mycanvas = document.createElement('canvas');
        this.targetList.insertBefore(mycanvas, this.nextTarget);
        mycanvas.setAttribute('id', this.id);
        mycanvas.style.width = "600px"
        mycanvas.style.height = "450px"

        let data = table_to_array(nextTarget);
        let year = [];
        let country = [];
        let ctx = document.getElementById(this.id).getContext('2d');

        getYear();
        getCountry();


        let chart = new Chart(ctx, {

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

            type: typeOfChar,
            data: {
                labels: year,
                datasets: generateData(),
            }

        });

        function handleClick() {

            for (let i = numberOfCountryByDefault; i < chart.data.datasets.length; i++) {
                chart.data.datasets[i].hidden = !chart.data.datasets[i].hidden
            }

            chart.update();
        }

        function table_to_array(table1) {
            let myData = document.getElementById(table1).rows
            let my_array = []
            for (let i = 0; i < myData.length; i++) {
                let el = myData[i].children
                let my_el = []
                for (let j = 0; j < el.length; j++) {
                    my_el.push(el[j].innerText);
                }
                my_array.push(my_el);
            }
            return my_array;
        }

        function getYear() {
            if (id === 'chartByCrimes') {
                for (let i = 0; i < data[1].length; i++) {
                    year.push(data[1][i]);
                }
                year.splice(0, 2);
            } else {
                for (let i = 0; i < data[1].length; i++) {
                    year.push(data[0][i]);
                }
                year.splice(0, 2);
            }

        }

        function getCountry() {
            data.forEach(element => {
                country.push(element[1]);
            })
            country.splice(0, 2);

        }

        function getCrimesByCountry(country) {
            let crimesByCountry = [];
            data.forEach(element => {
                if (element.includes(country)) {
                    for (let i = 0; i < element.length; i++) {
                        element[i] = element[i].replace(/,/g, '.')
                        crimesByCountry.push(element[i]);

                    }
                }
            })
            crimesByCountry.splice(0, 2)
            return crimesByCountry;
        }

        function generateData() {
            let dataGenerated = [];
            for (let i = 0; i < country.length; i++) {

                let dataToGenerate = { label: country[i], borderColor: getRandomBorderColor(), backgroundColor: getRandomBackgroundColor(), data: getCrimesByCountry(country[i]) };
                dataGenerated.push(dataToGenerate);

            }

            return dataGenerated;
        }

        function getRandomBorderColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function getRandomBackgroundColor() {
            if (id === 'chartByHomicides') {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
            }
            return color;
        }

        handleClick();

   

    }
}



let chartByCrimes = new Charts('mw-content-text', 'table1', 'chartByCrimes', 'line', 4);
let chartHomicides = new Charts('mw-content-text', 'table2', 'chartByHomicides', 'bar', 3);







