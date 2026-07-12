function getLast14Dates(weekday = -1, exclude = false) {
    const dates = [];
    const d = new Date();
    
    // Map weekday = 7 to Mon-Fri array [1, 2, 3, 4, 5]
    let targetDays = weekday === 7 ? [1, 2, 3, 4, 5] : [weekday];

    while (dates.length < 14) {
        const currentDay = d.getDay();
        
        // Match conditions handling standard weekdays, 7 (Mon-Fri), and exclusion
        const isMatch = targetDays.includes(-1) || 
                        (!exclude && targetDays.includes(currentDay)) || 
                        (exclude && !targetDays.includes(currentDay));

        if (isMatch) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            
            dates.push(`${yyyy}${mm}${dd}`);
        }
        
        d.setDate(d.getDate() - 1);
    }

    return dates.reverse();
}

// RTHK Use Cases:
console.log(getLast14Dates(7, false)); // Mon-Fri programs (Gets last 14 episodes)
console.log(getLast14Dates(6, false)); // Weekly Saturday programs (Gets last 14 Saturdays)

