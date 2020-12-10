import React from 'react'
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defautProps = {
  title: 'Welcome To ProShop',
  description: 'We sell electronics',
  kewords: 'electronics, buy electronics'
}

export default Meta
