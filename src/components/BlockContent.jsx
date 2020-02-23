import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import BlockContent from '@sanity/block-content-to-react'
import getYoutubeID from 'get-youtube-id'

import { notNilOrEmpty } from '../lib/helpers'

export default props => {
  const _getYTId = value => {
    const id = getYoutubeID(value)
    const url = `https://www.youtube.com/embed/${id}`

    return url
  }

  // custom component in the body content from the CMS
  const serializers = {
    marks: {
      internalLink: ({ mark, children }) => {
        const { internal_slug = {} } = mark
        const href = `/${internal_slug}`
        return (
          <AniLink
            cover
            className="menu-item"
            to={href}
            duration={1.5}
            direction="left"
            bg={`
                      url(${require('../images/pentoo-logo.webp')})
                      center / auto    /* position / size */
                      no-repeat        /* repeat */
                      fixed            /* attachment */
                      padding-box      /* origin */
                      content-box      /* clip */
                      #a3abba          /* color */
                    `}
          >
            {children}
          </AniLink>
        )
      },
      link: ({ mark, children }) => {
        const { blank, href } = mark
        return blank ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          <a href={href}>{children}</a>
        )
      },
    },
    types: {
      youtube: prop => (
        <>
          {console.log(prop)}
          <iframe
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            height="315"
            src={_getYTId(prop.node.url)}
            title="YouTube Video"
            width="560"
          />
        </>
      ),
    },
  }

  console.log(props.blocks)

  return (
    notNilOrEmpty(props) && (
      <>
        <BlockContent
          blocks={props.blocks}
          serializers={serializers}
          className={props.className}
          projectId={process.env.SANITY_ID}
          dataset="production"
        />
      </>
    )
  )
}
