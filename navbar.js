var options = {
  "animate": true,
  "patternWidth": 600,
  "patternHeight": 600,
  "grainOpacity": 1.2,
  "grainDensity": 1.6,
  "grainWidth": 0.2,
  "grainHeight": 0.2,
}

grained("#hero", options);

const hoverDiv = document.querySelector('.hover__div');
const navBar = document.querySelector('.NavBar');
const links = [...navBar.querySelectorAll('li')];
console.log(links)

const randomLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

navBar.addEventListener('mouseenter', () => {
    hoverDiv.classList.add('active');
})

navBar.addEventListener('mouseleave', () => {
    hoverDiv.classList.remove('active');
})

class Link{
    constructor(el, idx){
        this.el = el;
        this.idx = idx;
        this.originalString = el.innerText;
        this.randomString = this.el.innerText.split('');
        console.log(this.randomString)
        this.frame = 0;
        this.addHoverEvent();
    }

    addHoverEvent() {
        this.el.addEventListener('mouseenter', () => {
            hoverDiv.style.transform = `translateX(${this.idx * 100}%)`
            this.animate();
        })

        this.el.addEventListener('mouseleave', () => {
            this.frame = 0;
            setTimeout(() => {
                this.frame = 0
            }, 1000)
        })
    }

    animate(){
        if(this.frame < 20){
            if(this.frame % 3 == 0){
                for(let i = 0; i < this.randomString.length; i++){
                    this.randomString[i] = randomLetters[Math.floor(Math.random() * randomLetters.length)];
                }
                this.el.innerText = this.randomString.join('');
            }
            this.frame++
            requestAnimationFrame(this.animate.bind(this))
        }else{
            this.el.innerText = this.originalString;
        }
    }
}

links.forEach((link, idx) => {
    new Link(link, idx)
})
