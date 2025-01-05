import React from "react";
import "./overview.css"
import Layout from "../../Components/Layout";
import Header from './header-component'
import Statistics from "./statistics-component";
import Charts from "./charts-component";
import Barchart from "./barchart-component";

// Apollo Client setup
import { useQuery } from '@apollo/client';
import { GET_VILLAGES } from '../../grqphql/villages-queries'
import { GET_DEMOGRAPHICS } from "../../grqphql/demographics-queries";
function Overview() {
    // Fetch villages data
    const { loading: loadingVillages, error: errorVillages, data: dataVillages } = useQuery(GET_VILLAGES);
    // Fetch demographics data
    const { loading: loadingDemographics, error: errorDemographics, data: dataDemographics } = useQuery(GET_DEMOGRAPHICS);

    // Combined loading state
    if (loadingVillages || loadingDemographics) return <p>Loading...</p>;
    // Combined error state
    if (errorVillages) return <p>Error in villages query: {errorVillages.message}</p>;
    if (errorDemographics) return <p>Error in demographics query: {errorDemographics.message}</p>;

    return (
        <Layout>
            <div className="overview-container">
                <Header villages={dataVillages?.villages || []} />
                <Statistics villages={dataVillages?.villages || []}  demographics={dataDemographics?.demographics || []}/>
                <Charts demographics={dataDemographics?.demographics || []}/>
                <Barchart demographics={dataDemographics?.demographics || []} villages={dataVillages?.villages || [].map(({ village_id, village_name }) => ({village_id,village_name,}))}/>
            </div>
        </Layout>
    );
}

export default Overview;



