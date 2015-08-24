systems({
  base: {
    depends: [],
    image: {"dockerfile": "docker/local-azk/Dockerfile"},
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    provision: [
      "go get github.com/tools/godep",
      "cd /go/src/github.com/mattermost/platform/; godep go install",
      "cd /go/src/github.com/mattermost/platform/web/react; npm install",
    ],
    command: "echo \"DO NOTHING\"",

    // this is not a server
    // just call with azk shell deploy
    scalable: { default: 1, limit: 1 },
    http: null,
    ports: null,
    wait: undefined,

    mounts: {
      '/go/src/github.com/mattermost/#{manifest.dir}': path("."),
    },
    envs: {
      // EXAMPLE: "value",
    },
  },


  "go-web": {
    extends: ['base'],
    command: "cd /go/src/github.com/mattermost/platform/; godep go run mattermost.go -config=/go/src/github.com/mattermost/platform/docker/local-azk/config_docker.json",
  },

  "dev-react": {
    extends: ['base'],
    mounts: {
      '/go/src/github.com/mattermost/#{manifest.dir}': path("."),
      '/go/src/github.com/mattermost/#{manifest.dir}/web/react/node_modules': persistent("./web/react/node_modules")
    },
    command: "cd /go/src/github.com/mattermost/platform/web/react && npm start",
  },

  "dev-compass": {
    extends: ['base'],
    command: "cd /go/src/github.com/mattermost/platform/web/sass-files && compass watch",
  },

});
