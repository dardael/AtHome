import React, {useState} from "react";
import LayoutWithToolbar from "../../../../core/components/layoutWithToolbar";
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Modal,
    Rate,
    Row,
    Select
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {faDroplet, faSun, faTree} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import {Plant} from "../entity/Plant";
import {Foliage} from "../entity/Foliage";
import {Type} from "../entity/Type";

const EncyclopediaContent:React.FunctionComponent<{}>
    = ({}) => {
    const { Option } = Select;
    const [plantForm] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const addPlant = () => {
        plantForm.submit();
    }
    const savePlant = async (plant: Plant) => {
        await axios.post('/green-space/encyclopedia/plant/save', plant);
        setIsModalOpen(false);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return <>
        <LayoutWithToolbar toolbar={
            <Button onClick={showModal} size={'large'} type="primary" icon={<PlusOutlined />}  style={{float: 'right'}}>
                Ajouter
            </Button>
        }>
            <>
            <Modal destroyOnClose forceRender centered title="Ajouter une plante" open={isModalOpen} onOk={addPlant} onCancel={closeModal} cancelText={'Annuler'} okText={'Ajouter'}>
                <Form form={plantForm} preserve={false} onFinish={savePlant} labelWrap layout="vertical" style={{paddingTop:'20px'}}>
                    <Row gutter={[40,0]}>
                        <Col md={24} >
                            <Form.Item name='name' label={'Nom'} required>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[40,0]}>
                        <Col md={12}>
                            <Form.Item name='type' label={'Type'} required>
                                <Select allowClear>
                                    {Type.getLabels().map((label) =>
                                        <Option key={label.key} value={label.key}>{label.label}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item name={'foliage'} label={'Feuillage'} required>
                                <Select allowClear>
                                    {Foliage.getLabels().map((label) =>
                                        <Option key={label.key} value={label.key}>{label.label}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[40,0]}>
                        <Col md={12}>
                            <Form.Item name='sunshine' label={'Ensoleillement'} required>
                                <Rate allowHalf count={1} character={<FontAwesomeIcon icon={faSun} />}/>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item name='watering' label={'Arrosage'} required>
                                <Rate count={3} character={<FontAwesomeIcon icon={faDroplet}/>}  style={{color:'#0e7aff'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[40,0]}>
                        <Col md={12}>
                            <Form.Item name='rusticity' label={'Rusticité'} required>
                                <InputNumber addonAfter="°C"></InputNumber>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item name='pruningPeriods' label={'Périodes de taille'} required>
                                <Select allowClear mode={'multiple'}>
                                    <Option value="january">Janvier</Option>
                                    <Option value="february">Février</Option>
                                    <Option value="march">Mars</Option>
                                    <Option value="april">Avril</Option>
                                    <Option value="may">Mai</Option>
                                    <Option value="june">Juin</Option>
                                    <Option value="july">Juillet</Option>
                                    <Option value="august">Aout</Option>
                                    <Option value="september">Septembre</Option>
                                    <Option value="october">Octobre</Option>
                                    <Option value="november">Novembre</Option>
                                    <Option value="december">Décembre</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item name='size' label={'Envergure'} required>
                                <Input.Group compact>
                                    <Form.Item name={['size', 'min']}>
                                        <InputNumber precision={2} min={0} placeholder={'Minimum'} />
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
                                        <InputNumber precision={2} min={0} placeholder={'Maximum'} />
                                    </Form.Item>
                                    <Form.Item name={['size', 'unit']}>
                                        <Select defaultValue="m" allowClear={false}>
                                            <Option value="cm">cm</Option>
                                            <Option value="m">m</Option>
                                        </Select>
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item name='description' label={'Description'}>
                                <TextArea></TextArea>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            </>
        </LayoutWithToolbar>
    </>
}
export default EncyclopediaContent;
