import React from "react";
import { Spinner } from "reactstrap";

export function SpinnerAnimation() {
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}
