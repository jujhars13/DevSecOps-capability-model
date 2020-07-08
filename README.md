# DevSecOps-capability-model
A simplified capability model for those on DevSecOps transformation journey.

## Thanks

Kudos to the original [Timo Pagel](https://github.com/wurstbrot) for the initial [project](https://github.com/wurstbrot/DevSecOps-MaturityModel).

Deployed using github-pages to [https://devsecops.jujhar.com]()


## Building and running

```bash
# to server on localhost:4000 and continuously compile pages
docker run -it --rm -v ${PWD}:/srv/jekyll -p 127.0.0.1:4000:4000 jekyll/jekyll jekyll serve

# one time build assets into _site
docker run --rm -v ${PWD}:/srv/jekyll jekyll/jekyll jekyll build
```
