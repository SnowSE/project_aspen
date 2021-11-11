FROM jboss/keycloak:latest

RUN sed -i -e 's|<web-context>auth</web-context>|<web-context>aspen/auth</web-context>|g' /opt/jboss/keycloak/standalone/configuration/standalone.xml
COPY themes/aspen /opt/jboss/keycloak/themes/aspen
