import React, {useState} from "react";
import LayoutWithToolbar from "../../../../core/components/layoutWithToolbar";
import {
    Button,
    Col,
    Row,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import {Plant} from "../entity/Plant";
import PlantCard from "./plantCard";
import PlantModal from "./plantModal";

const EncyclopediaContent:React.FunctionComponent<{initialPlants: Plant[]}>
    = ({initialPlants}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [plants, setPlants] = useState(initialPlants);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const onPlantSaved = async (plant: Plant) => {
        setIsModalOpen(false);
        setPlants(plants.concat([plant]))
    };
    const deletePlant = (plant: Plant) => {
        setPlants(plants.filter((displayedPlant: Plant) =>
            displayedPlant.id !== plant.id));
        axios.post('/outdoor/green-space/encyclopedia/plant/delete/' + plant.id);
    }

    return <>
        <LayoutWithToolbar toolbar={
            <Button onClick={showModal} size={'large'} type="primary" icon={<PlusOutlined />}  style={{float: 'right'}}>
                Ajouter
            </Button>
        }>
            <>
                <Row justify={"start"} gutter={[16,16]} style={{marginLeft:"unset", marginRight:'unset'}}>
                    {plants.map((plant, index) => {
                        return <Col key={plant.id} flex={'auto 300px'} style={{ height:350 }}
                        ><PlantCard initialPlant={plant} onDelete={deletePlant}></PlantCard></Col>
                    })}
                </Row>
                <PlantModal onSave={onPlantSaved} onCancel={closeModal} mustShow={isModalOpen}/>
            </>
        </LayoutWithToolbar>
    </>
}
export default EncyclopediaContent;
