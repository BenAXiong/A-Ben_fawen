import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import Header from "../../components/Header";
import ForgotPasswordForm from "../../modules/ForgotPassword/ForgotPasswordForm";

const ForgotPassword = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <PageLayout darkMode={darkMode}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <ForgotPasswordForm />
      </main>
    </PageLayout>
  );
};

export default ForgotPassword;
