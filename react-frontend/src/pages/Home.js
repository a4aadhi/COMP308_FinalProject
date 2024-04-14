import { useContext, useEffect } from "react";
import accountContext from "../context/accountContext";
import { useNavigate } from "react-router-dom";
import Alerts from "./Alerts";
import { GET_TIPS_FOR_USER } from "../mutations/tipMutations";
import { useQuery, ApolloClient, InMemoryCache } from "@apollo/client";
import { Card, Row, Col } from 'react-bootstrap';

const tipsClient = new ApolloClient({
  uri: "http://localhost:2003/tips",
  cache: new InMemoryCache(),
});

export default function Home() {

  const { loggedIn, userType, userId } = useContext(accountContext);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_TIPS_FOR_USER, {
    client: tipsClient,
    variables: { patientId: userId }
  });

  console.log(
    `Logged in: ${loggedIn}, userType: ${userType}, userId: ${userId}`
  );


  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {userType === "NURSE" && loggedIn ? (
        <div>
          <h1>Alerts</h1>
          <Alerts />
        </div>
      ) : (
        <div>
          <h1>Daily Tips</h1>
          <Row xs={1} md={2} lg={3} className="g-4">
      {data.tips.map(tip => (
        <Col key={tip._id}>
          <Card>
            <Card.Body>
              <Card.Title>{tip.title}</Card.Title>
              <Card.Text>{tip.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
        </div>
      )}
    </>
  );
}
