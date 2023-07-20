function statistic(){
    let disappear = document.querySelectorAll('.disappear');
    let statistic = document.querySelector('.statistic');
    let main = document.querySelector('.main');
    let content = document.querySelector('.content');
    setTimeout(() => {
        statistic.style.display = 'block';
    }, 250);
    console.log(1);
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
        }, 700);
    }, 300);
}