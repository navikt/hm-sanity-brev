import React from 'react'
import styles from '../styles/styles.css'
import { MdLink } from 'react-icons/md'
import { BsFilterRight } from 'react-icons/bs'

export default [
  { title: 'Fet', value: 'strong' },
  { title: 'Kursiv', value: 'em' },
  {
    title: 'Høyrestill',
    value: 'hoyrestill',
    blockEditor: {
      icon: BsFilterRight,
      render: props => <span className={styles.høyrestill}>{props.children}</span>,
    },
  },
  {
    title: 'Lenke',
    value: 'lenke',
    blockEditor: {
      icon: () => <MdLink className={styles.lenkeIcon} />,
      render: props => (
        <span contentEditable={true} className={styles.lenke}>
          {props.children}
        </span>
      ),
    },
  },
]
