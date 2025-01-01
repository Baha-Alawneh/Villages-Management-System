import {useState} from 'react'
import './village-management.css'
import VillageList from './village-list-component';
import Popup from './popup-component';
import AddVillageForm from './add-village-form-component';
import UpdateVillageForm from './update-village-form-component';
import UpdateDemographicForm from './update-demographic-form';
import Layout from "../../Components/Layout";

function VillageManagement() {
  const [showPopup, setShowPopup] = useState(false);
  const handleClick = ()=>{
    setShowPopup(true);
    console.log('jjjj');
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
          <VillageList />
        </div>

        {showPopup && <Popup onClose={() => setShowPopup(false)} />}

        <AddVillageForm />
        <UpdateVillageForm />
        <UpdateDemographicForm />
        </Layout>
      
    );
    
  }

  export default VillageManagement;