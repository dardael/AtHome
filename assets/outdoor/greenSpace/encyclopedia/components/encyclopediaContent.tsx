import React, {useState} from "react";
import LayoutWithToolbar from "../../../../core/components/layoutWithToolbar";
import {Button, Form, Input, InputNumber, Modal, Rate, Select} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {faDroplet, faSun, faTree} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const EncyclopediaContent:React.FunctionComponent<{}>
    = ({}) => {
    const { Option } = Select;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const addPlant = () => {
        setIsModalOpen(false);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return <>
        <LayoutWithToolbar toolbar={
            <Button onClick={showModal} size={'large'} type="primary" icon={<PlusOutlined />}  style={{float: 'right'}}>
                Ajouter
            </Button>
        }>
            <>
            <Modal forceRender centered title="Ajouter une plante" open={isModalOpen} onOk={addPlant} onCancel={closeModal} cancelText={'Annuler'} okText={'Ajouter'}>
                <Form>
                    <Form.Item name='name' label={'Nom'} required>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='type' label={'Type'} required>
                        <Select allowClear>
                            <Option value="tree">Arbre</Option>
                            <Option value="shrub">Arbuste</Option>
                            <Option value="ornamentalPlant">Plante ornementale</Option>
                            <Option value="aromatic">Aromatique</Option>
                            <Option value="pondPlant">Plante de bassin</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'foliage'} label={'Feuillage'} required>
                        <Select allowClear>
                            <Option value="deciduous">Caduc</Option>
                            <Option value="persistent">Persistant</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='sunshine' label={'Ensoleillement'} required>
                        <Rate allowHalf count={1} character={<FontAwesomeIcon icon={faSun} />}/>
                    </Form.Item>
                    <Form.Item name='watering' label={'Arrosage'} required>
                        <Rate allowHalf count={3} character={<FontAwesomeIcon icon={faDroplet}/>}  style={{color:'#0e7aff'}}/>
                    </Form.Item>
                    <Form.Item name='rusticity' label={'Rusticité'} required>
                        <InputNumber></InputNumber>
                    </Form.Item>
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
                </Form>
            </Modal>
            </>
        </LayoutWithToolbar>
    </>
}
export default EncyclopediaContent;
