import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import accountContext from "../context/accountContext";
import { useNavigate } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";

//bootstrap
import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const covidClient = new ApolloClient({
  uri: "http://localhost:2003/covid",
  cache: new InMemoryCache(),
});

const ADD_COVID_FORM = gql`
  mutation AddCovidForm(
    $patientId: String!
    $feverChills: Boolean!
    $breathingDifficulty: Boolean!
    $cough: Boolean!
    $fatigue: Boolean!
    $aches: Boolean!
    $headaches: Boolean!
    $tasteSmell: Boolean!
    $soreThroat: Boolean!
    $congestion: Boolean!
  ) {
    addCovidForm(
      patientId: $patientId
      feverChills: $feverChills
      breathingDifficulty: $breathingDifficulty
      cough: $cough
      fatigue: $fatigue
      aches: $aches
      headaches: $headaches
      tasteSmell: $tasteSmell
      soreThroat: $soreThroat
      congestion: $congestion
    ) {
      _id
    }
  }
`;

export default function CovidForm() {
  const [fever, setFever] = useState(false);
  const [diffBreathing, setDiffBreathing] = useState(false);
  const [cough, setCough] = useState(false);
  const [fatigue, setFatigue] = useState(false);
  const [muscle, setMuscle] = useState(false);
  const [headache, setHeadache] = useState(false);
  const [tasteSmell, setTasteSmell] = useState(false);
  const [soreThroat, setSoreThroat] = useState(false);
  const [congestion, setCongestion] = useState(false);

  const { userId } = useContext(accountContext);
  const [addForm, setAddForm] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [addCovidForm] = useMutation(ADD_COVID_FORM, {
    client: covidClient,
    variables: {
      patientId: userId,
      feverChills: fever,
      breathingDifficulty: diffBreathing,
      cough: cough,
      fatigue: fatigue,
      aches: muscle,
      headaches: headache,
      tasteSmell: tasteSmell,
      soreThroat: soreThroat,
      congestion: congestion,
    },
  });

  function handleChange(event) {
    setAddForm(false);
    switch (event.target.name) {
      case "fever":
        if (event.target.checked) {
          setFever(true);
        } else {
          setFever(false);
        }
        break;

      case "diffBreathing":
        if (event.target.checked) {
          setDiffBreathing(true);
        } else {
          setDiffBreathing(false);
        }
        break;

      case "cough":
        if (event.target.checked) {
          setCough(true);
        } else {
          setCough(false);
        }
        break;

      case "fatigue":
        if (event.target.checked) {
          setFatigue(true);
        } else {
          setFatigue(false);
        }
        break;

      case "muscle":
        if (event.target.checked) {
          setMuscle(true);
        } else {
          setMuscle(false);
        }
        break;

      case "headache":
        if (event.target.checked) {
          setHeadache(true);
        } else {
          setHeadache(false);
        }
        break;

      case "tasteSmell":
        if (event.target.checked) {
          setTasteSmell(true);
        } else {
          setTasteSmell(false);
        }
        break;

      case "soreThroat":
        if (event.target.checked) {
          setSoreThroat(true);
        } else {
          setSoreThroat(false);
        }
        break;

      case "congestion":
        if (event.target.checked) {
          setCongestion(true);
        } else {
          setCongestion(false);
        }
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (addForm) {
      //submit form
      addCovidForm()
        .then(() => {
          //handle ok
          navigate("/home");
          setAddForm(false);
        })
        .catch((error) => {
          setErrMsg("An error occured");
          setAddForm(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addForm]);

  function handleSubmit(event) {
    event.preventDefault();
    setAddForm(true);
  }

  return (
    <div>
      <p>{errMsg}</p>
      <h1>Please select all symptoms that you are experiencing</h1>
      <Form>
        <Form.Group className="mb-3" controlId="feverCheckbox">
          <Form.Check
            type="checkbox"
            label="Fever or chills"
            name="fever"
            onChange={handleChange}
            value={fever}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="breathingCheckbox">
          <Form.Check
            type="checkbox"
            label="Difficulty breathing"
            name="diffBreathing"
            onChange={handleChange}
            value={diffBreathing}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="coughCheckbox">
          <Form.Check
            type="checkbox"
            label="Cough"
            name="cough"
            onChange={handleChange}
            value={cough}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fatigueCheckbox">
          <Form.Check
            type="checkbox"
            label="Fatigue"
            name="fatigue"
            onChange={handleChange}
            value={fatigue}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="muscleCheckbox">
          <Form.Check
            type="checkbox"
            label="Muscle or Body aches"
            name="muscle"
            onChange={handleChange}
            value={muscle}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="headacheCheckbox">
          <Form.Check
            type="checkbox"
            label="Headache"
            name="headache"
            onChange={handleChange}
            value={headache}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="tasteSmellCheckbox">
          <Form.Check
            type="checkbox"
            label="Loss of taste or smell"
            name="tasteSmell"
            onChange={handleChange}
            value={tasteSmell}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="soreThroatCheckbox">
          <Form.Check
            type="checkbox"
            label="Sore throat"
            name="soreThroat"
            onChange={handleChange}
            value={soreThroat}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="congestionCheckbox">
          <Form.Check
            type="checkbox"
            label="Congestion or runny nose"
            name="congestion"
            onChange={handleChange}
            value={congestion}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
