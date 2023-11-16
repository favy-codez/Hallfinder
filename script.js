// FAQ section
const FAQs = document.querySelectorAll('.FAQ');
FAQs.forEach(FAQ =>{
    FAQ.addEventListener('click', function() {
        FAQ.classList.toggle('showFAQ')
    })
})