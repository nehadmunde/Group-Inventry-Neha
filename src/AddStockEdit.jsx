import { Button, Modal } from "antd";
import axios from "axios";
import { Form, Input, Select } from "antd";
import { useState } from "react";
import "antd/dist/antd.css";
import EditIcon from "@mui/icons-material/Edit";

import TextField from "@mui/material/TextField";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddStockEdit = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [form] = Form.useForm();

  const id = props.id._id;

  const onFinish = (values) => {
    axios
      .put(`http://localhost:7001/edit/${id}`, values)
      .then((res) => {
        alert("Record Updated");
        console.log("post", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // for set default values
  form.setFieldsValue({
    name: props.id.name,
    qty: props.id.qty,
    price: props.id.price,
    catagory: props.id.catagory,
    company: props.id.company,
  });
  return (
    <>
      <Button onClick={showModal}>
        <EditIcon />
      </Button>
      <Modal
        title="Update"
        visible={isModalVisible}
        onOk={onFinish}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="name"
            value={props.id.name}
            label="Item Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value={props.id.name} />
          </Form.Item>
          <Form.Item
            name="qty"
            label="Quantity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="catagory"
            label="Catagory"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          ></Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "black",
              }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddStockEdit;
