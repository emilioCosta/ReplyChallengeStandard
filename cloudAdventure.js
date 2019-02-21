const fs = require('fs');

function readFile(fileName) {
    const fileRaw = fs.readFileSync(fileName, 'UTF-8').split('\n');
    let currentLine = 0;
    const data = {
        providers: [],
        projects: [],
    };
    const numbersLine = fileRaw[currentLine++].split(' ').map(x => parseInt(x));
    const numberOfProviders = numbersLine[0];
    const numberOfProjects = numbersLine[3];
    data.services = fileRaw[currentLine++].split(' ');
    data.countries = fileRaw[currentLine++].split(' ');
    for (let i = 0; i < numberOfProviders; i++) {
        const providerRaw = fileRaw[currentLine++].split(' ');
        const name = providerRaw[0];
        const numberOfRegions = parseInt(providerRaw[1]);
        const provider = {
            name,
            regions: []
        };

        for(let j = 0; j < numberOfRegions; j++){
            const region = {
                name: fileRaw[currentLine++]
            };

            const [ available, cost, ...units ] = fileRaw[currentLine++].split(' ').map(x => parseFloat(x));
            region.package = { available, cost, units };

            region.latencies = fileRaw[currentLine++].split(' ').map(x => parseInt(x));

            provider.regions.push(region);
        }

        data.providers.push(provider);
    }

    for (let k = 0; k < numberOfProjects; k++) {
        const projectRaw = fileRaw[currentLine++].split(' ');
        const project = {
            penalty: parseInt(projectRaw[0]),
            country: data.countries.indexOf(projectRaw[1]),
            units: projectRaw.slice(2).map(x => parseInt(x)),
        };
        data.projects.push(project);
    }

    return data;
}

const data = readFile('input');
writeFile('output', data);

function writeFile(fileName, data) {
    fs.writeFileSync(fileName, JSON.stringify(data), 'UTF-8');
}

function calculateAverageProjectLatency() {
    data.providers.forEach(provider => {
        provider.regions.forEach(region => {
            const numeratorAverageLatencySum = region.package.units
                .map((unit, i) => unit * region.latencies[i])
                .reduce((a,b) => a+b);
            const denominatorAverageLatencySum = region.package.units.reduce((a, b) => a+b);

            const averageLatency = numeratorAverageLatencySum / denominatorAverageLatencySum;
            
        })
    })
}