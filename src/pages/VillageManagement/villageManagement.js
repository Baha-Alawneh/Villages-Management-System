import {useState} from 'react'
import './village-management.css'
import VillageList from './village-list-component';
import Popup from './popup-component';
import AddVillageForm from './add-village-form-component';
import UpdateVillageForm from './update-village-form-component';
import UpdateDemographicForm from './update-demographic-form';
import Layout from "../../Components/Layout";

// Apollo Client setup
import { useQuery } from '@apollo/client';
import { GET_VILLAGES } from '../../grqphql/villages-queries'
function VillageManagement() {
  const [showPopup, setShowPopup] = useState(false);
  const {loading, error, data} = useQuery(GET_VILLAGES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  const handleClick = ()=>{
    setShowPopup(true);
  }
    return (
     
      <Layout>
        <div className="village-container">
          <input
            type="button"
            id="add-new-village"
            className="add-new-village"
            value="Add New Village"
            onClick={handleClick}
          />
          <VillageList villagesList ={data?.villages || []}/>
        </div>

        {showPopup && <AddVillageForm setShowPopup={setShowPopup} />}


        </Layout>
      
    );
    
  }

  export default VillageManagement;