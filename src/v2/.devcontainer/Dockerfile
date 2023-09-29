FROM almalinux:latest

RUN dnf -y install \
    openssh-clients \
    nodejs \
    openldap-devel \
    rm -rf /var/cache/yum && \z
    npm i -g n && \
    n 16

RUN groupadd --gid 1000 developer \
    && useradd --uid 1000 --gid 1000 -m developer \
    && chown -R developer. /home/developer

USER developer

WORKDIR /app
