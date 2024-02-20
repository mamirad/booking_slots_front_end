import React from "react";

// Antd
import { Modal, Form, Col, Button } from "antd";
import {
  FilterOutlined
} from '@ant-design/icons';

// Localization
import LOCALIZATION from "../../../../services/LocalizationService";


function Layout({
  filters,
  onFilter,
  filterForm: FilterForm
}) {

 

  const onFilterClick = () => {
    Modal.info({
      title: 'Apply Filters',
      content: (
        <Form
          onFinish={onFilter}
          layout="vertical"
          initialValues={ filters }
        >
          <FilterForm/>
          <Col
            lg={24}
            md={24}
            sm={24}
            xs={24}
            className="form-control d-flex justify-end form-wrapper-no-margin"
          >
            <Form.Item>
              <Button
                className="mr-3"
                size="large"
                type="secondary"
                onClick={() => Modal.destroyAll()}
              >
                {LOCALIZATION.CANCEL}
              </Button>
              <Button
                size="large"
                htmlType="submit"
                onClick={() => new Event("submit")}
                className="px-5"
                type="primary"
              >
                Apply
              </Button>
            </Form.Item>
          </Col>
        </Form>
      ),
      width: 800,
      closable: true,
      okButtonProps: { style: { display: 'none' } }
    });
  }

  return (
    <>
      <FilterOutlined 
        onClick={ onFilterClick }
      />
    </>
  );
}

export default Layout;