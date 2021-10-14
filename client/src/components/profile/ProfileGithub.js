import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const ProfileGithub = (props) =>{

    const [clientId, setClientId] = useState('31d64130efcb45fcc8bc')
    const [clientSecret, setClientSecret] = useState('a68badb083dd937b2756a2431eb8a197d9296683')
    const [count, setCount] = useState(20)
    const [sort, setSort] = useState('created: asc')
    const [repos, setRepos] = useState([])

    useEffect(() => {
        axios.get(`https://api.github.com/users/${props.profile.github}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
        .then(res => setRepos(res.data))
        .catch(err => console.log(err))
    }, [])
    console.log(repos)

    const repoItems = repos.map((repo) => {
        return(
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <a href={repo.html_url}>{repo.name}</a>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div className="col-md-6">
                     <span className="mr-1">
                     <i className="fas fa-star"></i>: {repo.stargazers_count}
                     </span>
                     <span className="mr-1">
                     <i class="fas fa-eye"></i>: {repo.watchers_count}
                     </span>
                     <span>
                     <i className="fas fa-code-branch"></i>: {repo.forks_count}
                     </span>
                    </div>
                </div>
            </div>
        )
    })



    return (
        <div>
            {repoItems}
        </div>
        
    )
}

export default ProfileGithub