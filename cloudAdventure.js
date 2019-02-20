const fs = require('fs');

function readFileSync(fileName) {
    const fileRaw = fs.readFileSync(fileName, 'UTF-8').split('\n');

    const dados = {
        providers: []
    };
    const numberOfProviders
    dados.services = fileRaw[1].split(' ');
    dados.countries = fileRaw[2].split(' ');
    while(true){
        
    }
}

function writeFileSync() {

}