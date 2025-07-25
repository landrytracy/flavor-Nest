// Scroll to main content
function scrollToContent() {
    document.getElementById('mainContent').scrollIntoView({
        behavior: 'smooth'
    });
}

// Create floating food elements
function createFloatingFood() {
    const container = document.getElementById('floatingElements');

    setInterval(() => {
        const food = document.createElement('div');
        food.className = 'floating-food';
        food.textContent = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
        food.style.left = Math.random() * window.innerWidth + 'px';
        food.style.animationDuration = (Math.random() * 10 + 15) + 's';
        food.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(food);

        // Remove element after animation
        setTimeout(() => {
            if (food.parentNode) {
                food.parentNode.removeChild(food);
            }
        }, 20000);
    }, 3000);
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.story-text, .story-image, .value-card, .team-member, .timeline-item').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Add hover effects to team members
function setupTeamHoverEffects() {
    document.querySelectorAll('.team-member').forEach(member => {
        member.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.member-avatar');
            avatar.style.transform = 'scale(1.1) rotate(5deg)';
            avatar.style.transition = 'transform 0.3s ease';
        });

        member.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.member-avatar');
            avatar.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Add parallax effect to hero section
function setupParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Add click effect to value cards
function setupValueCardEffects() {
    document.querySelectorAll('.value-card').forEach(card => {
        card.addEventListener('click', function (e) {
            // Remove any existing ripple
            const existingRipple = card.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            // Create ripple effect element
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');

            // Set size and position of the ripple
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;

            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // Append ripple to the card
            card.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });
}
