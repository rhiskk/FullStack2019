import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  } 
 
  const Header = props => {
    return <h1>{props.course}</h1>;
  };

  const Content = props => {
    return (
      <div>
        {console.log(props)}
        <p>{props.parts[0].name} {props.parts[0].exercises} </p>
        <p>{props.parts[1].name} {props.parts[1].exercises} </p>
        <p>{props.parts[2].name} {props.parts[2].exercises} </p>
      </div>
    );
  };

  /*const Part = props => {
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    );
  };
*/

  const Total = props => {
    return (
      <div>
        <p>yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehävää</p>
      </div>
    );
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
