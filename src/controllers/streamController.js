import ConnectionService from 'connectionService'
import StreamHelper from 'streamHelper'

let teachers = new StreamHelper(),
	students = new StreamHelper()

const handleConnection = (client, req) => {
	let type = ConnectionService.getParam(req, 'type'),
		channel = ConnectionService.getParam(req, 'channel')

	if(!channel)
		throw new Error('A channel is required to connect!')

	if(type === ConnectionService.TEACHER)
		return connectTeacher(channel, client)
		
	if(type === ConnectionService.STUDENT)
		return connectStudent(channel, client)
	
	throw new Error('Connection is not valid!')
}

const connectTeacher = (channel, teacher) => {
	teachers.subscribe(channel, teacher)
	
	teacher.on('message', msg => {
		teachers.broadcast(channel, msg)
		students.broadcast(channel, msg)
	})
}

const connectStudent = (channel, student) => {
	students.subscribe(channel, student)
}

export default { handleConnection }