import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { congViecService } from "../../services/congViec.service";
import IconStar from "../../components/Icon/IconStar";
import IconHeart from "../../components/Icon/IconHeart";

const ListJobPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [listJob, setListJob] = useState([]);
  useEffect(() => {
    let tenCongViec = searchParam.get("tenCongViec");
    congViecService
      .layCongViecTheoTen(tenCongViec)
      .then((res) => {
        console.log(res);
        setListJob(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderJobList = () => {
    return listJob.map((item) => {
      const { hinhAnh, giaTien, danhGia, saoCongViec, tenCongViec } =
        item.congViec;
      const { avatar, tenNguoiTao } = item;
      return (
        <div className="space-y-5 mt-2 border border-gray-300" key={item.id}>
          <div>
            <img src={hinhAnh} alt="khoahoc" className="w-full" />
          </div>
          <div className="px-3">
            <div className="flex items-center ">
              <img
                src={avatar}
                alt="avatar"
                className="w-7 rounded-full me-2"
              />
              <div className="flex flex-col">
                <span>{tenNguoiTao}</span>
                <span>level 2</span>
              </div>
            </div>
            <span className="max-h-6">{tenCongViec}</span>
            <div className="flex items-center space-x-2">
              <span>
                <IconStar size={10} color={"yellow"} />
              </span>
              <span className="text-gray-300">{saoCongViec}</span>
              <span className="text-yellow-400">({danhGia})</span>
            </div>
          </div>
          <div className="flex justify-between border-t border-t-gray-300 px-3 py-2">
            <span className="mt-1 inline-block">
              <IconHeart />
            </span>
            <span>Starting At ${giaTien}</span>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="container grid grid-cols-4 gap-5">{renderJobList()}</div>
  );
};

export default ListJobPage;
