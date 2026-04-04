#!/usr/bin/env bash
id=${1?'missing date eg 20260307'}
ffplay https://rthkaod2022.akamaized.net/m4a/radio/archive/radio1/People/m4a/$id.m4a/index_0_a.m3u8
