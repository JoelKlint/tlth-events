let initialState = {};
const NODE_ENV = process.env.NODE_ENV;
if(NODE_ENV === 'development') {
  initialState = {
    id: 2,
    updatedAt: "2016-06-23T15:04:07.848Z",
    username: "testuser",
    adminGuildId: 1
  }
}

export const user = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}
