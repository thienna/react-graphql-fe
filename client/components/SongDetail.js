import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'

import SongQuery from '../queries/fetchSong'
import LyricCreate from './LyricCreate'

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
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricCreate />
            </div>
        )
    }
}

export default graphql(SongQuery, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail)
