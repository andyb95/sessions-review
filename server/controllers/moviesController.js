module.exports = {


  getAllMovies: async (req, res) => {
    const db = req.app.get('db')
    const {rating, year} = req.query
    
    const movies = await db.movies.find()
    
    //use this for helo to search posts
    if (rating) {
      const filteredMovies = movies.filter(movie => {
        return movie.rating > +rating
      })

      res.status(200).send(filteredMovies)
    } else {
      res.status(200).send(movies)
    }

    res.status(200).send(movies)
  },

  getMovieById: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    //Line below does not need its own sql file.  You can use ths syntax fro simple queries.
    const [movie] = await db.movies.find({id})

    if (movie){
      res.status(200).send(movie)
    } else {
      res.status(404).send("Movie not found")
    }
  },

  addMovie: async (req, res) => {
    const db = req.app.get('db')

    const {title, rating, year} = req.body

    const newMovie = await db.movies.insert({title, rating, year})

    res.status(200).send(newMovie)
  },

  deleteMovie: async (req, res) => {
    const db = req.app.get('db')

    const {id} = req.params
    await db.movies.destroy({id})
    res.status(200).send('movie deleted')
  },
}
