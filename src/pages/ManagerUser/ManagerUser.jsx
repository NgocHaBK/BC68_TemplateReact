import React, { useContext, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getValueUserApi } from "../../redux/nguoiDung";
import { nguoiDungService } from "../../services/nguoiDung";
import { NotificationContext } from "../../App";
// import { render } from "react-dom";

const ManagerUser = () => {
  const dispatch = useDispatch();
  const { handleNotification } = useContext(NotificationContext);
  const { listUsers } = useSelector((state) => state.nguoiDung);
  useEffect(() => {
    dispatch(getValueUserApi());
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => <img src={text} alt="" className="h-14" />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text) => {
        return <Tag color={text ? "blue" : "cyan"}>{text ? "Name" : "Nu"}</Tag>;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <Tag color={text === "ADMIN" ? "geekblue-inverse" : "lime-inverse"}>
          {text}
        </Tag>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        console.log("record: ", record);
        return (
          <Space size="middle" className="space-x-3">
            <button
              className="bg-red-500 text-white py-2 px-5 rounded-md hover:bg-red-500/85 duration-300"
              onClick={async () => {
                try {
                  const response = await nguoiDungService.deleteSingleUser(
                    record.id
                  );
                  console.log("res in delete single user: ", response);
                  dispatch(getValueUserApi());
                  handleNotification(response.data.message, "success");
                } catch (error) {
                  console.log(
                    "Error from delete single user in managerUser: ",
                    error
                  );
                  handleNotification(error.response.message, "success");
                  dispatch(getValueUserApi());
                }
              }}
            >
              Xoa
            </button>
            <button className="bg-yellow-500 text-white py-2 px-5 rounded-md hover:bg-red-500/85 duration-300">
              Sua
            </button>
          </Space>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={listUsers} />;
};
export default ManagerUser;
