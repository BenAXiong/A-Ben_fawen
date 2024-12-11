import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { RoutesEnum } from "./routes";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const Account = React.lazy(() => import("./pages/Account"));
const RequireUser = React.lazy(
  () => import("./lib/firebase/components/RequireUser")
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={RoutesEnum.Login} element={<Login />} />
        <Route path={RoutesEnum.Home} element={<Home />} />
        <Route path={RoutesEnum.Register} element={<Register />} />
        <Route path={RoutesEnum.ForgotPassword} element={<ForgotPassword />} />
        <Route
          path={RoutesEnum.Account}
          element={
            <RequireUser>
              <Account />
            </RequireUser>
          }
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
