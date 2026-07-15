FROM alpine

WORKDIR /w
RUN apk add --update npm git

ARG VERSION
RUN npm install -g @openobserve/openobserve-ci@$VERSION \
    @openobserve/openobserve-ci-plugin-aas@$VERSION \
    @openobserve/openobserve-ci-plugin-cloud-run@$VERSION \
    @openobserve/openobserve-ci-plugin-container-app@$VERSION \
    @openobserve/openobserve-ci-plugin-lambda@$VERSION \
    @openobserve/openobserve-ci-plugin-stepfunctions@$VERSION \
    @openobserve/openobserve-ci-plugin-synthetics@$VERSION \
    @openobserve/openobserve-ci-plugin-terraform@$VERSION \
    && echo -e "Installed packages:\n$(npm list -g | grep -o '@openobserve/.*')"

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
