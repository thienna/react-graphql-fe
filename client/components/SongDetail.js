import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import SongQuery from '../queries/fetchSong'

class SongDetail extends Component {
    render() {
        console.log(this.props.data)
        return (
            <div>
                <h3>{this.props.data.song.title}</h3>
            </div>
        )
    }
}

export default graphql(SongQuery, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail)
