// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Componenat/Header/Header.jsx";
import Todo from "./Componenat/To Do list/Todo.jsx";
import Pokemon from "./Componenat/Pokemon/Pokemon.jsx";
import Home from "./Componenat/Home/Home.jsx";
import Crud from "./Componenat/CRUD/Crud.jsx";
import Accordion from "./Componenat/Accordion/Accordion.jsx";

// Layout component (with Header + Outlet)
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* where child routes will render */}
      </main>
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />, // Layout with header
      children: [
        {
          index: true, // default route "/"
          element: <Pokemon />,
        },
        {
          path: "todo",
          element: <Todo />,
        },
        {
          path: "pukee",
          element: <Home />,
        },
        {
          path: "axios",
          element: <Crud />,
        },
        {
          path: "accoedion",
          element: <Accordion />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
