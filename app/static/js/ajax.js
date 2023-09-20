let loading = false;

let totalAmountinArea;
let incomeDist;
let racialDist;

const colors = [
    '#7B5573',
    '#906E88',
    '#9A7692',
    '#A7829F',
    '#A4789A',
    '#B887AD',
    '#CD9BC2',
]

// -------------------DATA VIS-------------------
function renderTotalAmount(totalAmounts){
    const totalamount = id('total-amount');
    const labels = ['county average', 'state average', 'national average'];
    const data = {
        labels: labels,
        datasets: [{
            data: [totalAmounts["County Average"], totalAmounts["State Average"], totalAmounts["National Average"]],
            backgroundColor: [
                '#CD9BC2',
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
                        color: '#A7829F',
                        font:{
                            size:11,
                            family:'Satoshi1',
                        }
                    },
                    grid:{
                        color: '#A7829F',
                    }
                },
                x:{
                    ticks:{
                        color: '#A7829F',
                        font:{
                            size:16,
                            family:'Satoshi1',
                        }
                    },
                    grid:{
                        color: '#A7829F',
                    }
                }
            },
            plugins:{
                legend:{
                    display:false
                },
                title: {
                    display: true,
                    text: 'Total Amount Spent (Millions)',
                    color:  '#A7829F',
                },

            }
        },
    });
}

function renderIncomeDistribution(incomeDistribution){
    const income = id('income-dist');
    console.log('income distribution');
    console.log(incomeDistribution);
    const data = {
        labels: ['Low', 'Middle-High'],
        datasets: [{
            data: incomeDistribution,
            backgroundColor:[
                '#7B5573',
                '#CD9BC2',
            ],
        }]
    };

    if(incomeDist){incomeDist.destroy();}

    incomeDist = new Chart(income, {
        type: 'pie',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
                display:false
            },
            title: {
              display: false,
            },
            tooltip: {
                callbacks: {
                  label: function(context) {
                    return context.parsed + '%';
                  }
                }
              },
          }
        },
      });
}

function renderRacialDistribution(racialDistribution){
    const racial = id('racial-dist');
    const data = {
        labels: racialDistribution[1],
        datasets: [{
            data: racialDistribution[0],
            backgroundColor: colors,
        }]
    };

    if(racialDist){racialDist.destroy();}

    racialDist = new Chart(racial, {
        type: 'pie',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
                    display:false            
            },
            title: {
              display: false,
            },
            tooltip: {
                callbacks: {
                  label: function(context) {
                    return context.parsed + '%';
                  }
                }
            },
          }
        },
      });

}


// -------------------LOADER-------------------

function scrollToTop() {
    console.log('scrolling to top');
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth"
    });
}

function scrollto(elem){
    const element = qs(elem);
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

function disableScroll() {
    // Disable scrolling by setting overflow hidden to the body
    document.body.style.overflowY = 'hidden';
}

function enableScroll() {
    // Enable scrolling by setting overflow auto to the body
    document.body.style.overflowY = 'scroll';
}

function handleScroll(num) {
    if (window.scrollY === 0) {
        disableScroll();
    }
}

function toggleLoading(){
    if(loading){
        loading = false;
        qs('.loader').classList.remove('active');
        qs('.choose').classList.remove('blur');
        enableScroll();
    } else {
        loading = true;
        qs('.loader').classList.add('active');
        qs('.choose').classList.add('blur');
        scrollToTop();
        window.addEventListener("scroll", handleScroll);
        setTimeout(() => {
            window.removeEventListener("scroll", handleScroll);
        }, 1000);
    }
}

function toggleRuntime(runtime){
    let runtimeText = qs('.runtime-text');
    let runtimeElement = qs('.runtime');
    runtimeText.innerHTML = `API call took ${runtime.toFixed(2)} seconds.`;
    runtimeElement.classList.toggle('active');
}

// -------------------DATA PROCESSING-------------------

function makeLegend(values,color){
    let legend = document.createElement('div');
    legend.classList.add('legend');
    let colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = color;
    let text = document.createElement('p');
    text.innerHTML = values;
    legend.appendChild(colorBox);
    legend.appendChild(text);
    return legend;
}

function incomeStats(data){
    let incomeStats = data[0];
    incomeStats /= 10;
    incomeStats = Math.round(incomeStats);
    let incomeStatsText = qs('.income-stats');
    incomeStatsText.textContent = incomeStats;
    console.log(incomeStats);
}

function spendingStats(data){
    let spendingStats = data['County Average'];
    spendingStats *= 1000000;
    spendingStats = Math.round(spendingStats);
    let formattedNumber = '$';
    formattedNumber +=spendingStats.toLocaleString();
    let spendingStatsText = qs('.spending-stats');
    spendingStatsText.textContent = formattedNumber;
    console.log(spendingStats);
}






// -------------------AJAX---------------------

function getData(){
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    let userinput = document.querySelector('select').value;
    console.log(userinput);
    const startTime = performance.now();
    toggleLoading();
    let runtimeElement = qs('.runtime');
    if(runtimeElement.classList.contains('active')){
        toggleRuntime(0);
    }
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
        scrollto(".statistics");
        toggleLoading();
        let endTime = performance.now();
        let duration = endTime - startTime;
        duration = duration/1000;
        console.log(`API call took ${duration.toFixed(2)} seconds.`);
        console.log(data);

        //=== stats ===
        incomeStats(data['income_dist']);
        spendingStats(data['amount_per_year']);

        //=== charts ===
        setTimeout(() => {
            renderTotalAmount(data['amount_per_year']);
            renderIncomeDistribution(data['income_dist']);
            renderRacialDistribution(data['racial_dist']);
        }, 200);
        setTimeout(() => {
            toggleRuntime(duration);
        }, 500);
    })
}

function qs(selector){
    return document.querySelector(selector);
}

function qsa(selector){
    return document.querySelectorAll(selector);
}

function id(id){
    return document.getElementById(id);
}

window.addEventListener('load', () => {
    enableScroll();
    setTimeout(() => {
        window.scrollTo(0, 0);  
    }, 100);
    disableScroll();
});