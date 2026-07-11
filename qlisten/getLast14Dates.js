function getLast14Dates(weekday = -1, exclude = false) {
    const dates = [];
    const d = new Date();

    // Loop backward until we collect exactly 14 matching dates
    while (dates.length < 14) {
        const currentDay = d.getDay();
        
        // Match conditions based on weekday and exclude flags
        const isMatch = (weekday === -1) || 
                        (!exclude && currentDay === weekday) || 
                        (exclude && currentDay !== weekday);

        if (isMatch) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            
            dates.push(`${yyyy}${mm}${dd}`);
        }
        
        // Move back 1 day
        d.setDate(d.getDate() - 1);
    }

    // Reverse the array to sort from oldest to newest
    return dates.reverse();
}

// Examples:
console.log(getLast14Dates(-1, false)); // Last 14 consecutive days
console.log(getLast14Dates(0, false));  // Last 14 Sundays
console.log(getLast14Dates(0, true));   // Last 14 days that are NOT Sundays

