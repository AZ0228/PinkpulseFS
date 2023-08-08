let loading = false;

let totalAmountinArea;

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


// -------------------LOADER-------------------

function scrollToTop() {
    window.scrollTo(0, 0);
}

function disableScroll() {
    // Save the current scroll position
    const scrollTop = window.scrollY;
  
    // Disable scrolling by setting overflow hidden to the body
    document.body.style.overflow = 'hidden';
  
    // Maintain the current scroll position
    window.scrollTo(0, scrollTop);
}

function enableScroll() {
    // Enable scrolling by setting overflow auto to the body
    document.body.style.overflow = 'auto';
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
        disableScroll();

    }
}

// -------------------AJAX---------------------

function getData(){
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    let userinput = document.querySelector('select').value;
    console.log(userinput);
    const startTime = performance.now();
    toggleLoading();
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
        toggleLoading();
        let endTime = performance.now();
        let duration = endTime - startTime;
        duration = duration/1000;
        console.log(`API call took ${duration.toFixed(2)} seconds.`);
        console.log(data);
        renderTotalAmount(data);
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