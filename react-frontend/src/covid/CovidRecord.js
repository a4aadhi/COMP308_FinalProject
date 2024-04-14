//bootstrap
import Card from "react-bootstrap/Card";

export default function CovidRecord({ covid }) {
  return (
    <Card style={{ width: "80%" }}>
      <Card.Body>
        <Card.Title>Covid Record</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Id: {covid._id}</Card.Subtitle>
        <Card.Text>
          Fever: {covid.feverChills} | Difficulty Breathing:{" "}
          {covid.breathingDifficulty} | cough: {covid.cough} {" "}
          Fatigue: {covid.fatigue} | Aches: {covid.aches} | Headache:{" "}
          {covid.headaches}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
