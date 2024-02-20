import React, { useState, useEffect } from "react";

// antd
import { Select, Form, Spin, Empty } from "antd";

// lodash
import debounce from "lodash/debounce";

// helpers
import { errorNotification } from "helpers/Notification";

// services
import LOCALIZATION from "services/LocalizationService";

const { Option } = Select;

function DropDownAPI({
  name,
  label,
  showSearch,
  placeholder,
  onChange,
  defaultValue,
  allowClear,
  disabled,
  required,
  loading,
  onKeyUp,
  onKeyDown,
  validator,
  validateTrigger,
  notwrapInForm,
  mode,
  value,
  onClick,
  className,
  onDeselect,
  nameKey = "name",
  idKey = "id",
  ValueFirst,
  callApi
}) {
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allRecordsLoaded, setAllRecordsLoaded] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [defValue, setDefValue] = useState(true);
  const [reload, setReload] = useState(true);

  let searchValue = !!defValue && !!ValueFirst ? ValueFirst : "";

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setLoadingMore(true);
    fetchRecords();
  }, [currentPage, searchQuery, searchValue, reload]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options, searchQuery, searchValue]);

  const fetchRecords = async () => {
    let params = {};
    params.page = currentPage;
    params.limit = 20;
    if (searchQuery !== "") {
      params.search = searchQuery;
      return callApiDropdown(params);
    } else if (searchValue !== "") {
      params.search = searchValue?.substring(0, 3);
      return callApiDropdown(params, "notappend");
    } else {
      return callApiDropdown(params);
    }
  };

  const callApiDropdown = async (params, notAppend) => {
    try {
      const res = await callApi(params);

      const records = res?.results;
      const newOptions = records.map((record) => ({
        id: getIdFromRecord(record),
        name: getNameFromRecord(record),
      }));
      if (!params.page) {
        setOptions(newOptions);
      } else if (notAppend === "notappend") {
        setOptions(newOptions);
      } else {
        setOptions((prevOptions) => {
          const prevIds = prevOptions.map((option) => option?.id);
          const uniqueOptions = newOptions.filter(
            (option) => !prevIds.includes(option?.id)
          );
          return [...prevOptions, ...uniqueOptions];
        });
      }

      setLoadingMore(false);

      if (res?.next == null) {
        setAllRecordsLoaded(true);
      }
    } catch (error) {
      errorNotification(error);
      setLoadingMore(false);
      setAllRecordsLoaded(true);
    }
  };

  const handleSearch = debounce((value) => {
    setSearchQuery(value.trim());
    setCurrentPage(1);
    setLoadingMore(true);
    setOptions([]);
    setAllRecordsLoaded(false);
  }, 1000);

  const handleScroll = (e) => {
    const { target } = e;
    if (
      target.scrollHeight - target.scrollTop === target.clientHeight &&
      !loadingMore &&
      !allRecordsLoaded &&
      currentPage !== null
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
      setLoadingMore(true);
    }
  };

  const getNameFromRecord = (record) => {
    const namePath = nameKey.split(".");
    let nameValue = record;
    for (let key of namePath) {
      nameValue = nameValue[key];
      if (!nameValue) {
        break;
      }
    }
    return nameValue;
  };

  const getIdFromRecord = (record) => {
    const idPath = idKey.split(".");
    let idValue = record;
    for (let key of idPath) {
      idValue = idValue[key];
      if (!idValue) {
        break;
      }
    }
    return idValue;
  };
  const onClear = () => {
    setCurrentPage(1);
    setLoadingMore(true);
    setOptions([]);
    setAllRecordsLoaded(false);
    setDefValue(false);
    setSearchQuery("")
    setReload(!reload)

  };

  let rules = [{ required: required, message: "This field is required" }];
  if (!!validator) {
    rules.push({ validator: validator });
  }

  const DropdownList = (
    <Select
      mode={mode}
      showSearch={!showSearch}
      allowClear={!allowClear}
      defaultValue={defaultValue}
      value={value}
      placeholder={placeholder || LOCALIZATION.PLEASE_SELECT}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      disabled={disabled}
      onClick={onClick}
      loading={loading || loadingMore}
      optionFilterProp="title"
      onDeselect={onDeselect}
      showArrow={!disabled}
      maxTagCount="responsive"
      onClear={onClear}
      notFoundContent={
        loading || loadingMore ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="small" />
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      }
      onPopupScroll={handleScroll}
      onSearch={handleSearch}
    >
      {filteredOptions.map((data, index) => (
        <Option
          disabled={data?.disabled == ""}
          key={index}
          title={data.name}
          value={data.id}
        >
          {data.name}
        </Option>
      ))}
      {loadingMore && (
        <Option key="__loader" disabled>
          <Spin size="small" />
        </Option>
      )}
    </Select>
  );

  return !!notwrapInForm ? (
    <>{DropdownList}</>
  ) : (
    <Form.Item
      name={name}
      className={className}
      label={label}
      validateTrigger={validateTrigger || "onBlur"}
      rules={rules}
    >
      {DropdownList}
    </Form.Item>
  );
}

export default DropDownAPI;