export default () => {
	let clients = {},
		onAllDisconnectedCallback

	const subscribe = (topic, client) => {
		if(!clients[topic]) clients[topic] = []

		clients[topic].push(client)
		client.on('close', () => unsubscribe(topic, client))
	}

	const unsubscribe = (topic, clientToDisconnect) => {
		clients[topic] = clients[topic].filter(client => client != clientToDisconnect)
		
		clients[topic].length == 0 && onAllDisconnectedCallback && 
			onAllDisconnectedCallback()
	}

	const broadcast = (topic, msg) => {
		clients[topic] && clients[topic].forEach(client => {
			client.readyState === client.OPEN &&
				client.send(typeof msg === 'string' ? msg : JSON.stringify(msg))
				
			client.readyState === client.CLOSED || client.readyState === client.CLOSING &&
				unsubscribe(client)
		})
	}

	const onAllDisconnected = callback => {
		onAllDisconnectedCallback = callback
	}

	return {
		subscribe,
		broadcast,
		onAllDisconnected
	}
}