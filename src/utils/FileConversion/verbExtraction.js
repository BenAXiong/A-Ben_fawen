import fs from 'fs';

// Manually change the file to extract the inf from in assets
const verbsData = JSON.parse(fs.readFileSync('../assets/verbs-200.json', 'utf-8'));

// Extract the 'infinitif' values
const infinitives = verbsData.map(verb => verb.infinitif);

// Save the result to a new JSON file
fs.writeFileSync('./temp-infinitives.json', JSON.stringify(infinitives, null, 2), 'utf-8');

console.log('Infinitives have been extracted and saved to infinitives.json.');
