import "./App.css";
import { Toaster } from "./components/ui/toaster";
import Layout from "./Layout";
import { CvProvider } from "./hooks/CvContext";
import {
  LocalizationProvider,
  UseLocalizationDispatch,
} from "./hooks/LocalizationContext";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/:lang?",
      element: <Root />,
    },
  ]);

  return (
    <LocalizationProvider>
      <CvProvider>
        <RouterProvider router={router} />
      </CvProvider>
    </LocalizationProvider>
  );
}

function Root() {
  let { lang } = useParams();
  console.log(lang);
  if (lang) {
    const localizationDispatch = UseLocalizationDispatch();
    localizationDispatch({
      type: "changeLang",
      data: lang,
    });
  }

  return (
    <div className="dark:bg-slate-800 dark:text-white h-screen w-screen">
      <Layout />
      <Toaster />
    </div>
  );
}

export default App;
