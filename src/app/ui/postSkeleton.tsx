export default async function Posts() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <ul>
      <li>post 1</li>
      <li>post 2</li>
    </ul>
  );
}
