import React from "react";
import Alert from "react-bootstrap/Alert";
import "../containers/Home.css";

export default function AlertMessage(props) {
  let { alertType, setShowAlert } = props;
  let heading = "";
  let text = "";

  switch (alertType) {
    case "No Cards Found":
      heading = alertType;
      text = "Try any word or part of a word that appears in the name of a card.";
      break;
    case "No similarities for that card yet :(":
      heading = alertType;
      text = "We currently only have similarities for cards present in MTG Arena.\n But we'll be adding more cards soon."
  }

  return (
    <Alert variant="danger" dismissible onClose={() => setShowAlert(false)}>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>
        {text}
      </p>
    </Alert>
  );
}