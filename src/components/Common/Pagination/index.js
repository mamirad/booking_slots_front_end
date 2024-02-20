import React from "react";

// Antd
import { Pagination, Row, Dropdown, Menu, Col } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

// Localization
import LOCALIZATION from "../../../services/LocalizationService";

const Index = ({ total, current, pageSize, onChange, onPageSizeChange }) => {
  const menu = (
    <Menu onClick={onPageSizeChange}>
      {new Array(10).fill(true).map((data, index) => {
        const key = (index + 1) * 10;
        return <Menu.Item key={key}>{key}</Menu.Item>;
      })}
    </Menu>
  );
  return (
    <div>
      <Row className="mb-3">
      <Col span={12} >
          {!!total && total > pageSize && (
            <Pagination
              total={total}
              current={current}
              pageSize={pageSize}
              onChange={onChange}
              showSizeChanger={false}
            />
          )}
        </Col>
        <Col span={12} className="d-flex justify-end">
          <Dropdown overlay={menu}>
            <span>
              {LOCALIZATION.RECORDS_PER_PAGE}: {pageSize}
              <CaretDownOutlined />
            </span>
          </Dropdown>
          </Col>
          
      </Row>
    </div>
  );
};

export default Index;
