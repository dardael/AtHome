import React, {useEffect} from "react";
import {
    Col,
    Form,
    Input,
    InputNumber, message,
    Modal,
    Rate,
    Row,
    Select
} from "antd";
import {faDroplet, faSun, faTree} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import {Plant} from "../entity/Plant";
import {Foliage} from "../entity/plant/Foliage";
import {Type} from "../entity/plant/Type";
import {Unit} from "../entity/plant/Unit";
import {Month} from "../entity/plant/Month";
import {Sunshine} from "../entity/plant/Sunshine";
import {Watering} from "../entity/plant/Watering";
import SunshineRate from "./sunshineRate";
import WateringRate from "./wateringRate";

const PlantModal:React.FunctionComponent<{plant?: Plant, onSave: Function, onCancel: Function, mustShow: boolean}>
    = ({plant, onSave, onCancel, mustShow}) => {
    const { Option } = Select;
    const [plantForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        plantForm.resetFields();
    })
    const addPlant = () => {
        plantForm.submit();
    }
    const savePlant = async (savedPlant: Plant) => {
        if (plant) {
            savedPlant.id = plant.id;
        }
        const response = await axios.post('/outdoor/green-space/encyclopedia/plant/save', savedPlant);
        messageApi.open({
            type: 'success',
            content: !plant
                ? ('La plante "' + savedPlant.name + '" a été correctement ajoutée à l\'encyclopédie.')
                : ('La plante "' + savedPlant.name + '" a été modifiée.'),
        });
        savedPlant.id = response.data.plantId;
        onSave(savedPlant);
    };

    return <>
            {contextHolder}
            <Modal
                destroyOnClose={true}
                forceRender
                centered
                title="Ajouter une plante"
                open={mustShow}
                onOk={addPlant}
                onCancel={() => onCancel()}
                cancelText={'Annuler'}
                okText={'Ajouter'}
            >
                <Form form={plantForm} preserve={false} onFinish={savePlant} labelWrap layout="vertical" style={{paddingTop:'20px'}}>
                    <Row gutter={[40,0]}>
                        <Col md={24} >
                            <Form.Item initialValue={plant ? plant.name : ''} name='name' label={'Nom'} rules={[{ required: true, message: 'Renseignez un nom' }]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[40,0]}>
                        <Col md={24} >
                            <Form.Item initialValue={plant ? plant.scientificName : ''} name='scientificName' label={'Nom scientifique'}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[40,0]}>
                        <Col md={12}>
                            <Form.Item name='type' label={'Type'} initialValue={plant ? plant.type : Type.ORNAMENTAL_PLANT}>
                                <Select value={plant ? plant.type : Type.ORNAMENTAL_PLANT}>
                                    {Type.getLabels().map((label) =>
                                        <Option key={label.key} value={label.key}>{label.label}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item name={'foliage'} label={'Feuillage'} initialValue={plant ? plant.foliage : Foliage.DECIDUOUS}>
                                <Select value={plant ? plant.foliage : Foliage.DECIDUOUS}>
                                    {Foliage.getLabels().map((label) =>
                                        <Option key={label.key} value={label.key}>{label.label}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[40,0]}>
                        <Col md={12}>
                            <Form.Item name='sunshine' label={'Ensoleillement'} initialValue={Number(plant ? plant.sunshine : Sunshine.SHADOW)}>
                                <SunshineRate/>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item name='watering' label={'Arrosage'} initialValue={plant ? plant.watering : Watering.NO}>
                                <WateringRate/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[40,0]}>
                        <Col md={12}>
                            <Form.Item name='rusticity' label={'Rusticité'} initialValue={plant ? plant.rusticity : 0}>
                                <InputNumber addonAfter="°C" value={plant ? plant.rusticity : 0}></InputNumber>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item name='pruningPeriods' label={'Périodes de taille'} initialValue={plant ? plant.pruningPeriods : []}>
                                <Select allowClear mode={'multiple'} value={plant ? plant.pruningPeriods : []}>
                                    {Month.getLabels().map((label) =>
                                        <Option key={label.key} value={label.key}>{label.label}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item name='size' label={'Envergure'} initialValue={plant ? plant.size : {min:0,max:0,unit:Unit.CENTIMETER}}>
                                <Input.Group compact>
                                    <Form.Item name={['size', 'min']} initialValue={plant ? plant.size.min : 0}>
                                        <InputNumber value={plant ? plant.size.min : 0} precision={2} min={0} placeholder={'Minimum'} />
                                    </Form.Item>
                                    <Input
                                        style={{
                                            width: 30,
                                            borderLeft: 0,
                                            borderRight: 0,
                                            pointerEvents: 'none',
                                        }}
                                        placeholder="~"
                                        disabled
                                    />
                                    <Form.Item name={['size', 'max']} initialValue={plant ? plant.size.max : 0}>
                                        <InputNumber value={plant ? plant.size.max : 0} precision={2} min={0} placeholder={'Maximum'} />
                                    </Form.Item>
                                    <Form.Item name={['size', 'unit']} initialValue={plant ? plant.size.unit : Unit.CENTIMETER}>
                                        <Select value={plant ? plant.size.unit : Unit.CENTIMETER}>
                                            {Unit.getLabels().map((label) =>
                                                <Option key={label.key} value={label.key}>{label.label}</Option>
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item name='description' label={'Description'} initialValue={plant ? plant.description : ''}>
                                <TextArea></TextArea>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
}
export default PlantModal;
