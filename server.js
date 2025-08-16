const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/retoursUtilisateurs', { useNewUrlParser: true, useUnifiedTopology: true });

// Modèle de données
const retourSchema = new mongoose.Schema({
    nom: String,
    feedback: String,
    date: { type: Date, default: Date.now }
});

const Retour = mongoose.model('Retour', retourSchema);

// Routes
app.post('/retours', async (req, res) => {
    const nouveauRetour = new Retour(req.body);
    await nouveauRetour.save();
    res.status(201).send(nouveauRetour);
});

app.get('/retours', async (req, res) => {
    const retours = await Retour.find();
    res.status(200).send(retours);
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});