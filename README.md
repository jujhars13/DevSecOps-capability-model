# DevSecOps-capability-model
A simplified capability model for those on DevSecOps transformation journey

## Thanks

Kudos to the original [Timo Pagel](https://github.com/wurstbrot) for the initial [project](https://github.com/wurstbrot/DevSecOps-MaturityModel).

Deployed using github-pages to [https://devsecopscm.jujhar.com]()


## Building and running

```bash
# build assets
docker run --rm -v ${PWD}/app:/srv/jekyll jekyll/jekyll jekyll build

# local serve assets
docker run -it --rm -v ${PWD}/app:/srv/jekyll -p 127.0.0.1:4000:4000 jekyll/jekyll jekyll serve
```
