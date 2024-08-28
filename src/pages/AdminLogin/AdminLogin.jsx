import React, { useContext } from "react";
import InputCustom from "../../components/Input/InputCustom";
import { useFormik } from "formik";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { getLocalStorage, setLocalStorage } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { setValueUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleNotification } = useContext(NotificationContext);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      authService
        .signIn(values)
        .then((res) => {
          const { data } = res;
          if (data.content.user.role === "USER") {
            handleNotification("Ban khong duoc phep truy cap", "error");
            let vipham = getLocalStorage("viPham");
            if (!vipham) setLocalStorage("viPham", 1);
            else {
              ++vipham;
              vipham === 3
                ? (window.location.href = "https://google.com")
                : setLocalStorage("viPham", vipham);
            }
          } else {
            setLocalStorage("user", data.content);
            dispatch(setValueUser(data.content));
            localStorage.removeItem("viPham");
            navigate(pathDefault.admin);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div>
      <div className="container">
        <div className="admin-login h-screen flex">
          <div className="admin-login_animation w-1/2" />
          <div className="admin-login_form w-1/2 flex flex-col justify-center">
            <form action className="space-y-4" onSubmit={handleSubmit}>
              <h1 className="text-3xl font-bold text-center">
                Trang dang nhap cho admin
              </h1>
              <InputCustom
                contentLabel={"Email"}
                onChange={handleChange}
                value={values.email}
                name={"email"}
                type="text"
              />
              <InputCustom
                contentLabel="Password"
                onChange={handleChange}
                value={values.password}
                name={"password"}
                type="password"
              />
              <div>
                <button
                  type="submit"
                  className="btn px-3 py-2 bg-black text-white rounded-lg inline-block w-full"
                >
                  dang nhap
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
