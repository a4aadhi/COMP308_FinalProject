import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function LandingPage() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <>
      <div className="text-center mt-5">
        <h1>Covid19 HealthCare Monitor</h1>
        </div>
      <div className="d-flex gap-3 mb-4">
        {currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )}
      </div>
      <hr />
    </>
  );
}
