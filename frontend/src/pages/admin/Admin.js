import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { LoginFormAdmin } from "components/LoginFormAdmin";
import { Layout } from "layout/Layout";
import { useDispatch } from "react-redux";
import { checkToken } from "redux/actions/authAction";

const Admin = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.auth.token) {
      dispatch(
        checkToken({
          username: state.auth.username,
          password: state.auth.password,
        })
      );
    }
  }, []);

  return (
    <>
      <Layout admin={state.auth.checkToken ? true : false}>
        {state.auth.checkToken ? <Outlet /> : <LoginFormAdmin />}
      </Layout>
    </>
  );
};

export { Admin };
