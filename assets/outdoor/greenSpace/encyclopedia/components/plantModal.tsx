import React from "react";
import {
    Col,
    Form,
    Input,
    InputNumber,
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

const PlantModal:React.FunctionComponent<{onSave: Function, onCancel: Function, mustShow: boolean}>
    = ({onSave, onCancel, mustShow}) => {
    const { Option } = Select;
    const [plantForm] = Form.useForm();

    const addPlant = () => {
        plantForm.submit();
    }
    const savePlant = async (plant: Plant) => {
        await axios.post('/outdoor/green-space/encyclopedia/plant/save', plant);
        onSave(plant);
    };

    return <>
            <Modal
                destroyOnClose
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
                            <Form.Item name='name' label={'Nom'} rules={[{ required: true, message: 'Renseignez un nom' }]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[40,0]}>
                        <Col md={24} >
                            <Form.Item name='scientificName' label={'Nom scientifique'}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[40,0]}>
                        <Col md={12}>
                            <Form.Item name='type' label={'Type'} initialValue={Type.ORNAMENTAL_PLANT}>
                                <Select value={Type.ORNAMENTAL_PLANT}>
                                    {Type.getLabels().map((label) =>
                                        <Option key={label.key} value={label.key}>{label.label}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item name={'foliage'} label={'Feuillage'} initialValue={Foliage.DECIDUOUS}>
                                <Select value={Foliage.DECIDUOUS}>
                                    {Foliage.getLabels().map((label) =>
                                        <Option key={label.key} value={label.key}>{label.label}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[40,0]}>
                        <Col md={12}>
                            <Form.Item name='sunshine' label={'Ensoleillement'} initialValue={Sunshine.SHADOW}>
                                <Rate allowHalf count={1} character={<FontAwesomeIcon icon={faSun} />}/>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item name='watering' label={'Arrosage'} initialValue={Watering.NO}>
                                <Rate count={3} character={<FontAwesomeIcon icon={faDroplet}/>}  style={{color:'#0e7aff'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[40,0]}>
                        <Col md={12}>
                            <Form.Item name='rusticity' label={'Rusticité'} initialValue={0}>
                                <InputNumber addonAfter="°C" value={0}></InputNumber>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item name='pruningPeriods' label={'Périodes de taille'} initialValue={[]}>
                                <Select allowClear mode={'multiple'}>
                                    {Month.getLabels().map((label) =>
                                        <Option key={label.key} value={label.key}>{label.label}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item name='size' label={'Envergure'} initialValue={{min:0,max:0,unit:Unit.CENTIMETER}}>
                                <Input.Group compact>
                                    <Form.Item name={['size', 'min']}>
                                        <InputNumber value={0} precision={2} min={0} placeholder={'Minimum'} />
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
                                    <Form.Item name={['size', 'max']}>
                                        <InputNumber value={0} precision={2} min={0} placeholder={'Maximum'} />
                                    </Form.Item>
                                    <Form.Item name={['size', 'unit']}>
                                        <Select value={Unit.METER}>
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
                            <Form.Item name='description' label={'Description'} initialValue={''}>
                                <TextArea></TextArea>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
}
export default PlantModal;
