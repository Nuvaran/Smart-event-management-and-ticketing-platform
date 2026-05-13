/**
 * Search and Filter Functionality
 * Handles dynamic event filtering on the home page
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeSearchFilters();
});

/**
 * Initialize search and filter
 */
function initializeSearchFilters() {
    const filterForm = document.getElementById('filterForm');
    
    if (!filterForm) return;
    
    // Add event listeners for real-time filtering
    const inputs = filterForm.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            
        });
    });
}

/**
 * Apply filters
 */
function applyFilters() {
    const filterForm = document.getElementById('filterForm');
    if (filterForm) {
        filterForm.submit();
    }
}

/**
 * Reset filters
 */
function resetFilters() {
    const filterForm = document.getElementById('filterForm');
    if (filterForm) {
        filterForm.reset();
        window.location.href = '/';
    }
}

/**
 * Filter events by category
 */
function filterByCategory(category) {
    const url = new URL(window.location);
    if (category) {
        url.searchParams.set('category', category);
    } else {
        url.searchParams.delete('category');
    }
    window.location = url.toString();
}

/**
 * Filter events by date range
 */
function filterByDateRange(startDate, endDate) {
    const url = new URL(window.location);
    if (startDate) {
        url.searchParams.set('dateFrom', startDate);
    }
    if (endDate) {
        url.searchParams.set('dateTo', endDate);
    }
    window.location = url.toString();
}

/**
 * Sort events
 */
function sortEvents(sortBy) {
    const url = new URL(window.location);
    url.searchParams.set('sort', sortBy);
    window.location = url.toString();
}

/**
 * Search events
 */
function searchEvents(query) {
    if (!query || query.trim() === '') {
        window.location.href = '/';
        return;
    }
    
    const url = new URL(window.location);
    url.searchParams.set('q', query);
    window.location = url.toString();
}

/**
 * Pagination
 */
function goToPage(pageNumber) {
    const url = new URL(window.location);
    url.searchParams.set('page', pageNumber);
    window.location = url.toString();
}

/**
 * Filter events by availability
 */
function filterByAvailability(available = true) {
    const url = new URL(window.location);
    if (available) {
        url.searchParams.set('available', 'true');
        url.searchParams.delete('soldOut');
    } else {
        url.searchParams.delete('available');
        url.searchParams.set('soldOut', 'true');
    }
    window.location = url.toString();
}

/**
 * Filter events by price range (client-side)
 */
function filterByPriceRange(minPrice, maxPrice) {
    const url = new URL(window.location);
    if (minPrice !== null) {
        url.searchParams.set('priceMin', minPrice);
    }
    if (maxPrice !== null) {
        url.searchParams.set('priceMax', maxPrice);
    }
    window.location = url.toString();
}

// Export functions
window.applyFilters = applyFilters;
window.resetFilters = resetFilters;
window.filterByCategory = filterByCategory;
window.filterByDateRange = filterByDateRange;
window.sortEvents = sortEvents;
window.searchEvents = searchEvents;
window.goToPage = goToPage;
window.filterByAvailability = filterByAvailability;
window.filterByPriceRange = filterByPriceRange;
