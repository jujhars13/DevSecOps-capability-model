# DevSecOps-capability-model
A simplified capability model for those on DevSecOps transformation journey

## Thanks

Kudos to the original [Timo Pagel](https://github.com/wurstbrot) for the initial [project](https://github.com/wurstbrot/DevSecOps-MaturityModel).

Deployed using Kubernetes to [https://devsecopscm.jujhar.com]()

## TODO

- [ ] change to a helm deployment


## Development

### Running locally for dev

It might seem a bit overkill for what is currently a static site but:
1. I was having fun
2. I'm hoping to swap out for a backend API at some point

To run simply type the following in the project dir:

```bash
docker-compose up

# to hit via nginx proxy, desi cert at the moment so you need --insecure
curl --insecure https://localhost

# to hit Nodejs directly, bypassing nginx proxy
curl http://localhost:8081

# or use `npm install -g reload` to refresh your browser
reload -e "html|js|css|json"
```
