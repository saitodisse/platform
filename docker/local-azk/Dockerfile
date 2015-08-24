# Copyright (c) 2015 Spinpunch, Inc. All Rights Reserved.
# See License.txt for license information.
FROM azukiapp/ruby:latest

# Install Dependancies
RUN gem install compass

#
# Install GO
#

RUN apt-get update && apt-get install -y \
		gcc libc6-dev make git mercurial \
		--no-install-recommends \
	&& rm -rf /var/lib/apt/lists/*

ENV GOLANG_VERSION 1.4.2

RUN curl -sSL https://golang.org/dl/go$GOLANG_VERSION.src.tar.gz \
		| tar -v -C /usr/src -xz

RUN cd /usr/src/go/src && ./make.bash --no-clean 2>&1

ENV PATH /usr/src/go/bin:$PATH

RUN mkdir -p /go/src /go/bin && chmod -R 777 /go
ENV GOPATH /go
ENV PATH /go/bin:$PATH
WORKDIR /go

# # Copy over files
# ADD . /go/src/github.com/mattermost/platform

# RUN go get github.com/tools/godep
# RUN cd /go/src/github.com/mattermost/platform/; godep go install
# RUN cd /go/src/github.com/mattermost/platform/web/react; npm install

# ADD /docker/local/config_docker.json /
# ADD /docker/local/docker-entry.sh /

# RUN chmod +x /docker-entry.sh
# ENTRYPOINT /docker-entry.sh

# # Create default storage directory
# RUN mkdir /mattermost-data/

# Ports
# EXPOSE 80
