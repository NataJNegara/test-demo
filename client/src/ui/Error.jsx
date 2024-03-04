export default function Error({ message }) {
  return (
    <p className="text-red-500 bg-red-100 p-2 rounded-md">
      <i className="fa-solid fa-triangle-exclamation"></i> {message}
    </p>
  );
}
