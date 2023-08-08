let totalAmountinArea;

function renderTotalAmount(totalAmounts){
    const totalamount = document.getElementById('total-amount');
    const labels = ['county average', 'state average', 'national average'];
    const data = {
        labels: labels,
        datasets: [{
            data: [totalAmounts["County Average"], totalAmounts["State Average"], totalAmounts["National Average"]],
            backgroundColor: [
                '#7B5573',
                '#CD9BC2',
                '#CD9BC2',
            ],
            borderRadius: 10,
        }]
    };

    if(totalAmountinArea){totalAmountinArea.destroy();}

    totalAmountinArea = new Chart(totalamount, {
        type: 'bar',
        data: data,
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
}


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
        renderTotalAmount(data);
    })
}