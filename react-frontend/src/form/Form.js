import { useContext, useRef, useState, useEffect } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import accountContext from "../context/accountContext";
import { useNavigate } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";

//bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const userClient = new ApolloClient({
    uri: "http://localhost:2003/users",
    cache: new InMemoryCache(),
  });

const ADD_FORM = gql`
mutation AddForm(
  $patientId: String
  $bodyTemp: String
  $heartRate: String
  $bloodPress: String
  $respRate: String
) {
  addForm(
    patientId: $patientId
    bodyTemp: $bodyTemp
    heartRate: $heartRate
    bloodPress: $bloodPress
    respRate: $respRate
  ) {
    patientId
  }
}
`;

export default function VitalsForm() {
  const { userId } = useContext(accountContext);
  const navigate = useNavigate();
  const [addForm, setAddForm] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [bodyTemp, setBodyTemp] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bloodPress, setBloodPress] = useState("");
  const [respRate, setRespRate] = useState("");

  const [addVitalsForm] = useMutation(ADD_FORM, {
    client: userClient,
    variables: {
        patientId: userId,
        bodyTemp: bodyTemp,
        heartRate: heartRate,
        bloodPress: bloodPress,
        respRate: respRate,
    },
  });

  function handleChange(e) {
    switch (e.target.name) {
      case "bodyTemp":
        setBodyTemp(e.target.value);
        break;
      case "heartRate":
        setHeartRate(e.target.value);
        break;
      case "bloodPress":
        setBloodPress(e.target.value);
        break;
      case "respRate":
        setRespRate(e.target.value);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (addForm) {
      //submit form
      addVitalsForm()
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
          <h1>Register</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBodyTemp">
              <Form.Label>Body Temperature</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Body Temperature"
                value={bodyTemp}
                name="bodyTemp"
                onChange={handleChange}
              />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formHeartRate">
              <Form.Label>Heart Rate</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Heart Rate"
                value={heartRate}
                name="heartRate"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBloodPress">
              <Form.Label>Blood Press</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Blood Press"
                value={bloodPress}
                name="bloodPress"
                onChange={handleChange}
              />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formRespRate">
              <Form.Label>Respiratory Rate</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Respiratory Rate"
                value={respRate}
                name="respRate"
                onChange={handleChange}
              />
            </Form.Group>

          </Form>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
          </div>
      );
}