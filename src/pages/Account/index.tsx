import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import Header from "../../components/Header";
import AccountLayout from "../../modules/Account";

const Account = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <PageLayout darkMode={darkMode}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <AccountLayout />
      </main>
    </PageLayout>
  );
};

export default Account;
