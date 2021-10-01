import React, { Component } from 'react';
import axios from 'axios';

const Repo = props => (
    <div className="card">
        <img alt="avatar" src={props.repo.owner.avatar_url}/>
        <p>Username: {props.repo.name}</p>
        <p>Fullname: {props.repo.full_name}</p>
        <p>Forks: {props.repo.forks_url.length}</p>
        <p>Open Issues: {props.repo.issues_url.length}</p>
        <p>Stars: {props.repo.stargazers_url.length}</p>
        <p>Contributors: {props.repo.contributors_url.length}</p>
    </div>
)

export default class RepoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repos: [],
            cont: ''
        };

        //this.getContributors = this.getContributors.bind(this)
    }

    //get all contributors for each repo name
    /*getContributors(n) {
        axios.get('https://api.github.com/repos/'+ n +'/contributors')
        .then(res => {
            if(res.data.length ===0) {
                return
            }
        })
    }*/

    componentDidMount() {
        //get all repos
        axios.get('https://api.github.com/repositories')
        .then(response => {
            this.setState({ repos: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    repoList() {
        return this.state.repos.map(r => {
            return <Repo repo={r} key={r.id}/>;
        })
    }

    render() {
        return (
            <>
                <input placeholder="Search ..." type="text" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
                <div className="cards">
                    {this.repoList()}
                </div>
            </>
        )
    }

    updateInputValue(evt) {
        //get repos by organization
        axios.get("https://api.github.com/orgs/"+evt.target.value+"/repos")
        .then(response => {
            this.setState({ repos: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }
}