import React from 'react';
import { Button, Form, Modal, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Item } = Form;

function MenuForm({ open, setOpen, reloadData }) {
    const props = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Modal
            title="Add Menu"
            visible={open} // Changed prop from "open" to "visible"
            onCancel={() => setOpen(false)}
            centered
            footer={null} // Hide the default footer
        >
            <Form layout='vertical'>
                <Item>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button> {/* Fixed typo: Butto -> Button */}
                    </Upload>
                </Item>
            </Form>
        </Modal>
    );
}

export default MenuForm;
