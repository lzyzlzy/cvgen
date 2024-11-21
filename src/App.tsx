import "./App.css";
import Layout from "./Layout";
import { CvProvider } from "./lib/hooks/CvContext";
import {
  LocalizationProvider,
  UseLocalizationDispatch,
} from "./lib/hooks/LocalizationContext";
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
  console.log(lang)
  if (lang) {
    const localizationDispatch = UseLocalizationDispatch();
    localizationDispatch
    ({
      type: "changeLang",
      data: lang,
    });
  }

  return (
    <div className="h-screen w-screen">
      <Layout />
    </div>
  );
}

export default App;
