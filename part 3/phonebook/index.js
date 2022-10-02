require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('data', function(request){
	return JSON.stringify(request.body)
})
console.log(app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data')))

app.get('/api/persons', (request, response) => {
	Person.find({}).then(person => {
		response.json(person)
	})
})

app.get('/info', (request, response) => {
	Person.countDocuments({},(err, result) => {
		if(err){
			console.log(err)
		}
		else{
			response.send(`Phonebook has info for ${result} people <br/> ${Date()}`)
		}
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(result => {
			response.json(result)
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	const person = new Person({
		name: body.name,
		number: body.number
	})

	if(body.name === undefined){
		return response.status(400).json({
			error: 'name is required'
		})
	} else if(body.number === undefined){
		return response.status(400).json({
			error: 'number is required'
		})
	}

	person.save()
		.then(savedContact => {
			response.json(savedContact)
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body

	Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
		.then(updatedContact => {
			response.json(updatedContact)
		})
		.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
	console.log('error', error)
	if(error.name === 'CastError'){
		return response.status(400).send({ error: 'malformatted id' })
	} else if(error.name === 'MongoServerError' && error.code === 11000){
		return response.status(400).json({ error: `the name ${error.keyValue.name} already exists. Please use a unique name` })
	} else if(error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

//load error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})