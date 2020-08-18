import React, { Component } from 'react'

export default class index extends Component {
  renderTabNav () {
    return (
      <ul style={{ paddingTop: 10 }} className='nav nav-pills' id='custom-content-below-tab' role='tablist'>
        {this.props.tabNav.map(r => (<li key={r.id} className='nav-item'><a className={`nav-link ${r.active}`} id={`custom-content-below-${r.id}-tab`} data-toggle='pill' href={`#custom-content-below-${r.id}`} role='tab' aria-controls={`custom-content-below-${r.id}`} aria-selected='true'>{r.title}</a></li>))}
      </ul>
    )
  }

  renderTabContent () {
    return (
      <div className='tab-content' id='custom-content-below-tabContent'>
        {this.props.tabNav.map(r => (<div key={r.id} className={`tab-pane fade show ${r.active}`} id={`custom-content-below-${r.id}`} role='tabpanel' aria-labelledby={`custom-content-below-${r.id}-tab`}>{r.content && r.content}{!r.content && r.title}</div>))}
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    )
  }
}
