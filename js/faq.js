// FAQ page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
});

function initFAQ() {
    initCategoryTabs();
    initAccordion();
}

// Initialize category tabs
function initCategoryTabs() {
    const categoryBtns = document.querySelectorAll('.faq-category');
    const faqContents = document.querySelectorAll('.faq-content');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all FAQ content sections
            faqContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show target content section
            const targetContent = document.getElementById(`${targetCategory}-faq`);
            if (targetContent) {
                targetContent.style.display = 'block';
                
                // Animate the content appearing
                targetContent.style.opacity = '0';
                targetContent.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    targetContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    });
}

// Initialize FAQ accordion
function initAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.display = 'none';
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.display = 'none';
                } else {
                    item.classList.add('active');
                    answer.style.display = 'block';
                    
                    // Smooth scroll to question if needed
                    setTimeout(() => {
                        const rect = question.getBoundingClientRect();
                        const navbarHeight = 80;
                        
                        if (rect.top < navbarHeight) {
                            window.scrollTo({
                                top: window.scrollY + rect.top - navbarHeight - 20,
                                behavior: 'smooth'
                            });
                        }
                    }, 300);
                }
            });
        }
    });
}

// Search functionality for FAQ (optional enhancement)
function initFAQSearch() {
    const searchInput = document.getElementById('faq-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    
                    // Highlight search terms
                    if (searchTerm) {
                        highlightSearchTerm(item, searchTerm);
                    }
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show "No results" message if no items are visible
            showNoResultsMessage(searchTerm);
        });
    }
}

// Highlight search terms in FAQ items
function highlightSearchTerm(item, term) {
    const question = item.querySelector('.faq-question h3');
    const answer = item.querySelector('.faq-answer');
    
    [question, answer].forEach(element => {
        const text = element.textContent;
        const regex = new RegExp(`(${term})`, 'gi');
        const highlightedText = text.replace(regex, '<mark>$1</mark>');
        element.innerHTML = highlightedText;
    });
}

// Show/hide "No results" message
function showNoResultsMessage(searchTerm) {
    const visibleItems = document.querySelectorAll('.faq-item[style*="block"], .faq-item:not([style*="none"])').length;
    let noResultsMsg = document.getElementById('no-results-message');
    
    if (visibleItems === 0 && searchTerm) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'no-results-message';
            noResultsMsg.className = 'no-results';
            noResultsMsg.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--gray-500);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>لا توجد نتائج</h3>
                    <p>لم نجد أي أسئلة تطابق بحثك عن "${searchTerm}"</p>
                    <p>جرب كلمات مختلفة أو تصفح الفئات أعلاه</p>
                </div>
            `;
            
            const faqSection = document.querySelector('.faq-section .container');
            if (faqSection) {
                faqSection.appendChild(noResultsMsg);
            }
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Export functions for potential external use
window.faqFunctions = {
    initFAQ,
    initCategoryTabs,
    initAccordion,
    initFAQSearch
};