const counters = document.querySelectorAll('.counter');
const speed = 200; 

const startCounter = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

const observerOptions = { threshold: 0.7 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            startCounter();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if(statsSection) observer.observe(statsSection);