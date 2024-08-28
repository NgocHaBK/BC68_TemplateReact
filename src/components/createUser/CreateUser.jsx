import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../Input/InputCustom";
import { Select } from "antd";
import { skillService } from "../../services/skill.service";
import { nguoiDungService } from "../../services/nguoiDung";
import { useSelector } from "react-redux";
import { NotificationContext } from "../../App";
const CreateUser = () => {
  const [listSkill, setListSkill] = useState([]);
  const [infor, setInfor] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "",
    skill: [""],
    certification: [""],
  });
  const [isActive, setIsActive] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [step, setStep] = useState(1);
  const [errorImage, setErrorImage] = useState("");
  const { user } = useSelector((state) => state.authSlice);
  const { handleNotification } = useContext(NotificationContext);
  console.log(infor);
  const options = [];
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "birthday") {
      const [year, month, day] = e.target.value.split("-");
      let newDate = `${day}/${month}/${year}`;
      setInfor({ ...infor, birthday: newDate });
    } else setInfor({ ...infor, [name]: value });
  };
  const handleSubmitUserInfor = (e) => {
    e.preventDefault();
    console.log("infor in add user: ", infor);
    nguoiDungService
      .addUser(infor)
      .then((res) => {
        setIsActive(true);
        console.log("response in add user: ", res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const fetchSkillList = async () => {
      try {
        const response = await skillService.getSkills();
        console.log("response in get skill list: ", response);
        for (let skill of response.data.content) {
          const { tenSkill } = skill;
          options.push({ label: tenSkill, value: tenSkill });
        }
        setListSkill(options);
      } catch (error) {
        console.log("error in get skill list: ", error);
      }
    };
    fetchSkillList();
  }, []);
  const handleUploadAvatar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (uploadImage) {
      formData.append("formFile", uploadImage.image);
      console.log("token: ", user.token);
      nguoiDungService
        .uploadAvatar(user.token, formData)
        .then((res) => {
          handleNotification("Ban upload avatar thanh cong", "success");
        })
        .catch(console.log);
    }
  };
  const renderLayoutForm = () => {
    switch (step) {
      case 0:
        return (
          <form action="" onSubmit={handleSubmitUserInfor}>
            <InputCustom
              contentLabel="Name"
              placeHolder={"Nhập name:"}
              name={"name"}
              onChange={handleChangeValue}
            />
            <InputCustom
              contentLabel="Email"
              placeHolder={"Nhập Email:"}
              name={"email"}
              onChange={handleChangeValue}
            />
            <InputCustom
              contentLabel="Phone"
              placeHolder={"Nhập PhoneNumber:"}
              name={"phone"}
              onChange={handleChangeValue}
            />
            <InputCustom
              contentLabel="Password"
              placeHolder={"Nhập Password:"}
              name={"password"}
              onChange={handleChangeValue}
              type="password"
            />
            <div className="flex flex-col">
              <label for="" className="font-bold">
                Ngày sinh
              </label>
              <input type="date" name="birthday" onChange={handleChangeValue} />
            </div>

            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Select Gender
              </label>
              <select
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="gender"
                onChange={handleChangeValue}
              >
                <option value={true}>Name</option>
                <option value={false}>Nữ</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Select Role
              </label>
              <select
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="role"
                onChange={handleChangeValue}
              >
                <option value={"ADMIN"}>Admin</option>
                <option value={"USER"}>User</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Select skills
              </label>
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                options={listSkill}
                onChange={(value) => {
                  setInfor({ ...infor, skill: value });
                }}
              />
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Select certification
              </label>
              <Select
                mode="tags"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                fieldNames={"certification"}
                onChange={(value) => {
                  setInfor({ ...infor, certification: value });
                }} // tokenSeparators={[","]}
              />
            </div>
            <div className="mt-5">
              <button className="px-3 py-2 bg-black text-white rounded-sm">
                Tạo người dùng
              </button>
            </div>
            <div className="mt-5">
              <button
                className={
                  isActive
                    ? "px-3 py-2 bg-black text-white rounded-sm"
                    : "px-3 py-2 bg-black/60 text-white rounded-sm "
                }
                disabled={isActive ? false : true}
                onClick={() => setStep(1)}
              >
                Di den trang tiep theo
              </button>
            </div>
          </form>
        );
      case 1:
        return (
          <div>
            <form className="space-y-2" onSubmit={handleUploadAvatar}>
              <h2>Upload hinh anh</h2>
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Select Gender
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    const image = e.target.files[0];
                    //kieemr tra xem kichs thuoc cua hinh anh co duoi 10mb hay khong
                    console.log(image);
                    const validImage = image?.size <= 2 * 1024 * 1024;
                    if (!validImage) {
                      setErrorImage("File phai cos kich thuoc duoi 10mb");
                      return;
                    }
                    // setUploadImage(image);

                    if (image) {
                      const URLImage = URL.createObjectURL(image);
                      console.log("urrl: ", URLImage);
                      setUploadImage({ image, URLImage: URLImage });
                      setErrorImage("");
                    }
                  }}
                />
              </div>
              <p className="text-red-500">{errorImage}</p>
              <img
                src={uploadImage?.URLImage}
                alt=""
                className="w-32"
                accept="image/png, image/jpeg"
              />
              <button
                className="py-2 px-5 bg-green-500 text-white rounded-md"
                type="submit"
              >
                Upload hinh anh
              </button>
            </form>
          </div>
        );
    }
  };
  return (
    <div className="w-1/2">
      <h2 className="font-semibold text-3xl mb-4">Thông tin người dùng</h2>
      {renderLayoutForm()}
    </div>
  );
};

export default CreateUser;
