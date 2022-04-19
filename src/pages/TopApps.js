import '../static/css/TopApps.css';
import {useEffect, useState} from "react";
import axiosInstance from "../api/axios";
import bluestacksLogo from "../assets/img.png"
import {MediaCard} from "../components/MediaCard";
import * as PropTypes from "prop-types";
import {Link} from "react-router-dom";

function TopAppsHeader(props) {
    return <header className="App-header">
        <div className={"div-bluestacks"}>
            <img src={bluestacksLogo} alt={"Bluestacks Logo"} className={"bluestacks-logo"}/>
            <span className={"reload"} onClick={props.onClick}>↻</span>
        </div>
        <h1>Top Charts</h1>
    </header>;
}

TopAppsHeader.propTypes = {onClick: PropTypes.func};

function CardView({data}) {
    return (
        <div className={"card-view-playstore"}>{
            data.map((dataItem, i) => {return (i<3? <Link to={`/appdetails/${dataItem.pkg}`}><MediaCard data={dataItem}/></Link> : null);})
        }
        </div>
    );
}

function handleRefresh() {
    axiosInstance('/save-new-apps').then(
        (response) => {
            alert('New Apps synced from playstore');
        }
    )
}

function AppBlock(props) {
    return <div className={"top-app-block"}>
        <h2>{props.heading}</h2>
        <CardView data={props.data}/>
    </div>;
}

AppBlock.propTypes = {apiData: PropTypes.arrayOf(PropTypes.any), heading: PropTypes.string};

function TopApps() {
    const [apiData, setCards] = useState([]);
    const [isBusy, setBusy] = useState(true)
    useEffect(() => {
                axiosInstance(`/get-all-apps`).then((response) => {
                    console.log(response.data.data)
                    setCards(response.data.data);
                    if(isBusy===true)
                        setBusy(false);
                })
                .catch((err) => console.log("Related Posts Error: ", err))
    }, []);
    if (isBusy)
        return <div>Loading....</div>
    return (
        <div>
            <TopAppsHeader onClick={() => handleRefresh()}/>
            <div className={"apps-div"}>
                <AppBlock data={apiData.top_free_apps} heading={"Top Free Apps"}/>
                <AppBlock data={apiData.top_grossing_apps} heading="Top Grossing Apps"/>
                <AppBlock data={apiData.top_paid_apps} heading="Top Paid Apps"/>
                <AppBlock data={apiData.top_free_games} heading="Top Free Games"/>
                <AppBlock data={apiData.top_grossing_games} heading="Top Grossing Games"/>
                <AppBlock data={apiData.top_paid_games} heading="Top Paid Games"/>
            </div>
        </div>
    );
}
export default TopApps;