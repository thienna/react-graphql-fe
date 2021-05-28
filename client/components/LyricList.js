import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import query from '../queries/fetchSongs'

class LyricList extends Component {
    onLyricLike(id, likes) {
        this.props.mutate({
            variables: {
                id: id
            },
            optimisticResponse: {
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        })
    }

    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <div key={id} className="collection-item">
                    {content}
                    <li className="vote-box">
                        {likes}
                        <i
                            className="material-icons"
                            onClick={() => this.onLyricLike(id, likes)}
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
