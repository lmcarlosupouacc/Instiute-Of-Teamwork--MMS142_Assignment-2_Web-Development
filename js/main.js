let currentSlide = 0;

const slides = [
    { title: "Japorms Breaking Norms", bg: "images/hero-banner.png", position: "center" },
    { title: "Built for the Everyday Hustle", bg: "images/hero-banner-2.png", position: "center bottom" },
    { title: "Affordable. Durable. Accessible.", bg: "images/hero-banner-3.png", position: "center" }
];

function setSlide(index) {
    const hero = document.getElementById('hero-section');
    const title = document.getElementById('hero-title');
    const dots = document.querySelectorAll('.dot');
    if (!hero || !title) return;

    currentSlide = (index + slides.length) % slides.length;
    title.textContent = slides[currentSlide].title;
    hero.style.backgroundImage = `linear-gradient(rgba(10, 15, 15, 0.68), rgba(10, 15, 15, 0.78)), url('${slides[currentSlide].bg}')`;
    hero.style.backgroundPosition = slides[currentSlide].position;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
        dot.setAttribute('aria-pressed', i === currentSlide ? 'true' : 'false');
    });
}

function prevSlide() {
    setSlide(currentSlide - 1);
}

function nextSlide() {
    setSlide(currentSlide + 1);
}

// Solo Product Page: Size Selector
function selectSize(btn, sizeValue) {
    const sizeBtns = document.querySelectorAll('.size-btn');
    const hiddenSize = document.getElementById('selectedSize');
    sizeBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    if (hiddenSize) hiddenSize.value = sizeValue;
}

// Solo Product Page: Quantity Adjuster
function updateQuantity(delta) {
    const qtyInput = document.getElementById('productQty');
    if (!qtyInput) return;
    let current = parseInt(qtyInput.value, 10) || 1;
    current = Math.max(1, Math.min(99, current + delta));
    qtyInput.value = current;
}

// Order Form inside Solo Product Pages (mailto: orders@examplewebsite142.com)
function submitProductOrder(event, productName, unitPrice) {
    event.preventDefault();
    const size = document.getElementById('selectedSize')?.value || 'M';
    const qty = parseInt(document.getElementById('productQty')?.value, 10) || 1;
    const total = unitPrice * qty;

    const recipient = 'orders@examplewebsite142.com';
    const subject = encodeURIComponent(`Memasuot Order: ${productName} (${size}) x${qty}`);
    const body = encodeURIComponent(
        `Hello Memasuot Store Team,\n\n` +
        `I would like to place an order for the following item:\n\n` +
        `Product: ${productName}\n` +
        `Size: ${size}\n` +
        `Quantity: ${qty}\n` +
        `Unit Price: PHP ${unitPrice}\n` +
        `Estimated Total: PHP ${total}\n\n` +
        `Customer Name:\n` +
        `Delivery Address:\n` +
        `Contact Number:\n\n` +
        `Thank you!`
    );

    const feedback = document.getElementById('orderFeedback');
    if (feedback) {
        feedback.textContent = `Opening your email client to send order for ${qty}x ${productName} (Size ${size}) to ${recipient}...`;
        feedback.classList.remove('d-none');
    }

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
}

// Contact Form (mailto: hello@examplewebsite142.com)
function submitContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const topic = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const recipient = 'hello@examplewebsite142.com';
    const subject = encodeURIComponent(`Memasuot Inquiry: ${topic || 'General Question'} - from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Subject: ${topic}\n\n` +
        `Message:\n${message}`
    );

    const feedback = document.getElementById('contactFeedback');
    if (feedback) {
        feedback.textContent = `Opening your email app with your message addressed to ${recipient}...`;
        feedback.classList.remove('d-none');
    }

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
}
