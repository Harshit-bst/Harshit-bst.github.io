import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../api/axios";
import bluestacksLogo from "../assets/img.png";
import {MediaCard} from "../components/MediaCard";
import "../static/css/AppDetails.css"
import * as PropTypes from "prop-types";
import BasicRating from "../components/Rating";
import {Button} from "@mui/material";
import PlayCarousel from "../components/PlayCarousel";
import ReadMore from "../components/ReadMore";

function AppDetailsTop(props) {
    const {data} = props
    const {icon_url, name, rating, total_ratings, genre, corporation, download_url} = data
    return (
        <div className={"app-details-top"}>
            <div className="left-arrow-div"><i className="left arrow"></i></div>
            <div className={"app-details-icon-div"}>
                <img src={icon_url} className={"main-icon responsive"}/>
                <div className={"app-details-name-div"}>
                    <h1>{name}</h1>
                    <div className={"rating-div"}>
                        <BasicRating rating={rating}/>
                        <p>{total_ratings}</p>
                    </div>
                    <div className={"tags-div"}>
                        <Button variant={"text"} color={"secondary"}>{corporation}</Button>
                        <Button variant={"text"} color={"secondary"}>{genre}</Button>
                    </div>
                    <Button variant="contained" color="success" size={"large"}  href={download_url}>
                        Download for PC
                    </Button>
                </div>
            </div>
        </div>
    );
}

AppDetailsTop.propTypes = {data: PropTypes.any};
export default function AppDetails(){
    const {pkg_name} = useParams();
    const [apiData, setData] = useState([]);
    const [isBusy, setBusy] = useState(true)
    useEffect(() => {
        axiosInstance(`/apps/details?id=${pkg_name}`).then((response) => {
            setData(response.data.data);
            if(isBusy===true)
                setBusy(false);
        }).catch((err) => console.log("Error: ", err))
    }, []);
    if (isBusy)
        return <div>Loading....</div>
    if (apiData.error)
        return <div>
                <div className={"div-bluestacks"}>
                    <Link to={`/frontend_top_rated_app/`}><img src={bluestacksLogo} alt={"Bluestacks Logo"} className={"bluestacks-logo"}/></Link>
                </div>
                <div className={"app-details-div"}>Error occurred while getting the app details. Please make sure package name is correct</div>
               </div>
    return (
        <div>
            <div className={"div-bluestacks"}>
                <Link to={`/frontend_top_rated_app/`}><img src={bluestacksLogo} alt={"Bluestacks Logo"} className={"bluestacks-logo"}/></Link>
            </div>
            <div className={"app-details-div"}>
                <AppDetailsTop data={apiData}></AppDetailsTop>
                <div className={"owl-player-div"}><PlayCarousel data={apiData}/></div>
            </div>
            <div className={"div-content container"}>
                <ReadMore>
                    {apiData.content}
                </ReadMore>
            </div>
        </div>
    );
}