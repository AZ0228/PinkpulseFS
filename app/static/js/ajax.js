
function getData(){
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    let userinput = document.querySelector('select').value;
    console.log(userinput);
    fetch('/getdata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
          },
        body: JSON.stringify({
            input: userinput,
        })
    }) 
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const totalamount = document.getElementById('total-amount');
        const labels = ['county average', 'state average', 'national average'];
        const data1 = {
            labels: labels,
            datasets: [{
                data: [data.county_average, data.state_average, data.national_average],
                backgroundColor: [
                    '#7B5573',
                    '#CD9BC2',
                    '#CD9BC2',
                ],
                borderRadius: 10,
            }]
        };

        const chart = new Chart(totalamount, {
            type: 'bar',
            data: data1,
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks:{
                            font:{
                                size:11,
                                family:'Satoshi1',

                            }
                        }
                    }
                },
                plugins:{
                    legend:{
                        display:false
                    }
                }
            },
        });
    })
}