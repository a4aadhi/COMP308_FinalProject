import { useState, useEffect, useContext } from "react";
import { gql, useQuery, ApolloClient, InMemoryCache } from "@apollo/client";
import accountContext from "../context/accountContext";
import CovidRecord from "./CovidRecord";

//bootstrap
import Button from "react-bootstrap/Button";

const covidClient = new ApolloClient({
  uri: "http://localhost:2003/covid",
  cache: new InMemoryCache(),
});

const GET_COVID_RECORDS = gql`
  query CovidFormsById($_id: String!) {
    covidFormsById(_id: $_id) {
      _id
      feverChills
      breathingDifficulty
      cough
      fatigue
      aches
      headaches
    }
  }
`;

export default function CovidRecords() {
  const { userId } = useContext(accountContext);
  const [updateRecords, setUpdateRecords] = useState(true);
  const [message, setMessage] = useState("");

  const { loading, data } = useQuery(GET_COVID_RECORDS, {
    client: covidClient,
    pollInterval: 5000,
    skip: !updateRecords,
    fetchPolicy: "network-only",
    variables: {
      _id: userId,
    },
  });

  const [covidRecords, setCovidRecords] = useState([]);

  useEffect(() => {
    if (loading) {
      setMessage("Loading...");
    } else if (data) {
      setCovidRecords(data.covidFormsById);
      setMessage("");
      setUpdateRecords(false);
    }
  }, [data, loading]);

  function refresh() {
    setUpdateRecords(true);
  }

  return (
    <div>
      <h1>All Records</h1>{" "}
      <Button variant="info" onClick={refresh}>
        Refresh
      </Button>
      <p>{message}</p>
      {covidRecords.map((record) => {
        return <CovidRecord key={record._id} covid={record} />;
      })}
    </div>
  );
}
