import React, { useEffect, useState } from "react";
import IconSearch from "../Icon/IconSearch";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { congViecService } from "../../services/congViec.service";
import { Dropdown } from "antd";
import useDebounce from "../../hooks/useDebounce";
const FormSearchProduct = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [checkDropDown, setCheckDropDown] = useState(false);
  const [listJobSuggest, setListJobSuggest] = useState([]);
  const debounceValue = useDebounce(search, 500);

  useEffect(() => {
    if (search !== "") {
      congViecService
        .layCongViecTheoTen(search)
        .then((res) => {
          console.log(res);
          const newJobList = res.data.content.slice(0, 4).map((item, index) => {
            return {
              key: index,
              label: (
                <Link
                  to={`/cong-viec-chi-tiet/${item.id}`}
                  className="flex items-center space-x-4"
                >
                  <img src={item.congViec.hinhAnh} className="h-14" alt="" />
                  <div>
                    <h4>{item.congViec.tenCongViec}</h4>
                    <p>{item.congViec.giaTien}</p>
                  </div>
                </Link>
              ),
            };
          });
          setListJobSuggest(newJobList);
          setCheckDropDown(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [debounceValue]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    navigate(`${pathDefault.listJob}?tenCongViec=${search}`);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    if (!e.target.value) {
      setCheckDropDown(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Dropdown
          menu={{
            items: listJobSuggest,
          }}
          open={checkDropDown}
        >
          <div className="flex items-center space-x-1 pl-4 rounded-md border border-gray-400 justify-between max-w-sm min-w-[400px]">
            <input
              type="text"
              placeholder="Vui long nhap vao cong viec can kiem"
              className="flex-1 focus:border-none  focus:outline-none"
              onChange={handleChange}
              value={search}
            />
            <button type="submit">
              <IconSearch size={30} color="rgb(156 163 175)" />
            </button>
          </div>
        </Dropdown>
      </form>
    </div>
  );
};

export default FormSearchProduct;
