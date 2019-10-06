import fetch from "node-fetch"
import config from "@modules/config"
import isRelativeUrl from 'is-relative-url';
import download from "download"
import {unzip} from 'zip-unzip-promise';
import fs from "fs-extra"
import logger from "@modules/logger"
import * as hooks from "@modules/hooks"

import simpleGit from "simple-git/promise"
import tmp from "tmp"


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

export const download_release = async function({release, dir}){
  let {tag_name: tag} = release

  if (release){
    if (fs.existsSync(`${dir}/versions/${tag}`)) {
      logger.log("Release already downloaded - skipping...")
      return
    } else {
      logger.log("Downloading release")
      await hooks.run({name: "pre-download", dir})
    }

    let headers = {}
    if (config.github && config.github.token){
      headers.Authorization = `token ${config.github.token}`
    }
  
    await download(release.zipball_url, dir + "/versions", {
      filename: `${tag}.zip`,
      headers
    })
  
    await unzip(`${dir}/versions/${tag}.zip`, `${dir}/versions/${tag}-tmp`)
    let folders = await fs.readdir(`${dir}/versions/${tag}-tmp/`)
    await fs.move(`${dir}/versions/${tag}-tmp/${folders[0]}`, `${dir}/versions/${tag}`)
    await fs.remove(`${dir}/versions/${tag}.zip`)
    await fs.remove(`${dir}/versions/${tag}-tmp`)
    await hooks.run({name: "post-download", dir})
  }
}

export const download_commit = async function({commit, repo, dir}){
  if(!config.github) return logger.error("No github config specified")
  let {username, token} = config.github
  if (commit){
    await fs.ensureDir(`${dir}/versions/`)
    if (fs.existsSync(`${dir}/versions/${commit.sha}`)) {
      logger.log("Commit already downloaded - skipping...")
      return
    } else {
      logger.log("Downloading commit")
      await hooks.run({name: "pre-download", dir})
    }
    await simpleGit(`${dir}/versions`).clone(`https://${username}:${token}@github.com/${repo}`, commit.sha, ["--depth", "1"])
    await fs.remove(`${dir}/versions/${commit.sha}/.git`)
    await hooks.run({name: "post-download", dir})
  }
}

export const get_release_from_tag = async function({tag, repo}){
  let release;
  if (tag !== "latest"){
    release = await request(`/repos/${repo}/releases/tags/${tag}`)
  } else {
    release = await request(`/repos/${repo}/releases/${tag}`)
  }

  if (release){
    return release
  } else throw new Error("No release with that tag found")
}

export const get_commit_from_tag = async function({tag, repo}){
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