let loading = false;

let totalAmountinArea;
let incomeDist;

function renderTotalAmount(totalAmounts){
    const totalamount = id('total-amount');
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

function renderIncomeDistribution(incomeDistribution){
    const income = id('income-dist');
    console.log('income distribution');
    console.log(incomeDistribution);
    const data = {
        labels: ['Low', 'Middle-High'],
        datasets: [{
            data: incomeDistribution['income-dist'],
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
              position: 'top',
            },
            title: {
              display: true,
              text: 'Income Distribution'
            }
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
        scrollToBottom();
        toggleLoading();
        let endTime = performance.now();
        let duration = endTime - startTime;
        duration = duration/1000;
        console.log(`API call took ${duration.toFixed(2)} seconds.`);
        console.log(data);

        setTimeout(() => {
            renderTotalAmount(data['amount_per_year']);
            renderIncomeDistribution(data['income_dist']);
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