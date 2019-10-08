import fetch from "node-fetch"
import config from "@modules/config"
import isRelativeUrl from 'is-relative-url';
import fs from "fs-extra"
import logger from "@modules/logger"
import * as hooks from "@modules/hooks"
import * as _state from "@modules/state"

import simpleGit from "simple-git/promise"
import { hashElement } from 'folder-hash';


/**
 * 
 * @param {RequestInfo} path 
 * @param {RequestInit} opts 
 * @returns {Promise<Response>}
 */
export const request = function(path, opts={}){
  let headers = opts.headers || {}
  opts.headers = headers

  if (config.github && config.github.token){
    opts.headers.Authorization = `token ${config.github.token}`
  }

  return new Promise((resolve, reject) => {
    let url = isRelativeUrl(path) ? `https://api.github.com${path}` : path
    let response;
    fetch(url, opts)
      .then(res => {
        response = res
        return res.json()
      })
      .then(json => {
        if (response.status !== 200){
          logger.error(`github.com - ${json.message}`)
          logger.error("Could not make request to github.com - exiting...")
          process.exit(-1)
        } else return resolve(json)
      })
      .catch(err => {
        console.log(err)
        logger.error("Could not make request to github.com - exiting...")
        process.exit(-1)
      });
  });
}

export const download_commit = async function({commit, repo, dir}){
  let state, hashedFolder;
  if(!config.github) return logger.error("No github config specified")
  let {username, token} = config.github
  if (commit){
    await fs.ensureDir(`${dir}/versions/`)
    if (fs.existsSync(`${dir}/versions/${commit.sha}`)) {
      state = await _state.get({dir})
      hashedFolder = await hashElement(`${dir}/versions/${commit.sha}`)
      if (state.versions && state.versions[commit.sha] && state.versions[commit.sha].hash === hashedFolder.hash){
        logger.log("Commit already downloaded - skipping...")
        return
      } else {
        await fs.remove(`${dir}/versions/${commit.sha}`)
        logger.log("Commit changed - downloading again...")
      }

    } else {
      logger.log("Downloading commit")
      await hooks.run({name: "pre-download", dir})
    }
    await simpleGit(`${dir}/versions`).clone(`https://${username}:${token}@github.com/${repo}`, commit.sha, ["--depth", "1"])
    await fs.remove(`${dir}/versions/${commit.sha}/.git`)
    
    
    state = await _state.get({dir})
    hashedFolder = await hashElement(`${dir}/versions/${commit.sha}`)
    state.versions = state.versions || {}
    state.versions[commit.sha] = {...state.versions[commit.sha], ...{
      hash: hashedFolder.hash,
      downloaded: Date.now()
    }}

    await _state.set({dir, state})

    await hooks.run({name: "post-download", dir})
  }
}


export const get_commit_from_tag = async function({tag="latest", repo}){
  let commit;
  if (tag === "latest"){
    commit = await request(`/repos/${repo}/commits/master`)
  } else {
    commit = await request(`/repos/${repo}/commits/${tag}`)
  }

  if (commit){
    return commit
  } else throw new Error("No commit with that tag found")
}