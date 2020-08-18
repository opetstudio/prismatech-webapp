import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PaginationActions, { PaginationSelectors } from './redux'
import FieldText from '../../Components/Pagination/FieldText'
class TheComponent extends React.PureComponent {
  componentDidMount () {
    const { defaultValue, value, constantValue } = this.props
    this.handleOnChange(constantValue || value || defaultValue)
  }

  handleOnChange (text) {
    const { fieldOnChange, table, name } = this.props
    fieldOnChange({ table, field: name, value: text })
  }

  render () {
    const { name, id, label, type, placeholder, value, table, hidden } = this.props
    return (
      <FieldText
        onChangeText={this.handleOnChange.bind(this)}
        hidden={hidden}
        name={name}
        id={id}
        label={label}
        type={type}
        placeholder={placeholder}
        value={value || ''}
        table={table}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: PaginationSelectors.fieldValue(state.pagination, ownProps.table, ownProps.name)
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
