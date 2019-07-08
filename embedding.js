const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.update({_id: courseId}, {
    $set: {
      'author.name': 'Yu Yan'
    }
  });
}
// async function updateAuthor(courseId) {
//   const course = await Course.findById(courseId);
//   course.author.name = 'Mosh hamedani';
//   course.save();
// }

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
  console.log(course);
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse('Node Course', [
//  new Author({ name: 'Mosh' }),
//  new Author({ name: 'Yan' })
// ]);
// updateAuthor('5ced3d4ab6bf99130c4274a8');

removeAuthor('5ced470c8c9a3423e0e7476e', '5ced49018fd20b06ec142447');