import axios from "axios";
import { useState, useEffect } from "react";
import { type } from "./const";
import './message.css'


const Signup = () => {
  
  const [merchantList, setMerchantList] = useState<type[]>();
  const [button, setButton] = useState("submit");
  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    number: "",
    contactName: "",
    contactEmail: "",
    contactPhoneNumber: "",
    type: "",
    percent: "",
    dateInput: "",
    payments: "",
    notesInput: "",
  });

  const getAllMerchants = async () => {
    const getAllDataResponse = await axios?.get(
      "http://localhost:5000/getAllMerchants"
    );

    setMerchantList(getAllDataResponse?.data);
    return;
  };

  useEffect(() => {
    getAllMerchants();
  }, []);

  const getMerchantById = async (id: number) => {
    const getEditDataResponse = await axios.put(
      `http://localhost:5000/getMerchant/${id}`,
      { id: id }
    );
    console.log(getEditDataResponse?.data);
    setFormValues(getEditDataResponse?.data);
    setButton("update");
    localStorage.setItem("details", JSON.stringify(id));
    return;
  };

  const updateMerchant = async (id: number) => {
    console.log("id", id);
    const updateDataResponse = await axios.put(
      "http://localhost:5000/updateMerchant",
      { id, formValues }
    );

    console.log("updatedata", updateDataResponse);

    setMerchantList((previousMerchantsData: any) => {
      const updatedResponse = previousMerchantsData.filter(
        (merchant: any) => merchant?.id !== id
      );
      return [...updatedResponse, updateDataResponse?.data];
    });

    return;
  };

  const deleteMerchant = async (id: number) => {
    const deleteDataResponse = await axios.delete(
      `http://localhost:5000/deleteMerchant/${id}`
    );

    setMerchantList(deleteDataResponse?.data);
    return;
  };

  const createMerchant = async () => {
    try {
      const createMerchantResponse = await axios.post(
        "http://localhost:5000/createMerchant",
        { formValues }
      );
      console.log(createMerchantResponse?.data);

      setMerchantList((previousMerchantsData: any) => {
        return [...previousMerchantsData, createMerchantResponse?.data];
      });
      return;
    } catch (error) {
      console.error(error);
    }
  };

  //   const handleChange=()=>{
  //     setMerchantList({
  //                 ...merchantList
  //     })
  //   }

  const handleClick = async (event: any) => {
    event.preventDefault();

    if (button === "submit") {
      createMerchant();
    } else if (button === "update") {
      let idData = JSON.parse(localStorage.getItem("details") || "");
      updateMerchant(idData);
    }

    let resetForm = {
      userName: "",
      email: "",
      number: "",
      contactName: "",
      contactEmail: "",
      contactPhoneNumber: "",
      type: "",
      percent: "",
      dateInput: "",
      payments: "",
      notesInput: "",
    };
    setFormValues(resetForm);
  };

  return (
    <>
    
    
      <form onSubmit={handleClick} id="newBusiness">
        <h2>
          <em>New Business </em>
        </h2>

        <div>
          <label>User Name </label>
          <input
            type="text"
            value={formValues.userName}
            onChange={(e) => {
              setFormValues((prev) => {
                return {
                  ...prev,
                  userName: e.target.value,
                };
              });
            }}
            id="userName"
            name="userName"
            placeholder="Enter Your Name"
            required
          ></input>
        </div>

        <div>
          <label>Email </label>
          <input
            type="email"
            value={formValues.email}
            onChange={(e) => {
              setFormValues((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              });
            }}
            id="email"
            placeholder="Enter Your Email"
            required
          ></input>
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            value={formValues.number}
            onChange={(e) => {
              setFormValues((prev) => {
                return {
                  ...prev,
                  number: e.target.value,
                };
              });
            }}
            id="phoneNumber"
            minLength={5}
            maxLength={10}
            placeholder="Enter Your Number"
            required
          ></input>
        </div>

        <div>
          <label>Contact Name </label>
          <input
            type="text"
            value={formValues.contactName}
            onChange={(e) => {
              setFormValues((prev) => {
                return {
                  ...prev,
                  contactName: e.target.value,
                };
              });
            }}
            id="contactName"
            placeholder="Enter Your Name"
            required
          ></input>
        </div>

        <div>
          <label> Contact Email </label>
          <input
            type="email"
            value={formValues.contactEmail}
            onChange={(e) => {
              setFormValues((prev) => {
                return {
                  ...prev,
                  contactEmail: e.target.value,
                };
              });
            }}
            id="contactEmail"
            placeholder="Enter Contact Email"
            required
          ></input>
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            value={formValues.contactPhoneNumber}
            onChange={(e) => {
              setFormValues((prev) => {
                return {
                  ...prev,
                  contactPhoneNumber: e.target.value,
                };
              });
            }}
            id="contactPhoneNumber"
            minLength={5}
            maxLength={10}
            placeholder="Enter Contact Number"
            required
          ></input>
        </div>

        <div>
          <label id="typeOfBusiness" className="radioValue">
            Type <br></br>
            <input
              type="radio"
              value={formValues.type}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  type: e.target.id,
                });
              }}
              id="smallBusiness"
              name="Business"
            />
            <label htmlFor="smallBusiness">Small Business </label>
            <br></br>
            <input
              type="radio"
              value={formValues.type}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  type: e.target.id,
                });
              }}
              id="enterprise"
              name="Business"
            />
            <label htmlFor="enterprise">Enterprise</label>
            <br></br>
            <input
              type="radio"
              value={formValues.type}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  type: e.target.id,
                });
              }}
              id="entrepreneur"
              name="Business"
            />
            <label htmlFor="entrepreneur">Entrepreneur</label>
          </label>
        </div>

        <div>
          <label htmlFor="catogory" className="catogoryy">
            Catogory<br></br>
            <select id="catogory" multiple size={5}>
              <option value="toys">Toys</option>
              <option value="clothes">Clothes</option>
              <option value="groceries">groceries</option>
              <option value="Electronics">Electronics</option>
              <option value="Digital">Digital</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Percent
            <input
              value={formValues.percent}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  percent: e.target.value,
                });
              }}
              type="number"
              id="percent"
              min="0"
              max="100"
              size={3}
            ></input>
          </label>
        </div>

        <div>
          <label>
            Active from
            <input
              value={formValues.dateInput}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  dateInput: e.target.value,
                });
              }}
              type="date"
              id="activefrom"
              required
            ></input>
          </label>
        </div>

        <div>
          <label className={"payments"}>
            Payment Option<br></br>
            <input
              value={formValues.payments}
              onChange={(e) => {
                setFormValues((prev) => {
                  return {
                    ...prev,
                    payments: e.target.id,
                  };
                });
              }}
              type="checkbox"
              name="payment"
              //   value="Cash on delivery"
              id="cashOnDelivery"
              placeholder="cash on delivery"
            />
            <label htmlFor="cashOnDelivery">Cash on delivery</label>
            <br></br>
            <input
              value={formValues.payments}
              onChange={(e) => {
                setFormValues((prev) => {
                  return {
                    ...prev,
                    payments: e.target.id,
                  };
                });
              }}
              type="checkbox"
              name="payment"
              //   value="UPI"
              id="UPI"
              placeholder="payment"
            />
            <label htmlFor="UPI">UPI</label>
            <br></br>
            <input
              value={formValues.payments}
              onChange={(e) => {
                setFormValues((prev) => {
                  return {
                    ...prev,
                    payments: e.target.id,
                  };
                });
              }}
              type="checkbox"
              name="payment"
              //   value="card payment"
              id="cardPayment"
              placeholder="cardPayment"
            />
            <label htmlFor="cardPayment">Card Payment</label>
          </label>
        </div>

        <div>
          <label>
            Notes<br></br>
            <textarea
              id="textArea"
              value={formValues.notesInput}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  notesInput: e.target.value,
                });
              }}
              cols={30}
              rows={5}
            ></textarea>
          </label>
        </div>

        <div>
          <label>
            Critical Account
            <input type="checkbox" id="criticalCheckBox"></input>
          </label>
        </div>

        <div>
          <button type="submit" id="submitButton" value="Submit">
            {button}
          </button>
        </div>
      </form>
      
    </>
  );
};
export default Signup;
