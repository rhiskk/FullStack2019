import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteList = props => {
  
  const vote = anecdote => {
    props.vote(anecdote);
    props.setNotification(`you voted '${anecdote.content}'`, 5000);
  };

  const sortedAnecdotes = props.visibleAnecdotes.sort((a, b) => {
    return b.votes - a.votes
  })

  return sortedAnecdotes.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

const anecdotesToShow = (anecdotes, filter) => {
  return filter === '' 
  ? anecdotes 
  : anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()))
};

const mapStateToProps = state => {
  console.log(state);
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  };
};

const mapDispatchToProps = {
  vote,
  setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
