import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../../layouts/Default'
import SEO from '../../components/SEO/SEO'
import Grid from '../../fragments/Grid'
import data from '../../data.json'
import styles from './Examples.css'
import { Link } from 'gatsby'

const tags = data.reduce((acc, curr) => {
  if (curr.tags) {
    acc = acc.concat(curr.tags)
  }
  return acc
}, [])
const uniqueTags = new Set(tags)

export default class Examples extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      tag: ''
    }
  }
  changeTag = (e) => {
    console.log('e.target.innerText', e.target.innerText)
    this.setState({
      tag: e.target.innerText
    })
  }
  renderTags = () => {
    const { tag } = this.state
    return ['all'].concat(Array.from(uniqueTags)).map((name, i) => {
      let classes = styles.tag
      if ((!tag && name === 'all') || tag === name) {
        classes = `${styles.current} ${styles.tag}`
      }
      return (
        <span key={i} className={classes} onClick={this.changeTag}>
          {name}
        </span>
      )
    })
  }
  renderSidebar = () => {
    return (
      <div>
        <nav className={styles.links}>
          <Link to='/'>
            Back home
          </Link>
        </nav>
        <div className={styles.tagWrapper}>
          <h3>Browse by tag</h3>
          <div className={styles.tags}>
            { this.renderTags() }
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { tag } = this.state
    const theTag = (tag !== 'all') ? tag : ''
    return (
      <Layout sidebar={this.renderSidebar()}>
        <div className={styles.wrapper}>
          <Helmet title={'Netlify Function Examples'} />
          <SEO />
          <div className={styles.content}>
            <div style={{ paddingBottom: 300 }}>
              <Grid data={data} tag={theTag} title='Function Examples' />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}