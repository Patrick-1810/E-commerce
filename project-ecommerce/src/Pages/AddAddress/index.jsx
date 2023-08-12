import "./AddAddress.css";

import arrow from "../../assets/icons/arrowProfile.svg";

import ButtonBigMob from "../../components/ButtonBigMobile";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function AddAddress() {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const [pre, setPre] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [pincode, setPincode] = useState();
  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    state: "",
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handleButtonSelect(buttonName) {
    setSelectedButton(buttonName);
  }

  const fullnumber = `${pre}-${phone}`;

  async function handleSubmit() {
    console.log(name);
    console.log(fullnumber);

    const pinFormat = pincode.replace(/\D/g, "");
    console.log(pinFormat);
    console.log(addressData.street);
    console.log(addressData.city);
    console.log(addressData.state);
  }

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setAddressData({
          street: data.logradouro || "",
          city: data.localidade || "",
          state: data.uf || "",
        });
      });
  };

  return (
    <>
      <header className="header-add-address">
        <Link to="/profile/:id">
          <img src={arrow} />
        </Link>
        <h1>Add New Address</h1>
      </header>

      <div className="info-add-address">
        <p>Contact Information</p>
        <hr className="line-add-address" />
        <div className="info-add-address">
          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="Full Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="container-phone-add-address">
            <input
              className="small-input-add-address"
              type="number"
              placeholder="+11"
              onChange={(e) => {
                setPre(e.target.value);
              }}
            />
            <input
              className="medium-input-add-address"
              type="number"
              placeholder="Contact Number"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="info-add-address space-add-address">
        <p>Delivery Address</p>
        <hr className="line-add-address" />
        <div className="info-add-address">
          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="Pin Code"
            onBlur={checkCEP}
            onChange={(e) => {
              setPincode(e.target.value);
            }}
          />
          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="Street Address"
            value={addressData.street}
            onChange={(e) =>
              setAddressData({ ...addressData, street: e.target.value })
            }
          />
          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="City"
            value={addressData.city}
            onChange={(e) =>
              setAddressData({ ...addressData, city: e.target.value })
            }
          />

          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="State: SP"
            value={addressData.state}
            onChange={(e) =>
              setAddressData({ ...addressData, state: e.target.value })
            }
          />
        </div>

        <div className="div-buttons-add-address">
          <button
            className={`${
              selectedButton === "Home" ? "selected-button" : ""
            } button-style-add-address`}
            onClick={() => handleButtonSelect("Home")}
          >
            Home
          </button>
          <button
            className={`${
              selectedButton === "Office" ? "selected-button" : ""
            } button-style-add-address`}
            onClick={() => handleButtonSelect("Office")}
          >
            Office
          </button>
          <button
            className={`${
              selectedButton === "Other" ? "selected-button" : ""
            } button-style-add-address`}
            onClick={() => handleButtonSelect("Other")}
          >
            Other
          </button>
        </div>
      </div>

      <div className="checkbox-add-address">
        <div className="aling-checkbox-add-address">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <p>Use as default delivery address.</p>
        </div>
      </div>

      <div className="button-save-add-address">
        <div onClick={handleSubmit}>
          <ButtonBigMob>Save Address</ButtonBigMob>
        </div>
      </div>
    </>
  );
}

export default AddAddress;
