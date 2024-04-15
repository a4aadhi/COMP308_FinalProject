//bootstrap
import Card from "react-bootstrap/Card";

export default function CovidRecord({ covid }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
  <Card style={{ width: '80%' }}>
    <Card.Body>
      <Card.Title  className="text-center">Covid Record</Card.Title>
      <Card.Subtitle className="mb-2 text-muted text-center">Id: {covid._id}</Card.Subtitle>
      <Card.Text className="text-center">
        Fever: {covid.feverChills} | Difficulty Breathing: {covid.breathingDifficulty} | 
        Cough: {covid.cough} Fatigue: {covid.fatigue} | Aches: {covid.aches} | 
        Headache: {covid.headaches}
      </Card.Text>
    </Card.Body>
  </Card>
</div>

  );
}
