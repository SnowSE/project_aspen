FROM jboss/keycloak:latest

# RUN sed -i -e 's|<web-context>auth</web-context>|<web-context>aspen/auth</web-context>|g' /opt/jboss/keycloak/standalone/configuration/standalone.xml

USER jboss

RUN sed -i -e 's|<web-context>auth</web-context>|<web-context>aspen/auth/auth</web-context>|' $JBOSS_HOME/standalone/configuration/standalone.xml
RUN sed -i -e 's|<web-context>auth</web-context>|<web-context>aspen/auth/auth</web-context>|' $JBOSS_HOME/standalone/configuration/standalone-ha.xml
RUN sed -i -e 's|name="/"|name="/aspen/auth"|' $JBOSS_HOME/standalone/configuration/standalone.xml
RUN sed -i -e 's|name="/"|name="/aspen/auth"|' $JBOSS_HOME/standalone/configuration/standalone-ha.xml
RUN sed -i -e 's|/auth|/aspen/auth"|' $JBOSS_HOME/welcome-content/index.html
# RUN sed -i -e 's|<web-context>auth</web-context>|<web-context>auth/auth</web-context>|g' $JBOSS_HOME/standalone/configuration/standalone.xml


COPY themes/aspen /opt/jboss/keycloak/themes/aspen
