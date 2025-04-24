const Song = require('../models/Song');

// Criar nova música
exports.createSong = async (req, res) => {
    try {
        const { title, duration, artist } = req.body;
        const song = new Song({ title, duration, artist });
        await song.save();
        res.status(201).json(song);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todas as músicas
exports.getSongs = async (req, res) => {
    try {
        const songs = await Song.find().populate('artist', 'name');
        res.status(200).json(songs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter música por ID
exports.getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id).populate('artist', 'name');
        if (!song) return res.status(404).json({ message: 'Música não encontrada' });
        res.status(200).json(song);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar música
exports.updateSong = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, duration, artist } = req.body;

        const updatedSong = await Song.findByIdAndUpdate(id, { title, duration, artist }, { new: true });
        if (!updatedSong) return res.status(404).json({ message: 'Música não encontrada' });

        res.status(200).json(updatedSong);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir música
exports.deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSong = await Song.findByIdAndDelete(id);
        if (!deletedSong) return res.status(404).json({ message: 'Música não encontrada' });

        res.status(200).json({ message: 'Música excluída com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
