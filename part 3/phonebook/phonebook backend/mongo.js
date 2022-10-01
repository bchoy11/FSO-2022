const mongoose = require('mongoose')

if(process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fsodatabase:${password}@cluster0.7arjbhl.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('People', personSchema)

mongoose
	.connect(url)
	.then(() => {
		console.log('connected')
		console.log('name to add: ', name)
		console.log('number to add: ', number)

		if(name === undefined && number === undefined){
			Person.find({}).then(result => {
				result.forEach(person => {
					console.log(person.name)
				})
				mongoose.connection.close()
			})
		}
		else{
			const person = new Person({
				name: name,
				number: number
			})
			console.log(`added ${name} number ${number} to phonebook`)
			return person.save()
		}
	})
	.catch((err) => console.log(err))