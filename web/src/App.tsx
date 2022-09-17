function App() {
  return (
    <div>
      <Button title="Click me" />
      <Button title="Click me 2" />
      <Button title="Click me 3" />
    </div>
  );
}

export default App;

interface ButtonProps {
  title: string;
}

function Button({ title }: ButtonProps) {
  return <button>{title}</button>;
}
