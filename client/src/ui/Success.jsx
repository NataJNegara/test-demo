import { useState } from "react";

export default function Error({ message }) {
  const [show, setShow] = useState(true);

  setTimeout(() => setShow(false), 3000);

  return (
    <>
      {show && (
        <p className="text-green-500 bg-green-100 p-2 rounded-md mb-4">
          <i className="fa-solid fa-check"></i> {message}
        </p>
      )}
    </>
  );
}
