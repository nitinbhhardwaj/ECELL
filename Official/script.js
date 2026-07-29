/* ===========================
      AOS
=========================== */

AOS.init({
    duration:900,
    once:true,
    easing:"ease-in-out"
});


/* ===========================
      STICKY NAVBAR
=========================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        navbar.style.position="fixed";
        navbar.style.top="15px";
        navbar.style.left="50%";
        navbar.style.transform="translateX(-50%)";
        navbar.style.width="90%";
        navbar.style.maxWidth="1300px";
        navbar.style.background="rgba(255,255,255,.08)";
        navbar.style.backdropFilter="blur(18px)";
        navbar.style.border="1px solid rgba(255,255,255,.12)";
        navbar.style.borderRadius="18px";
        navbar.style.padding="18px 30px";
        navbar.style.zIndex="999";

    }

    else{

        navbar.removeAttribute("style");

    }

});


/* ===========================
      COUNT ANIMATION
=========================== */

const counters=document.querySelectorAll(".stats-row h2");

let started=false;

window.addEventListener("scroll",()=>{

    const section=document.querySelector(".stats-row");

    if(!section) return;

    const top=section.getBoundingClientRect().top;

    if(top<window.innerHeight-100 && !started){

        started=true;

        counters.forEach(counter=>{

            const target=parseInt(counter.innerText);

            let count=0;

            const speed=Math.ceil(target/80);

            const update=()=>{

                count+=speed;

                if(count<target){

                    counter.innerText=count+"+";

                    requestAnimationFrame(update);

                }

                else{

                    counter.innerText=target+"+";

                }

            }

            update();

        });

    }

});


/* ===========================
      HERO PARALLAX
=========================== */

const rocket=document.querySelector(".rocket");

document.addEventListener("mousemove",(e)=>{

    if(!rocket) return;

    const x=(window.innerWidth/2-e.pageX)/40;

    const y=(window.innerHeight/2-e.pageY)/40;

    rocket.style.transform=
    `translate(${x}px,${y}px)`;

});


/* ===========================
      BUTTON RIPPLE
=========================== */

const buttons=document.querySelectorAll(".primary,.join");

buttons.forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const diameter=Math.max(this.clientWidth,this.clientHeight);

circle.style.width=diameter+"px";
circle.style.height=diameter+"px";

circle.style.left=e.offsetX-diameter/2+"px";
circle.style.top=e.offsetY-diameter/2+"px";

circle.classList.add("ripple");

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});


/* ===========================
      SMOOTH SCROLL
=========================== */

document.querySelectorAll("a[href^='#']").forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


/* ===========================
      MOUSE GLOW
=========================== */

const glow=document.querySelector(".glow");

document.addEventListener("mousemove",(e)=>{

if(!glow) return;

glow.style.left=e.clientX-220+"px";

glow.style.top=e.clientY-220+"px";

});