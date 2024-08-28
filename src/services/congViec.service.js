import { http } from "./config";
export const congViecService = {
  layCongViecTheoTen: (data) => {
    return http.get(
      `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${data}`
    );
  },
};
