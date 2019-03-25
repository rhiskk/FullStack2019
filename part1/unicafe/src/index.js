import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ text, value, prosentti }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td width = "80px">{text}</td>
                    <td>{value} {prosentti}</td>
                </tr>
            </tbody>
        </table>
    )
}

const Statistics = (props) => {

    if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
        return (
            <div>
                Ei yhtään palautetta annettu
            </div>
        )
    }
    return (
        <div>
            <Statistic text="hyvä" value ={props.good} />
            <Statistic text="neutraali" value ={props.neutral} />
            <Statistic text="huono" value ={props.bad} />
            <Statistic text="keskiarvo" value = {props.points / (props.good + props.bad + props.neutral)} />
            <Statistic text="positiivisia" value = {props.good / (props.good + props.bad + props.neutral) * 100} prosentti="%" />
        </div>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [points, setPoints] = useState(0)

  const handleGoodClick = () => {
      setGood(good + 1)
      setPoints(points + 1)
    }

  const handleBadClick = () => {
      setBad(bad + 1)
      setPoints(points - 1)
    }

  const handleNeutralClick = () => {
      setNeutral(neutral + 1)
    }

  return (
    <div>
        <div>
            <h1>anna palautetta</h1>
            <Button handleClick={handleGoodClick} text="hyvä" />
            <Button handleClick={handleNeutralClick} text="neutraali" />
            <Button handleClick={handleBadClick} text="huono" />
            <h2>statistiikka</h2>
            <Statistics good={good} bad={bad} neutral={neutral} points={points} />
        </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
