import { useState } from 'react';

function Statistics({ good, neutral, bad }) {
  const allStats = good + neutral + bad;
  const averageScore = (good * 1 + neutral * 0 + bad * -1) / allStats || 0;
  const positive = (good / allStats) * 100 || 0;

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={allStats} />
          <StatisticLine text='average' value={averageScore} />
          <StatisticLine text='positive' value={`${positive}%`} />
        </tbody>
      </table>
    </>
  );
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const hasFeedback = good || neutral || bad;

  const statsData = hasFeedback ? (
    <Statistics good={good} neutral={neutral} bad={bad} />
  ) : (
    <div>No feedback given</div>
  );

  return (
    <div>
      <h1>Give Feedback</h1>
      <section style={{ display: 'flex', gap: 5, marginBottom: 20 }}>
        <Button onClick={() => setGood(good + 1)}>Good</Button>
        <Button onClick={() => setNeutral(neutral + 1)}>Neutral</Button>
        <Button onClick={() => setBad(bad + 1)}>Bad</Button>
      </section>
      {statsData}
    </div>
  );
}

export default App;
