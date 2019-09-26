const morgan = require('morgan')
const express= require('express')
const app = express()
let MOVIES = require('./movies-data.json')
const cors = require('cors')
const helmet = require('helmet')
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(function validateBearToken(req,res,next){
  const bearerToken = req.get('Authorization')

  const apiToken = '1'//Here would be *process.env.API_TOKEN*
console.log(bearerToken)
console.log(apiToken)
  if(!bearerToken || bearerToken.split(' ')[1]!==apiToken){
    return res.status(401).json({error: "Unautherized request"})
  }
  console.log('Moving onto nexxt')
  next()
app.get('/movie', function handleGetMovies(req,res){
  console.log('HERE')
    let {genre,country,avg_vote} = req.query
    let movies = MOVIES

    if (genre){
      movies = movies.filter(movie=>{
         return movie[`genre`].toLowerCase().includes(genre.toLowerCase())
      })
    }
    if (country){
      console.log('In Country function')
      movies = movies.filter(movie=>{
         return movie[`country`].toLowerCase().includes(country.toLowerCase())
      })
    }
    if (avg_vote){
      console.log('in avg_vote')
      // console.log(movies)
      // console.log(Number(avg_vote))
      // console.log(movies[1].avg_vote)
      movies = movies.filter(movie=>{
        
        return movie['avg_vote']>=Number(avg_vote)
      })
    }
    res.json(movies)
})
})
const PORT = 8000
app.listen(PORT,()=>{
    console.log('server is listening on PORT 8000')
})
