import React from "react";
import "./overview.css"
import Layout from "../../Components/Layout";
import Header from './header-component'
import Statistics from "./statistics-component";
import Charts from "./charts-component";
import Barchart from "./barchart-component";

// Apollo Client setup
import { useQuery } from '@apollo/client';
import { GET_VILLAGES } from '../../grqphql/queries'
function Overview({ stats }) {
    const { villageCount, urbanCount, populationSize, landArea } = stats;
    const {loading,error,data}=useQuery(GET_VILLAGES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <Layout>
            <div className="overview-container">
                <Header villages ={data?.villages || []}/>
                <Statistics villages ={data?.villages || []} />
                <Charts/>
                <Barchart />
            </div>
        </Layout>
    );
}

export default Overview;
