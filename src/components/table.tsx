import { type } from "./const"
import { useState,useEffect } from "react";
import { Link } from "react-router-dom"
import './table.css'
import axios from "axios";
const TablePage=()=>{
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
  return(
    <div className="bodyTable">
    <Link to="/create" className="">Create</Link>
  <div className="table-data">
  <table id="list">
    <thead>
      <tr>
        <th>userName</th>
        <th>email</th>
        <th>phoneNumber</th>
        <th>contactName</th>
        <th>contactEmail</th>
        <th>contactPhoneNumber</th>
        <th>type</th>
        <th>percent</th>
        <th>activefrom</th>
        <th>payments</th>
        <th>Notes</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody className="tableData">
      {merchantList?.map((merchant: type, index: number) => (
        <tr key={merchant?.id + index}>
          <td>{merchant?.userName}</td>
          <td>{merchant?.email}</td>
          <td>{merchant?.number}</td>
          <td>{merchant?.contactName}</td>
          <td>{merchant?.contactEmail}</td>
          <td>{merchant?.contactPhoneNumber}</td>
          <td>{merchant?.type}</td>
          <td>{merchant?.percent}</td>
          <td>{merchant?.dateInput}</td>
          <td>{merchant?.payments}</td>
          <td>{merchant?.notesInput}</td>
          <td>
            {/* <button
              type="submit"
              id="editButton"
              // onClick={getMerchantById}
              
            >
              Edit
            </button> */}
            <Link to="/create" onClick={() => getMerchantById(merchant?.id)} className="EditButton">Edit</Link>
          </td>
          <td>
            <button
              type="submit"
              id="deleteButton"
              onClick={() => deleteMerchant(merchant?.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
  )
}
export default TablePage