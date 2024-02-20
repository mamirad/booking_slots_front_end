import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

// Antd
import {
  Menu,
  Dropdown,
  Table,
  Pagination,
  Input,
  Row,
  ConfigProvider,
  Col,
  Modal,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

// Redux
import { useSelector } from "react-redux";

// Constants
import { LISTING_DATA, SORT } from "../../../constants/General";
import { REDUX_STATES } from "../../../constants/ReduxStates";

// Helpers
import { getFiltersCount } from "../../../helpers/GeneralHelper";

// Components
import Page500 from "../../ErrorPages/Page500";
import Loading from "../../Loading";
import Edit from "../Edit";
import Delete from "../Delete";
import Filter from "./Filter";

// Localization
import LOCALIZATION from "../../../services/LocalizationService";

// Styles
// import "./style.scss";

const { Search } = Input;

const { LOADING, RESPONSE, ERROR, SELECTED } = REDUX_STATES;

const TableList = ({
  reduxKey,
  columns,
  actionConfig,
  getData,
  parseData,
  responseKey,
  onRowClick,
  expandable,
  showCheckbox,
  rowClassName,
  setSelectedRowKeys,
  tableLoading,
  headerComponent: Header,
  filterForm: FilterForm,
  title,
  dummyData,
  dataSource,
}) => {
  const [pageNo, setPageNo] = useState(LISTING_DATA.FIRST_PAGE);
  const [pageSize, setPageSize] = useState(LISTING_DATA.PAGE_SIZE);
  const [ordering, setOrdering] = useState("");
  const [search, setSerach] = useState("");
  const [filters, setFilters] = useState({});

  const history = useHistory();

  const {
    [reduxKey + LOADING]: pageLoading = false,
    [reduxKey + RESPONSE]: data = {},
    [reduxKey + ERROR]: error = false,
    [reduxKey + SELECTED]: selectedRowKeys,
  } = useSelector((state) => state?.Crud);
  useEffect(() => {
    getListData(pageNo, pageSize, ordering, search, filters);
  }, []);

  // Loading
  const loading = !!pageLoading || !!tableLoading;

  const total = data?.count || 0;

  const onTableChange = (pagination, filters, sorter) => {
    // for Sorting
    if (!!sorter?.order) {
      if (sorter?.order === SORT.DESC) {
        sortData("-" + sorter.columnKey);
      } else {
        sortData(sorter.columnKey);
      }
    } else {
      sortData("");
    }
  };

  // Sort Data
  const sortData = (order) => {
    setPageNo(LISTING_DATA.FIRST_PAGE);
    setOrdering(order);
    getListData(LISTING_DATA.FIRST_PAGE, pageSize, order, search);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const customizeRenderEmpty = () => (
    <Page500
      isTable={true}
      //refresh={ refresh }
    />
  );

  const results = !!responseKey
    ? data?.[responseKey]
    : Array.isArray(data)
    ? data
    : data?.results || [];

  const getListData = (
    pg = pageNo,
    lm = pageSize,
    order = ordering,
    searchText = search,
    selectedFilters = filters
  ) => {
    let params = {
      page: pg,
      limit: lm,
    };

    !!order && (params.ordering = order);

    searchText !== search && (params.search = searchText);

    if (selectedFilters !== filters) {
      params = {
        ...params,
        ...selectedFilters,
      };
    }

    // getData(params);
  };

  const getColumns = () => {
    const {
      showEdit = false,
      editUrl,
      showDelete = false,
      deleteApi,
      showDuplicate = false,
      duplicateUrl,
      showMail = false,
      mailUrl,
    } = actionConfig || {};
    let arr = [...columns];
    if (!!showEdit || showDelete || showDuplicate || showMail) {
      arr.push({
        title: "Actions",
        dataIndex: "id",
        key: "id",
        render: (text) => (
          <>
            {!!showEdit && <Edit 
            url={editUrl?.replace(":id", text)}/>}
            {!!showDelete && (
              <Delete
                apiUrl={deleteApi?.replace(":id", text)}
                reduxKey={reduxKey}
                
                onSuccess={() =>getListData() }
              />
            )}
           
           
          </>
        ),
      });
    }
    return arr;
  };

  const onPageSizeChange = (pg) => {
    setPageSize(pg);
    setPageNo(LISTING_DATA.FIRST_PAGE);
    getListData(LISTING_DATA.FIRST_PAGE, pg, ordering, search, filters);
  };

  const onPageChange = (pg) => {
    setPageNo(pg);
    getListData(pg, pageSize, ordering, search, filters);
  };

  const menu = (
    <Menu onClick={(e) => onPageSizeChange(e.key)}>
      {new Array(10).fill(true).map((data, index) => {
        const key = (index + 1) * 10;
        return <Menu.Item key={key}>{key}</Menu.Item>;
      })}
    </Menu>
  );

  const onSearch = (sr) => {
    setSerach(sr);
    getListData(LISTING_DATA.FIRST_PAGE, pageSize, ordering, sr, filters);
  };

  const onFilter = (fl) => {
    setFilters(fl);
    Modal.destroyAll();
    getListData(LISTING_DATA.FIRST_PAGE, pageSize, ordering, search, fl);
  };

  const filterCount = getFiltersCount(filters);

  return (
    <>
      {loading && <Loading />}
      <div className="table-full-length">
        <Row className="mb-3 align-center">
          <Col
            span={!!Header ? (!!FilterForm ? 13 : 14) : !!FilterForm ? 22 : 24}
            className="search-with-addon-sec d-flex align-center"
          >
            {title && <span className="search-title mr-2">{title}</span>}
            <Search
              placeholder="Search . . ."
              onSearch={onSearch}
              style={{ width: 200 }}
              allowClear={true}
              className="search-input"
            />
          </Col>
          {!!Header && (
            <Col span={10}>
              <Header />
            </Col>
          )}
          {!!FilterForm && (
            <Col span={1} className="d-flex align-start justify-center">
              <div className="btn-filter ml-2">
                <Filter
                  filters={filters}
                  onFilter={onFilter}
                  filterForm={FilterForm}
                />
                {!!filterCount && (
                  <span className="filter-count">{filterCount}</span>
                )}
              </div>
            </Col>
          )}
        </Row>
        <ConfigProvider renderEmpty={!!error && customizeRenderEmpty}>
          <Table
            columns={getColumns()}
            dataSource={dummyData || parseData?.results || results}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: () => onRowClick && onRowClick(record), // click row
              };
            }}
            onChange={onTableChange}
            expandable={expandable}
            rowSelection={showCheckbox && rowSelection}
            rowClassName={rowClassName}
            rowKey={(record) => record}
            key={(record) => record.id}
          />
        </ConfigProvider>
        {!error && !!results?.length && (
          <Dropdown overlay={menu}>
            <span>
              {LOCALIZATION.RECORDS_PER_PAGE}: {pageSize}
              <CaretDownOutlined />
            </span>
          </Dropdown>
        )}
      </div>
      {!!total && !error && total > pageSize && (
        <Pagination
          current={pageNo || LISTING_DATA.FIRST_PAGE}
          total={total}
          pageSize={pageSize}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      )}
    </>
  );
};

export default TableList;
