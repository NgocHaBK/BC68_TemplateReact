import React, { useContext } from "react";
import signInAnimation from "./../../assets/animation/signInAnimation.json";
import InputCustom from "../../components/Input/InputCustom";
import { useLottie } from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { authService } from "./../../services/auth.service";
import { setLocalStorage } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { setValueUser } from "../../redux/authSlice";
import { NotificationContext } from "../../App";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleNotification } = useContext(NotificationContext);
  const options = {
    animationData: signInAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  // NV1 : Thực hiện khai báo formik trong loginPage và thực hiện xử lí lấy dữ liệu người dùng khi bấm đăng nhập
  // NV2 : Thực hiện validation dữ liệu của 2 input thông qua thứ nhất: 2 input đều phải nhập dữ liệu, input email kiểm tra dữ liệu có phải email, còn input mật khẩu kiểm tra tối thiếu 6 và đối ta 10 ký tự
  // NV3 : Thực hiện tạo một phương thức mới trong authService quản lí đăng nhập
  // NV4 : Thực hiện sử dụng phương thức vừa tạo kết hợp dữ liệu người dùng để gửi cho BE kiểm tra và nhận kết quả

  const { values, handleSubmit, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async (values) => {
        console.log(values);
        try {
          const result = await authService.signIn(values);
          console.log(result);
          // B1 Lưu trữ dữ liệu xuống local
          setLocalStorage("user", result.data.content);
          dispatch(setValueUser(result.data.content));
          // B2 Chuyển hướng người dùng
          handleNotification(
            "Đăng nhập thành công, bạn sẽ được chuyển hướng về trang chủ",
            "success"
          );
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } catch (error) {
          console.log(error);
          handleNotification(error.response.data.content, "error");
        }
      },
      validationSchema: yup.object({
        email: yup
          .string()
          .required("Vui lòng không bỏ trống")
          .email("Vui lòng nhập đúng định dạng email"),
        password: yup
          .string()
          .required("Vui lòng không bỏ trống")
          .min(6, "Vui lòng nhập tối thiểu 6 ký tự"),
      }),
    });

  return (
    <div>
      <div className="container">
        <div className="loginPage_content h-screen flex items-center">
          <div className="loginPage_img w-1/2">{View}</div>
          <div className="loginPage_form w-1/2 px-5">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <h1 className="font-medium text-4xl text-center">
                Giao diện đăng nhập
              </h1>
              <InputCustom
                contentLabel="Email"
                placeHolder="Vui lòng nhập email"
                name="email"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
              />
              <InputCustom
                contentLabel="Password"
                placeHolder="Vui lòng nhập password"
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
              />
              <div>
                <button
                  type="submit"
                  className="inline-block w-full py-3 px-5 bg-black text-white rounded-lg"
                >
                  Đăng nhập
                </button>
                <Link className="text-blue-600 mt-5 hover:underline inline-block">
                  Chưa có tài khoản phải ko? bấm vào đây để đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
