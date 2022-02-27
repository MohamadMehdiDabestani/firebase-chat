import { useEffect } from "react";
import { useFirebase } from "../hooks/useFirebase";
import { Layout } from "../layout";

function App() {
  const { authChange } = useFirebase();
  useEffect(() => {
    authChange();
  }, []);
  return <Layout />;
}

export default App;
