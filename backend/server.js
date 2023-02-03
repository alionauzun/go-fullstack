const mongoose = require('mongoose');//je crée une constante pour amporter la fonction mongoose
mongoose.connect('mongodb+srv://jimbob:<PASSWORD>@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


const http = require('http');//je crée une constante pour amporter la fonction http
const app = require('./app');//je fais un import de app.js

const normalizePort = val => { //je crée une fonction qui va normaliser le port
    const port = parseInt(val, 10); //je crée une constante port qui va contenir le port passé en paramètre

    if (isNaN(port)) { //je vérifie si le port est un nombre
        return val; //je retourne le port
    }
    if (port >= 0) { //je vérifie si le port est supérieur ou égal à 0
        return port; //je retourne le port
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000'); //je crée une constante port qui sera soit le port de mon environnement soit le port 3000

const errorHandler = error => { //je crée une fonction qui va gérer les erreurs
    if (error.syscall !== 'listen') { //je vérifie si l'erreur n'est pas liée à l'écoute du serveur
        throw error; //je lance une erreur
    }
    const address = server.address(); //je crée une constante address qui va contenir l'adresse du serveur
    const bind = typeof address === 'string' //je crée une constante bind qui va contenir le type d'adresse
        ? 'pipe ' + address : 'port: ' + port; 
    switch (error.code) { //je fais un switch sur le code d'erreur
        case 'EACCES': //je vérifie si le code d'erreur est EACCES
            console.error(bind + ' requires elevated privileges.'); //je lance une erreur
            process.exit(1); //je quitte le processus
            break;
        case 'EADDRINUSE': //je vérifie si le code d'erreur est EADDRINUSE
            console.error(bind + ' is already in use.'); //je lance une erreur
            process.exit(1); //je quitte le processus
            break;
        default: //je vérifie si le code d'erreur est autre
            throw error; //je lance une erreur
    }
};

const server = http.createServer(app); //je crée une constante server qui va contenir le serveur http qui va utiliser l'application app pour répondre aux requêtes entrantes 
server.on('error', errorHandler); //je fais un écouteur d'évènement sur l'erreur
server.on('listening', () => { //je fais un écouteur d'évènement sur l'écoute
    const address = server.address(); 
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port; 
    console.log('Listening on ' + bind); //je lance un message dans la console
});
server.listen(port); //je lance le serveur sur le port

