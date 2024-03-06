import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment-timezone'
import PageLayout from 'components/Common/PageLayout'
const allZones = moment.tz.names()
allZones.unshift('clear')

export default function TimezoneSelect({
  title,
  defaultTZ = moment.tz.guess(),
  timezone,
  setTimezone,
}) {
  const onChange = ({ target: { value } }) =>
    setTimezone(value ? value : defaultTZ)

  return (
    <div>
      <PageLayout  align="center">
        {title ? <strong style={{ marginBottom: 10 }}>{title}</strong> : null}
        
        <select
          className="form-control"
          style={{ width: 200, display: 'inline-block' }}
          value={timezone}
          onChange={onChange}
        >
          {allZones.map((item, idx) => (
            <option key={idx} value={item!== 'clear' ? item : ''}>
              {item}
            </option>
          ))}
        </select>
      </PageLayout>
    </div>
  )
}

TimezoneSelect.propTypes = {
  title: PropTypes.string,
  defaultTZ: PropTypes.string,
  timezone: PropTypes.string,
  setTimezone: PropTypes.func,
}