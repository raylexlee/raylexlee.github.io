const characters = [
    "Alia", "Andrea", "Arianna", "Bancroft", "Bobby", "Brian", "Carol", "Chloe", 
    "Daemalius", "David", "Demon", "Diana", "Duncan", "Ella", "Erica", "Evie", 
    "Goon", "H", "Hannah", "Heather", "Henchman", "Henchwoman", "Henry", "Hood", 
    "Jon", "Judge", "Judy", "Kimberly", "Larry", "Lawyer", "Lilith", "Lillian", 
    "Lily", "M", "Madalyn", "Melissa", "Minion", "Nellie", "Officer", "Paul", 
    "Producer", "Security", "Simon", "Smithfield", "Tasha", "William"
];

async function guessGendersAndBuildMap() {
    let outputString = "const nltPerson = {\n";
    
    // Process names in chunks or sequentially to respect API rate limits
    for (let char of characters) {
        let assignedVoice = '';
        
        try {
            // Fetch gender estimation from the API
            let response = await fetch(`https://genderize.io{char}`);
            let data = await response.json();
            
            if (data.gender === 'female') {
                assignedVoice = 'Aria'; // Edge standard female fallback
            } else if (data.gender === 'male') {
                assignedVoice = 'Guy';  // Edge standard male fallback
            }
        } catch (e) {
            // If API fails or name is an acronym/object (like "H" or "Goon")
            assignedVoice = ''; 
        }
        
        outputString += `  "${char}": { name: '${assignedVoice}', voice: null, rate: 1, pitch: 1 },\n`;
    }
    
    outputString += "};";
    console.log(outputString);
}

// Execute the async function
guessGendersAndBuildMap();

