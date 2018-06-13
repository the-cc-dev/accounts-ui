import { Component } from 'React'
import styles from './AppError.less'

export default class AppError extends Component {
  constructor(props) {
    super(props)
    this.state = {
      err: null,
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    console.log('Caught Error', error, info)

    // Display fallback UI
    this.setState({
      err: error,
      hasError: true
    })
    // You can also log the error to an error reporting service
    console.table(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className={styles.AppCrash}>
          <h1>
            <i className="fa fa-bug" aria-hidden="true" />&nbsp;We apologize but
            something went wrong
          </h1>
          <h3>
            Try reloading the application (CMD + R).&nbsp;
            <Url
              href={`mailto:support@zesty.io?subject=Accounts App Crash&body=REPLACE WITH EXTRA INFORMATION ---- ${
                this.state.err
              }`}
              target="_blank"
            >
              Report to support@zesty.io
            </Url>
          </h3>
        </section>
      )
    } else {
      return this.props.children
    }
  }
}
