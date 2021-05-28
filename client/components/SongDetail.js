import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import SongQuery from '../queries/fetchSong'

class SongDetail extends Component {
    render() {
        const { song, loading } = this.props.data
        if (loading) {
            return (
                <div>loading...</div>
            )
        }
        return (
            <div>
                <h3>{song.title}</h3>
            </div>
        )
    }
}

export default graphql(SongQuery, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail)
