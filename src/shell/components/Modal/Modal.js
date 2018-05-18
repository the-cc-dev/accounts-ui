import { Component } from 'react'
import styles from './Modal.less'

export default function Modal(props) {
  return (
    <div className={styles.ModalWrap}>
      <section className={styles.Modal}>
        <Button onClick={() => props.history.goBack()} className={styles.close}>
          <i className="fa fa-times-circle-o" aria-hidden="true" />Close
        </Button>
        <div className={styles.ModalContent}>{props.children}</div>
      </section>
    </div>
  )
}
