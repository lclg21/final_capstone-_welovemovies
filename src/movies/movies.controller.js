const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId)
    if (movie) {
        res.locals.movie = movie 
        return next()
    }
    next({ status: 404, message: 'Movie cannot be found' })
}

async function read(req, res, next) {
    const { movieId } = req.params;
    const response = await service.read(movieId);
    if (response.length === 0) {
      next({ status: 404, message: "Movie cannot be found." });
    } else {
      const reply = "yes";
  
      res.json({ data: response[0] });
    }
  }

async function list(req, res, next) {
    const data = await service.list(req.query.is_showing);
    res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
