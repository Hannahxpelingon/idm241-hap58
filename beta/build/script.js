const track = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const pagination = document.getElementById('pagination');
        
        const totalCards = 5;
        let currentIndex = 0;
        let cardsToShow = 3;

        function updateCardsToShow() {
            if (window.innerWidth <= 480) {
                cardsToShow = 1;
            } else if (window.innerWidth <= 768) {
                cardsToShow = 2;
            } else if (window.innerWidth <= 1200) {
                cardsToShow = 2;
            } else {
                cardsToShow = 3;
            }
        }

        function createPagination() {
            pagination.innerHTML = '';
            const maxPages = totalCards - cardsToShow + 1;
            
            for (let i = 0; i < maxPages; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                if (i === currentIndex) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => goToSlide(i));
                pagination.appendChild(dot);
            }
        }

        function updateCarousel() {
            const cards = track.querySelectorAll('.card');
            if (cards.length === 0) return;
            
            const cardWidth = cards[0].offsetWidth;
            const gap = 20;
            const containerWidth = track.parentElement.offsetWidth;
            const maxIndex = totalCards - cardsToShow;
            
            let offset;
            if (currentIndex >= maxIndex) {
                // Calculate total width of all cards
                const totalWidth = (totalCards * cardWidth) + (gap * (totalCards - 1));
                // Align the last cards to the right edge
                offset = totalWidth - containerWidth;
            } else {
                offset = currentIndex * (cardWidth + gap);
            }
            
            track.style.transform = `translateX(-${offset}px)`;
            
            updatePagination();
            updateButtons();
        }

        function updatePagination() {
            const dots = pagination.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function updateButtons() {
            const maxIndex = totalCards - cardsToShow;
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;
        }

        function goToSlide(index) {
            const maxIndex = totalCards - cardsToShow;
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            updateCarousel();
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            const maxIndex = totalCards - cardsToShow;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const oldCardsToShow = cardsToShow;
                updateCardsToShow();
                if (oldCardsToShow !== cardsToShow) {
                    createPagination();
                    currentIndex = 0;
                }
                updateCarousel();
            }, 150);
        });

        // Initialize
        updateCardsToShow();
        createPagination();
        updateCarousel();