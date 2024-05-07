// import axios from "axios";
// import { useEffect, useState } from "react";

import Todos from "./components/Todos";

function App() {
  //! Fetch data bằng cách bình thường hay dùng
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/todos")
  //     .then((res) => {
  //       return setData(res.data);
  //     })
  //     .catch((error) => {
  //       return console.log(error);
  //     });
  // }, []);

  return (
    <>
      {/* {JSON.stringify(data)} */}
      <Todos />
    </>
  );
}

export default App;
