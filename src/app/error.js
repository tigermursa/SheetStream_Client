"use client";

import ErrorUI from "@/Components/Ui/Error/ErrorUI";
import { useEffect } from "react";

export default function Error({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <ErrorUI />
    </div>
  );
}
