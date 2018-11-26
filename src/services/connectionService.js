const TEACHER = 'teacher'
const STUDENT = 'student'

const getParam = (req, name) => {
	let labelRemoved = req.url.split(name+'=')[1]
	return labelRemoved ? labelRemoved.split('&')[0] : labelRemoved
}

export default { 
	getParam, 
	TEACHER, 
	STUDENT 
}