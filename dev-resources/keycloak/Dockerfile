FROM jboss/keycloak:latest

USER jboss

RUN sed -i -e 's|<web-context>auth</web-context>|<web-context>auth/auth</web-context>|g' $JBOSS_HOME/standalone/configuration/standalone.xml
