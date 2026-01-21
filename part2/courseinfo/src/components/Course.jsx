function Header({ course }) {
  return <h1>{course}</h1>;
}

function Content({ parts }) {
  const partsData = parts.map(part => (
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  ));
  return <div>{partsData}</div>;
}

function Part({ part, exercises }) {
  return (
    <p>
      {part} {exercises}
    </p>
  );
}

function Total({ exercises }) {
  const totalExercises = exercises.reduce(
    (accumulator, current) => accumulator + current.exercises,
    0,
  );
  return <p style={{ fontWeight: 800 }}>Total of {totalExercises} exercises</p>;
}

function Course({ course }) {
  const { name, parts } = course;
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total exercises={parts} />
    </div>
  );
}

export default Course;
