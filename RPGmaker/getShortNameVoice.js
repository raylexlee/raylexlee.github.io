// 1. Fetch, clean, and sort Edge voice names
const edgeVoices = speechSynthesis.getVoices()
    .filter(v => !v.localService && ['en-US','en-GB','en-CA','en-IE','en-HK'].includes(v.lang))
    .map(v => v.name.split(' ')[1]) // Isolate names like "Aria", "Guy", "Ryan"
    .sort();

console.log("👉 AVAILABLE EDGE VOICES (LINE BY LINE):\n" + edgeVoices.join('\n'));

// 2. The raw character array from your game directories
const characters = [
    "Alia", "Andrea", "Arianna", "Bancroft", "Bobby", "Brian", "Carol", "Chloe", 
    "Daemalius", "David", "Demon", "Diana", "Duncan", "Ella", "Erica", "Evie", 
    "Goon", "H", "Hannah", "Heather", "Henchman", "Henchwoman", "Henry", "Hood", 
    "Jon", "Judge", "Judy", "Kimberly", "Larry", "Lawyer", "Lilith", "Lillian", 
    "Lily", "M", "Madalyn", "Melissa", "Minion", "Nellie", "Officer", "Paul", 
    "Producer", "Security", "Simon", "Smithfield", "Tasha", "William"
];

// 3. Build the structure
let outputString = "const nltPerson = {\n";

characters.forEach(char => {
    // If the character's name matches an Edge voice name exactly, auto-fill it
    let matchedVoice = edgeVoices.find(vName => vName.toLowerCase() === char.toLowerCase()) || '';
    
    outputString += `  "${char}": { name: '${matchedVoice}', voice: null, rate: 1, pitch: 1 },\n`;
});

outputString += "};";

console.log("\n🚀 COPY AND PASTE THIS STRUCTURE INTO YOUR MOD CODE:\n\n" + outputString);

