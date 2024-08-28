import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { getLocalStorage } from "../../utils/utils";
import { Link, Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const datalocal = getLocalStorage("user");
    if (datalocal.user.role !== "ADMIN")
      window.location.href = "https://google.com";
  }, []);

  // useEffect(() => {
  //   disptach(getValueUserApi());
  // }, []);

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to={"manager-user"}>Người Dùng</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link>Công việc</Link>,
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: <Link>Thuuê công việc</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminTemplate;
