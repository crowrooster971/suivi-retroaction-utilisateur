const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/feedbacks', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Data model definition
const retourSchema = new mongoose.Schema({
    nom: String,
    feedback: String,
    date: { type: Date, default: Date.now }
});

const Retour = mongoose.model('Retour', retourSchema);

// Routes
app.post('/retours', async (req, res) => {
    try {
        const nouveauRetour = new Retour(req.body);
        await nouveauRetour.save();
        res.status(201).send(nouveauRetour);
    } catch (error) {
        res.status(400).send({ message: 'Erreur lors de la sauvegarde du retour', error });
    }
});

app.get('/retours', async (req, res) => {
    try {
        const retours = await Retour.find();
        res.status(200).send(retours);
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la récupération des retours', error });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});