const createActionSpy = (allActionSpies = {} ) => {

	return (store) => (next) => (action) => {

		const actionSpy = allActionSpies[action.type]

		if(actionSpy) {
			actionSpy(action, store)
		}

		return next(action)
	}
}

export default createActionSpy
