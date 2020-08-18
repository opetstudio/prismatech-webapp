import React, { Component } from 'react'
import Helmet from 'react-helmet'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
const VideoConference = ({ roomName }) => {
  const [jitsi, setJitsi] = React.useState(0)
  const jitsiContainerId = 'jitsi-container-id'
  const loadBheemScript = () => {
    let resolveLoadBheemScriptPromise = null
    const loadBheemScriptPromise = new Promise(resolve => {
      resolveLoadBheemScriptPromise = resolve
    })
    const script = document.createElement('script')
    script.src = 'https://bheem.erevnaraya.com/external_api.js';
    script.async = true
    script.onload = () => resolveLoadBheemScriptPromise(true)
    document.body.appendChild(script)
    return loadBheemScriptPromise
  }
  const initialiseJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadBheemScript()
    }
    const _jitsi = new window.JitsiMeetExternalAPI('bheem.erevnaraya.com', {
      roomName,
      parentNode: document.getElementById(jitsiContainerId)
    })
    setJitsi(_jitsi)
  }

  React.useEffect(() => {
    initialiseJitsi()

    return () => jitsi?.dispose?.()
  }, [])

  return <div id={jitsiContainerId} style={{ height: 720, width: '100%' }} />
}
class PageBheem extends Component {
  render () {
    return (
      <div className='content-wrapper'>
        <LoginCheck />
        <Helmet>
          <title>Home</title>
          <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
        </Helmet>
        {/* Content Header (Page header) */}
        <ContentHeader
          title='Dashboard'
          breadcrumb={[{ title: 'Home', link: '#' }, { title: 'Dashboard', link: null, isActive: true }]}
        />
        {/* /.content-header */}
        {/* Main content */}
        <section className='content'>
          <div className='row'>
            <div className='col-md-12'>
              {<VideoConference roomName='myroom' />}
            </div>
          </div>
        </section>

      </div>
    )
  }
}

export default PageBheem
