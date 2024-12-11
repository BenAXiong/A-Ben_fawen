import fs from 'fs';

// Headers used in the TSV
const headers = [
  "_id", "infinitif", "participePasse", "participePresent", "auxiliaire", "formePronominale",
  "present_1", "present_2", "present_3", "present_4", "present_5", "present_6",
  "imparfait_1", "imparfait_2", "imparfait_3", "imparfait_4", "imparfait_5", "imparfait_6",
  "passeSimple_1", "passeSimple_2", "passeSimple_3", "passeSimple_4", "passeSimple_5", "passeSimple_6",
  "futurSimple_1", "futurSimple_2", "futurSimple_3", "futurSimple_4", "futurSimple_5", "futurSimple_6",
  "passeCompose_1", "passeCompose_2", "passeCompose_3", "passeCompose_4", "passeCompose_5", "passeCompose_6",
  "plusQueParfait_1", "plusQueParfait_2", "plusQueParfait_3", "plusQueParfait_4", "plusQueParfait_5", "plusQueParfait_6",
  "passeAnterieur_1", "passeAnterieur_2", "passeAnterieur_3", "passeAnterieur_4", "passeAnterieur_5", "passeAnterieur_6",
  "futurAnterieur_1", "futurAnterieur_2", "futurAnterieur_3", "futurAnterieur_4", "futurAnterieur_5", "futurAnterieur_6",
  "subjonctifPresent_1", "subjonctifPresent_2", "subjonctifPresent_3", "subjonctifPresent_4", "subjonctifPresent_5", "subjonctifPresent_6",
  "subjonctifImparfait_1", "subjonctifImparfait_2", "subjonctifImparfait_3", "subjonctifImparfait_4", "subjonctifImparfait_5", "subjonctifImparfait_6",
  "subjonctifPasse_1", "subjonctifPasse_2", "subjonctifPasse_3", "subjonctifPasse_4", "subjonctifPasse_5", "subjonctifPasse_6",
  "subjonctifPlusQueParfait_1", "subjonctifPlusQueParfait_2", "subjonctifPlusQueParfait_3", "subjonctifPlusQueParfait_4", "subjonctifPlusQueParfait_5", "subjonctifPlusQueParfait_6",
  "conditionnelPresent_1", "conditionnelPresent_2", "conditionnelPresent_3", "conditionnelPresent_4", "conditionnelPresent_5", "conditionnelPresent_6",
  "conditionnelPasse_1", "conditionnelPasse_2", "conditionnelPasse_3", "conditionnelPasse_4", "conditionnelPasse_5", "conditionnelPasse_6",
  "conditionnelPasseII_1", "conditionnelPasseII_2", "conditionnelPasseII_3", "conditionnelPasseII_4", "conditionnelPasseII_5", "conditionnelPasseII_6",
  "imperatifPasse_1", "imperatifPasse_2", "imperatifPasse_3", "imperatifPasse_4", "imperatifPasse_5", "imperatifPasse_6"
];

// Function to convert TSV to JSON
function convertTSVtoJSON(tsvData, headers) {
    const result = [];
    
    // Process each row (skip header row)
    const rows = tsvData.slice(1);
    
    rows.forEach(row => {
      const columns = row.split('\t');
      const verbData = {};
      
      headers.forEach((header, index) => {
        const value = columns[index] || '';
  
        // Ensure header is not empty
        if (header.trim()) {
          // Specifically handle the '_id' field
          if (header === '_id') {
            verbData[header] = value;
          }
          // For conjugation forms (like 'present_1', 'present_2'), group them in an array
          else if (header.includes('_')) {
            const [baseHeader, subIndex] = header.split('_');
            if (!verbData[baseHeader]) {
              verbData[baseHeader] = [];
            }
            verbData[baseHeader][parseInt(subIndex, 10) - 1] = value;
          } else {
            // Handle regular headers 
            verbData[header] = value;
          }
        }
      });
  
      result.push(verbData);
    });
  
    return result;
  }

// Function to save JSON to a file
function saveJSONToFile(jsonData, filePath) {
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
  console.log(`JSON content has been saved to ${filePath}`);
}

const tsvFilePath = './temp-tsv.txt';
// const tsvData = fs.readFileSync(tsvFilePath, 'utf-8');
const tsvDataRaw = fs.readFileSync(tsvFilePath, 'utf-8');
const tsvData = tsvDataRaw.trim().split('\n');


// Convert TSV to JSON
const jsonData = convertTSVtoJSON(tsvData, headers);

// Define output file path for JSON
const outputJSONFilePath = './temp-json.json';

// Save JSON to file
saveJSONToFile(jsonData, outputJSONFilePath);
