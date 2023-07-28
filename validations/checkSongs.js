const checkName = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).json({error: "Name is required!"});
    } else {
        next();
    }
};

const checkIsFavorite = (req, res, next) => {
    if (typeof req.body.is_favorite !== "boolean") {
        res.status(400).json({ error: "is_favorite must be boolean!"})
    } else {
        next();
    };
};

const checkArtist = (req, res, next) => {
    if (!req.body.artist) {
        res.status(400).json({error: "Artist is required!"});
    } else {
        next();
    }
}

module.exports = { checkName, checkIsFavorite, checkArtist };