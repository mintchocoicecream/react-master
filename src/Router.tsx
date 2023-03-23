import { createBrowserRouter } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Follwers from "./pages/users/Followers";
import User from "./pages/users/User";
import Root from "./Root";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Home />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "users/:userId",
                element: <User />,
                children: [
                    {
                        path: "followers",
                        element: <Follwers />,
                    },
                ],
            },
        ],
        errorElement: <NotFound />,
    },
]);

export default router;