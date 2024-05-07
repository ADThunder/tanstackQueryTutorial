import { useQueries, useQuery } from "@tanstack/react-query";
import { getTodo, getTodosIds } from "./api";

export function useTodosIds() {
  //* Khi dùng useQuery : dùng để đọc data
  //* khi dùng mutation : dùng để thay đổi data trên sever giống crud

  return useQuery({
    queryKey: ["todos"], //key : có thể đặt bất cứ tên gì
    queryFn: getTodosIds,
    // //? refetchOnWindowFocus : mặc định là true có thể chỉnh thành false : nếu người dùng rời bỏ browser thì sẽ tự động fetch data lại; nếu không muốn v thì bỏ thành false
    // refetchOnWindowFocus: false,
  });
}
//? lấy ra từng cái
export function useTodos(ids: (number | undefined)[] | undefined) {
  // * Khác biệt là khi muốn fetch nhiều truy vấn mà không biết chắc chắn
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["todo", { id }],
        queryFn: () => getTodo(id!),
      };
    }),
  });
}
