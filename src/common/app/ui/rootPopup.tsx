import * as React from 'react'
import * as ReactDOM from 'react-dom'

import styles from './rootPopup.css'

// import SettingBoolean from './SettingBoolean'

class Root extends React.Component {
  render(): JSX.Element {
    return (
      <div className={styles.root}>
        <h1 className={styles.title}>{chrome.i18n.getMessage('l10nHello')}</h1>
        {/* <SettingBoolean name="enabled" /> */}
        <p>nothing to see here!</p>
      </div>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
