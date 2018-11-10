import ConnectionService from 'connectionService'
import StreamHelper from 'streamHelper'

let teachers = new StreamHelper(),
	students = new StreamHelper()

const handleConnection = (client, req) => {
	let type = ConnectionService.getConnectionType(req)

	if(type === ConnectionService.TEACHER) {
		connectTeacher(client)
		return
	}
		
	if(type === ConnectionService.STUDENT) {
		connectStudent(client)
		return
	}
	
	throw new Error('Connection is not valid!')
}

const connectTeacher = teacher => {
	teachers.subscribe(teacher)
	
	teacher.on('message', msg => {
		teachers.broadcast(msg)
		students.broadcast(msg)
	})
}

const connectStudent = student => {
	students.subscribe(student)
}

export default { handleConnection }