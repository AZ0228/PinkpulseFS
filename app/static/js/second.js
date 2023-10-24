function statistic(){
    let disappear = document.querySelectorAll('.disappear');
    let statistic = document.querySelector('.statistic');
    let main = document.querySelector('.main');
    let content = document.querySelector('.content');
    let scatter = document.querySelector('.scatter-container');
    setTimeout(() => {
        statistic.style.display = 'block';
    }, 250);
    for(const item of disappear){
        item.classList.add('going');
        setTimeout(() => {      
            item.classList.add('gone');
        }, 250);
    }
    setTimeout(() => {
        main.classList.add('mainSecond');
        statistic.classList.add('start');
        setTimeout(() => {
            content.classList.add('disappear');
            scatter.classList.add('disappear');
            scatter.classList.add('relative');
        }, 700);
    }, 300);
}

function validation(){
    let dropdown = document.querySelector('.dropdown');
    if(dropdown.value!=''){
        let btn = document.querySelector('.submit');
        btn.classList.remove('disabled');
    } else {
        let btn = document.querySelector('.submit');
        btn.classList.add('disabled');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('change', validation);
});