import fetch from "node-fetch"
import config from "@modules/config"
import isRelativeUrl from 'is-relative-url';
import download from "download"
import {unzip} from 'zip-unzip-promise';
import fs from "fs-extra"
import logger from "@modules/logger"
import * as hooks from "@modules/hooks"

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
          logger.error("Could not make request to github.com - exiting...")
          process.exit(-1)
        } else return resolve(json)
      })
      .catch(err => {
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