import TopApps from "./pages/TopApps";
import {Route, Routes} from "react-router-dom";
import AppDetails from "./pages/AppDetails";

export default function AppRoutes(props){
    return (
        <Routes>
            <Route path={'/frontend_top_rated_app'} element={<TopApps/>} exact>
            </Route>
            <Route path={`/frontend_top_rated_app/appdetails/:pkg_name`} element={<AppDetails/>} exact>
            </Route>
        </Routes>
    );
}