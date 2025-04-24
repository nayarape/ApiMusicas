const Artist = require('../models/Artist');

// Criar novo artista
exports.createArtist = async (req, res) => {
    try {
        const { name, genre } = req.body;
        const artist = new Artist({ name, genre });
        await artist.save();
        res.status(201).json(artist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todos os artistas
exports.getArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter artista por ID
exports.getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).json({ message: 'Artista não encontrado' });
        res.status(200).json(artist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar artista
exports.updateArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, genre } = req.body;

        const updatedArtist = await Artist.findByIdAndUpdate(id, { name, genre }, { new: true });
        if (!updatedArtist) return res.status(404).json({ message: 'Artista não encontrado' });

        res.status(200).json(updatedArtist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir artista
exports.deleteArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedArtist = await Artist.findByIdAndDelete(id);
        if (!deletedArtist) return res.status(404).json({ message: 'Artista não encontrado' });

        res.status(200).json({ message: 'Artista excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
