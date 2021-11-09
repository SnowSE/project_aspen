FROM jboss/keycloak:latest

# these settings are only to allow for development of the keycloak pages
USER jboss
ADD ./standalone-ha.xml /opt/jboss/keycloak/standalone/configuration/standalone-ha.xml 
RUN sed -i -e 's|<web-context>auth</web-context>|<web-context>auth/auth</web-context>|g' $JBOSS_HOME/standalone/configuration/standalone.xml
