import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useCreatePropertyApiMutation } from "../src/Features/apiCall";

export default function PropertyCreate() {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const [propertyDetailssend, { data, isError, isLoading, isSuccess }] =
    useCreatePropertyApiMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const createpropertySubmit = async (e) => {
    e.preventDefault();
    console.log("Received values of form: ", formData);
    try {
      const abcd = await propertyDetailssend(formData).unwrap();

        alert(
           "sucess!"
        );
        navigate("/");

    } catch (error) {
      if (error && error?.status != 200) {
        alert({
          "message": "Fail!",
          "description": error?.message,
        });
      }
    }
  };

  return (
    <div className="container mt-3">
      <h2>Property Create</h2>
      <form>
        <div className="mb-3 mt-3">
          <label htmlFor="propertyName">PropertyName:</label>
          <input
            type="text"
            className="form-control"
            id="propertyName"
            placeholder="Enter propertyName"
            name="propertyName"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter description"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter address"
            name="address"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="regularPrice">RegularPrice:</label>
          <input
            type="number"
            className="form-control"
            id="regularPrice"
            placeholder="Enter regularPrice"
            name="regularPrice"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="discountPrice">DiscountPrice:</label>
          <input
            type="number"
            className="form-control"
            id="discountPrice"
            placeholder="Enter discountPrice"
            name="discountPrice"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="bathrooms">Bathrooms:</label>
          <input
            type="number"
            className="form-control"
            id="bathrooms"
            placeholder="Enter bathrooms"
            name="bathrooms"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="bedrooms">Bedrooms:</label>
          <input
            type="number"
            className="form-control"
            id="bedrooms"
            placeholder="Enter bedrooms"
            name="bedrooms"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="furnished" className="form-label">
            Furnished:
          </label>
          <select
            className="form-select"
            id="furnished"
            name="furnished"
            defaultValue="true"
            onChange={handleChange}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="parking" className="form-label">
            Parking:
          </label>
          <select
            className="form-select"
            id="parking"
            name="parking"
            onChange={handleChange}
            defaultValue="true"
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            className="form-control"
            id="type"
            placeholder="Enter type"
            name="type"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="offer" className="form-label">
            Offer:
          </label>
          <select
            className="form-select"
            id="offer"
            name="offer"
            defaultValue="true"
            onChange={handleChange}
          >
            <option value="true" >true </option>
            <option value="false" >false</option>
          </select>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="imageUrls">ImageUrls:</label>
          <input
            type="text"
            className="form-control"
            id="imageUrls"
            placeholder="Enter imageUrls"
            name="imageUrls"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="useRef">UseRef:</label>
          <input
            type="text"
            className="form-control"
            id="useRef"
            placeholder="Enter useRef"
            name="useRef"
            onChange={handleChange}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={(e) => createpropertySubmit(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
