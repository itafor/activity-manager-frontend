import { Avatar, Table } from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "../../utils/tableColSearch";

const ClientsTable = ({ data, loading }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      key: "id",
      align: "center",
      render: (patient) => (
        <Link to={`${patient?.id}`}>
          {patient?.profile_photo_url ? (
            <img
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={patient?.profile_photo_url}
              height={60}
              width={60}
              alt="avatar"
            />
          ) : (
            <Avatar
              style={{ backgroundColor: "#3f8bcaa1" }}
              icon={<UserOutlined />}
              size={50}
            />
          )}
        </Link>
      ),
    },
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      ...getColumnSearchProps({
        dataIndex: "full_name",
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <a
          style={{ color: "blue", textDecoration: "none" }}
          href={`mailto:${email}`}
        >
          {email}
        </a>
      ),
    },

    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (phone_number) => (
        <a
          style={{ color: "blue", textDecoration: "none" }}
          href={`tel:${phone_number}`}
        >
          {phone_number}
        </a>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 300,
      render: (address) => address || "Null",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => gender || "Null",
    },

    {
      title: "Appointments",
      dataIndex: "patient_appointments",
      key: "patient_appointments",
      render: (patient_appointments) => patient_appointments?.length,
    },

    {
      title: "Date Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          {moment(created_at).format("DD MMM YYYY")}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        loading={loading}
        pagination={data.length > 10 ? true : false}
        dataSource={data}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default ClientsTable;
