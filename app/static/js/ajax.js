let loading = false;

let totalAmountinArea;
let incomeDist;
let racialDist;
let summary;
let general =  fetch('/getgeneral')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data; 
    });


let scatterData;

const colors = [
    '#7B5573',
    '#906E88',
    '#9A7692',
    '#A7829F',
    '#A4789A',
    '#B887AD',
    '#CD9BC2',
];

const colors1 = [
    '#A6839E',
    '#B295AB',
    '#C1A6B8',
    '#D1B7C5',
    '#E0C9D3',
    '#CD9BC2',
];

const colors2 = [
    "#A6839E",
    "#B295AB",
    "#C1A6B8",
    "#D1B7C5",
    "#E0C9D3",
    "#F0DAE0",
    "#EDD6E0" // Ending color
];

// -------------------DATA VIS-------------------
function renderTotalAmount(totalAmounts) {
    const totalamount = id('total-amount');
    const labels = ['county average', 'state average', 'national average'];
    const data = {
        labels: labels,
        datasets: [{
            data: [Math.round(totalAmounts["County Average"]), Math.round(totalAmounts["State Average"]), Math.round(totalAmounts["National Average"])],
            backgroundColor: [
                '#CD9BC2',
                '#906E88',
                '#906E88',
            ],
            borderRadius: 10,
        }]
    };

    if (totalAmountinArea) { totalAmountinArea.destroy(); }

    totalAmountinArea = new Chart(totalamount, {
        type: 'bar',
        data: data,
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#A7829F',
                        font: {
                            size: 11,
                            family: 'Satoshi1',
                        }
                    },
                    grid: {
                        color: '#A7829F',
                    }
                },
                x: {
                    ticks: {
                        color: '#A7829F',
                        font: {
                            size: 16,
                            family: 'Satoshi1',
                        }
                    },
                    grid: {
                        color: '#A7829F',
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Total Amount Spent (Millions)',
                    color: '#A7829F',
                    font: {
                        size: 17,
                        family: 'Satoshi1',
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.parsed.y + ' Million';
                        }
                    }
                },
            }
        },
    });
}

function renderIncomeDistribution(incomeDistribution) {
    const income = id('income-dist');
    console.log('income distribution');
    console.log(incomeDistribution);
    const data = {
        labels: ['Low', 'Middle-High'],
        datasets: [{
            data: incomeDistribution,
            backgroundColor: [
                '#CD9BC2',
                '#906E88',
            ],
            borderWidth:0
        }]
    };

    if (incomeDist) { incomeDist.destroy(); }

    incomeDist = new Chart(income, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.parsed + '%';
                        }
                    }
                },
            }
        },
    });
}

function renderRacialDistribution(racialDistribution) {
    const racial = id('racial-dist');
    const data = {
        labels: racialDistribution[1],
        datasets: [{
            data: racialDistribution[0],
            backgroundColor: colors2, //=====================================================
            borderWidth:0

        }]
    };

    if (racialDist) { racialDist.destroy(); }

    racialDist = new Chart(racial, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.parsed + '%';
                        }
                    }
                },
            }
        },
    });

}

function renderSummary(name){
    // if(window.innerWidth<850){return;}
    //scatter plot
    console.log(2);
    let names = scatterData['names'];
    let coords = scatterData['coords'];
    let namesList = scatterData['namesList'];
    let scattercolor = '#A7829F';
    let scatterColors = new Array(coords.length).fill(scattercolor);
    if(name!=''){ scatterColors[names[name]] = '#EDD6E0'; }//change color of selected county
    
    const scatter = id('scatter');
    const data = {
        datasets:[{
            data: coords,
            backgroundColor: scatterColors,
            pointRadius:6,
        }]
    };
    if (summary) { summary.destroy(); }

    summary = new Chart(scatter, {
        type: 'scatter',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#A7829F',
                        font: {
                            size: 11,
                            family: 'Satoshi1',
                        }
                    },
                    grid: {
                        color: '#A7829F',
                    },
                    title:{
                        display:true,
                        color: '#CD9BC2',
                        font: {
                            size: 17,
                            family: 'Satoshi1',
                        },

                        text: 'Total Amount Spent (Millions)',
                    }
                },
                x: {
                    ticks: {
                        color: '#A7829F',
                        font: {
                            size: 11,
                            family: 'Satoshi1',
                        }
                    },
                    grid: {
                        color: '#A7829F',
                    },
                    title:{
                        display:true,
                        color: '#CD9BC2',
                        font: {
                            size: 17,
                            family: 'Satoshi1',
                        },
                        text: '% of Low Income Residents',
                    }
                }
            },

            plugins: {
                
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "California in Summary",
                    color: '#CD9BC2',
                    font: {
                        size: 26,
                        family: 'Satoshi',
                    },
                },
                tooltip: {
                    callbacks: {
                        title: function (context) {
                            const index = context[0].dataIndex;
                            return namesList[index];
                        },
                        // label: function (context) {
                        //     return context.parsed;
                        // }

                    }
                },
            }
        },
    });

    makeLegend([name],['#EDD6E0'],'.summary-legend');

} //WORK IN PROGRESS


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

function scrollto(elem) {
    const element = qs(elem);
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
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

function toggleLoading() {
    if (loading) {
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

function toggleRuntime(runtime) {
    let runtimeText = qs('.runtime-text');
    let runtimeElement = qs('.runtime');
    runtimeText.innerHTML = `API call took ${runtime.toFixed(2)} seconds.`;
    runtimeElement.classList.toggle('active');
}

// -------------------DATA PROCESSING-------------------

function makeLegend(values, color, legend) { // takes list of labels, colors, and legend class
    let colors = color
    colors.slice(0, values.length);
    let legendElement = qs(legend);
    legendElement.innerHTML = '';
    let legend1 = document.createElement('div');
    let legend2 = document.createElement('div');
    let midpoint = Math.ceil(values.length / 2);
    for(let i=0;i<values.length;i++){
        let div = document.createElement('div');
        div.classList.add('legend-item');
        let color = document.createElement('div');
        color.classList.add('color');
        color.style.backgroundColor = colors[i];
        let text = document.createElement('div');
        text.classList.add('text');
        text.textContent = values[i];
        div.appendChild(color);
        div.appendChild(text);
        if(i<midpoint){
            legend1.appendChild(div);
        } else {
            legend2.appendChild(div);
        }
    }
    legendElement.appendChild(legend1);
    legendElement.appendChild(legend2);
}

function incomeStats(data) {
    console.log(data);
    clearIncomeStats();
    let incomeStats = data[0];
    incomeStats /= 10;
    incomeStats = Math.round(incomeStats);
    let incomeStatsText = qs('.income-stats');
    incomeStatsText.textContent = incomeStats;
    symbols = qsa('.venus');
    for (let i=0;i<incomeStats;i++) {
        symbols[i].classList.add('venusSelected');
    }
}

function spendingStats(data) {
    let spendingStats = data;
    spendingStats *= 1000000;
    spendingStats = Math.round(spendingStats);
    let formattedNumber = '$';
    formattedNumber += spendingStats.toLocaleString();
    let spendingStatsText = qs('.spending-stats');
    spendingStatsText.textContent = formattedNumber;
    console.log(spendingStats);
}

function clearIncomeStats(){
    symbols = qsa('.venus');
    for (let i=0;i<symbols.length;i++) {
        symbols[i].classList.remove('venusSelected');
    }
}


// -------------------AJAX---------------------

function getData() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    let userinput = document.querySelector('select').value;
    console.log(userinput);
    const startTime = performance.now();
    toggleLoading();
    let runtimeElement = qs('.runtime');
    if (runtimeElement.classList.contains('active')) {
        toggleRuntime(0);
    }
    let backendData = fetch('/getdata', {
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
            return data;
        })
    
    Promise.all([backendData, general])
        .then(([backendData, generalData]) =>{
            console.log(backendData);
            countyData = {
                'County Average': backendData['amount_per_year'],
                'State Average': generalData['State Average'],
                'National Average': generalData['National Average'],
            }
            scrollto(".statistics");
            toggleLoading();
            let endTime = performance.now();
            let duration = endTime - startTime;
            duration = duration / 1000;
            console.log(`API call took ${duration.toFixed(2)} seconds.`);

            //=== stats ===
            incomeStats(backendData['income_dist']);
            spendingStats(backendData['amount_per_year']);

            //=== charts ===
            setTimeout(() => {
                renderTotalAmount(countyData);
                renderIncomeDistribution(backendData['income_dist']);
                renderRacialDistribution(backendData['racial_dist']);
                makeLegend(backendData['racial_dist'][1], colors2, '.racial-legend');
                makeLegend(['low income','mid/hi income'], ['#CD9BC2','#906E88'], '.income-legend');

            }, 200);
            setTimeout(() => {
                toggleRuntime(duration);
            }, 500);

        })
        .catch(error => {
            console.error('Error in Promise.all:', error);
        });
}

function getSummary(){
    let name = document.querySelector('select').value;
    if(name === 'test'){
        name = 'Los Angeles County, California'
    } else if (name === ''){
        console.log('empty :((');
        return;
    }
    fetch('/getsummary')
        .then(response => response.json())
        .then(data => {
            scatterData = data; 
            setTimeout(() => {         
                renderSummary(name)
            }, 1000);
        })
}

function getGeneral(){

}

function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

function id(id) {
    return document.getElementById(id);
}

window.addEventListener('load', () => {
    enableScroll();
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
    disableScroll();
    let drop = document.querySelector('.dropdown');
    drop.addEventListener('change', ()=> {renderSummary(drop.value)});

    // getSummary();
});