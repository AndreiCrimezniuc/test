import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import About from "./pages/About";
import BookPage from "./pages/BookPage";
import NotFound from "./pages/NotFound";
import Genres from "./pages/Genres";
import Articles from "./pages/Articles";
import Authors from "./pages/Authors";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResults";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/books',
                element: <Books />
            },
            {
                path: '/books/:id',
                element: <BookPage />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/genres',
                element: <Genres />
            },
            {
                path: '/articles',
                element: <Articles />
            },
            {
                path: '/authors',
                element: <Authors />
            },
            {
                path: '/favorites',
                element: <Favorites />
            },
            {
                path: '/search',
                element: <SearchResults />
            }
        ],
    },
    {
        path: "*",
        element: <NotFound />
    }
]);