# Capture cities

### Setup:
```
npm install
```

### To run tests:
```
npm install
.\node_modules\.bin\wdio conf\chrome.js
```

### To generate exchange rates:
```
node .\src\ExchangeRateCreator.js
```

### To create data: This data must be built against standard regex patterns
“Name, Surname, Address, City, Telephone, Email, Date of birth, Sex, Marital Status, Nationality, Country of birth, Gross annual income, and Currency”.
```
node .\src\GenerateUserData.js
```


## References
http://www.cs.cmu.edu/afs/cs/project/ai-repository/ai/areas/nlp/corpora/names/
https://data.world/len/us-first-names-database/workspace/file?filename=Common_Surnames_Census_2000.csv
https://www.npmjs.com/package/node-line-reader
