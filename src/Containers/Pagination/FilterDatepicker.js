import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import Moment from 'moment'
import PaginationActions, { PaginationSelectors } from './redux'
import FilterDatepicker from '../../Components/Pagination/FilterDatepicker'
class TheComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.daterangeOnChange = this.daterangeOnChange.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  componentDidMount () {
    const { defaultValue, value, id, formatDate, constantValue } = this.props
    window.singleDatePicker('#' + id, formatDate, this.daterangeOnChange)
    this.handleOnChange(constantValue || value || defaultValue)
  }

  handleOnChange (text) {
    const { fieldOnChange, table, name } = this.props
    fieldOnChange({ table, field: name, value: text })
  }

  daterangeOnChange (start, end) {
    const { handleOnChange, table, name, formatDate } = this.props
    const filter = { transactionStartDate: Moment(parseInt(start)).format(formatDate), transactionEndDate: Moment(parseInt(end)).format(formatDate) }
    this.handleOnChange(filter.transactionStartDate)
  }

  render () {
    const { name, id, label, type, placeholder, value, table, hidden } = this.props
    return (
      <FilterDatepicker
        name={name}
        label={label}
        placeholder={placeholder}
        id={id}
        value={value}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: PaginationSelectors.fieldValue(state.pagination, ownProps.table, `${ownProps.name}`) || ''
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fieldOnChange: query => dispatch(PaginationActions.fieldOnChange(query))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))
