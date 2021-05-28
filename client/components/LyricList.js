import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import query from '../queries/fetchSongs'

class LyricList extends Component {
    onLyricLike(id) {
        this.props.mutate({
            variables: {
                id: id
            }
        })
    }

    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <div className="collection-item">
                    {content}
                    <li key={id} className="vote-box">
                        {likes}
                        <i
                            className="material-icons"
                            onClick={() => this.onLyricLike(id)}
                        >
                            thumb_up
                        </i>
                    </li>
                </div>
            )
        })
    }

    render() {
        if (this.props.data.loading) {
            return (
                <div>loading...</div>
            )
        }
        return (
            <div>
                <ul className="collection">
                    {this.renderLyrics()}
                </ul>
            </div>
        )
    }
}

const mutation = gql`
mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
} 
`

export default graphql(mutation)(
    graphql(query)(LyricList)
)
