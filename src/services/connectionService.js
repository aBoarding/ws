const TEACHER = 'teacher'
const STUDENT = 'student'

const getConnectionType = req => (
	req.url.split('type=')[1]
)

export default { getConnectionType, TEACHER, STUDENT }