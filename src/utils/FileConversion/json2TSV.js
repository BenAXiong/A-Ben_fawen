import fs from 'fs';

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

// Read the JSON file and parse it
const verbsData = JSON.parse(fs.readFileSync('../assets/verbs-150.json', 'utf-8'));

// Function to convert data to TSV format
function convert2TSV(data, headers) {
    const headerRow = headers.join('\t');
    
    const dataRows = data.map(verb => {
        return headers.map(header => {
            if (header === '_id') {
                return verb._id?.$oid || verb._id || '';
            }
            if (header.includes('_')) {
                const [baseHeader, index] = header.split('_');
                if (Array.isArray(verb[baseHeader])) {
                    return verb[baseHeader][parseInt(index) - 1] || '';
                }
            }
            return verb[header] || '';
        }).join('\t');
    });

    return [headerRow, ...dataRows].join('\n');
}

// Function to save TSV to a file
function saveTSVToFile(data, headers, filePath) {
    const tsvContent = convert2TSV(data, headers);
    fs.writeFileSync(filePath, tsvContent, 'utf-8');
    console.log(`TSV content has been saved to ${filePath}`);
}

// Define file path
const outputFilePath = './temp-tsv.txt';

// Save TSV to file
saveTSVToFile(verbsData, headers, outputFilePath);