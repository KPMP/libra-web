[![Codacy Badge](https://api.codacy.com/project/badge/Grade/812f2e5d255f453e8021519d2a4c7056)](https://www.codacy.com/manual/rlreamy/libra-web?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KPMP/libra-web&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/KPMP/libra-web.svg?branch=develop)](https://travis-ci.org/KPMP/libra-web)

# libra-web
The web-layer of the KPMP curation tools. 

## How to work with this locally
Libra-web lives atop the DLU ecosystem and uses orion-data as its service layer.
In production, DLU and DMD are served up with the same Apache, but we have not yet confgured our local instance to handle this since it would mean that one of the applications would need to run at a different path, which makes compiling for local and production different.

Instead, the easiest way to get the DMD running locally is to modify your .env in heavens-docker/orion to set the ENV_REACT_APPDIR to point at your checked out libra-web instead of orion-web

## Hosted at:
dev-datamanager.kpmp.org
datamanager.kpmp.org
