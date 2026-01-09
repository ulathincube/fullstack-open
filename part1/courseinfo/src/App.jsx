import React from 'react';

function Header({ course }) {
  return <h1>{course}</h1>;
}

function Part({ part, exercises }) {
  return (
    <p>
      {part} {exercises}
    </p>
  );
}

function Content({ parts }) {
  return (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );
}

function Total({ exercises }) {
  const totalExercises = exercises.reduce(
    (accumulator, current) => accumulator + current.exercises,
    0
  );
  return <p>Number of exercises {totalExercises}</p>;
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  const { name, parts } = course;

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total exercises={parts} />
    </div>
  );
}

export default App;
