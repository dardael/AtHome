import React, {useState} from "react";
import LayoutWithToolbar from "../../../../core/components/layoutWithToolbar";
import {
    Button,
    Col, message,
    Row,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import {Plant} from "../entity/Plant";
import PlantCard from "./plantCard";
import PlantModal from "./plantModal";
import PlantsSorterEntity from "../lib/PlantsSorter";
import PlantsSorter from "./plantsSorter";

const EncyclopediaContent:React.FunctionComponent<{initialPlants: Plant[]}>
    = ({initialPlants}) => {
    const initialSortedPlants = new PlantsSorterEntity(initialPlants).sortByNameAsc();
    const [messageApi, contextHolder] = message.useMessage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedPlant, setEditedPlant] = useState(null);
    const [plants, setPlants] = useState(initialSortedPlants);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setEditedPlant(null);
    };
    const onPlantSaved = async (plant: Plant) => {
        const isEditing = !!editedPlant;
        setIsModalOpen(false);
        setEditedPlant(null);
        if (!isEditing) {
            setPlants(plants.concat([plant]))
        } else {
            setPlants(plants.map((displayedPlant) =>
                plant.id === displayedPlant.id ? plant : displayedPlant
            ));
        }
    };
    const deletePlant = async (plant: Plant) => {
        setPlants(plants.filter((displayedPlant: Plant) =>
            displayedPlant.id !== plant.id));
        await axios.post('/outdoor/green-space/encyclopedia/plant/delete/' + plant.id);
        messageApi.open({
            type: 'success',
            content: 'La plante "' + plant.name + '" a été correctement supprimée de l\'encyclopédie.'
        });
    }

    const openEditPlantModal = (plant:Plant) => {
        setEditedPlant(plant);
        setIsModalOpen(true)
    }

    return <>
        {contextHolder}
        <LayoutWithToolbar toolbar={
            <>
                <Button onClick={showModal}
                        size={'large'}
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{float: 'right'}}
                >
                    Ajouter
                </Button>
                <PlantsSorter onSort={setPlants} plants={plants}
                        style={{float: 'right', marginRight: 5}}
                />
            </>
        }>
            <>
                <Row justify={"start"} gutter={[16,16]} style={{marginLeft:"unset", marginRight:'unset'}}>
                    {plants.map((plant) => {
                        return <Col key={plant.id} flex={'auto 300px'} style={{ height:350 }}
                        ><PlantCard onEdit={openEditPlantModal} initialPlant={plant} onDelete={deletePlant}></PlantCard></Col>
                    })}
                </Row>
                <PlantModal plant={editedPlant} onSave={onPlantSaved} onCancel={closeModal} mustShow={isModalOpen}/>
            </>
        </LayoutWithToolbar>
    </>
}
export default EncyclopediaContent;
