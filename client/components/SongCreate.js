import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import queryFetchSongs from '../queries/fetchSongs'

class SongCreate extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '' }
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{ query: queryFetchSongs }]
        }).then(() => { hashHistory.push('/') })
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>create a new song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title: {this.state.title}</label>
                    <input
                        onChange={event => this.setState({ title: event.target.value })}
                        value={this.state.title}
                    />
                </form>
            </div>
        )
    }
}

const mutation = gql`
mutation addSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
}
`

export default graphql(mutation)(SongCreate)
