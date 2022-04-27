import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows, productColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Datatable = () => {

  useEffect(() => {
    console.log("use effect");
    axios.get("https://shipshop-api.herokuapp.com/products").then(res => {
      console.log(res.data.data);
      setData(res.data.data);
    })
      .catch(err => console.log(err))

  },[]);

  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row)=>row._id}
      />
    </div>
  );
};

export default Datatable;
