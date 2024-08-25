// a signup page with these details: name, email, password, and a checkbox of multiple select, where user can selected one or many disorders he/she might have. This field is completely optional and a submit button

import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [selectedDisorders, setSelectedDisorders] = React.useState([]);

  const handleDisorderChange = (event) => {
    const { value } = event.target;
    const updatedDisorders = [...selectedDisorders];

    if (updatedDisorders.includes(value)) {
      const index = updatedDisorders.indexOf(value);
      updatedDisorders.splice(index, 1);
    } else {
      updatedDisorders.push(value);
    }

    setSelectedDisorders(updatedDisorders);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("disorders", JSON.stringify(selectedDisorders));
    localStorage.setItem("isLoggedIn", true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Signup</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="p-2 border border-gray-300 rounded-lg mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-lg mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded-lg mb-4"
        />

        {/* five  */}

        <div className="flex flex-col items-start mb-4">
          <label className="mb-2">Disorders:</label>
          <label>
            <input
              type="checkbox"
              value="Diabetes"
              checked={selectedDisorders.includes("Diabetes")}
              onChange={handleDisorderChange}
            />
            Diabetes
          </label>
          <label>
            <input
              type="checkbox"
              value="Hypertension"
              checked={selectedDisorders.includes("Hypertension")}
              onChange={handleDisorderChange}
            />
            Hypertension
          </label>
          <label>
            <input
              type="checkbox"
              value="Lactose Intolerance"
              checked={selectedDisorders.includes("Lactose Intolerance")}
              onChange={handleDisorderChange}
            />
            Lactose Intolerance
          </label>
          <label>
            <input
              type="checkbox"
              value="Thyroid Disorders"
              checked={selectedDisorders.includes("Thyroid Disorders")}
              onChange={handleDisorderChange}
            />
            Thyroid Disorders
          </label>
          <label>
            <input
              type="checkbox"
              value="Peanut Allergy"
              checked={selectedDisorders.includes("Peanut Allergy")}
              onChange={handleDisorderChange}
            />
            Peanut Allergy
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg w-32 mb-4"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
