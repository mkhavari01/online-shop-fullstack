import { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    console.log("in here we call post action to set data in backend");
  }, []);
  return (
    <>
      <h1>Success page</h1>
    </>
  );
};

export { Success };
