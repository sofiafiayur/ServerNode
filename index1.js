const express = require ('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.error('Could not connect to MongoDB'));
mongoose.connect('mongodb://localhost/mongo-exercises')

const personSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'lastName should have at least one charactor.'
        },
},
    createdat: Date,
    updatedat: Date,
    sticky: Boolean,
    age: {type: Number,
    required: true}
})
const Person = mongoose.model('Person', personSchema);

async function createPerson() {
    
    
    const person = new Person ({
        firstName: 'Sansa',
        lastName: 'Stark',
        createdat: Date.now(),
        // age: 25
    });

    try {
        const result = await person.save();
        console.log(result);
    }
    catch (ex) {
        console.log(ex);
    }
    
    
}

async function getPerson() {
    const pageNumber = 2;
    const pageSize = 10;
    const result = await Person
        .find()
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
        .or([{firstName: 'John'}, {lastName: 'Tegary'}])
        .sort({firstName: 1})
        .select({lastName: 1, age: 1});
    console.log(result);
}

// getPerson();

createPerson();


// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// app.get('/api/courses')

// app.listen(3000, () => console.log('Listening on port 3000..'));

// const courseSchema = new mongoose.Schema({
//     tags: Array,
//     date: Date,
//     name: String,
//     author: String,
//     isPublished: Boolean,
//     price: Number
// })

// const Courses = mongoose.model('courses', courseSchema);

// async function getCourse() {
//     const course = await Courses
//         .find({isPublished: true, tags: { $in: ['frontend', 'backend'] }})
//         // .sort('-price')
//         // .select('name author');
//         // .or([{price: {$gte: 15}}, {name: {$in: 'by'}}]);
//         // .sort({name: 1})
//         // .select({name: 1, author:1});

    
//      console.log(course);
// }

// getCourse()
