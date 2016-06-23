import { Map } from 'immutable';

let initialState = new Map();
const NODE_ENV = process.env.NODE_ENV;
if(NODE_ENV === 'development') {
  initialState = new Map({
    _id: "576bfa5774e2d0df059f5a7e",
    updatedAt: "2016-06-23T15:04:07.848Z",
    username: "testuser",
    admin: {
      _id: "5742cd63b4f230e6755f5ca7",
      updatedAt: "2016-05-23T09:29:07.409Z",
      name: "D"
    }
	})
}

export const user = (state = initialState, action) => {
	switch(action.type) {
		default:
			return state
	}
}
