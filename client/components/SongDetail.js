import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'

import SongQuery from '../queries/fetchSong'
import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

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
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={song.id} />
            </div>
        )
    }
}

export default graphql(SongQuery, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail)
