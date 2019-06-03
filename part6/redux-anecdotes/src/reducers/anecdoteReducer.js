import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const anocdoteVote = state.find(n => n.id === id);
      const votedAnocdote = {
        ...anocdoteVote,
        votes: anocdoteVote.votes + 1
      };
      return state.map(note => (note.id !== id ? note : votedAnocdote));
    case "NEW_ANECDOTE":
      return [...state, action.data];

    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export const vote = anecdote => {
  return async dispatch => {
    const updated = await anecdoteService.update(anecdote);
    const id = updated.id
    dispatch({ 
      type: "VOTE", 
      data: { id } 
    });
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    });
  };
};

export default reducer;