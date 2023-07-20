window.addEventListener("DOMContentLoaded", function(){
    let button = document.querySelector('.button');
    button.addEventListener("mouseover", function(){
        console.log(1);
        let target = button.querySelector('.target');
        target.classList.add('animation')
        setTimeout(() => {
            target.classList.remove('animation');
        }, 2010);
    })
});