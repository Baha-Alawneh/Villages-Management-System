import React from "react";
import "./overview.css"
import Layout from "../../Components/Layout";
import Header from './header-component'
import Statistics from "./statistics-component";
import Charts from "./charts-component";
import Barchart from "./barchart-component";
function Overview({ stats }) {
    const { villageCount, urbanCount, populationSize, landArea } = stats;

    return (
        <Layout>
            <div className="overview-container">
                <Header/>
                <Statistics/>
                <Charts/>
                <Barchart />

            </div>
        </Layout>
    );
}

export default Overview;
