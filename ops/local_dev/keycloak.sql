--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Debian 13.4-1.pgdg100+1)
-- Dumped by pg_dump version 13.4 (Debian 13.4-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_event_entity; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.admin_event_entity (
    id character varying(36) NOT NULL,
    admin_event_time bigint,
    realm_id character varying(255),
    operation_type character varying(255),
    auth_realm_id character varying(255),
    auth_client_id character varying(255),
    auth_user_id character varying(255),
    ip_address character varying(255),
    resource_path character varying(2550),
    representation text,
    error character varying(255),
    resource_type character varying(64)
);


ALTER TABLE public.admin_event_entity OWNER TO keycloak;

--
-- Name: associated_policy; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.associated_policy (
    policy_id character varying(36) NOT NULL,
    associated_policy_id character varying(36) NOT NULL
);


ALTER TABLE public.associated_policy OWNER TO keycloak;

--
-- Name: authentication_execution; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.authentication_execution (
    id character varying(36) NOT NULL,
    alias character varying(255),
    authenticator character varying(36),
    realm_id character varying(36),
    flow_id character varying(36),
    requirement integer,
    priority integer,
    authenticator_flow boolean DEFAULT false NOT NULL,
    auth_flow_id character varying(36),
    auth_config character varying(36)
);


ALTER TABLE public.authentication_execution OWNER TO keycloak;

--
-- Name: authentication_flow; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.authentication_flow (
    id character varying(36) NOT NULL,
    alias character varying(255),
    description character varying(255),
    realm_id character varying(36),
    provider_id character varying(36) DEFAULT 'basic-flow'::character varying NOT NULL,
    top_level boolean DEFAULT false NOT NULL,
    built_in boolean DEFAULT false NOT NULL
);


ALTER TABLE public.authentication_flow OWNER TO keycloak;

--
-- Name: authenticator_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.authenticator_config (
    id character varying(36) NOT NULL,
    alias character varying(255),
    realm_id character varying(36)
);


ALTER TABLE public.authenticator_config OWNER TO keycloak;

--
-- Name: authenticator_config_entry; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.authenticator_config_entry (
    authenticator_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.authenticator_config_entry OWNER TO keycloak;

--
-- Name: broker_link; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.broker_link (
    identity_provider character varying(255) NOT NULL,
    storage_provider_id character varying(255),
    realm_id character varying(36) NOT NULL,
    broker_user_id character varying(255),
    broker_username character varying(255),
    token text,
    user_id character varying(255) NOT NULL
);


ALTER TABLE public.broker_link OWNER TO keycloak;

--
-- Name: client; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client (
    id character varying(36) NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    full_scope_allowed boolean DEFAULT false NOT NULL,
    client_id character varying(255),
    not_before integer,
    public_client boolean DEFAULT false NOT NULL,
    secret character varying(255),
    base_url character varying(255),
    bearer_only boolean DEFAULT false NOT NULL,
    management_url character varying(255),
    surrogate_auth_required boolean DEFAULT false NOT NULL,
    realm_id character varying(36),
    protocol character varying(255),
    node_rereg_timeout integer DEFAULT 0,
    frontchannel_logout boolean DEFAULT false NOT NULL,
    consent_required boolean DEFAULT false NOT NULL,
    name character varying(255),
    service_accounts_enabled boolean DEFAULT false NOT NULL,
    client_authenticator_type character varying(255),
    root_url character varying(255),
    description character varying(255),
    registration_token character varying(255),
    standard_flow_enabled boolean DEFAULT true NOT NULL,
    implicit_flow_enabled boolean DEFAULT false NOT NULL,
    direct_access_grants_enabled boolean DEFAULT false NOT NULL,
    always_display_in_console boolean DEFAULT false NOT NULL
);


ALTER TABLE public.client OWNER TO keycloak;

--
-- Name: client_attributes; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_attributes (
    client_id character varying(36) NOT NULL,
    value character varying(4000),
    name character varying(255) NOT NULL
);


ALTER TABLE public.client_attributes OWNER TO keycloak;

--
-- Name: client_auth_flow_bindings; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_auth_flow_bindings (
    client_id character varying(36) NOT NULL,
    flow_id character varying(36),
    binding_name character varying(255) NOT NULL
);


ALTER TABLE public.client_auth_flow_bindings OWNER TO keycloak;

--
-- Name: client_initial_access; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_initial_access (
    id character varying(36) NOT NULL,
    realm_id character varying(36) NOT NULL,
    "timestamp" integer,
    expiration integer,
    count integer,
    remaining_count integer
);


ALTER TABLE public.client_initial_access OWNER TO keycloak;

--
-- Name: client_node_registrations; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_node_registrations (
    client_id character varying(36) NOT NULL,
    value integer,
    name character varying(255) NOT NULL
);


ALTER TABLE public.client_node_registrations OWNER TO keycloak;

--
-- Name: client_scope; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_scope (
    id character varying(36) NOT NULL,
    name character varying(255),
    realm_id character varying(36),
    description character varying(255),
    protocol character varying(255)
);


ALTER TABLE public.client_scope OWNER TO keycloak;

--
-- Name: client_scope_attributes; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_scope_attributes (
    scope_id character varying(36) NOT NULL,
    value character varying(2048),
    name character varying(255) NOT NULL
);


ALTER TABLE public.client_scope_attributes OWNER TO keycloak;

--
-- Name: client_scope_client; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_scope_client (
    client_id character varying(255) NOT NULL,
    scope_id character varying(255) NOT NULL,
    default_scope boolean DEFAULT false NOT NULL
);


ALTER TABLE public.client_scope_client OWNER TO keycloak;

--
-- Name: client_scope_role_mapping; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_scope_role_mapping (
    scope_id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL
);


ALTER TABLE public.client_scope_role_mapping OWNER TO keycloak;

--
-- Name: client_session; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_session (
    id character varying(36) NOT NULL,
    client_id character varying(36),
    redirect_uri character varying(255),
    state character varying(255),
    "timestamp" integer,
    session_id character varying(36),
    auth_method character varying(255),
    realm_id character varying(255),
    auth_user_id character varying(36),
    current_action character varying(36)
);


ALTER TABLE public.client_session OWNER TO keycloak;

--
-- Name: client_session_auth_status; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_session_auth_status (
    authenticator character varying(36) NOT NULL,
    status integer,
    client_session character varying(36) NOT NULL
);


ALTER TABLE public.client_session_auth_status OWNER TO keycloak;

--
-- Name: client_session_note; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_session_note (
    name character varying(255) NOT NULL,
    value character varying(255),
    client_session character varying(36) NOT NULL
);


ALTER TABLE public.client_session_note OWNER TO keycloak;

--
-- Name: client_session_prot_mapper; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_session_prot_mapper (
    protocol_mapper_id character varying(36) NOT NULL,
    client_session character varying(36) NOT NULL
);


ALTER TABLE public.client_session_prot_mapper OWNER TO keycloak;

--
-- Name: client_session_role; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_session_role (
    role_id character varying(255) NOT NULL,
    client_session character varying(36) NOT NULL
);


ALTER TABLE public.client_session_role OWNER TO keycloak;

--
-- Name: client_user_session_note; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_user_session_note (
    name character varying(255) NOT NULL,
    value character varying(2048),
    client_session character varying(36) NOT NULL
);


ALTER TABLE public.client_user_session_note OWNER TO keycloak;

--
-- Name: component; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.component (
    id character varying(36) NOT NULL,
    name character varying(255),
    parent_id character varying(36),
    provider_id character varying(36),
    provider_type character varying(255),
    realm_id character varying(36),
    sub_type character varying(255)
);


ALTER TABLE public.component OWNER TO keycloak;

--
-- Name: component_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.component_config (
    id character varying(36) NOT NULL,
    component_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(4000)
);


ALTER TABLE public.component_config OWNER TO keycloak;

--
-- Name: composite_role; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.composite_role (
    composite character varying(36) NOT NULL,
    child_role character varying(36) NOT NULL
);


ALTER TABLE public.composite_role OWNER TO keycloak;

--
-- Name: credential; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.credential (
    id character varying(36) NOT NULL,
    salt bytea,
    type character varying(255),
    user_id character varying(36),
    created_date bigint,
    user_label character varying(255),
    secret_data text,
    credential_data text,
    priority integer
);


ALTER TABLE public.credential OWNER TO keycloak;

--
-- Name: databasechangelog; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.databasechangelog (
    id character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    filename character varying(255) NOT NULL,
    dateexecuted timestamp without time zone NOT NULL,
    orderexecuted integer NOT NULL,
    exectype character varying(10) NOT NULL,
    md5sum character varying(35),
    description character varying(255),
    comments character varying(255),
    tag character varying(255),
    liquibase character varying(20),
    contexts character varying(255),
    labels character varying(255),
    deployment_id character varying(10)
);


ALTER TABLE public.databasechangelog OWNER TO keycloak;

--
-- Name: databasechangeloglock; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.databasechangeloglock (
    id integer NOT NULL,
    locked boolean NOT NULL,
    lockgranted timestamp without time zone,
    lockedby character varying(255)
);


ALTER TABLE public.databasechangeloglock OWNER TO keycloak;

--
-- Name: default_client_scope; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.default_client_scope (
    realm_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL,
    default_scope boolean DEFAULT false NOT NULL
);


ALTER TABLE public.default_client_scope OWNER TO keycloak;

--
-- Name: event_entity; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.event_entity (
    id character varying(36) NOT NULL,
    client_id character varying(255),
    details_json character varying(2550),
    error character varying(255),
    ip_address character varying(255),
    realm_id character varying(255),
    session_id character varying(255),
    event_time bigint,
    type character varying(255),
    user_id character varying(255)
);


ALTER TABLE public.event_entity OWNER TO keycloak;

--
-- Name: fed_user_attribute; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_attribute (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36),
    value character varying(2024)
);


ALTER TABLE public.fed_user_attribute OWNER TO keycloak;

--
-- Name: fed_user_consent; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_consent (
    id character varying(36) NOT NULL,
    client_id character varying(255),
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36),
    created_date bigint,
    last_updated_date bigint,
    client_storage_provider character varying(36),
    external_client_id character varying(255)
);


ALTER TABLE public.fed_user_consent OWNER TO keycloak;

--
-- Name: fed_user_consent_cl_scope; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_consent_cl_scope (
    user_consent_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL
);


ALTER TABLE public.fed_user_consent_cl_scope OWNER TO keycloak;

--
-- Name: fed_user_credential; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_credential (
    id character varying(36) NOT NULL,
    salt bytea,
    type character varying(255),
    created_date bigint,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36),
    user_label character varying(255),
    secret_data text,
    credential_data text,
    priority integer
);


ALTER TABLE public.fed_user_credential OWNER TO keycloak;

--
-- Name: fed_user_group_membership; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_group_membership (
    group_id character varying(36) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36)
);


ALTER TABLE public.fed_user_group_membership OWNER TO keycloak;

--
-- Name: fed_user_required_action; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_required_action (
    required_action character varying(255) DEFAULT ' '::character varying NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36)
);


ALTER TABLE public.fed_user_required_action OWNER TO keycloak;

--
-- Name: fed_user_role_mapping; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_role_mapping (
    role_id character varying(36) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36)
);


ALTER TABLE public.fed_user_role_mapping OWNER TO keycloak;

--
-- Name: federated_identity; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.federated_identity (
    identity_provider character varying(255) NOT NULL,
    realm_id character varying(36),
    federated_user_id character varying(255),
    federated_username character varying(255),
    token text,
    user_id character varying(36) NOT NULL
);


ALTER TABLE public.federated_identity OWNER TO keycloak;

--
-- Name: federated_user; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.federated_user (
    id character varying(255) NOT NULL,
    storage_provider_id character varying(255),
    realm_id character varying(36) NOT NULL
);


ALTER TABLE public.federated_user OWNER TO keycloak;

--
-- Name: group_attribute; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.group_attribute (
    id character varying(36) DEFAULT 'sybase-needs-something-here'::character varying NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255),
    group_id character varying(36) NOT NULL
);


ALTER TABLE public.group_attribute OWNER TO keycloak;

--
-- Name: group_role_mapping; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.group_role_mapping (
    role_id character varying(36) NOT NULL,
    group_id character varying(36) NOT NULL
);


ALTER TABLE public.group_role_mapping OWNER TO keycloak;

--
-- Name: identity_provider; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.identity_provider (
    internal_id character varying(36) NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    provider_alias character varying(255),
    provider_id character varying(255),
    store_token boolean DEFAULT false NOT NULL,
    authenticate_by_default boolean DEFAULT false NOT NULL,
    realm_id character varying(36),
    add_token_role boolean DEFAULT true NOT NULL,
    trust_email boolean DEFAULT false NOT NULL,
    first_broker_login_flow_id character varying(36),
    post_broker_login_flow_id character varying(36),
    provider_display_name character varying(255),
    link_only boolean DEFAULT false NOT NULL
);


ALTER TABLE public.identity_provider OWNER TO keycloak;

--
-- Name: identity_provider_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.identity_provider_config (
    identity_provider_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.identity_provider_config OWNER TO keycloak;

--
-- Name: identity_provider_mapper; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.identity_provider_mapper (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    idp_alias character varying(255) NOT NULL,
    idp_mapper_name character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL
);


ALTER TABLE public.identity_provider_mapper OWNER TO keycloak;

--
-- Name: idp_mapper_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.idp_mapper_config (
    idp_mapper_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.idp_mapper_config OWNER TO keycloak;

--
-- Name: keycloak_group; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.keycloak_group (
    id character varying(36) NOT NULL,
    name character varying(255),
    parent_group character varying(36) NOT NULL,
    realm_id character varying(36)
);


ALTER TABLE public.keycloak_group OWNER TO keycloak;

--
-- Name: keycloak_role; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.keycloak_role (
    id character varying(36) NOT NULL,
    client_realm_constraint character varying(255),
    client_role boolean DEFAULT false NOT NULL,
    description character varying(255),
    name character varying(255),
    realm_id character varying(255),
    client character varying(36),
    realm character varying(36)
);


ALTER TABLE public.keycloak_role OWNER TO keycloak;

--
-- Name: migration_model; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.migration_model (
    id character varying(36) NOT NULL,
    version character varying(36),
    update_time bigint DEFAULT 0 NOT NULL
);


ALTER TABLE public.migration_model OWNER TO keycloak;

--
-- Name: offline_client_session; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.offline_client_session (
    user_session_id character varying(36) NOT NULL,
    client_id character varying(255) NOT NULL,
    offline_flag character varying(4) NOT NULL,
    "timestamp" integer,
    data text,
    client_storage_provider character varying(36) DEFAULT 'local'::character varying NOT NULL,
    external_client_id character varying(255) DEFAULT 'local'::character varying NOT NULL
);


ALTER TABLE public.offline_client_session OWNER TO keycloak;

--
-- Name: offline_user_session; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.offline_user_session (
    user_session_id character varying(36) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    created_on integer NOT NULL,
    offline_flag character varying(4) NOT NULL,
    data text,
    last_session_refresh integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.offline_user_session OWNER TO keycloak;

--
-- Name: policy_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.policy_config (
    policy_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value text
);


ALTER TABLE public.policy_config OWNER TO keycloak;

--
-- Name: protocol_mapper; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.protocol_mapper (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    protocol character varying(255) NOT NULL,
    protocol_mapper_name character varying(255) NOT NULL,
    client_id character varying(36),
    client_scope_id character varying(36)
);


ALTER TABLE public.protocol_mapper OWNER TO keycloak;

--
-- Name: protocol_mapper_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.protocol_mapper_config (
    protocol_mapper_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.protocol_mapper_config OWNER TO keycloak;

--
-- Name: realm; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm (
    id character varying(36) NOT NULL,
    access_code_lifespan integer,
    user_action_lifespan integer,
    access_token_lifespan integer,
    account_theme character varying(255),
    admin_theme character varying(255),
    email_theme character varying(255),
    enabled boolean DEFAULT false NOT NULL,
    events_enabled boolean DEFAULT false NOT NULL,
    events_expiration bigint,
    login_theme character varying(255),
    name character varying(255),
    not_before integer,
    password_policy character varying(2550),
    registration_allowed boolean DEFAULT false NOT NULL,
    remember_me boolean DEFAULT false NOT NULL,
    reset_password_allowed boolean DEFAULT false NOT NULL,
    social boolean DEFAULT false NOT NULL,
    ssl_required character varying(255),
    sso_idle_timeout integer,
    sso_max_lifespan integer,
    update_profile_on_soc_login boolean DEFAULT false NOT NULL,
    verify_email boolean DEFAULT false NOT NULL,
    master_admin_client character varying(36),
    login_lifespan integer,
    internationalization_enabled boolean DEFAULT false NOT NULL,
    default_locale character varying(255),
    reg_email_as_username boolean DEFAULT false NOT NULL,
    admin_events_enabled boolean DEFAULT false NOT NULL,
    admin_events_details_enabled boolean DEFAULT false NOT NULL,
    edit_username_allowed boolean DEFAULT false NOT NULL,
    otp_policy_counter integer DEFAULT 0,
    otp_policy_window integer DEFAULT 1,
    otp_policy_period integer DEFAULT 30,
    otp_policy_digits integer DEFAULT 6,
    otp_policy_alg character varying(36) DEFAULT 'HmacSHA1'::character varying,
    otp_policy_type character varying(36) DEFAULT 'totp'::character varying,
    browser_flow character varying(36),
    registration_flow character varying(36),
    direct_grant_flow character varying(36),
    reset_credentials_flow character varying(36),
    client_auth_flow character varying(36),
    offline_session_idle_timeout integer DEFAULT 0,
    revoke_refresh_token boolean DEFAULT false NOT NULL,
    access_token_life_implicit integer DEFAULT 0,
    login_with_email_allowed boolean DEFAULT true NOT NULL,
    duplicate_emails_allowed boolean DEFAULT false NOT NULL,
    docker_auth_flow character varying(36),
    refresh_token_max_reuse integer DEFAULT 0,
    allow_user_managed_access boolean DEFAULT false NOT NULL,
    sso_max_lifespan_remember_me integer DEFAULT 0 NOT NULL,
    sso_idle_timeout_remember_me integer DEFAULT 0 NOT NULL,
    default_role character varying(255)
);


ALTER TABLE public.realm OWNER TO keycloak;

--
-- Name: realm_attribute; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_attribute (
    name character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    value text
);


ALTER TABLE public.realm_attribute OWNER TO keycloak;

--
-- Name: realm_default_groups; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_default_groups (
    realm_id character varying(36) NOT NULL,
    group_id character varying(36) NOT NULL
);


ALTER TABLE public.realm_default_groups OWNER TO keycloak;

--
-- Name: realm_enabled_event_types; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_enabled_event_types (
    realm_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.realm_enabled_event_types OWNER TO keycloak;

--
-- Name: realm_events_listeners; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_events_listeners (
    realm_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.realm_events_listeners OWNER TO keycloak;

--
-- Name: realm_localizations; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_localizations (
    realm_id character varying(255) NOT NULL,
    locale character varying(255) NOT NULL,
    texts text NOT NULL
);


ALTER TABLE public.realm_localizations OWNER TO keycloak;

--
-- Name: realm_required_credential; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_required_credential (
    type character varying(255) NOT NULL,
    form_label character varying(255),
    input boolean DEFAULT false NOT NULL,
    secret boolean DEFAULT false NOT NULL,
    realm_id character varying(36) NOT NULL
);


ALTER TABLE public.realm_required_credential OWNER TO keycloak;

--
-- Name: realm_smtp_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_smtp_config (
    realm_id character varying(36) NOT NULL,
    value character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public.realm_smtp_config OWNER TO keycloak;

--
-- Name: realm_supported_locales; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_supported_locales (
    realm_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.realm_supported_locales OWNER TO keycloak;

--
-- Name: redirect_uris; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.redirect_uris (
    client_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.redirect_uris OWNER TO keycloak;

--
-- Name: required_action_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.required_action_config (
    required_action_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.required_action_config OWNER TO keycloak;

--
-- Name: required_action_provider; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.required_action_provider (
    id character varying(36) NOT NULL,
    alias character varying(255),
    name character varying(255),
    realm_id character varying(36),
    enabled boolean DEFAULT false NOT NULL,
    default_action boolean DEFAULT false NOT NULL,
    provider_id character varying(255),
    priority integer
);


ALTER TABLE public.required_action_provider OWNER TO keycloak;

--
-- Name: resource_attribute; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_attribute (
    id character varying(36) DEFAULT 'sybase-needs-something-here'::character varying NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255),
    resource_id character varying(36) NOT NULL
);


ALTER TABLE public.resource_attribute OWNER TO keycloak;

--
-- Name: resource_policy; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_policy (
    resource_id character varying(36) NOT NULL,
    policy_id character varying(36) NOT NULL
);


ALTER TABLE public.resource_policy OWNER TO keycloak;

--
-- Name: resource_scope; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_scope (
    resource_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL
);


ALTER TABLE public.resource_scope OWNER TO keycloak;

--
-- Name: resource_server; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_server (
    id character varying(36) NOT NULL,
    allow_rs_remote_mgmt boolean DEFAULT false NOT NULL,
    policy_enforce_mode character varying(15) NOT NULL,
    decision_strategy smallint DEFAULT 1 NOT NULL
);


ALTER TABLE public.resource_server OWNER TO keycloak;

--
-- Name: resource_server_perm_ticket; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_server_perm_ticket (
    id character varying(36) NOT NULL,
    owner character varying(255) NOT NULL,
    requester character varying(255) NOT NULL,
    created_timestamp bigint NOT NULL,
    granted_timestamp bigint,
    resource_id character varying(36) NOT NULL,
    scope_id character varying(36),
    resource_server_id character varying(36) NOT NULL,
    policy_id character varying(36)
);


ALTER TABLE public.resource_server_perm_ticket OWNER TO keycloak;

--
-- Name: resource_server_policy; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_server_policy (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    type character varying(255) NOT NULL,
    decision_strategy character varying(20),
    logic character varying(20),
    resource_server_id character varying(36) NOT NULL,
    owner character varying(255)
);


ALTER TABLE public.resource_server_policy OWNER TO keycloak;

--
-- Name: resource_server_resource; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_server_resource (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(255),
    icon_uri character varying(255),
    owner character varying(255) NOT NULL,
    resource_server_id character varying(36) NOT NULL,
    owner_managed_access boolean DEFAULT false NOT NULL,
    display_name character varying(255)
);


ALTER TABLE public.resource_server_resource OWNER TO keycloak;

--
-- Name: resource_server_scope; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_server_scope (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    icon_uri character varying(255),
    resource_server_id character varying(36) NOT NULL,
    display_name character varying(255)
);


ALTER TABLE public.resource_server_scope OWNER TO keycloak;

--
-- Name: resource_uris; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_uris (
    resource_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.resource_uris OWNER TO keycloak;

--
-- Name: role_attribute; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.role_attribute (
    id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255)
);


ALTER TABLE public.role_attribute OWNER TO keycloak;

--
-- Name: scope_mapping; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.scope_mapping (
    client_id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL
);


ALTER TABLE public.scope_mapping OWNER TO keycloak;

--
-- Name: scope_policy; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.scope_policy (
    scope_id character varying(36) NOT NULL,
    policy_id character varying(36) NOT NULL
);


ALTER TABLE public.scope_policy OWNER TO keycloak;

--
-- Name: user_attribute; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_attribute (
    name character varying(255) NOT NULL,
    value character varying(255),
    user_id character varying(36) NOT NULL,
    id character varying(36) DEFAULT 'sybase-needs-something-here'::character varying NOT NULL
);


ALTER TABLE public.user_attribute OWNER TO keycloak;

--
-- Name: user_consent; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_consent (
    id character varying(36) NOT NULL,
    client_id character varying(255),
    user_id character varying(36) NOT NULL,
    created_date bigint,
    last_updated_date bigint,
    client_storage_provider character varying(36),
    external_client_id character varying(255)
);


ALTER TABLE public.user_consent OWNER TO keycloak;

--
-- Name: user_consent_client_scope; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_consent_client_scope (
    user_consent_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL
);


ALTER TABLE public.user_consent_client_scope OWNER TO keycloak;

--
-- Name: user_entity; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_entity (
    id character varying(36) NOT NULL,
    email character varying(255),
    email_constraint character varying(255),
    email_verified boolean DEFAULT false NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    federation_link character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    realm_id character varying(255),
    username character varying(255),
    created_timestamp bigint,
    service_account_client_link character varying(255),
    not_before integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.user_entity OWNER TO keycloak;

--
-- Name: user_federation_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_federation_config (
    user_federation_provider_id character varying(36) NOT NULL,
    value character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public.user_federation_config OWNER TO keycloak;

--
-- Name: user_federation_mapper; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_federation_mapper (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    federation_provider_id character varying(36) NOT NULL,
    federation_mapper_type character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL
);


ALTER TABLE public.user_federation_mapper OWNER TO keycloak;

--
-- Name: user_federation_mapper_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_federation_mapper_config (
    user_federation_mapper_id character varying(36) NOT NULL,
    value character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public.user_federation_mapper_config OWNER TO keycloak;

--
-- Name: user_federation_provider; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_federation_provider (
    id character varying(36) NOT NULL,
    changed_sync_period integer,
    display_name character varying(255),
    full_sync_period integer,
    last_sync integer,
    priority integer,
    provider_name character varying(255),
    realm_id character varying(36)
);


ALTER TABLE public.user_federation_provider OWNER TO keycloak;

--
-- Name: user_group_membership; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_group_membership (
    group_id character varying(36) NOT NULL,
    user_id character varying(36) NOT NULL
);


ALTER TABLE public.user_group_membership OWNER TO keycloak;

--
-- Name: user_required_action; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_required_action (
    user_id character varying(36) NOT NULL,
    required_action character varying(255) DEFAULT ' '::character varying NOT NULL
);


ALTER TABLE public.user_required_action OWNER TO keycloak;

--
-- Name: user_role_mapping; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_role_mapping (
    role_id character varying(255) NOT NULL,
    user_id character varying(36) NOT NULL
);


ALTER TABLE public.user_role_mapping OWNER TO keycloak;

--
-- Name: user_session; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_session (
    id character varying(36) NOT NULL,
    auth_method character varying(255),
    ip_address character varying(255),
    last_session_refresh integer,
    login_username character varying(255),
    realm_id character varying(255),
    remember_me boolean DEFAULT false NOT NULL,
    started integer,
    user_id character varying(255),
    user_session_state integer,
    broker_session_id character varying(255),
    broker_user_id character varying(255)
);


ALTER TABLE public.user_session OWNER TO keycloak;

--
-- Name: user_session_note; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_session_note (
    user_session character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(2048)
);


ALTER TABLE public.user_session_note OWNER TO keycloak;

--
-- Name: username_login_failure; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.username_login_failure (
    realm_id character varying(36) NOT NULL,
    username character varying(255) NOT NULL,
    failed_login_not_before integer,
    last_failure bigint,
    last_ip_failure character varying(255),
    num_failures integer
);


ALTER TABLE public.username_login_failure OWNER TO keycloak;

--
-- Name: web_origins; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.web_origins (
    client_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.web_origins OWNER TO keycloak;

--
-- Data for Name: admin_event_entity; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.admin_event_entity (id, admin_event_time, realm_id, operation_type, auth_realm_id, auth_client_id, auth_user_id, ip_address, resource_path, representation, error, resource_type) FROM stdin;
\.


--
-- Data for Name: associated_policy; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.associated_policy (policy_id, associated_policy_id) FROM stdin;
\.


--
-- Data for Name: authentication_execution; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.authentication_execution (id, alias, authenticator, realm_id, flow_id, requirement, priority, authenticator_flow, auth_flow_id, auth_config) FROM stdin;
ee858c14-f111-49ee-b837-488f8f329f10	\N	auth-cookie	master	24c21a84-eb0d-41e4-8b53-d18327307361	2	10	f	\N	\N
5406a22d-f54d-4faf-8daa-e1f389e09c41	\N	auth-spnego	master	24c21a84-eb0d-41e4-8b53-d18327307361	3	20	f	\N	\N
18e725ba-f193-4077-8299-db6580fe3fe7	\N	identity-provider-redirector	master	24c21a84-eb0d-41e4-8b53-d18327307361	2	25	f	\N	\N
a80ccb93-0e5e-4f06-88da-30e0e6e79d38	\N	\N	master	24c21a84-eb0d-41e4-8b53-d18327307361	2	30	t	a1261b99-4913-46f4-b8e7-fa197516c4c2	\N
5faedeed-1f9b-44f5-9106-0dddc8a52223	\N	auth-username-password-form	master	a1261b99-4913-46f4-b8e7-fa197516c4c2	0	10	f	\N	\N
32af22a1-b81b-4c9f-b853-6fbde5bcd29e	\N	\N	master	a1261b99-4913-46f4-b8e7-fa197516c4c2	1	20	t	6e5e7aa5-f78c-4978-afc0-17e3fa293f98	\N
e63a7cdd-e6de-4cc0-9b8e-03f60960cf05	\N	conditional-user-configured	master	6e5e7aa5-f78c-4978-afc0-17e3fa293f98	0	10	f	\N	\N
e152dc6a-ddf3-4a1e-8e20-fcc075f1cf23	\N	auth-otp-form	master	6e5e7aa5-f78c-4978-afc0-17e3fa293f98	0	20	f	\N	\N
65e0b23c-3571-49de-99e6-9c0d9fe87cdb	\N	direct-grant-validate-username	master	713abcc2-95cb-4657-8b5b-56ca0304e9ff	0	10	f	\N	\N
ea8dfb05-3be5-4503-8489-b63cd0bdfcf4	\N	direct-grant-validate-password	master	713abcc2-95cb-4657-8b5b-56ca0304e9ff	0	20	f	\N	\N
f5cebee4-abb4-4f07-9304-53bf890eb279	\N	\N	master	713abcc2-95cb-4657-8b5b-56ca0304e9ff	1	30	t	726b39a7-b682-4cb7-bca9-c32312d97026	\N
898019d7-e9ae-430a-89a8-ff602a370d57	\N	conditional-user-configured	master	726b39a7-b682-4cb7-bca9-c32312d97026	0	10	f	\N	\N
2f50a330-6e8b-4eb9-a8b0-5c4f49ff709b	\N	direct-grant-validate-otp	master	726b39a7-b682-4cb7-bca9-c32312d97026	0	20	f	\N	\N
16888d58-1405-4088-a61b-fe48f13fdc7e	\N	registration-page-form	master	e20ff429-1dfd-4de5-9a9f-544a2ea1855e	0	10	t	66beb27f-0c0f-4d22-94d8-eab0344c5304	\N
1f97d230-1c82-4106-be1f-ef895b841254	\N	registration-user-creation	master	66beb27f-0c0f-4d22-94d8-eab0344c5304	0	20	f	\N	\N
8848bfb2-0c8a-4fd7-a0ed-c76d8f470f80	\N	registration-profile-action	master	66beb27f-0c0f-4d22-94d8-eab0344c5304	0	40	f	\N	\N
f903d533-9236-4cea-805a-4f2dbe3bbbb4	\N	registration-password-action	master	66beb27f-0c0f-4d22-94d8-eab0344c5304	0	50	f	\N	\N
76cee440-4ff3-4cba-b9f5-0919708c49f2	\N	registration-recaptcha-action	master	66beb27f-0c0f-4d22-94d8-eab0344c5304	3	60	f	\N	\N
cdb806b8-ab2c-4339-8201-80cea7bbf89b	\N	reset-credentials-choose-user	master	5c743a3a-74d5-4a52-a285-15f047c52251	0	10	f	\N	\N
0cb0c2d6-9d7a-4ac4-a0c3-c29b783ef0a2	\N	reset-credential-email	master	5c743a3a-74d5-4a52-a285-15f047c52251	0	20	f	\N	\N
8bc0bd54-dc65-4314-9215-391647ecfd6d	\N	reset-password	master	5c743a3a-74d5-4a52-a285-15f047c52251	0	30	f	\N	\N
f64d9e75-dde9-4f05-b706-8d5b5acbbbce	\N	\N	master	5c743a3a-74d5-4a52-a285-15f047c52251	1	40	t	67c429cc-ab30-4331-87ec-21ce760d2cf7	\N
27c3b166-e6f4-4046-9caa-c12018aeace8	\N	conditional-user-configured	master	67c429cc-ab30-4331-87ec-21ce760d2cf7	0	10	f	\N	\N
e35b6347-b930-4d44-a6d7-ebf7a3c47cdc	\N	reset-otp	master	67c429cc-ab30-4331-87ec-21ce760d2cf7	0	20	f	\N	\N
54a6e36a-37b8-427d-834f-a75afabe02cb	\N	client-secret	master	45984ddc-3a91-4bd0-8005-1bdc073d2447	2	10	f	\N	\N
cb3efd78-fd58-4641-992e-2f89b716c2e1	\N	client-jwt	master	45984ddc-3a91-4bd0-8005-1bdc073d2447	2	20	f	\N	\N
e3e205b5-9389-40a2-9795-f9bf85538aa7	\N	client-secret-jwt	master	45984ddc-3a91-4bd0-8005-1bdc073d2447	2	30	f	\N	\N
2e72b7fc-947d-456b-a257-a4d27e6a95e4	\N	client-x509	master	45984ddc-3a91-4bd0-8005-1bdc073d2447	2	40	f	\N	\N
381ab544-fcb9-4a82-9719-fb76954618cd	\N	idp-review-profile	master	4eb69812-1597-4247-b269-e0b7792c3c65	0	10	f	\N	c310e6a1-365f-4737-a131-4f2cc348fe16
6fa1eaf4-3129-439d-9f50-436b9fc7806a	\N	\N	master	4eb69812-1597-4247-b269-e0b7792c3c65	0	20	t	f9fc2df9-1c6c-4733-89bc-a122f8a94603	\N
6c71229e-06e3-42d0-82e0-d02eaf9c5ffe	\N	idp-create-user-if-unique	master	f9fc2df9-1c6c-4733-89bc-a122f8a94603	2	10	f	\N	b309e3ef-ac5c-4164-a4b5-a07eb7b22c6e
e5fd8616-4ada-4593-b995-810ed869fd06	\N	\N	master	f9fc2df9-1c6c-4733-89bc-a122f8a94603	2	20	t	84f51672-8307-46cc-a6f6-0298aa6f705e	\N
1fc032f8-e1cd-47b1-9319-87a710d43d93	\N	idp-confirm-link	master	84f51672-8307-46cc-a6f6-0298aa6f705e	0	10	f	\N	\N
2722c09f-1e72-423f-8624-516989f66f25	\N	\N	master	84f51672-8307-46cc-a6f6-0298aa6f705e	0	20	t	24040a0a-80bf-4179-b5ed-b857afcc7ff3	\N
f5d1060d-6b86-4956-b5c1-74bf1ebd562c	\N	idp-email-verification	master	24040a0a-80bf-4179-b5ed-b857afcc7ff3	2	10	f	\N	\N
116048e2-6484-4f40-a262-7ddd9aa0e28a	\N	\N	master	24040a0a-80bf-4179-b5ed-b857afcc7ff3	2	20	t	08c8abed-34f8-4288-b3e6-c11e52c3c44e	\N
5fb27c9e-9523-4a7f-a17d-08e10e1cd507	\N	idp-username-password-form	master	08c8abed-34f8-4288-b3e6-c11e52c3c44e	0	10	f	\N	\N
61a2ffac-11fa-4fe0-9b19-005351df4693	\N	\N	master	08c8abed-34f8-4288-b3e6-c11e52c3c44e	1	20	t	f0a17fcb-dd12-43dc-84b6-361ab2f625af	\N
5af8fe17-bb39-4a54-9227-2065daf70f79	\N	conditional-user-configured	master	f0a17fcb-dd12-43dc-84b6-361ab2f625af	0	10	f	\N	\N
ad2cde6d-9072-4de6-8a3a-479d99c353e1	\N	auth-otp-form	master	f0a17fcb-dd12-43dc-84b6-361ab2f625af	0	20	f	\N	\N
5fd2b49d-611d-403c-87ae-88df7c4ad5da	\N	http-basic-authenticator	master	1158f823-cccc-4123-8581-0b028078e637	0	10	f	\N	\N
33626d4b-eb0d-4f0d-b6e2-d6516f019ec6	\N	docker-http-basic-authenticator	master	365f3269-8973-44a8-847b-6ad19fdb4f3c	0	10	f	\N	\N
60a138ad-037e-4ad2-acac-fe2317d058f7	\N	no-cookie-redirect	master	ff08e0d7-1322-4049-b7ef-4fd98d0b9243	0	10	f	\N	\N
c770eb61-c74d-49d2-9fe2-1b99e0b6ac95	\N	\N	master	ff08e0d7-1322-4049-b7ef-4fd98d0b9243	0	20	t	c89f3f10-0869-40f4-b305-417f748d39f7	\N
07b9b479-66e8-49df-9c5a-2dc932a33da2	\N	basic-auth	master	c89f3f10-0869-40f4-b305-417f748d39f7	0	10	f	\N	\N
334e131f-78a3-42ae-ad08-b82ac6314f62	\N	basic-auth-otp	master	c89f3f10-0869-40f4-b305-417f748d39f7	3	20	f	\N	\N
ec6c3060-8ce7-4494-8db6-1e5cfba107cf	\N	auth-spnego	master	c89f3f10-0869-40f4-b305-417f748d39f7	3	30	f	\N	\N
fc4c2f3d-dec2-492b-8326-bc1f8db0d582	\N	idp-email-verification	aspen	40840a99-9b46-40f4-b9b3-f16116e7f05b	2	10	f	\N	\N
92150e12-ebf5-460b-a8bd-8b61a4e7ad64	\N	\N	aspen	40840a99-9b46-40f4-b9b3-f16116e7f05b	2	20	t	89676a0f-0b0f-4f23-ad89-ef1ba8bd9954	\N
000d3ea2-01c2-47af-ac56-d7cbac707283	\N	basic-auth	aspen	fcd58b84-30a2-4cb7-9e4d-85a8008bfbbe	0	10	f	\N	\N
a1a3316f-ddb3-4bc2-88e2-b778085412da	\N	basic-auth-otp	aspen	fcd58b84-30a2-4cb7-9e4d-85a8008bfbbe	3	20	f	\N	\N
6ddaf67e-6dd3-4f59-8147-739b619c27b5	\N	auth-spnego	aspen	fcd58b84-30a2-4cb7-9e4d-85a8008bfbbe	3	30	f	\N	\N
de1610c7-8f67-46aa-b7d1-e1d0a45f04bb	\N	conditional-user-configured	aspen	f2f91f22-05de-4031-8346-76ef8451c90d	0	10	f	\N	\N
5ccda4e7-4a89-4e6e-b0c2-a82c94efffb4	\N	auth-otp-form	aspen	f2f91f22-05de-4031-8346-76ef8451c90d	0	20	f	\N	\N
4b8910a8-3422-4997-96d9-6316388ec656	\N	conditional-user-configured	aspen	119932b9-5da2-46e0-b59b-a99eaf4dfcd5	0	10	f	\N	\N
393bf9f1-d3c8-43f0-83f1-0efc1244c2cc	\N	direct-grant-validate-otp	aspen	119932b9-5da2-46e0-b59b-a99eaf4dfcd5	0	20	f	\N	\N
1d280167-5891-488f-9700-92d5b921c035	\N	conditional-user-configured	aspen	29ad3963-3876-408b-be32-ae99b9a2aee1	0	10	f	\N	\N
c7b14659-4ea5-415e-b63f-acbdb7674b8e	\N	auth-otp-form	aspen	29ad3963-3876-408b-be32-ae99b9a2aee1	0	20	f	\N	\N
a74d140b-0fd6-40a2-901a-09b70fe09cc2	\N	idp-confirm-link	aspen	274cfd7c-b155-45ac-ad6c-a865d099bf6a	0	10	f	\N	\N
ff2475eb-3cc0-4295-b61c-b57639367ae7	\N	\N	aspen	274cfd7c-b155-45ac-ad6c-a865d099bf6a	0	20	t	40840a99-9b46-40f4-b9b3-f16116e7f05b	\N
bfcd7040-0a53-49cd-a97b-13295bc7d2cd	\N	conditional-user-configured	aspen	b236dc49-126e-4c39-8801-e655a8560d3f	0	10	f	\N	\N
6176cc30-2dd4-4762-a986-6771ab3278ef	\N	reset-otp	aspen	b236dc49-126e-4c39-8801-e655a8560d3f	0	20	f	\N	\N
301d96d5-451d-482b-92db-72b7adf40197	\N	idp-create-user-if-unique	aspen	1997cefb-cdf2-486d-9369-1581189689cd	2	10	f	\N	d671bd31-3491-439f-a978-0184d2e884a6
fac671ac-0e9b-4d5b-abea-73a9fc6dec5f	\N	\N	aspen	1997cefb-cdf2-486d-9369-1581189689cd	2	20	t	274cfd7c-b155-45ac-ad6c-a865d099bf6a	\N
455ab1f2-454c-480d-a0ce-c8f84548867d	\N	idp-username-password-form	aspen	89676a0f-0b0f-4f23-ad89-ef1ba8bd9954	0	10	f	\N	\N
e8454346-fffa-4c44-a5c5-fd0b6d7692c1	\N	\N	aspen	89676a0f-0b0f-4f23-ad89-ef1ba8bd9954	1	20	t	29ad3963-3876-408b-be32-ae99b9a2aee1	\N
e07dab0a-cba7-44d7-b426-c20a84f78645	\N	auth-cookie	aspen	64d8710c-e9e4-41d8-ad78-10cd0f8eef7e	2	10	f	\N	\N
e3761a79-ecfd-4166-8ab2-886d3ce5e5f1	\N	auth-spnego	aspen	64d8710c-e9e4-41d8-ad78-10cd0f8eef7e	3	20	f	\N	\N
26616caf-f649-490a-a3b8-787f48c924df	\N	identity-provider-redirector	aspen	64d8710c-e9e4-41d8-ad78-10cd0f8eef7e	2	25	f	\N	\N
232bd160-b5ab-45b3-b62a-abfdcd0306c9	\N	\N	aspen	64d8710c-e9e4-41d8-ad78-10cd0f8eef7e	2	30	t	9e3507ad-beef-46b9-b28d-45868f27a0ed	\N
b358a2b8-d9f6-467a-b508-1fed27f65c61	\N	client-secret	aspen	414c1c11-b528-4ec6-bd38-8d7d06fe7866	2	10	f	\N	\N
c659127a-2555-4f83-870f-270a741b9ea9	\N	client-jwt	aspen	414c1c11-b528-4ec6-bd38-8d7d06fe7866	2	20	f	\N	\N
f7fc15ad-2e61-4f46-ab9c-2dd39190b285	\N	client-secret-jwt	aspen	414c1c11-b528-4ec6-bd38-8d7d06fe7866	2	30	f	\N	\N
527d32aa-e092-4151-8ab5-b0e294d3aee6	\N	client-x509	aspen	414c1c11-b528-4ec6-bd38-8d7d06fe7866	2	40	f	\N	\N
4e02c3fe-16d9-452d-b15d-a3f4350b4f54	\N	direct-grant-validate-username	aspen	b0322382-1011-487b-8bb1-76b38414874c	0	10	f	\N	\N
a7a83b59-9c6e-410a-9682-8ee9075f971e	\N	direct-grant-validate-password	aspen	b0322382-1011-487b-8bb1-76b38414874c	0	20	f	\N	\N
98ffd410-23bd-4d5e-9352-54dd28a8bc7d	\N	\N	aspen	b0322382-1011-487b-8bb1-76b38414874c	1	30	t	119932b9-5da2-46e0-b59b-a99eaf4dfcd5	\N
27509a0c-bcff-42b7-a672-82c1910f8f36	\N	docker-http-basic-authenticator	aspen	4a7a0b2b-c0ca-4872-8fef-df7d2bf5fc3c	0	10	f	\N	\N
402fc8e5-5e2e-44ee-bd4d-101de4435702	\N	idp-review-profile	aspen	5ed3d4bc-8521-4971-8528-0fbc24c0ba92	0	10	f	\N	430c085c-3003-47d6-85b0-d3b2251edee1
6793949e-b957-4222-9c46-8d6a1bd87305	\N	\N	aspen	5ed3d4bc-8521-4971-8528-0fbc24c0ba92	0	20	t	1997cefb-cdf2-486d-9369-1581189689cd	\N
08d1aba6-cdb8-457e-8bd4-f6ff02a9c7f8	\N	auth-username-password-form	aspen	9e3507ad-beef-46b9-b28d-45868f27a0ed	0	10	f	\N	\N
7cbd72cb-1751-4a5e-b415-37d3350ba701	\N	\N	aspen	9e3507ad-beef-46b9-b28d-45868f27a0ed	1	20	t	f2f91f22-05de-4031-8346-76ef8451c90d	\N
1a91eb87-c4af-420a-b231-7a75adae5bae	\N	no-cookie-redirect	aspen	58615692-213d-46ac-a60e-70af7db099ba	0	10	f	\N	\N
c98b51c8-7354-4bc3-9d4e-c138c238ffa4	\N	\N	aspen	58615692-213d-46ac-a60e-70af7db099ba	0	20	t	fcd58b84-30a2-4cb7-9e4d-85a8008bfbbe	\N
dd9d604d-d4f7-4e63-a53d-ed10a4400e57	\N	registration-page-form	aspen	6ba886ac-9cbc-453a-996a-24d7c795d544	0	10	t	ed5f5685-f0f7-467a-b292-87e0b65dbd6d	\N
3dce3661-eca1-40a0-9a7e-152038ac8dac	\N	registration-user-creation	aspen	ed5f5685-f0f7-467a-b292-87e0b65dbd6d	0	20	f	\N	\N
471cec6e-ee2b-4e9d-a804-ed25a24a4a7a	\N	registration-profile-action	aspen	ed5f5685-f0f7-467a-b292-87e0b65dbd6d	0	40	f	\N	\N
b6ec92c2-2f6a-41f1-b81a-ae2c654e343a	\N	registration-password-action	aspen	ed5f5685-f0f7-467a-b292-87e0b65dbd6d	0	50	f	\N	\N
439cc438-a5bd-4240-b03a-f1544eb32a48	\N	registration-recaptcha-action	aspen	ed5f5685-f0f7-467a-b292-87e0b65dbd6d	3	60	f	\N	\N
30aa1194-c588-4e7f-9dbd-63a8431487b8	\N	reset-credentials-choose-user	aspen	67cbb552-f33a-4e12-a5e1-ec50b6c8ef12	0	10	f	\N	\N
e1a1c3f0-97c3-40d7-a127-4f246222424d	\N	reset-credential-email	aspen	67cbb552-f33a-4e12-a5e1-ec50b6c8ef12	0	20	f	\N	\N
4461c2f0-1e77-451d-8fdf-7fed5afd0c92	\N	reset-password	aspen	67cbb552-f33a-4e12-a5e1-ec50b6c8ef12	0	30	f	\N	\N
e686bf23-4dd3-48dd-85ab-603c126ac8dc	\N	\N	aspen	67cbb552-f33a-4e12-a5e1-ec50b6c8ef12	1	40	t	b236dc49-126e-4c39-8801-e655a8560d3f	\N
6ec69476-4140-4b94-8061-a7f72a1b0f9f	\N	http-basic-authenticator	aspen	8bd1f367-15b7-4424-8055-31b4250871fd	0	10	f	\N	\N
\.


--
-- Data for Name: authentication_flow; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.authentication_flow (id, alias, description, realm_id, provider_id, top_level, built_in) FROM stdin;
24c21a84-eb0d-41e4-8b53-d18327307361	browser	browser based authentication	master	basic-flow	t	t
a1261b99-4913-46f4-b8e7-fa197516c4c2	forms	Username, password, otp and other auth forms.	master	basic-flow	f	t
6e5e7aa5-f78c-4978-afc0-17e3fa293f98	Browser - Conditional OTP	Flow to determine if the OTP is required for the authentication	master	basic-flow	f	t
713abcc2-95cb-4657-8b5b-56ca0304e9ff	direct grant	OpenID Connect Resource Owner Grant	master	basic-flow	t	t
726b39a7-b682-4cb7-bca9-c32312d97026	Direct Grant - Conditional OTP	Flow to determine if the OTP is required for the authentication	master	basic-flow	f	t
e20ff429-1dfd-4de5-9a9f-544a2ea1855e	registration	registration flow	master	basic-flow	t	t
66beb27f-0c0f-4d22-94d8-eab0344c5304	registration form	registration form	master	form-flow	f	t
5c743a3a-74d5-4a52-a285-15f047c52251	reset credentials	Reset credentials for a user if they forgot their password or something	master	basic-flow	t	t
67c429cc-ab30-4331-87ec-21ce760d2cf7	Reset - Conditional OTP	Flow to determine if the OTP should be reset or not. Set to REQUIRED to force.	master	basic-flow	f	t
45984ddc-3a91-4bd0-8005-1bdc073d2447	clients	Base authentication for clients	master	client-flow	t	t
4eb69812-1597-4247-b269-e0b7792c3c65	first broker login	Actions taken after first broker login with identity provider account, which is not yet linked to any Keycloak account	master	basic-flow	t	t
f9fc2df9-1c6c-4733-89bc-a122f8a94603	User creation or linking	Flow for the existing/non-existing user alternatives	master	basic-flow	f	t
84f51672-8307-46cc-a6f6-0298aa6f705e	Handle Existing Account	Handle what to do if there is existing account with same email/username like authenticated identity provider	master	basic-flow	f	t
24040a0a-80bf-4179-b5ed-b857afcc7ff3	Account verification options	Method with which to verity the existing account	master	basic-flow	f	t
08c8abed-34f8-4288-b3e6-c11e52c3c44e	Verify Existing Account by Re-authentication	Reauthentication of existing account	master	basic-flow	f	t
f0a17fcb-dd12-43dc-84b6-361ab2f625af	First broker login - Conditional OTP	Flow to determine if the OTP is required for the authentication	master	basic-flow	f	t
1158f823-cccc-4123-8581-0b028078e637	saml ecp	SAML ECP Profile Authentication Flow	master	basic-flow	t	t
365f3269-8973-44a8-847b-6ad19fdb4f3c	docker auth	Used by Docker clients to authenticate against the IDP	master	basic-flow	t	t
ff08e0d7-1322-4049-b7ef-4fd98d0b9243	http challenge	An authentication flow based on challenge-response HTTP Authentication Schemes	master	basic-flow	t	t
c89f3f10-0869-40f4-b305-417f748d39f7	Authentication Options	Authentication options.	master	basic-flow	f	t
40840a99-9b46-40f4-b9b3-f16116e7f05b	Account verification options	Method with which to verity the existing account	aspen	basic-flow	f	t
fcd58b84-30a2-4cb7-9e4d-85a8008bfbbe	Authentication Options	Authentication options.	aspen	basic-flow	f	t
f2f91f22-05de-4031-8346-76ef8451c90d	Browser - Conditional OTP	Flow to determine if the OTP is required for the authentication	aspen	basic-flow	f	t
119932b9-5da2-46e0-b59b-a99eaf4dfcd5	Direct Grant - Conditional OTP	Flow to determine if the OTP is required for the authentication	aspen	basic-flow	f	t
29ad3963-3876-408b-be32-ae99b9a2aee1	First broker login - Conditional OTP	Flow to determine if the OTP is required for the authentication	aspen	basic-flow	f	t
274cfd7c-b155-45ac-ad6c-a865d099bf6a	Handle Existing Account	Handle what to do if there is existing account with same email/username like authenticated identity provider	aspen	basic-flow	f	t
b236dc49-126e-4c39-8801-e655a8560d3f	Reset - Conditional OTP	Flow to determine if the OTP should be reset or not. Set to REQUIRED to force.	aspen	basic-flow	f	t
1997cefb-cdf2-486d-9369-1581189689cd	User creation or linking	Flow for the existing/non-existing user alternatives	aspen	basic-flow	f	t
89676a0f-0b0f-4f23-ad89-ef1ba8bd9954	Verify Existing Account by Re-authentication	Reauthentication of existing account	aspen	basic-flow	f	t
64d8710c-e9e4-41d8-ad78-10cd0f8eef7e	browser	browser based authentication	aspen	basic-flow	t	t
414c1c11-b528-4ec6-bd38-8d7d06fe7866	clients	Base authentication for clients	aspen	client-flow	t	t
b0322382-1011-487b-8bb1-76b38414874c	direct grant	OpenID Connect Resource Owner Grant	aspen	basic-flow	t	t
4a7a0b2b-c0ca-4872-8fef-df7d2bf5fc3c	docker auth	Used by Docker clients to authenticate against the IDP	aspen	basic-flow	t	t
5ed3d4bc-8521-4971-8528-0fbc24c0ba92	first broker login	Actions taken after first broker login with identity provider account, which is not yet linked to any Keycloak account	aspen	basic-flow	t	t
9e3507ad-beef-46b9-b28d-45868f27a0ed	forms	Username, password, otp and other auth forms.	aspen	basic-flow	f	t
58615692-213d-46ac-a60e-70af7db099ba	http challenge	An authentication flow based on challenge-response HTTP Authentication Schemes	aspen	basic-flow	t	t
6ba886ac-9cbc-453a-996a-24d7c795d544	registration	registration flow	aspen	basic-flow	t	t
ed5f5685-f0f7-467a-b292-87e0b65dbd6d	registration form	registration form	aspen	form-flow	f	t
67cbb552-f33a-4e12-a5e1-ec50b6c8ef12	reset credentials	Reset credentials for a user if they forgot their password or something	aspen	basic-flow	t	t
8bd1f367-15b7-4424-8055-31b4250871fd	saml ecp	SAML ECP Profile Authentication Flow	aspen	basic-flow	t	t
\.


--
-- Data for Name: authenticator_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.authenticator_config (id, alias, realm_id) FROM stdin;
c310e6a1-365f-4737-a131-4f2cc348fe16	review profile config	master
b309e3ef-ac5c-4164-a4b5-a07eb7b22c6e	create unique user config	master
d671bd31-3491-439f-a978-0184d2e884a6	create unique user config	aspen
430c085c-3003-47d6-85b0-d3b2251edee1	review profile config	aspen
\.


--
-- Data for Name: authenticator_config_entry; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.authenticator_config_entry (authenticator_id, value, name) FROM stdin;
c310e6a1-365f-4737-a131-4f2cc348fe16	missing	update.profile.on.first.login
b309e3ef-ac5c-4164-a4b5-a07eb7b22c6e	false	require.password.update.after.registration
d671bd31-3491-439f-a978-0184d2e884a6	false	require.password.update.after.registration
430c085c-3003-47d6-85b0-d3b2251edee1	missing	update.profile.on.first.login
\.


--
-- Data for Name: broker_link; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.broker_link (identity_provider, storage_provider_id, realm_id, broker_user_id, broker_username, token, user_id) FROM stdin;
\.


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client (id, enabled, full_scope_allowed, client_id, not_before, public_client, secret, base_url, bearer_only, management_url, surrogate_auth_required, realm_id, protocol, node_rereg_timeout, frontchannel_logout, consent_required, name, service_accounts_enabled, client_authenticator_type, root_url, description, registration_token, standard_flow_enabled, implicit_flow_enabled, direct_access_grants_enabled, always_display_in_console) FROM stdin;
99a223f0-9821-4c16-8101-df120180f09f	t	f	master-realm	0	f	\N	\N	t	\N	f	master	\N	0	f	f	master Realm	f	client-secret	\N	\N	\N	t	f	f	f
f050cfbd-de00-405f-a66d-28d7d629e43f	t	f	account	0	t	\N	/realms/master/account/	f	\N	f	master	openid-connect	0	f	f	${client_account}	f	client-secret	${authBaseUrl}	\N	\N	t	f	f	f
dae91f88-2e76-4d7a-a717-0b6ca2bc862b	t	f	account-console	0	t	\N	/realms/master/account/	f	\N	f	master	openid-connect	0	f	f	${client_account-console}	f	client-secret	${authBaseUrl}	\N	\N	t	f	f	f
3bc79df6-6e74-4f26-87ee-a01543ce4762	t	f	broker	0	f	\N	\N	t	\N	f	master	openid-connect	0	f	f	${client_broker}	f	client-secret	\N	\N	\N	t	f	f	f
b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	t	f	security-admin-console	0	t	\N	/admin/master/console/	f	\N	f	master	openid-connect	0	f	f	${client_security-admin-console}	f	client-secret	${authAdminUrl}	\N	\N	t	f	f	f
2dc6ba7f-72e3-4db6-b9e2-d76956397212	t	f	admin-cli	0	t	\N	\N	f	\N	f	master	openid-connect	0	f	f	${client_admin-cli}	f	client-secret	\N	\N	\N	f	f	t	f
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	t	t	aspen-web	0	t	\N	\N	f	http://localhost/	f	aspen	openid-connect	-1	f	f	\N	f	client-secret	http://localhost/	\N	\N	t	f	t	f
b940652c-a9b6-483a-b212-945e3d5491d7	t	f	aspen-realm	0	f	\N	\N	t	\N	f	master	\N	0	f	f	aspen Realm	f	client-secret	\N	\N	\N	t	f	f	f
7af7268b-2ed7-464c-b50d-70ebaff119e5	t	f	account	0	t	\N	/realms/aspen/account/	f	\N	f	aspen	openid-connect	0	f	f	${client_account}	f	client-secret	${authBaseUrl}	\N	\N	t	f	f	f
c7555935-08d9-4c93-8fea-401d7ee4ea49	t	f	account-console	0	t	\N	/realms/aspen/account/	f	\N	f	aspen	openid-connect	0	f	f	${client_account-console}	f	client-secret	${authBaseUrl}	\N	\N	t	f	f	f
bb9ccc82-fde1-4280-a0de-8a8dfac52885	t	f	admin-cli	0	t	\N	\N	f	\N	f	aspen	openid-connect	0	f	f	${client_admin-cli}	f	client-secret	\N	\N	\N	f	f	t	f
44e05627-2d1f-4910-acb9-26a8acb59196	t	f	broker	0	f	\N	\N	t	\N	f	aspen	openid-connect	0	f	f	${client_broker}	f	client-secret	\N	\N	\N	t	f	f	f
ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	f	realm-management	0	f	\N	\N	t	\N	f	aspen	openid-connect	0	f	f	${client_realm-management}	f	client-secret	\N	\N	\N	t	f	f	f
855cb299-7dc3-44de-b189-075aeaa4fc69	t	f	security-admin-console	0	t	\N	/admin/aspen/console/	f	\N	f	aspen	openid-connect	0	f	f	${client_security-admin-console}	f	client-secret	${authAdminUrl}	\N	\N	t	f	f	f
\.


--
-- Data for Name: client_attributes; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_attributes (client_id, value, name) FROM stdin;
dae91f88-2e76-4d7a-a717-0b6ca2bc862b	S256	pkce.code.challenge.method
b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	S256	pkce.code.challenge.method
c7555935-08d9-4c93-8fea-401d7ee4ea49	S256	pkce.code.challenge.method
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	3600	access.token.lifespan
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	saml.force.post.binding
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	saml.multivalued.roles
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	oauth2.device.authorization.grant.enabled
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	backchannel.logout.revoke.offline.tokens
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	saml.server.signature.keyinfo.ext
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	true	use.refresh.tokens
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	oidc.ciba.grant.enabled
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	true	backchannel.logout.session.required
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	true	client_credentials.use_refresh_token
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	3600	client.offline.session.idle.timeout
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	require.pushed.authorization.requests
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	saml.client.signature
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	3600	client.offline.session.max.lifespan
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	3600	client.session.max.lifespan
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	3600	client.session.idle.timeout
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	id.token.as.detached.signature
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	saml.assertion.signature
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	saml.encrypt
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	saml.server.signature
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	exclude.session.state.from.auth.response
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	saml.artifact.binding
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	saml_force_name_id_format
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	tls.client.certificate.bound.access.tokens
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	saml.authnstatement
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	display.on.consent.screen
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	false	saml.onetimeuse.condition
855cb299-7dc3-44de-b189-075aeaa4fc69	S256	pkce.code.challenge.method
\.


--
-- Data for Name: client_auth_flow_bindings; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_auth_flow_bindings (client_id, flow_id, binding_name) FROM stdin;
\.


--
-- Data for Name: client_initial_access; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_initial_access (id, realm_id, "timestamp", expiration, count, remaining_count) FROM stdin;
\.


--
-- Data for Name: client_node_registrations; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_node_registrations (client_id, value, name) FROM stdin;
\.


--
-- Data for Name: client_scope; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_scope (id, name, realm_id, description, protocol) FROM stdin;
3fb21161-bc63-4cb5-bdbe-a6edc03cd315	offline_access	master	OpenID Connect built-in scope: offline_access	openid-connect
c582d3ac-7b28-4558-b9a9-1912f111c2c0	role_list	master	SAML role list	saml
0bd4795b-33e1-4d56-a7ac-1ec4ced634ad	profile	master	OpenID Connect built-in scope: profile	openid-connect
d7bea98e-4c85-4972-b5c4-b61a4b357520	email	master	OpenID Connect built-in scope: email	openid-connect
06548876-9800-4f2e-b7e8-f70b6080fede	address	master	OpenID Connect built-in scope: address	openid-connect
cb3d536f-dc2a-4fd9-b48a-156dff627a7b	phone	master	OpenID Connect built-in scope: phone	openid-connect
3029167d-7d42-4351-8374-b7e269453392	roles	master	OpenID Connect scope for add user roles to the access token	openid-connect
515b8af9-819c-4abc-86ed-87b34c43e4ca	web-origins	master	OpenID Connect scope for add allowed web origins to the access token	openid-connect
716fbf33-c971-41db-b2dd-2e94965c780d	microprofile-jwt	master	Microprofile - JWT built-in scope	openid-connect
b7858b8f-f3f3-48fa-99e8-323e099302b1	roles	aspen	OpenID Connect scope for add user roles to the access token	openid-connect
b3a3162a-61c9-499b-9a7e-3e535a7e843d	email	aspen	OpenID Connect built-in scope: email	openid-connect
1cedd5fe-7777-4e7a-8c5e-fe4138e6968a	web-origins	aspen	OpenID Connect scope for add allowed web origins to the access token	openid-connect
984ea520-4d21-442f-8bb5-8e2df107a775	microprofile-jwt	aspen	Microprofile - JWT built-in scope	openid-connect
34c1623f-b4bf-406a-a97e-4bcab3db9529	offline_access	aspen	OpenID Connect built-in scope: offline_access	openid-connect
0d33f992-a6de-48e0-9df9-de039cae8569	profile	aspen	OpenID Connect built-in scope: profile	openid-connect
7e4a3b88-203f-4051-a8a2-6f1365135bde	address	aspen	OpenID Connect built-in scope: address	openid-connect
25c8fd53-39bc-44ac-a26f-5df70fec3942	role_list	aspen	SAML role list	saml
10609232-fea8-4344-93bd-ca15a5069026	phone	aspen	OpenID Connect built-in scope: phone	openid-connect
26192d59-fb37-46e3-ad58-9e3660830db9	api-use	aspen	scope to permit use on the api	openid-connect
\.


--
-- Data for Name: client_scope_attributes; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_scope_attributes (scope_id, value, name) FROM stdin;
3fb21161-bc63-4cb5-bdbe-a6edc03cd315	true	display.on.consent.screen
3fb21161-bc63-4cb5-bdbe-a6edc03cd315	${offlineAccessScopeConsentText}	consent.screen.text
c582d3ac-7b28-4558-b9a9-1912f111c2c0	true	display.on.consent.screen
c582d3ac-7b28-4558-b9a9-1912f111c2c0	${samlRoleListScopeConsentText}	consent.screen.text
0bd4795b-33e1-4d56-a7ac-1ec4ced634ad	true	display.on.consent.screen
0bd4795b-33e1-4d56-a7ac-1ec4ced634ad	${profileScopeConsentText}	consent.screen.text
0bd4795b-33e1-4d56-a7ac-1ec4ced634ad	true	include.in.token.scope
d7bea98e-4c85-4972-b5c4-b61a4b357520	true	display.on.consent.screen
d7bea98e-4c85-4972-b5c4-b61a4b357520	${emailScopeConsentText}	consent.screen.text
d7bea98e-4c85-4972-b5c4-b61a4b357520	true	include.in.token.scope
06548876-9800-4f2e-b7e8-f70b6080fede	true	display.on.consent.screen
06548876-9800-4f2e-b7e8-f70b6080fede	${addressScopeConsentText}	consent.screen.text
06548876-9800-4f2e-b7e8-f70b6080fede	true	include.in.token.scope
cb3d536f-dc2a-4fd9-b48a-156dff627a7b	true	display.on.consent.screen
cb3d536f-dc2a-4fd9-b48a-156dff627a7b	${phoneScopeConsentText}	consent.screen.text
cb3d536f-dc2a-4fd9-b48a-156dff627a7b	true	include.in.token.scope
3029167d-7d42-4351-8374-b7e269453392	true	display.on.consent.screen
3029167d-7d42-4351-8374-b7e269453392	${rolesScopeConsentText}	consent.screen.text
3029167d-7d42-4351-8374-b7e269453392	false	include.in.token.scope
515b8af9-819c-4abc-86ed-87b34c43e4ca	false	display.on.consent.screen
515b8af9-819c-4abc-86ed-87b34c43e4ca		consent.screen.text
515b8af9-819c-4abc-86ed-87b34c43e4ca	false	include.in.token.scope
716fbf33-c971-41db-b2dd-2e94965c780d	false	display.on.consent.screen
716fbf33-c971-41db-b2dd-2e94965c780d	true	include.in.token.scope
b7858b8f-f3f3-48fa-99e8-323e099302b1	false	include.in.token.scope
b7858b8f-f3f3-48fa-99e8-323e099302b1	true	display.on.consent.screen
b7858b8f-f3f3-48fa-99e8-323e099302b1	${rolesScopeConsentText}	consent.screen.text
b3a3162a-61c9-499b-9a7e-3e535a7e843d	true	include.in.token.scope
b3a3162a-61c9-499b-9a7e-3e535a7e843d	true	display.on.consent.screen
b3a3162a-61c9-499b-9a7e-3e535a7e843d	${emailScopeConsentText}	consent.screen.text
1cedd5fe-7777-4e7a-8c5e-fe4138e6968a	false	include.in.token.scope
1cedd5fe-7777-4e7a-8c5e-fe4138e6968a	false	display.on.consent.screen
1cedd5fe-7777-4e7a-8c5e-fe4138e6968a		consent.screen.text
984ea520-4d21-442f-8bb5-8e2df107a775	true	include.in.token.scope
984ea520-4d21-442f-8bb5-8e2df107a775	false	display.on.consent.screen
34c1623f-b4bf-406a-a97e-4bcab3db9529	${offlineAccessScopeConsentText}	consent.screen.text
34c1623f-b4bf-406a-a97e-4bcab3db9529	true	display.on.consent.screen
0d33f992-a6de-48e0-9df9-de039cae8569	true	include.in.token.scope
0d33f992-a6de-48e0-9df9-de039cae8569	true	display.on.consent.screen
0d33f992-a6de-48e0-9df9-de039cae8569	${profileScopeConsentText}	consent.screen.text
7e4a3b88-203f-4051-a8a2-6f1365135bde	true	include.in.token.scope
7e4a3b88-203f-4051-a8a2-6f1365135bde	true	display.on.consent.screen
7e4a3b88-203f-4051-a8a2-6f1365135bde	${addressScopeConsentText}	consent.screen.text
25c8fd53-39bc-44ac-a26f-5df70fec3942	${samlRoleListScopeConsentText}	consent.screen.text
25c8fd53-39bc-44ac-a26f-5df70fec3942	true	display.on.consent.screen
10609232-fea8-4344-93bd-ca15a5069026	true	include.in.token.scope
10609232-fea8-4344-93bd-ca15a5069026	true	display.on.consent.screen
10609232-fea8-4344-93bd-ca15a5069026	${phoneScopeConsentText}	consent.screen.text
26192d59-fb37-46e3-ad58-9e3660830db9	true	display.on.consent.screen
26192d59-fb37-46e3-ad58-9e3660830db9	true	include.in.token.scope
\.


--
-- Data for Name: client_scope_client; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_scope_client (client_id, scope_id, default_scope) FROM stdin;
f050cfbd-de00-405f-a66d-28d7d629e43f	515b8af9-819c-4abc-86ed-87b34c43e4ca	t
f050cfbd-de00-405f-a66d-28d7d629e43f	d7bea98e-4c85-4972-b5c4-b61a4b357520	t
f050cfbd-de00-405f-a66d-28d7d629e43f	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad	t
f050cfbd-de00-405f-a66d-28d7d629e43f	3029167d-7d42-4351-8374-b7e269453392	t
f050cfbd-de00-405f-a66d-28d7d629e43f	cb3d536f-dc2a-4fd9-b48a-156dff627a7b	f
f050cfbd-de00-405f-a66d-28d7d629e43f	716fbf33-c971-41db-b2dd-2e94965c780d	f
f050cfbd-de00-405f-a66d-28d7d629e43f	06548876-9800-4f2e-b7e8-f70b6080fede	f
f050cfbd-de00-405f-a66d-28d7d629e43f	3fb21161-bc63-4cb5-bdbe-a6edc03cd315	f
dae91f88-2e76-4d7a-a717-0b6ca2bc862b	515b8af9-819c-4abc-86ed-87b34c43e4ca	t
dae91f88-2e76-4d7a-a717-0b6ca2bc862b	d7bea98e-4c85-4972-b5c4-b61a4b357520	t
dae91f88-2e76-4d7a-a717-0b6ca2bc862b	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad	t
dae91f88-2e76-4d7a-a717-0b6ca2bc862b	3029167d-7d42-4351-8374-b7e269453392	t
dae91f88-2e76-4d7a-a717-0b6ca2bc862b	cb3d536f-dc2a-4fd9-b48a-156dff627a7b	f
dae91f88-2e76-4d7a-a717-0b6ca2bc862b	716fbf33-c971-41db-b2dd-2e94965c780d	f
dae91f88-2e76-4d7a-a717-0b6ca2bc862b	06548876-9800-4f2e-b7e8-f70b6080fede	f
dae91f88-2e76-4d7a-a717-0b6ca2bc862b	3fb21161-bc63-4cb5-bdbe-a6edc03cd315	f
2dc6ba7f-72e3-4db6-b9e2-d76956397212	515b8af9-819c-4abc-86ed-87b34c43e4ca	t
2dc6ba7f-72e3-4db6-b9e2-d76956397212	d7bea98e-4c85-4972-b5c4-b61a4b357520	t
2dc6ba7f-72e3-4db6-b9e2-d76956397212	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad	t
2dc6ba7f-72e3-4db6-b9e2-d76956397212	3029167d-7d42-4351-8374-b7e269453392	t
2dc6ba7f-72e3-4db6-b9e2-d76956397212	cb3d536f-dc2a-4fd9-b48a-156dff627a7b	f
2dc6ba7f-72e3-4db6-b9e2-d76956397212	716fbf33-c971-41db-b2dd-2e94965c780d	f
2dc6ba7f-72e3-4db6-b9e2-d76956397212	06548876-9800-4f2e-b7e8-f70b6080fede	f
2dc6ba7f-72e3-4db6-b9e2-d76956397212	3fb21161-bc63-4cb5-bdbe-a6edc03cd315	f
3bc79df6-6e74-4f26-87ee-a01543ce4762	515b8af9-819c-4abc-86ed-87b34c43e4ca	t
3bc79df6-6e74-4f26-87ee-a01543ce4762	d7bea98e-4c85-4972-b5c4-b61a4b357520	t
3bc79df6-6e74-4f26-87ee-a01543ce4762	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad	t
3bc79df6-6e74-4f26-87ee-a01543ce4762	3029167d-7d42-4351-8374-b7e269453392	t
3bc79df6-6e74-4f26-87ee-a01543ce4762	cb3d536f-dc2a-4fd9-b48a-156dff627a7b	f
3bc79df6-6e74-4f26-87ee-a01543ce4762	716fbf33-c971-41db-b2dd-2e94965c780d	f
3bc79df6-6e74-4f26-87ee-a01543ce4762	06548876-9800-4f2e-b7e8-f70b6080fede	f
3bc79df6-6e74-4f26-87ee-a01543ce4762	3fb21161-bc63-4cb5-bdbe-a6edc03cd315	f
99a223f0-9821-4c16-8101-df120180f09f	515b8af9-819c-4abc-86ed-87b34c43e4ca	t
99a223f0-9821-4c16-8101-df120180f09f	d7bea98e-4c85-4972-b5c4-b61a4b357520	t
99a223f0-9821-4c16-8101-df120180f09f	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad	t
99a223f0-9821-4c16-8101-df120180f09f	3029167d-7d42-4351-8374-b7e269453392	t
99a223f0-9821-4c16-8101-df120180f09f	cb3d536f-dc2a-4fd9-b48a-156dff627a7b	f
99a223f0-9821-4c16-8101-df120180f09f	716fbf33-c971-41db-b2dd-2e94965c780d	f
99a223f0-9821-4c16-8101-df120180f09f	06548876-9800-4f2e-b7e8-f70b6080fede	f
99a223f0-9821-4c16-8101-df120180f09f	3fb21161-bc63-4cb5-bdbe-a6edc03cd315	f
b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	515b8af9-819c-4abc-86ed-87b34c43e4ca	t
b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	d7bea98e-4c85-4972-b5c4-b61a4b357520	t
b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad	t
b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	3029167d-7d42-4351-8374-b7e269453392	t
b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	cb3d536f-dc2a-4fd9-b48a-156dff627a7b	f
b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	716fbf33-c971-41db-b2dd-2e94965c780d	f
b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	06548876-9800-4f2e-b7e8-f70b6080fede	f
b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	3fb21161-bc63-4cb5-bdbe-a6edc03cd315	f
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	26192d59-fb37-46e3-ad58-9e3660830db9	t
7af7268b-2ed7-464c-b50d-70ebaff119e5	1cedd5fe-7777-4e7a-8c5e-fe4138e6968a	t
7af7268b-2ed7-464c-b50d-70ebaff119e5	b7858b8f-f3f3-48fa-99e8-323e099302b1	t
7af7268b-2ed7-464c-b50d-70ebaff119e5	0d33f992-a6de-48e0-9df9-de039cae8569	t
7af7268b-2ed7-464c-b50d-70ebaff119e5	b3a3162a-61c9-499b-9a7e-3e535a7e843d	t
7af7268b-2ed7-464c-b50d-70ebaff119e5	7e4a3b88-203f-4051-a8a2-6f1365135bde	f
7af7268b-2ed7-464c-b50d-70ebaff119e5	10609232-fea8-4344-93bd-ca15a5069026	f
7af7268b-2ed7-464c-b50d-70ebaff119e5	34c1623f-b4bf-406a-a97e-4bcab3db9529	f
7af7268b-2ed7-464c-b50d-70ebaff119e5	984ea520-4d21-442f-8bb5-8e2df107a775	f
c7555935-08d9-4c93-8fea-401d7ee4ea49	1cedd5fe-7777-4e7a-8c5e-fe4138e6968a	t
c7555935-08d9-4c93-8fea-401d7ee4ea49	b7858b8f-f3f3-48fa-99e8-323e099302b1	t
c7555935-08d9-4c93-8fea-401d7ee4ea49	0d33f992-a6de-48e0-9df9-de039cae8569	t
c7555935-08d9-4c93-8fea-401d7ee4ea49	b3a3162a-61c9-499b-9a7e-3e535a7e843d	t
c7555935-08d9-4c93-8fea-401d7ee4ea49	7e4a3b88-203f-4051-a8a2-6f1365135bde	f
c7555935-08d9-4c93-8fea-401d7ee4ea49	10609232-fea8-4344-93bd-ca15a5069026	f
c7555935-08d9-4c93-8fea-401d7ee4ea49	34c1623f-b4bf-406a-a97e-4bcab3db9529	f
c7555935-08d9-4c93-8fea-401d7ee4ea49	984ea520-4d21-442f-8bb5-8e2df107a775	f
bb9ccc82-fde1-4280-a0de-8a8dfac52885	1cedd5fe-7777-4e7a-8c5e-fe4138e6968a	t
bb9ccc82-fde1-4280-a0de-8a8dfac52885	b7858b8f-f3f3-48fa-99e8-323e099302b1	t
bb9ccc82-fde1-4280-a0de-8a8dfac52885	0d33f992-a6de-48e0-9df9-de039cae8569	t
bb9ccc82-fde1-4280-a0de-8a8dfac52885	b3a3162a-61c9-499b-9a7e-3e535a7e843d	t
bb9ccc82-fde1-4280-a0de-8a8dfac52885	7e4a3b88-203f-4051-a8a2-6f1365135bde	f
bb9ccc82-fde1-4280-a0de-8a8dfac52885	10609232-fea8-4344-93bd-ca15a5069026	f
bb9ccc82-fde1-4280-a0de-8a8dfac52885	34c1623f-b4bf-406a-a97e-4bcab3db9529	f
bb9ccc82-fde1-4280-a0de-8a8dfac52885	984ea520-4d21-442f-8bb5-8e2df107a775	f
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	1cedd5fe-7777-4e7a-8c5e-fe4138e6968a	t
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	b7858b8f-f3f3-48fa-99e8-323e099302b1	t
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	0d33f992-a6de-48e0-9df9-de039cae8569	t
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	b3a3162a-61c9-499b-9a7e-3e535a7e843d	t
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	7e4a3b88-203f-4051-a8a2-6f1365135bde	f
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	10609232-fea8-4344-93bd-ca15a5069026	f
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	34c1623f-b4bf-406a-a97e-4bcab3db9529	f
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	984ea520-4d21-442f-8bb5-8e2df107a775	f
44e05627-2d1f-4910-acb9-26a8acb59196	1cedd5fe-7777-4e7a-8c5e-fe4138e6968a	t
44e05627-2d1f-4910-acb9-26a8acb59196	b7858b8f-f3f3-48fa-99e8-323e099302b1	t
44e05627-2d1f-4910-acb9-26a8acb59196	0d33f992-a6de-48e0-9df9-de039cae8569	t
44e05627-2d1f-4910-acb9-26a8acb59196	b3a3162a-61c9-499b-9a7e-3e535a7e843d	t
44e05627-2d1f-4910-acb9-26a8acb59196	7e4a3b88-203f-4051-a8a2-6f1365135bde	f
44e05627-2d1f-4910-acb9-26a8acb59196	10609232-fea8-4344-93bd-ca15a5069026	f
44e05627-2d1f-4910-acb9-26a8acb59196	34c1623f-b4bf-406a-a97e-4bcab3db9529	f
44e05627-2d1f-4910-acb9-26a8acb59196	984ea520-4d21-442f-8bb5-8e2df107a775	f
ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	1cedd5fe-7777-4e7a-8c5e-fe4138e6968a	t
ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	b7858b8f-f3f3-48fa-99e8-323e099302b1	t
ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	0d33f992-a6de-48e0-9df9-de039cae8569	t
ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	b3a3162a-61c9-499b-9a7e-3e535a7e843d	t
ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	7e4a3b88-203f-4051-a8a2-6f1365135bde	f
ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	10609232-fea8-4344-93bd-ca15a5069026	f
ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	34c1623f-b4bf-406a-a97e-4bcab3db9529	f
ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	984ea520-4d21-442f-8bb5-8e2df107a775	f
855cb299-7dc3-44de-b189-075aeaa4fc69	1cedd5fe-7777-4e7a-8c5e-fe4138e6968a	t
855cb299-7dc3-44de-b189-075aeaa4fc69	b7858b8f-f3f3-48fa-99e8-323e099302b1	t
855cb299-7dc3-44de-b189-075aeaa4fc69	0d33f992-a6de-48e0-9df9-de039cae8569	t
855cb299-7dc3-44de-b189-075aeaa4fc69	b3a3162a-61c9-499b-9a7e-3e535a7e843d	t
855cb299-7dc3-44de-b189-075aeaa4fc69	7e4a3b88-203f-4051-a8a2-6f1365135bde	f
855cb299-7dc3-44de-b189-075aeaa4fc69	10609232-fea8-4344-93bd-ca15a5069026	f
855cb299-7dc3-44de-b189-075aeaa4fc69	34c1623f-b4bf-406a-a97e-4bcab3db9529	f
855cb299-7dc3-44de-b189-075aeaa4fc69	984ea520-4d21-442f-8bb5-8e2df107a775	f
\.


--
-- Data for Name: client_scope_role_mapping; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_scope_role_mapping (scope_id, role_id) FROM stdin;
3fb21161-bc63-4cb5-bdbe-a6edc03cd315	43554a7c-0d86-4398-aa73-95ca93bd7099
34c1623f-b4bf-406a-a97e-4bcab3db9529	125388c9-4f35-4d2c-a267-5c0ef3764fca
\.


--
-- Data for Name: client_session; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_session (id, client_id, redirect_uri, state, "timestamp", session_id, auth_method, realm_id, auth_user_id, current_action) FROM stdin;
\.


--
-- Data for Name: client_session_auth_status; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_session_auth_status (authenticator, status, client_session) FROM stdin;
\.


--
-- Data for Name: client_session_note; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_session_note (name, value, client_session) FROM stdin;
\.


--
-- Data for Name: client_session_prot_mapper; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_session_prot_mapper (protocol_mapper_id, client_session) FROM stdin;
\.


--
-- Data for Name: client_session_role; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_session_role (role_id, client_session) FROM stdin;
\.


--
-- Data for Name: client_user_session_note; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_user_session_note (name, value, client_session) FROM stdin;
\.


--
-- Data for Name: component; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.component (id, name, parent_id, provider_id, provider_type, realm_id, sub_type) FROM stdin;
0dc8ea44-0af1-4d53-add5-0d4036b94c58	Trusted Hosts	master	trusted-hosts	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	master	anonymous
a84ff2af-4c3c-4564-adda-577a0f771576	Consent Required	master	consent-required	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	master	anonymous
1115d215-59f0-4764-b00f-a1c920fc0956	Full Scope Disabled	master	scope	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	master	anonymous
9d60a57c-3aeb-40d7-a468-d7416e03e06f	Max Clients Limit	master	max-clients	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	master	anonymous
b26327ae-5756-41fb-922e-c7590f63c5cb	Allowed Protocol Mapper Types	master	allowed-protocol-mappers	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	master	anonymous
32cf36a4-d3cf-487d-8b6f-aed60fdfa249	Allowed Client Scopes	master	allowed-client-templates	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	master	anonymous
1b4efd0f-f954-4b47-b301-1f74568f7e86	Allowed Protocol Mapper Types	master	allowed-protocol-mappers	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	master	authenticated
4791a819-846e-48ce-9e84-4354b473412c	Allowed Client Scopes	master	allowed-client-templates	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	master	authenticated
59cb81f0-7605-4ffd-985e-f69e4c43315d	rsa-generated	master	rsa-generated	org.keycloak.keys.KeyProvider	master	\N
036b6917-bebe-487b-9ca4-0717140b37f5	rsa-enc-generated	master	rsa-generated	org.keycloak.keys.KeyProvider	master	\N
4917048e-2a40-4eb0-b1cf-b0e66010fe6f	hmac-generated	master	hmac-generated	org.keycloak.keys.KeyProvider	master	\N
54ccf7d8-1f68-4fc5-b12b-c1f90b773551	aes-generated	master	aes-generated	org.keycloak.keys.KeyProvider	master	\N
22a8bd93-bf63-40f5-8a73-120119ce4c01	Allowed Protocol Mapper Types	aspen	allowed-protocol-mappers	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	aspen	authenticated
92d2f1d4-b0d9-42b8-abd7-660bd8a9a1c5	Consent Required	aspen	consent-required	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	aspen	anonymous
c8e1aee9-ef90-43c7-a336-dca650a6bd52	Allowed Client Scopes	aspen	allowed-client-templates	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	aspen	anonymous
12d5f14e-1b3a-42a8-a785-6e505e8f9883	Allowed Client Scopes	aspen	allowed-client-templates	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	aspen	authenticated
944b28ef-3039-4868-8480-a1ec15360024	Trusted Hosts	aspen	trusted-hosts	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	aspen	anonymous
27253f0c-7a1d-4b74-9b30-08cb6776ba55	Max Clients Limit	aspen	max-clients	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	aspen	anonymous
6a364d6d-4d15-4f3a-b244-c60807a7fc17	Full Scope Disabled	aspen	scope	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	aspen	anonymous
3cff2dcc-bbdb-49be-8d4b-7f9b16900622	Allowed Protocol Mapper Types	aspen	allowed-protocol-mappers	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	aspen	anonymous
8097e406-06ba-4d5f-98ba-c853d384f890	aes-generated	aspen	aes-generated	org.keycloak.keys.KeyProvider	aspen	\N
d706712f-17ad-4332-806f-c6b36a0e9d33	hmac-generated	aspen	hmac-generated	org.keycloak.keys.KeyProvider	aspen	\N
5cc93f0b-eb7b-4e9e-a8c9-6fc1cf54beb5	rsa-generated	aspen	rsa-generated	org.keycloak.keys.KeyProvider	aspen	\N
f93806ce-3fd9-451f-80f7-aac3d58a43ee	rsa-enc-generated	aspen	rsa-generated	org.keycloak.keys.KeyProvider	aspen	\N
29c088cb-c4a4-4224-9eb3-a1ca98156810	\N	aspen	declarative-user-profile	org.keycloak.userprofile.UserProfileProvider	aspen	\N
\.


--
-- Data for Name: component_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.component_config (id, component_id, name, value) FROM stdin;
8f722fc5-1b28-4b85-bf23-b26c03855d71	9d60a57c-3aeb-40d7-a468-d7416e03e06f	max-clients	200
4bcc2cca-dc5a-47a6-9be4-7a2a8bd5c4c1	4791a819-846e-48ce-9e84-4354b473412c	allow-default-scopes	true
46d21275-dd01-4868-bf0d-550f2cffb755	32cf36a4-d3cf-487d-8b6f-aed60fdfa249	allow-default-scopes	true
2e830b00-705e-4fc1-85d8-8743c51b72ee	1b4efd0f-f954-4b47-b301-1f74568f7e86	allowed-protocol-mapper-types	oidc-usermodel-attribute-mapper
5cc93456-6ca2-4ec5-9fcd-ba16df495722	1b4efd0f-f954-4b47-b301-1f74568f7e86	allowed-protocol-mapper-types	saml-user-property-mapper
e7a8997d-dc29-4198-8ee9-718c53bfa61f	1b4efd0f-f954-4b47-b301-1f74568f7e86	allowed-protocol-mapper-types	oidc-sha256-pairwise-sub-mapper
525ed4c7-908f-4514-92a0-968c7f7180e3	1b4efd0f-f954-4b47-b301-1f74568f7e86	allowed-protocol-mapper-types	oidc-full-name-mapper
e456a7ca-4735-45d8-8fec-b7bfe0b4378d	1b4efd0f-f954-4b47-b301-1f74568f7e86	allowed-protocol-mapper-types	saml-role-list-mapper
d93b3772-148c-44d8-99df-a5223dcba29b	1b4efd0f-f954-4b47-b301-1f74568f7e86	allowed-protocol-mapper-types	saml-user-attribute-mapper
959ba87b-4cdc-4403-a872-c307a1b65a48	1b4efd0f-f954-4b47-b301-1f74568f7e86	allowed-protocol-mapper-types	oidc-usermodel-property-mapper
693a39cd-09fd-4279-a48d-240a8c788273	1b4efd0f-f954-4b47-b301-1f74568f7e86	allowed-protocol-mapper-types	oidc-address-mapper
9c6531dd-5131-41f6-b96b-b8b2855eb84d	b26327ae-5756-41fb-922e-c7590f63c5cb	allowed-protocol-mapper-types	oidc-usermodel-attribute-mapper
0fc972c4-e2a7-4133-bf6b-96e768599bfc	b26327ae-5756-41fb-922e-c7590f63c5cb	allowed-protocol-mapper-types	saml-user-property-mapper
f4c294f2-0e4f-434e-8fa6-a9017c8715e9	b26327ae-5756-41fb-922e-c7590f63c5cb	allowed-protocol-mapper-types	oidc-usermodel-property-mapper
3d101e7e-c7c1-4d85-9e0d-da3881531e8b	b26327ae-5756-41fb-922e-c7590f63c5cb	allowed-protocol-mapper-types	oidc-address-mapper
3bbb00e2-e3b8-4ee7-bb94-ac80b6ae2e3b	b26327ae-5756-41fb-922e-c7590f63c5cb	allowed-protocol-mapper-types	saml-role-list-mapper
d61e9ef4-3562-4ffe-a118-f50f3788ccd0	b26327ae-5756-41fb-922e-c7590f63c5cb	allowed-protocol-mapper-types	saml-user-attribute-mapper
94d68fa4-1e4f-4cba-a947-64a261ecdd12	b26327ae-5756-41fb-922e-c7590f63c5cb	allowed-protocol-mapper-types	oidc-full-name-mapper
b2469137-f60a-4133-a0e1-6df63e7704a3	b26327ae-5756-41fb-922e-c7590f63c5cb	allowed-protocol-mapper-types	oidc-sha256-pairwise-sub-mapper
12a44bf0-cd58-4fcc-8bdc-1aefeb521f61	0dc8ea44-0af1-4d53-add5-0d4036b94c58	host-sending-registration-request-must-match	true
bcd1afd8-4b43-4da9-ab53-c650fff910ad	0dc8ea44-0af1-4d53-add5-0d4036b94c58	client-uris-must-match	true
173c055d-dce5-4998-b0d7-9590609ed390	59cb81f0-7605-4ffd-985e-f69e4c43315d	privateKey	MIIEpQIBAAKCAQEA563jQcZbRFtBuOCp94fyvJrdymCYnIlWG0swuPvWKF4/8F/Q7WYVrLKLZfbKkZ5zLLaeUjnUfpZh9bqIns9mHE73Oe9Q1iToAwrqTDV4zrj55N669A5QsxMrKnYat5zM4MAByYEcDGl+y7ApE2ks+sKDqmZP43QPeZn2VbcRlGjUGqyuRwmBZk6Ao/R93kY7cgXBe7DeTQ7IuUq76F9+ebH0mKZxm7NdBngKJS4b9o+1BiH7PBaWxKqSWVspyWp9ilUEfevt/+dv9j3VFM9l6KZT0Sscnbghe/K9knGq5jxt0Suck09/FFquQkeaXIZgRpWhdUfgJj00VZYg8aJpXwIDAQABAoIBAQCr9Rm/YT2uj9lJIp+lFSeqq3vBUU8UqK7blUR1mJ5M2h+1Bzkoa2PdCayDotiZmrS71FPQjhHVX0MYQzpSPXf5vPas7p7eQwhd8cUTiYDAVvVL1bGHofRt5eVdH8oWzHAYxQrOiGDMKaUuA/OI78Ct4qAdYtEa7rLpu8fluPp4Xqh1gb+e9p2MxYWoIj5aoJbE2yD+rF//jV0gvCcisGMOLlAFwpBE4Ohna9eFroNcqxc93aeKeXhq2tExfByxF2VDnimVfbco9MOWdxLSSaWbbFCt+tXqnsx61qgG+DDB+BILmyHJpEaPENBpTtjwi7pvBoHGPFMAbDQYN62/Ce9hAoGBAP2mzc6TdNpA66yJVu8B2rrSC/EPIi1oh1Ixe2tjpmRrOmVtHmqp6Cz+U0wFq/KhyRerho8DEDr/kt80jzJs9il0ZAdygLNQhHpk8WQLsfUSnzwlFqXzmQzQdZnb6vzN2y+jCLMrDIhWwXRFaxPX0FIYtT0lDtOJNT4P6JjX6jrxAoGBAOnTAXiVQp+qX0jNyKyDMw0bz5NQJYvr8qXGQdLtUbGXb4LlkG0sNynndcUBDV+p57Ep2PbUTf8p0mzDJKz29HdPTdLiyG+UC+oVNprDQPHDuq+lPaVP2CHIELcfJRJcpRzAnapOnY6j1cMrCUIcKq4MsdZ/RaWx3D2tE/OrQ8lPAoGBANwVfz1edGVrLxHlmKiI02CGIBZpKx57M+79QDlNnXJEF8cphtrF0c44Xc34ndlIx1LiYT51Sf/nAWjqEdWO9YfClYhgsYrksg4Ax/Ims6IRJljpVV1on8OenGuDhcEUXLpYm5PaJmWl4PUhxmbROtAA4EDNhq/EvY27//WeYn4BAoGBALwsifSG+pUQQZqPsb3T4FPeW9EMIQtYGXD7+qFLSAGKA73uDasueD6K/aZL0H16ePGE4gzSkuqUt7m72lowbFFQSys6Q2A4XtZFuCoYlL18bVNJwjC17xRQs9MLh4QdduuKv9f9aKMQismEavD/RgHISZ570oskdkBUd8gTvnvVAoGARzB7uFkUIc0fyxw0hWf6yteg3OZGlwFqb7QltwdMxAyBff+Z58l6nJHYIGZPjtDIdTElvL1tUVQMrrqYQLVEAjP5+p5HwXYfpi/+pYVJveVDvJSpe5oJ6yROORMsQnJvCs8FMNREqlcwnlARHpT+Jh+qXkZnJ/wrqTPMoCntpI4=
3843f5d0-81bf-4b93-a6a1-e292eb0508ed	59cb81f0-7605-4ffd-985e-f69e4c43315d	keyUse	sig
4474d61c-0398-4983-9f0f-be5ec85ca073	59cb81f0-7605-4ffd-985e-f69e4c43315d	priority	100
b5bee1b6-e52b-4820-83e5-310c4f4936b0	59cb81f0-7605-4ffd-985e-f69e4c43315d	certificate	MIICmzCCAYMCBgF7+/gtYTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZtYXN0ZXIwHhcNMjEwOTE5MDI1MDUwWhcNMzEwOTE5MDI1MjMwWjARMQ8wDQYDVQQDDAZtYXN0ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDnreNBxltEW0G44Kn3h/K8mt3KYJiciVYbSzC4+9YoXj/wX9DtZhWssotl9sqRnnMstp5SOdR+lmH1uoiez2YcTvc571DWJOgDCupMNXjOuPnk3rr0DlCzEysqdhq3nMzgwAHJgRwMaX7LsCkTaSz6woOqZk/jdA95mfZVtxGUaNQarK5HCYFmToCj9H3eRjtyBcF7sN5NDsi5SrvoX355sfSYpnGbs10GeAolLhv2j7UGIfs8FpbEqpJZWynJan2KVQR96+3/52/2PdUUz2XoplPRKxyduCF78r2ScarmPG3RK5yTT38UWq5CR5pchmBGlaF1R+AmPTRVliDxomlfAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAMm1TVAoOUvczFYhtj8Sd7F8Km37C8W6PGuvUwcvkjXy1K6e249mEfgmwE1dyxTS5cJ8/W6UXYFH1/JgcbRRgaUgHTV7jBozoBUqTeR6N10HmeZfkuG17IEj81eaQIpHBKVGO7keJGKkaNJ5ZCnOLPuHKvT6jy5pg6i9gMys7wYjMdAR2rrgNyBGp0/qcEmYOOc4Wl5CjshObL5HREVLb5GHezpeICMoyrXyqoSoeRypctq5Tnk/94vjmoIq59XudkXAzOsnqTw6lLX0rkN5qYbN+bU0hyoz9gzWAN8n5xCRPej9rTt9VqKe4UzSwmRZacq89JowsJ97oqwqUZHMOxs=
c8edc2ea-b062-44b8-a68d-ce6f4c04905f	036b6917-bebe-487b-9ca4-0717140b37f5	privateKey	MIIEpQIBAAKCAQEA6RIprTdAtyXZgbEdt5ZXuLTKTF4Yq9YlMgZY/NV8fRVJLefQu5bD6PPIO+52gqqTiIdmtvXTehaTjNXVPljK+qaWJILDxzGlbs9CLomwMnaBDYMG9U6Nq+D2QudqOxIuWG+C5fAIikLqziy78JM22G4GPYRxMNikvqrXCzcL6cV8dwW8jkkwlM6lLVWFMw4/IQ+2/9saPVmjr3qElzlKDa9pr9CT4jiSRsT5ItpxZGvnE2/gUaiXMOW2RmaEh6ak6+1NpJYuOS/SOv/pR0j221KIwxIkiuaKDiBAASETdI5SPiG8q/Cp0tNw0Qw8PItHj+X9CwMU0UYtMeMugASOHwIDAQABAoIBAApscIa5qOBIBhFBzZVvWN7+3ulJcAsHWcSB+irclWO2tv4hlvk8xeg+Nt9PS+eOH2kEvThDiEC2j8TFr3LJX9KT7rUVUBIxizeId2pDaCjpmd3z1TTVXYqpVfoqBVs89euomQ8VjBw63+t2nrUksFg/m3HW4YUQu1V3qIRs4tCCmbQDSdScSb7qP0F++Aq812J8OGDZicH6kSg1u0L8mqLft3qDbll/+1821VA/uoip5K6COt3hAP4jOmm8MbKH72GD22ZwYZl7+1f6IHAWQaA/h9zRk235H7ujLkUTgqpHAgQB7uBZ5ERA+VYexfHT7XzM7C+HqzbPyGBKd3uaNFECgYEA9afY0lj2gr3PApHKa6KxH3v6lVoLW0AQjgsKO1GpfEXcQbm01IZHXFTKKNitaPyuQsSxuSDvw9PVZJVO/K4gF0zHhMSbG0g9mVBP/XqSQXAxlF3ypU7wxu1ALZGfN180XZSqRTuTwB+DbX1vMysh4KWCsHMInjsCog/HDTKDQEcCgYEA8uKnS4QuwBOdXDtygnzPLo1Fyv+E7ZXBsTfhyjajUGcbLsEDIQOF4NtXFpfRx3nIh4lxyIB6Ca2S71j/eUmeJK8yoaHmSH5jyD+3qIcKlQ7LWYG7pKf0Nzof7WFKKHBj+XbmZrtSo9BgYbw9Y9n16HfCVCclG8vkaVNMGckIx2kCgYEAm6w5N9uOo/2awLsY9qrL6fLMMnc0eSgZFZqjakHu0MUItlHz6TYK5NUKo2XkRoLR/5fcNEBOEOAd+7aurmu+BGXwjg91Z42ZE54UgsJ5CqUJlkcO7HkhFj7lC7ublSBs89yxJlyB3h9aTzlNDbUIq+7W6fCMBpHIsmCjOJbJHCMCgYEAt01+3GshrSwgcl8bCIeRBJzxs0Yr1/JRf6Gg8a9SiXeG+D4KUnwKKazfiNmDJHwwbrm3+Y2cjHlGjwQnqi15AE6Ic5tv4/4e6B3OSY3A2sWTijVym811bcicF9Z41RQdH0Qwlg+BSsgUNS6PVjBEefEH4+K3CsdR1ntaz4r86SECgYEA38jSOY7Z7VM1X/+gTiSvKPOUHtUHnZtTpE94iai4xvMYVf/fq2TA5kqj10UaqIrNbVRYbFvPyn+pA33S9Q6xYbRiNYdU6j1nMVpAS6vLGBBP5wLHJ+xUrSJFMJ2ATYyzaLslO7zzxjLtb1OUh24srmGsMohnX8QO/HoeV2TJZt4=
71373f14-41e4-4486-9872-ace71717349b	036b6917-bebe-487b-9ca4-0717140b37f5	keyUse	enc
89222e5e-3586-4005-a957-d0aed118c5ff	036b6917-bebe-487b-9ca4-0717140b37f5	certificate	MIICmzCCAYMCBgF7+/gtzzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZtYXN0ZXIwHhcNMjEwOTE5MDI1MDUxWhcNMzEwOTE5MDI1MjMxWjARMQ8wDQYDVQQDDAZtYXN0ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDpEimtN0C3JdmBsR23lle4tMpMXhir1iUyBlj81Xx9FUkt59C7lsPo88g77naCqpOIh2a29dN6FpOM1dU+WMr6ppYkgsPHMaVuz0IuibAydoENgwb1To2r4PZC52o7Ei5Yb4Ll8AiKQurOLLvwkzbYbgY9hHEw2KS+qtcLNwvpxXx3BbyOSTCUzqUtVYUzDj8hD7b/2xo9WaOveoSXOUoNr2mv0JPiOJJGxPki2nFka+cTb+BRqJcw5bZGZoSHpqTr7U2kli45L9I6/+lHSPbbUojDEiSK5ooOIEABIRN0jlI+Ibyr8KnS03DRDDw8i0eP5f0LAxTRRi0x4y6ABI4fAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAA2NFZ2RAOvD33ga+ZA1xqVvYqDT+jK/z5J3SkznKVILqpE24LSpil5jgta88YEZUQf0nkVSW8HqlOIxO4ojqGA7lzH9xYuLW/SEr4HF0873dW9iegnkWVFnUf5n2ZG85RveL+rOyLJHZxzKVgBBqQpiDnzUJ7eMQz2e+PeisRm2tak3j0koxT+lKBcCnnaXx0ou8bchiuj1q9XAq8cqsMUMpO2YXT20hth7p5Oi4TeMhTE0nbPsS7oi77U9miNM7k1/GH107fu1eWw/FwihOSL5l0AGRzUz27YgL5iuIVR9XbHN0uMhijGU7km3m3/NB+16nfbJLfzWFb7RVNNK2AQ=
91761f12-9cda-4d32-b6a0-fb26d3d0409e	036b6917-bebe-487b-9ca4-0717140b37f5	priority	100
8fb6a494-4c52-4c4c-852b-696ef4cdcf45	4917048e-2a40-4eb0-b1cf-b0e66010fe6f	priority	100
dd425fcd-5b1b-4aaa-aaf0-e920eb800d30	4917048e-2a40-4eb0-b1cf-b0e66010fe6f	algorithm	HS256
061f33dd-b936-4d55-a712-991e86543a2f	4917048e-2a40-4eb0-b1cf-b0e66010fe6f	kid	6ff6b49f-6ff6-4fef-9771-2f4c00a96c1b
9682d16c-6414-42de-a39c-ca6157c111f8	4917048e-2a40-4eb0-b1cf-b0e66010fe6f	secret	GUsgjz2Zp_Em7ABTawv-Ff43dS6gDqmm4gE4h5qmU8Owb-7aWGEcu30Ff80EAVYPw31WfeN9P4Rz4e8E5UZl-Q
b78e9b1a-8c5b-452a-aacf-18538663b9f5	54ccf7d8-1f68-4fc5-b12b-c1f90b773551	priority	100
b9d552cc-bc80-4e8e-94dd-7263d2e53e6c	54ccf7d8-1f68-4fc5-b12b-c1f90b773551	kid	500fa5c8-20f4-4ed9-b1cb-bc3de76d3e59
d962a347-52c0-4974-af6a-c9ff91e9b154	54ccf7d8-1f68-4fc5-b12b-c1f90b773551	secret	HSZ6EPKroBNgytCok_hybw
d028bd9a-b661-4f82-acab-b822c952d37a	22a8bd93-bf63-40f5-8a73-120119ce4c01	allowed-protocol-mapper-types	oidc-usermodel-property-mapper
4940866f-deb4-43a5-a773-8613131528a6	22a8bd93-bf63-40f5-8a73-120119ce4c01	allowed-protocol-mapper-types	saml-role-list-mapper
47770c73-939a-474f-8061-4e5b7fe00ffa	22a8bd93-bf63-40f5-8a73-120119ce4c01	allowed-protocol-mapper-types	oidc-address-mapper
49d5db33-19fa-4e41-981a-cb8d10eb2644	22a8bd93-bf63-40f5-8a73-120119ce4c01	allowed-protocol-mapper-types	oidc-usermodel-attribute-mapper
24bbaab1-d372-4308-bd32-907febc3e38e	22a8bd93-bf63-40f5-8a73-120119ce4c01	allowed-protocol-mapper-types	saml-user-attribute-mapper
7b748cee-fcad-4343-8406-ff1e29c858cb	22a8bd93-bf63-40f5-8a73-120119ce4c01	allowed-protocol-mapper-types	oidc-sha256-pairwise-sub-mapper
1dd30569-969e-470e-972d-eba1e06d58f2	22a8bd93-bf63-40f5-8a73-120119ce4c01	allowed-protocol-mapper-types	saml-user-property-mapper
ee1ab657-7ea4-474c-b61b-7e31d6f5896b	22a8bd93-bf63-40f5-8a73-120119ce4c01	allowed-protocol-mapper-types	oidc-full-name-mapper
d008fbd9-a311-4679-856d-679484079544	8097e406-06ba-4d5f-98ba-c853d384f890	kid	b89b5f34-6387-4dfd-9635-5aa369ec39f6
79b8c980-2764-4d3b-b1ab-fafce9fbd935	8097e406-06ba-4d5f-98ba-c853d384f890	secret	flObDHcEC4s1TiIEjgTeTA
67bde85c-a0de-4413-820a-f3b24f81070b	8097e406-06ba-4d5f-98ba-c853d384f890	priority	100
be2e8a94-136c-4226-843e-5acc0ff06e67	d706712f-17ad-4332-806f-c6b36a0e9d33	algorithm	HS256
9d306f6f-7a28-4f7c-bb13-2e538c105016	d706712f-17ad-4332-806f-c6b36a0e9d33	priority	100
c33970c9-41c5-4b31-bd24-a6be9fe9af02	d706712f-17ad-4332-806f-c6b36a0e9d33	secret	2YO2Jrvg7fOTrif2VWxU60EE2nCulqtHpYQoGbgndLIHiwN4h_UKOcu3nLCgJE4X8q00v3YYSmA9ZizGctuq5Q
a218c4f4-f0f4-4f98-90dc-1a7f2537b21e	d706712f-17ad-4332-806f-c6b36a0e9d33	kid	31520ccc-7082-4139-b751-35daa1b27748
11f81b8e-8014-4096-8047-0b31a2c36daf	5cc93f0b-eb7b-4e9e-a8c9-6fc1cf54beb5	keyUse	sig
486ccbd2-26ec-42a8-b73b-626316ab0717	5cc93f0b-eb7b-4e9e-a8c9-6fc1cf54beb5	priority	100
a6e91430-9c8c-46d5-902d-7b305f3f7508	5cc93f0b-eb7b-4e9e-a8c9-6fc1cf54beb5	certificate	MIICmTCCAYECBgF7+/3FqzANBgkqhkiG9w0BAQsFADAQMQ4wDAYDVQQDDAVhc3BlbjAeFw0yMTA5MTkwMjU2NTdaFw0zMTA5MTkwMjU4MzdaMBAxDjAMBgNVBAMMBWFzcGVuMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjcfly24BMjLn1Kbd9ZXIWbjXLlsyI5h5yROuXgcpTSgPxFcqbzwaa+mD1ADd+WWEuYOKxa80eO30o+r+QVaknn96cJz9aSskhocJS78rrWuSq3trosPtoCNNf5SPGrsCrazFhBAdWK3FPgDITbdsI4T7Dy03mqteRjfU29XpGRPWRNijq93AwE/fEpafNW86FaGtrC92pg/HaE9PKwkPc64JPFE+DNe8cfIQw/OgmoMKim+mQqvEB4X9WHnl63XFdvR0qla+V6aTXZjBDuUYpHs5KGhzvzG5e58qOfoQX9AemA8rpe63KVwpdQgxGBX0Ef98nNbBZGwbj33COg3xAQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQCGCLtozfTK8OIaTEpdv/hj47ymmUJ5GvZ/+wo7iHvTYJJIWB8/uSwGbGyeMky8w/7Q3E8JsDwcQF4JsKbKSP51JejLry86vG1iJouPr0xEQwCZFLgyus2OEbUFy0vaEfKx5lNaJxWC3s5mbP7G5un5nUvAFufbXVnppMY7vphu3EOAsN7h2GYokJd+SREtXyrOgGH2uoyg8WzYUYvfjo08cHm/LABhAvSI3V2X3KtOcFQHQC5t7G8zBdt2w8MPkagmEUYMRfTx8FUmLSs3bXzby1iL7Zb/pLdfprCMpWdFp545ndia0LDncZO+c7CSFHkTcA0xl1kM6Ct2lw1k8XrF
00ab1484-067b-48ba-a0b5-c88265f71456	5cc93f0b-eb7b-4e9e-a8c9-6fc1cf54beb5	privateKey	MIIEpQIBAAKCAQEAjcfly24BMjLn1Kbd9ZXIWbjXLlsyI5h5yROuXgcpTSgPxFcqbzwaa+mD1ADd+WWEuYOKxa80eO30o+r+QVaknn96cJz9aSskhocJS78rrWuSq3trosPtoCNNf5SPGrsCrazFhBAdWK3FPgDITbdsI4T7Dy03mqteRjfU29XpGRPWRNijq93AwE/fEpafNW86FaGtrC92pg/HaE9PKwkPc64JPFE+DNe8cfIQw/OgmoMKim+mQqvEB4X9WHnl63XFdvR0qla+V6aTXZjBDuUYpHs5KGhzvzG5e58qOfoQX9AemA8rpe63KVwpdQgxGBX0Ef98nNbBZGwbj33COg3xAQIDAQABAoIBAQCCXwkAKdQxu7uPwC0jkSqczioX90XAk4mRC2bwEXe5+hedfGWJyWOmTSCqhm2W0fHcwIePxc7jUDP/sqs/m5NeJ2yINuOSnFhG188FdvGL0voYczIDhlRwR2YQ5aM9ei85UkCBcmv5yjgwDnohdIOcmcBeMT8LG39h5B74Ute39TCSGPSz6KRVbIO8ITzAD9hFJdlA6NsPH8zhylZ7Pnm9XrOetF00lDcX5v9HJR5ZjiMl8z8ktt7N+N3Ax9e2mhnZSJ7glm+5X9qnY6Phs2tDbClYdTkkwxazYGdVBDxvAwP4oiTUPnVQ/188BKIeDJHSvvgN1kAKCEmxfX83JSDRAoGBAORhQB1xLOCx4k3RgUEHZ6nzPHdDwzgZZ1pI47ko6mq7WAdPkIRNwkGkyqjEoQpQc55sbZzUe8WRxfAMXftN+2itSnnDk/sDkfnog+drJMFwpVlB38vP2YoDc8JunzOn6BfCObVyV+St4eXODf7ehUxQdUnrxbC9d4+Uyf5bmGxVAoGBAJ7tgABPaDyiPUmlfHSq7ZW2SmN/aJY/BoU8g6IMjICR4Xq6oVU4jP3KFQugko9/gLo78k5RIGSYrdVPPu5Wu1fIK8HYUxj4SDAGKNLE5K/jvbEENmYFtrTsjpx+a5+Aw8p7BMQYpqxsEj3K5BA0H+iQF+0qKy2l6+29k4YQ0F39AoGBAIEjRJ/hWSENNQwPxWjCCSoecjh2RrM4GisBQFN5AWSs3s/ze6J0Xb3EsxvPY8hzSY1xfmHJ/Nrw3N4qABKUO+8q3gwQPWMY17hadAutmDERw02/ZA7ZTwctgI2XA8qvzRtyJjOlnnGeqTfK1jsiFHncnRXZjgWsfSjhV37OyFepAoGBAI4z1CRy6MHYKR6MhB+gEZWz1jvQ9LP7EMqGqwGEWPNxlF9MPq8SOpWbC9mrg3gCjhwVJ2oMDP/13RTQI27/DAIviXeZKEFfZrgRytVMd5MqI8EQE9yVoDWitLgyJfpCLO4vxMPxirEcwfWoZQham3Jr+/ypjpj5rXC8ABQlV0vBAoGAPerFvGqjKqqnSNgR+4vsskFuNB3HQLwQB41zxG1xZkB0HlOGxZFr9xw38wWZbd3xlAGRDpQDr3aT3BH1XnWJJgBqssOByPjhr2nXFF2Cjo4dp2A6fajicwx7YTGPa3FHzp4Nt/eN75Di24qD0XhS7OiW4rVVJNo9vKkW+GTseyo=
2bc98a62-4fcc-441b-a55e-c21375ab2c24	f93806ce-3fd9-451f-80f7-aac3d58a43ee	privateKey	MIIEowIBAAKCAQEAh0hh4WbJQOXK/R7zdja69T538S7U0X/7mr8KgOUEg7uDlitiM98ZofcC7HqfXAc1EO4y+Owqkmr7cAtuY4LmLNrJ0cQ4H7YHo5UgIkk2DMBa7IC3bP0sZuzoSI/IMYEm07huebA5FlU5ffTcAnSU48ttT2yeDwOUh9uqL2BgHafkOx731Gxn0rcX/zWLLmtGvakPav4hc8gIdsEj5Vf3AIz80DB6ZqZFluqIYYRjEAFzFvKqfpGfseUkzVOm1ci14wFMe0JiCLRCpge8yAL2ouMv8Ry2Smn/RUu88X8W8Af7tdiGKgZiSQKJi7FcQJp+WK1i46t49/135gy1eRFb9wIDAQABAoIBAB0etIsLUAjbLf2cWvW4RDgkETdmSEMsVGFz+/PQ2E7u3x1FC2d0/5SAki2LG6B4oLCbRXeVhnhr9OGiZEmhVKCVG9o+bYJN8YkBwZ//uFW4VhoQfutD9/nTxxBPet1FGrF6QrWI/FDVWYHGYlFY/O+ny0jMbZ13vNIds51tFmNrfzO7OHd+wGVaWmFYNcgGLGl+cD8mYtytdUbqYPdX/uZ4OZibE3tI1dnUvLE8dqD3zhOKtnUEqtbCVLh3BQMNz1A+UaHqQhKMmihiOvcQ8yuP0FPujrZrAMXdsDhMYuI2/HVtYJfvwZ6+rJ1BASOf/S11OFyLtIC8L+CpToyjybECgYEAu3IvLxHmfL1yH2Yrh0X3tOnw2aNx1fFSYswMDnMpVwKiuQ6FS8HXZwqDYlad6aYGJuzg1XQXEBENH2mJ9HGjL1lKQXNx4jO45IR4wxlt8l0QcmjxOlZkXxCnNjzav3G8BM3h0wZt387A69CngeU4SZDmEuJJfC7owc66vKT5zK8CgYEAuMJcGaVyl/xpnWDTvDkY/W0+/iFKrNS21QFwLoMYiR5ANTACLWvgCLEfL6k2SY1u21/TME6i/sVji3azqF9p16d28zem6BcPpKs2+V46iAdqeDcEuoZKx9dShKxkaBGd2YlnDC5HKiWc/31rCo/qutMFwnsl5tsbRPcfwV9GBzkCgYBAfaSmOS5ntHZTPz+ypuv2npZzCrzbss95lmJ/hjeu7AU4TjqmOeb2WLOjXdGu1aRAODeSuQJGUNeG+zSvmXlfjQTzR9jizpDKbplt5o3hWQuTkW+NdrPJ0Vz2WDGatHLP5FXR2OBspCHUAFHhaw/Wn7fIv3ow86K5K3sr9EbNmQKBgQCUqacr56leS/a7cFbOo+7MtCO0nhsVGA+JMyAN/OQ4KIQnh9qoq51XwRVD51bMNiZWFDO9MfkLIM6pQDjtKODkalZW+5esNiobKL0SR9S28aik1DhU0YvIYyR9pq0f49TsXhfxgCc47Yz3MvZ3SDfqXbPLugVUTUcS5fnCQaP6WQKBgDAW0MxtiOAwqgIaaeTehG0FcUyN2adoRfEqwF5Tw1AuK9SfLqs6p5ByTNNHhZRkE2SDSbmcEi4HoyZT9d2fv4uGZRdGj578er8f8sQgMtsr4cj0OGJ8htW+VwkU4ozrnppy8bmX6ziVXtpEZBuCCUUGVnoMbVoUAMGp4LwBAZ9i
74b59abe-9068-4307-a00e-b251f1ea1c3b	f93806ce-3fd9-451f-80f7-aac3d58a43ee	certificate	MIICmTCCAYECBgF7+/3GNzANBgkqhkiG9w0BAQsFADAQMQ4wDAYDVQQDDAVhc3BlbjAeFw0yMTA5MTkwMjU2NTdaFw0zMTA5MTkwMjU4MzdaMBAxDjAMBgNVBAMMBWFzcGVuMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh0hh4WbJQOXK/R7zdja69T538S7U0X/7mr8KgOUEg7uDlitiM98ZofcC7HqfXAc1EO4y+Owqkmr7cAtuY4LmLNrJ0cQ4H7YHo5UgIkk2DMBa7IC3bP0sZuzoSI/IMYEm07huebA5FlU5ffTcAnSU48ttT2yeDwOUh9uqL2BgHafkOx731Gxn0rcX/zWLLmtGvakPav4hc8gIdsEj5Vf3AIz80DB6ZqZFluqIYYRjEAFzFvKqfpGfseUkzVOm1ci14wFMe0JiCLRCpge8yAL2ouMv8Ry2Smn/RUu88X8W8Af7tdiGKgZiSQKJi7FcQJp+WK1i46t49/135gy1eRFb9wIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQATQaNQTiqU7rwYjph9G9f6Ab162CnZZVJykPHRGH3w3xlXodYJ/cahzQqAjLXTLwsXOi16kkylgUD1iJCb9zK5F17IT50P7KhDHdv8AnhT5S67zERE0qiAQ/GL8hSyu3zElYtPUh891tyKs8RCz/zkFXg4cO+BKQvCscI0ZvPYBG7NxOlwYSdjQ1HWiJjRs+Xrx5sEmU2i3Yvrq1Pm69BSaAYT/XKHtZ5uNxh4xLDfzY7enndzxPsaMJCaQ2lwllc1r8fMM6lUQXnCHxi4hFus+/zsyNPQBcrxO1EgVeHEG+JcQEgbdyJSTBOvnRIMB5AUJx++h2PK7GMusWt7wjOe
eba697dd-15b3-4a95-994a-254c64962afc	f93806ce-3fd9-451f-80f7-aac3d58a43ee	priority	100
d9f3dacc-3f50-4822-ac13-fdee6a7a4df2	f93806ce-3fd9-451f-80f7-aac3d58a43ee	keyUse	enc
5e787e60-cf36-41c4-8127-912c6b95a73a	c8e1aee9-ef90-43c7-a336-dca650a6bd52	allow-default-scopes	true
c54feda6-79fb-44b7-847e-ee1564a04f88	12d5f14e-1b3a-42a8-a785-6e505e8f9883	allow-default-scopes	true
129497d1-5054-48f1-8aa9-7c038e84573f	944b28ef-3039-4868-8480-a1ec15360024	host-sending-registration-request-must-match	true
27a0e30b-0643-4c18-995a-e44cdb313d43	944b28ef-3039-4868-8480-a1ec15360024	client-uris-must-match	true
4347d571-2100-461a-b1a6-e182a9f0c507	27253f0c-7a1d-4b74-9b30-08cb6776ba55	max-clients	200
89616e3e-b502-42c7-986c-eae7e55edb10	3cff2dcc-bbdb-49be-8d4b-7f9b16900622	allowed-protocol-mapper-types	oidc-sha256-pairwise-sub-mapper
f3fdd934-de6f-4407-9ecb-07511006991c	3cff2dcc-bbdb-49be-8d4b-7f9b16900622	allowed-protocol-mapper-types	saml-user-attribute-mapper
080b57e5-d55f-4f00-a02b-f85d1810269d	3cff2dcc-bbdb-49be-8d4b-7f9b16900622	allowed-protocol-mapper-types	oidc-address-mapper
2ed6c320-62fe-4c0e-91fd-09aa0e1eac7e	3cff2dcc-bbdb-49be-8d4b-7f9b16900622	allowed-protocol-mapper-types	oidc-usermodel-attribute-mapper
c4b72302-3c81-40f9-8749-2a630d0cbc8f	3cff2dcc-bbdb-49be-8d4b-7f9b16900622	allowed-protocol-mapper-types	saml-role-list-mapper
7c144def-4619-47e5-9b42-21907fc6d569	3cff2dcc-bbdb-49be-8d4b-7f9b16900622	allowed-protocol-mapper-types	oidc-full-name-mapper
c8497ac7-6a25-40b5-98d1-dd09c81bb581	3cff2dcc-bbdb-49be-8d4b-7f9b16900622	allowed-protocol-mapper-types	oidc-usermodel-property-mapper
89d769ce-5409-414e-98ed-7477324f6907	3cff2dcc-bbdb-49be-8d4b-7f9b16900622	allowed-protocol-mapper-types	saml-user-property-mapper
\.


--
-- Data for Name: composite_role; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.composite_role (composite, child_role) FROM stdin;
c9b1fa63-17be-4b24-aa7c-775cebc84e29	d7153836-937c-4f15-adf2-107b2346cc49
c9b1fa63-17be-4b24-aa7c-775cebc84e29	53eaf79b-b4b8-4ace-831c-69190cd4d0b9
c9b1fa63-17be-4b24-aa7c-775cebc84e29	2aa0bf70-6e96-4eb7-b783-2a5722a78f04
c9b1fa63-17be-4b24-aa7c-775cebc84e29	c95f7f49-493d-4998-8c2a-8c90606f0173
c9b1fa63-17be-4b24-aa7c-775cebc84e29	de8e8046-b3b6-4dee-b9ee-a01b333ff3de
c9b1fa63-17be-4b24-aa7c-775cebc84e29	e88164ee-1a41-4d0b-a66c-2449ccc4060e
c9b1fa63-17be-4b24-aa7c-775cebc84e29	1bb09102-5c8a-4465-a92e-3927c85ba6a0
c9b1fa63-17be-4b24-aa7c-775cebc84e29	7a4ee52f-59e5-4479-8c66-c994ebf013d4
c9b1fa63-17be-4b24-aa7c-775cebc84e29	5ec19f96-31c4-4a7a-9481-4026522ff0be
c9b1fa63-17be-4b24-aa7c-775cebc84e29	f1e12354-6714-4037-9ced-9a04afafd23f
c9b1fa63-17be-4b24-aa7c-775cebc84e29	28f6f95b-f535-450d-98fd-2d739f4de2e5
c9b1fa63-17be-4b24-aa7c-775cebc84e29	938f406f-aeb0-4387-9f92-cd975170a0a2
c9b1fa63-17be-4b24-aa7c-775cebc84e29	bfbfa757-36f6-449c-a641-69953af13d99
c9b1fa63-17be-4b24-aa7c-775cebc84e29	09b03605-f5bd-4fa9-8a35-ea60693dbb89
c9b1fa63-17be-4b24-aa7c-775cebc84e29	17a55c12-5072-476a-a431-3baaa53cbf67
c9b1fa63-17be-4b24-aa7c-775cebc84e29	b9aafea3-7b22-4521-a2eb-41ba33083d35
c9b1fa63-17be-4b24-aa7c-775cebc84e29	93243850-e956-41d1-ba76-43e269d11825
c9b1fa63-17be-4b24-aa7c-775cebc84e29	16d69b80-335a-420a-9577-10accb49cdb7
de8e8046-b3b6-4dee-b9ee-a01b333ff3de	b9aafea3-7b22-4521-a2eb-41ba33083d35
c95f7f49-493d-4998-8c2a-8c90606f0173	17a55c12-5072-476a-a431-3baaa53cbf67
c95f7f49-493d-4998-8c2a-8c90606f0173	16d69b80-335a-420a-9577-10accb49cdb7
1ddd0d01-b06f-4731-ad0a-52abe01ab6b5	465f285b-5e65-466f-9377-7f2499df400b
1ddd0d01-b06f-4731-ad0a-52abe01ab6b5	61756776-df3d-43ce-af71-4b17730a42d6
61756776-df3d-43ce-af71-4b17730a42d6	d577caa8-1a9b-4811-9371-caa4ee7a8115
3fc65335-0620-4702-92c4-a8f5eadacb70	e9a5ba58-f9b9-47c6-a0b0-bee2fb1ef2db
c9b1fa63-17be-4b24-aa7c-775cebc84e29	843b462d-0d84-418a-bf6c-1cf115a00b0d
1ddd0d01-b06f-4731-ad0a-52abe01ab6b5	43554a7c-0d86-4398-aa73-95ca93bd7099
1ddd0d01-b06f-4731-ad0a-52abe01ab6b5	4edd25e6-1a1f-4a44-9019-b005f2c3533e
c9b1fa63-17be-4b24-aa7c-775cebc84e29	5903c2e0-0eab-4b4e-8897-40532a63e939
c9b1fa63-17be-4b24-aa7c-775cebc84e29	855405ba-612b-44ad-a63a-adf1a4488738
c9b1fa63-17be-4b24-aa7c-775cebc84e29	c7463bc6-ff95-481c-aac1-f6940e3c4bd1
c9b1fa63-17be-4b24-aa7c-775cebc84e29	dc928ecc-5367-4e0b-8829-5425755b3942
c9b1fa63-17be-4b24-aa7c-775cebc84e29	4e12c42f-27c7-41d4-b7ac-f0cece6c1263
c9b1fa63-17be-4b24-aa7c-775cebc84e29	1ab439aa-ec46-4171-a038-e0529acb5f18
c9b1fa63-17be-4b24-aa7c-775cebc84e29	a2e95dae-f1f9-41b8-970c-d9e5c5a1dee2
c9b1fa63-17be-4b24-aa7c-775cebc84e29	25ab19b7-3583-44f7-8d45-1a33abb7c459
c9b1fa63-17be-4b24-aa7c-775cebc84e29	0dba6de8-9d56-403d-9c76-f3e4a3597e6e
c9b1fa63-17be-4b24-aa7c-775cebc84e29	4559f91a-48a8-47fa-9f6a-f46d2f585fe2
c9b1fa63-17be-4b24-aa7c-775cebc84e29	7fdb50cd-511b-46c6-a6cb-0b6c4f6ddb9f
c9b1fa63-17be-4b24-aa7c-775cebc84e29	8bc1b766-7aee-43db-b19a-fdcf2f619d83
c9b1fa63-17be-4b24-aa7c-775cebc84e29	fc8a625b-41d1-413b-8b10-471f67b4bc27
c9b1fa63-17be-4b24-aa7c-775cebc84e29	00a2eef9-bff8-4210-9fdc-b4209f533acc
c9b1fa63-17be-4b24-aa7c-775cebc84e29	f03011b7-9dde-4206-b6d2-fd4ba969eaf2
c9b1fa63-17be-4b24-aa7c-775cebc84e29	41a1ac06-7a6b-46bc-9f87-271dee630f00
c9b1fa63-17be-4b24-aa7c-775cebc84e29	86a9a06a-cd2a-4755-a448-a12ab402ca07
dc928ecc-5367-4e0b-8829-5425755b3942	f03011b7-9dde-4206-b6d2-fd4ba969eaf2
c7463bc6-ff95-481c-aac1-f6940e3c4bd1	86a9a06a-cd2a-4755-a448-a12ab402ca07
c7463bc6-ff95-481c-aac1-f6940e3c4bd1	00a2eef9-bff8-4210-9fdc-b4209f533acc
526ddcda-dc7d-4c47-9730-af8180cbada4	125388c9-4f35-4d2c-a267-5c0ef3764fca
526ddcda-dc7d-4c47-9730-af8180cbada4	de07690a-efe2-4225-9e2a-3908474f19db
526ddcda-dc7d-4c47-9730-af8180cbada4	b23cdb4c-4362-4f4b-9dff-3a21a1e3d1af
526ddcda-dc7d-4c47-9730-af8180cbada4	94180297-98f1-47bd-915e-0cd5a5555438
5f225779-d443-4389-8dd4-00087ff1a957	1d3453e1-7b23-400d-b0d2-41ec3d1a5e7b
5f225779-d443-4389-8dd4-00087ff1a957	48c50fe5-8917-4160-b8d9-88ff0871c1ec
5f225779-d443-4389-8dd4-00087ff1a957	da920a00-99d9-41c5-ab2e-1cc82649a406
5f225779-d443-4389-8dd4-00087ff1a957	2a4e944c-1feb-47fe-af7e-07ff5de86ef7
5f225779-d443-4389-8dd4-00087ff1a957	2f4ddbe9-fe31-4482-a6dc-57b053d4cd89
5f225779-d443-4389-8dd4-00087ff1a957	2baa76c7-0e3f-4ca1-a38c-3ca4d15dda63
5f225779-d443-4389-8dd4-00087ff1a957	5f898da3-2110-484c-914b-0fe989e5d5a5
5f225779-d443-4389-8dd4-00087ff1a957	430ca7d1-b1f4-45b0-9f6b-3a60b2891f98
5f225779-d443-4389-8dd4-00087ff1a957	b21f3f10-6cc5-4a56-9ce9-00550749acbe
5f225779-d443-4389-8dd4-00087ff1a957	b65e6039-3e07-4f13-bd26-2dceff7a9128
5f225779-d443-4389-8dd4-00087ff1a957	c8dbded2-88cb-46f2-90eb-06e68c2e9cc6
5f225779-d443-4389-8dd4-00087ff1a957	2764b4fd-0fd5-4419-858d-d630b31a31ad
5f225779-d443-4389-8dd4-00087ff1a957	e5157a6e-f183-4ea4-93de-b206de07be59
5f225779-d443-4389-8dd4-00087ff1a957	d4fc4eb6-49b5-48fc-b97c-9c9df792b2ae
5f225779-d443-4389-8dd4-00087ff1a957	c50a1a92-a671-4588-acc3-0df447bab19e
5f225779-d443-4389-8dd4-00087ff1a957	16b93855-20a3-4e0a-96a0-c786d90f7bee
5f225779-d443-4389-8dd4-00087ff1a957	bf06e6ae-ba31-4b21-b893-599ecea4eb26
5f225779-d443-4389-8dd4-00087ff1a957	2480eb40-75ad-4c0d-8299-5b9b8ec91530
d4fc4eb6-49b5-48fc-b97c-9c9df792b2ae	da920a00-99d9-41c5-ab2e-1cc82649a406
c50a1a92-a671-4588-acc3-0df447bab19e	b65e6039-3e07-4f13-bd26-2dceff7a9128
c50a1a92-a671-4588-acc3-0df447bab19e	bf06e6ae-ba31-4b21-b893-599ecea4eb26
de07690a-efe2-4225-9e2a-3908474f19db	84b6eb25-5a4b-4c54-86c4-2653a36dfb19
44df8fbc-26a0-4eb7-b595-a2d23afdf1ae	5f34cfef-8ce3-408c-9e90-fa50b5ac22d3
c9b1fa63-17be-4b24-aa7c-775cebc84e29	9be77a31-d45b-49ed-9e97-dccd2d72b9b4
a17543af-0992-4d18-93c8-4a82bb13578e	441bf022-0174-4473-b4d1-92e36ddbcb73
\.


--
-- Data for Name: credential; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.credential (id, salt, type, user_id, created_date, user_label, secret_data, credential_data, priority) FROM stdin;
26cdb7a3-413a-450e-8280-f3b6ea60d187	\N	password	06be471b-1c32-40ea-86ad-20b1914ec450	1632019951487	\N	{"value":"maoKrhi7H7NB6Gxeri/mCU2FUBktNUlSOJZ59Uu5gWarNjk3BcFuE+/9TiAteILyi1inPxoWbIu+90GWdo+oBw==","salt":"eTF+Vbeg90LnNYPku55jIQ==","additionalParameters":{}}	{"hashIterations":27500,"algorithm":"pbkdf2-sha256","additionalParameters":{}}	10
00044d8d-fb50-4fc9-b2b3-408caf210cf7	\N	password	9f3ef3d5-7c23-4ba1-8138-37f7693cd5de	1632020485879	\N	{"value":"To0R7HSfc28Hs2R2kg+EF+hNc+MK/4Ej7jz1ulP+OIM7EkrEjxOiaCgJyHuMJlAf67TzePfNDCDkNCAaoRIbaQ==","salt":"Pz37PHXNDo/dBbDJiQTb+w==","additionalParameters":{}}	{"hashIterations":27500,"algorithm":"pbkdf2-sha256","additionalParameters":{}}	10
8322675c-5c9a-40a2-873e-2da5241a42e9	\N	password	3f64dbd3-a135-45eb-9d1c-afe9151082cd	1632198293032	\N	{"value":"6bSQLg6B7ScsdqpIEJcLpRSqZsm88tNf85XLQqdpna0Bw9l9kQadqVo+OtXImEG/iiKXsagv5qkGpjEPkEGsIw==","salt":"LCrH/rS1SH5SCg5AQUIXTA==","additionalParameters":{}}	{"hashIterations":27500,"algorithm":"pbkdf2-sha256","additionalParameters":{}}	10
\.


--
-- Data for Name: databasechangelog; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.databasechangelog (id, author, filename, dateexecuted, orderexecuted, exectype, md5sum, description, comments, tag, liquibase, contexts, labels, deployment_id) FROM stdin;
1.0.0.Final-KEYCLOAK-5461	sthorger@redhat.com	META-INF/jpa-changelog-1.0.0.Final.xml	2021-09-19 02:52:24.391987	1	EXECUTED	7:4e70412f24a3f382c82183742ec79317	createTable tableName=APPLICATION_DEFAULT_ROLES; createTable tableName=CLIENT; createTable tableName=CLIENT_SESSION; createTable tableName=CLIENT_SESSION_ROLE; createTable tableName=COMPOSITE_ROLE; createTable tableName=CREDENTIAL; createTable tab...		\N	3.5.4	\N	\N	2019944028
1.0.0.Final-KEYCLOAK-5461	sthorger@redhat.com	META-INF/db2-jpa-changelog-1.0.0.Final.xml	2021-09-19 02:52:24.406359	2	MARK_RAN	7:cb16724583e9675711801c6875114f28	createTable tableName=APPLICATION_DEFAULT_ROLES; createTable tableName=CLIENT; createTable tableName=CLIENT_SESSION; createTable tableName=CLIENT_SESSION_ROLE; createTable tableName=COMPOSITE_ROLE; createTable tableName=CREDENTIAL; createTable tab...		\N	3.5.4	\N	\N	2019944028
1.1.0.Beta1	sthorger@redhat.com	META-INF/jpa-changelog-1.1.0.Beta1.xml	2021-09-19 02:52:24.44959	3	EXECUTED	7:0310eb8ba07cec616460794d42ade0fa	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION; createTable tableName=CLIENT_ATTRIBUTES; createTable tableName=CLIENT_SESSION_NOTE; createTable tableName=APP_NODE_REGISTRATIONS; addColumn table...		\N	3.5.4	\N	\N	2019944028
1.1.0.Final	sthorger@redhat.com	META-INF/jpa-changelog-1.1.0.Final.xml	2021-09-19 02:52:24.453988	4	EXECUTED	7:5d25857e708c3233ef4439df1f93f012	renameColumn newColumnName=EVENT_TIME, oldColumnName=TIME, tableName=EVENT_ENTITY		\N	3.5.4	\N	\N	2019944028
1.2.0.Beta1	psilva@redhat.com	META-INF/jpa-changelog-1.2.0.Beta1.xml	2021-09-19 02:52:24.560598	5	EXECUTED	7:c7a54a1041d58eb3817a4a883b4d4e84	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION; createTable tableName=PROTOCOL_MAPPER; createTable tableName=PROTOCOL_MAPPER_CONFIG; createTable tableName=...		\N	3.5.4	\N	\N	2019944028
1.2.0.Beta1	psilva@redhat.com	META-INF/db2-jpa-changelog-1.2.0.Beta1.xml	2021-09-19 02:52:24.567307	6	MARK_RAN	7:2e01012df20974c1c2a605ef8afe25b7	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION; createTable tableName=PROTOCOL_MAPPER; createTable tableName=PROTOCOL_MAPPER_CONFIG; createTable tableName=...		\N	3.5.4	\N	\N	2019944028
1.2.0.RC1	bburke@redhat.com	META-INF/jpa-changelog-1.2.0.CR1.xml	2021-09-19 02:52:24.654216	7	EXECUTED	7:0f08df48468428e0f30ee59a8ec01a41	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete tableName=USER_SESSION; createTable tableName=MIGRATION_MODEL; createTable tableName=IDENTITY_P...		\N	3.5.4	\N	\N	2019944028
1.2.0.RC1	bburke@redhat.com	META-INF/db2-jpa-changelog-1.2.0.CR1.xml	2021-09-19 02:52:24.658495	8	MARK_RAN	7:a77ea2ad226b345e7d689d366f185c8c	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete tableName=USER_SESSION; createTable tableName=MIGRATION_MODEL; createTable tableName=IDENTITY_P...		\N	3.5.4	\N	\N	2019944028
1.2.0.Final	keycloak	META-INF/jpa-changelog-1.2.0.Final.xml	2021-09-19 02:52:24.663357	9	EXECUTED	7:a3377a2059aefbf3b90ebb4c4cc8e2ab	update tableName=CLIENT; update tableName=CLIENT; update tableName=CLIENT		\N	3.5.4	\N	\N	2019944028
1.3.0	bburke@redhat.com	META-INF/jpa-changelog-1.3.0.xml	2021-09-19 02:52:24.771929	10	EXECUTED	7:04c1dbedc2aa3e9756d1a1668e003451	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_PROT_MAPPER; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete tableName=USER_SESSION; createTable tableName=ADMI...		\N	3.5.4	\N	\N	2019944028
1.4.0	bburke@redhat.com	META-INF/jpa-changelog-1.4.0.xml	2021-09-19 02:52:24.827551	11	EXECUTED	7:36ef39ed560ad07062d956db861042ba	delete tableName=CLIENT_SESSION_AUTH_STATUS; delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_PROT_MAPPER; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete table...		\N	3.5.4	\N	\N	2019944028
1.4.0	bburke@redhat.com	META-INF/db2-jpa-changelog-1.4.0.xml	2021-09-19 02:52:24.831028	12	MARK_RAN	7:d909180b2530479a716d3f9c9eaea3d7	delete tableName=CLIENT_SESSION_AUTH_STATUS; delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_PROT_MAPPER; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete table...		\N	3.5.4	\N	\N	2019944028
1.5.0	bburke@redhat.com	META-INF/jpa-changelog-1.5.0.xml	2021-09-19 02:52:24.849164	13	EXECUTED	7:cf12b04b79bea5152f165eb41f3955f6	delete tableName=CLIENT_SESSION_AUTH_STATUS; delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_PROT_MAPPER; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete table...		\N	3.5.4	\N	\N	2019944028
1.6.1_from15	mposolda@redhat.com	META-INF/jpa-changelog-1.6.1.xml	2021-09-19 02:52:24.8767	14	EXECUTED	7:7e32c8f05c755e8675764e7d5f514509	addColumn tableName=REALM; addColumn tableName=KEYCLOAK_ROLE; addColumn tableName=CLIENT; createTable tableName=OFFLINE_USER_SESSION; createTable tableName=OFFLINE_CLIENT_SESSION; addPrimaryKey constraintName=CONSTRAINT_OFFL_US_SES_PK2, tableName=...		\N	3.5.4	\N	\N	2019944028
1.6.1_from16-pre	mposolda@redhat.com	META-INF/jpa-changelog-1.6.1.xml	2021-09-19 02:52:24.879031	15	MARK_RAN	7:980ba23cc0ec39cab731ce903dd01291	delete tableName=OFFLINE_CLIENT_SESSION; delete tableName=OFFLINE_USER_SESSION		\N	3.5.4	\N	\N	2019944028
1.6.1_from16	mposolda@redhat.com	META-INF/jpa-changelog-1.6.1.xml	2021-09-19 02:52:24.881544	16	MARK_RAN	7:2fa220758991285312eb84f3b4ff5336	dropPrimaryKey constraintName=CONSTRAINT_OFFLINE_US_SES_PK, tableName=OFFLINE_USER_SESSION; dropPrimaryKey constraintName=CONSTRAINT_OFFLINE_CL_SES_PK, tableName=OFFLINE_CLIENT_SESSION; addColumn tableName=OFFLINE_USER_SESSION; update tableName=OF...		\N	3.5.4	\N	\N	2019944028
1.6.1	mposolda@redhat.com	META-INF/jpa-changelog-1.6.1.xml	2021-09-19 02:52:24.883971	17	EXECUTED	7:d41d8cd98f00b204e9800998ecf8427e	empty		\N	3.5.4	\N	\N	2019944028
1.7.0	bburke@redhat.com	META-INF/jpa-changelog-1.7.0.xml	2021-09-19 02:52:24.929808	18	EXECUTED	7:91ace540896df890cc00a0490ee52bbc	createTable tableName=KEYCLOAK_GROUP; createTable tableName=GROUP_ROLE_MAPPING; createTable tableName=GROUP_ATTRIBUTE; createTable tableName=USER_GROUP_MEMBERSHIP; createTable tableName=REALM_DEFAULT_GROUPS; addColumn tableName=IDENTITY_PROVIDER; ...		\N	3.5.4	\N	\N	2019944028
1.8.0	mposolda@redhat.com	META-INF/jpa-changelog-1.8.0.xml	2021-09-19 02:52:24.973524	19	EXECUTED	7:c31d1646dfa2618a9335c00e07f89f24	addColumn tableName=IDENTITY_PROVIDER; createTable tableName=CLIENT_TEMPLATE; createTable tableName=CLIENT_TEMPLATE_ATTRIBUTES; createTable tableName=TEMPLATE_SCOPE_MAPPING; dropNotNullConstraint columnName=CLIENT_ID, tableName=PROTOCOL_MAPPER; ad...		\N	3.5.4	\N	\N	2019944028
1.8.0-2	keycloak	META-INF/jpa-changelog-1.8.0.xml	2021-09-19 02:52:24.978897	20	EXECUTED	7:df8bc21027a4f7cbbb01f6344e89ce07	dropDefaultValue columnName=ALGORITHM, tableName=CREDENTIAL; update tableName=CREDENTIAL		\N	3.5.4	\N	\N	2019944028
authz-3.4.0.CR1-resource-server-pk-change-part1	glavoie@gmail.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2021-09-19 02:52:26.296022	45	EXECUTED	7:6a48ce645a3525488a90fbf76adf3bb3	addColumn tableName=RESOURCE_SERVER_POLICY; addColumn tableName=RESOURCE_SERVER_RESOURCE; addColumn tableName=RESOURCE_SERVER_SCOPE		\N	3.5.4	\N	\N	2019944028
1.8.0	mposolda@redhat.com	META-INF/db2-jpa-changelog-1.8.0.xml	2021-09-19 02:52:24.981429	21	MARK_RAN	7:f987971fe6b37d963bc95fee2b27f8df	addColumn tableName=IDENTITY_PROVIDER; createTable tableName=CLIENT_TEMPLATE; createTable tableName=CLIENT_TEMPLATE_ATTRIBUTES; createTable tableName=TEMPLATE_SCOPE_MAPPING; dropNotNullConstraint columnName=CLIENT_ID, tableName=PROTOCOL_MAPPER; ad...		\N	3.5.4	\N	\N	2019944028
1.8.0-2	keycloak	META-INF/db2-jpa-changelog-1.8.0.xml	2021-09-19 02:52:24.984493	22	MARK_RAN	7:df8bc21027a4f7cbbb01f6344e89ce07	dropDefaultValue columnName=ALGORITHM, tableName=CREDENTIAL; update tableName=CREDENTIAL		\N	3.5.4	\N	\N	2019944028
1.9.0	mposolda@redhat.com	META-INF/jpa-changelog-1.9.0.xml	2021-09-19 02:52:25.028859	23	EXECUTED	7:ed2dc7f799d19ac452cbcda56c929e47	update tableName=REALM; update tableName=REALM; update tableName=REALM; update tableName=REALM; update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=REALM; update tableName=REALM; customChange; dr...		\N	3.5.4	\N	\N	2019944028
1.9.1	keycloak	META-INF/jpa-changelog-1.9.1.xml	2021-09-19 02:52:25.033709	24	EXECUTED	7:80b5db88a5dda36ece5f235be8757615	modifyDataType columnName=PRIVATE_KEY, tableName=REALM; modifyDataType columnName=PUBLIC_KEY, tableName=REALM; modifyDataType columnName=CERTIFICATE, tableName=REALM		\N	3.5.4	\N	\N	2019944028
1.9.1	keycloak	META-INF/db2-jpa-changelog-1.9.1.xml	2021-09-19 02:52:25.035835	25	MARK_RAN	7:1437310ed1305a9b93f8848f301726ce	modifyDataType columnName=PRIVATE_KEY, tableName=REALM; modifyDataType columnName=CERTIFICATE, tableName=REALM		\N	3.5.4	\N	\N	2019944028
1.9.2	keycloak	META-INF/jpa-changelog-1.9.2.xml	2021-09-19 02:52:25.255616	26	EXECUTED	7:b82ffb34850fa0836be16deefc6a87c4	createIndex indexName=IDX_USER_EMAIL, tableName=USER_ENTITY; createIndex indexName=IDX_USER_ROLE_MAPPING, tableName=USER_ROLE_MAPPING; createIndex indexName=IDX_USER_GROUP_MAPPING, tableName=USER_GROUP_MEMBERSHIP; createIndex indexName=IDX_USER_CO...		\N	3.5.4	\N	\N	2019944028
authz-2.0.0	psilva@redhat.com	META-INF/jpa-changelog-authz-2.0.0.xml	2021-09-19 02:52:25.374559	27	EXECUTED	7:9cc98082921330d8d9266decdd4bd658	createTable tableName=RESOURCE_SERVER; addPrimaryKey constraintName=CONSTRAINT_FARS, tableName=RESOURCE_SERVER; addUniqueConstraint constraintName=UK_AU8TT6T700S9V50BU18WS5HA6, tableName=RESOURCE_SERVER; createTable tableName=RESOURCE_SERVER_RESOU...		\N	3.5.4	\N	\N	2019944028
authz-2.5.1	psilva@redhat.com	META-INF/jpa-changelog-authz-2.5.1.xml	2021-09-19 02:52:25.378948	28	EXECUTED	7:03d64aeed9cb52b969bd30a7ac0db57e	update tableName=RESOURCE_SERVER_POLICY		\N	3.5.4	\N	\N	2019944028
2.1.0-KEYCLOAK-5461	bburke@redhat.com	META-INF/jpa-changelog-2.1.0.xml	2021-09-19 02:52:25.460893	29	EXECUTED	7:f1f9fd8710399d725b780f463c6b21cd	createTable tableName=BROKER_LINK; createTable tableName=FED_USER_ATTRIBUTE; createTable tableName=FED_USER_CONSENT; createTable tableName=FED_USER_CONSENT_ROLE; createTable tableName=FED_USER_CONSENT_PROT_MAPPER; createTable tableName=FED_USER_CR...		\N	3.5.4	\N	\N	2019944028
2.2.0	bburke@redhat.com	META-INF/jpa-changelog-2.2.0.xml	2021-09-19 02:52:25.480173	30	EXECUTED	7:53188c3eb1107546e6f765835705b6c1	addColumn tableName=ADMIN_EVENT_ENTITY; createTable tableName=CREDENTIAL_ATTRIBUTE; createTable tableName=FED_CREDENTIAL_ATTRIBUTE; modifyDataType columnName=VALUE, tableName=CREDENTIAL; addForeignKeyConstraint baseTableName=FED_CREDENTIAL_ATTRIBU...		\N	3.5.4	\N	\N	2019944028
2.3.0	bburke@redhat.com	META-INF/jpa-changelog-2.3.0.xml	2021-09-19 02:52:25.497659	31	EXECUTED	7:d6e6f3bc57a0c5586737d1351725d4d4	createTable tableName=FEDERATED_USER; addPrimaryKey constraintName=CONSTR_FEDERATED_USER, tableName=FEDERATED_USER; dropDefaultValue columnName=TOTP, tableName=USER_ENTITY; dropColumn columnName=TOTP, tableName=USER_ENTITY; addColumn tableName=IDE...		\N	3.5.4	\N	\N	2019944028
2.4.0	bburke@redhat.com	META-INF/jpa-changelog-2.4.0.xml	2021-09-19 02:52:25.502093	32	EXECUTED	7:454d604fbd755d9df3fd9c6329043aa5	customChange		\N	3.5.4	\N	\N	2019944028
2.5.0	bburke@redhat.com	META-INF/jpa-changelog-2.5.0.xml	2021-09-19 02:52:25.507336	33	EXECUTED	7:57e98a3077e29caf562f7dbf80c72600	customChange; modifyDataType columnName=USER_ID, tableName=OFFLINE_USER_SESSION		\N	3.5.4	\N	\N	2019944028
2.5.0-unicode-oracle	hmlnarik@redhat.com	META-INF/jpa-changelog-2.5.0.xml	2021-09-19 02:52:25.509597	34	MARK_RAN	7:e4c7e8f2256210aee71ddc42f538b57a	modifyDataType columnName=DESCRIPTION, tableName=AUTHENTICATION_FLOW; modifyDataType columnName=DESCRIPTION, tableName=CLIENT_TEMPLATE; modifyDataType columnName=DESCRIPTION, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=DESCRIPTION,...		\N	3.5.4	\N	\N	2019944028
2.5.0-unicode-other-dbs	hmlnarik@redhat.com	META-INF/jpa-changelog-2.5.0.xml	2021-09-19 02:52:25.543795	35	EXECUTED	7:09a43c97e49bc626460480aa1379b522	modifyDataType columnName=DESCRIPTION, tableName=AUTHENTICATION_FLOW; modifyDataType columnName=DESCRIPTION, tableName=CLIENT_TEMPLATE; modifyDataType columnName=DESCRIPTION, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=DESCRIPTION,...		\N	3.5.4	\N	\N	2019944028
2.5.0-duplicate-email-support	slawomir@dabek.name	META-INF/jpa-changelog-2.5.0.xml	2021-09-19 02:52:25.548477	36	EXECUTED	7:26bfc7c74fefa9126f2ce702fb775553	addColumn tableName=REALM		\N	3.5.4	\N	\N	2019944028
2.5.0-unique-group-names	hmlnarik@redhat.com	META-INF/jpa-changelog-2.5.0.xml	2021-09-19 02:52:25.555637	37	EXECUTED	7:a161e2ae671a9020fff61e996a207377	addUniqueConstraint constraintName=SIBLING_NAMES, tableName=KEYCLOAK_GROUP		\N	3.5.4	\N	\N	2019944028
2.5.1	bburke@redhat.com	META-INF/jpa-changelog-2.5.1.xml	2021-09-19 02:52:25.559477	38	EXECUTED	7:37fc1781855ac5388c494f1442b3f717	addColumn tableName=FED_USER_CONSENT		\N	3.5.4	\N	\N	2019944028
3.0.0	bburke@redhat.com	META-INF/jpa-changelog-3.0.0.xml	2021-09-19 02:52:25.562931	39	EXECUTED	7:13a27db0dae6049541136adad7261d27	addColumn tableName=IDENTITY_PROVIDER		\N	3.5.4	\N	\N	2019944028
3.2.0-fix	keycloak	META-INF/jpa-changelog-3.2.0.xml	2021-09-19 02:52:25.564812	40	MARK_RAN	7:550300617e3b59e8af3a6294df8248a3	addNotNullConstraint columnName=REALM_ID, tableName=CLIENT_INITIAL_ACCESS		\N	3.5.4	\N	\N	2019944028
3.2.0-fix-with-keycloak-5416	keycloak	META-INF/jpa-changelog-3.2.0.xml	2021-09-19 02:52:25.566845	41	MARK_RAN	7:e3a9482b8931481dc2772a5c07c44f17	dropIndex indexName=IDX_CLIENT_INIT_ACC_REALM, tableName=CLIENT_INITIAL_ACCESS; addNotNullConstraint columnName=REALM_ID, tableName=CLIENT_INITIAL_ACCESS; createIndex indexName=IDX_CLIENT_INIT_ACC_REALM, tableName=CLIENT_INITIAL_ACCESS		\N	3.5.4	\N	\N	2019944028
3.2.0-fix-offline-sessions	hmlnarik	META-INF/jpa-changelog-3.2.0.xml	2021-09-19 02:52:25.572445	42	EXECUTED	7:72b07d85a2677cb257edb02b408f332d	customChange		\N	3.5.4	\N	\N	2019944028
3.2.0-fixed	keycloak	META-INF/jpa-changelog-3.2.0.xml	2021-09-19 02:52:26.285857	43	EXECUTED	7:a72a7858967bd414835d19e04d880312	addColumn tableName=REALM; dropPrimaryKey constraintName=CONSTRAINT_OFFL_CL_SES_PK2, tableName=OFFLINE_CLIENT_SESSION; dropColumn columnName=CLIENT_SESSION_ID, tableName=OFFLINE_CLIENT_SESSION; addPrimaryKey constraintName=CONSTRAINT_OFFL_CL_SES_P...		\N	3.5.4	\N	\N	2019944028
3.3.0	keycloak	META-INF/jpa-changelog-3.3.0.xml	2021-09-19 02:52:26.291508	44	EXECUTED	7:94edff7cf9ce179e7e85f0cd78a3cf2c	addColumn tableName=USER_ENTITY		\N	3.5.4	\N	\N	2019944028
authz-3.4.0.CR1-resource-server-pk-change-part2-KEYCLOAK-6095	hmlnarik@redhat.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2021-09-19 02:52:26.300088	46	EXECUTED	7:e64b5dcea7db06077c6e57d3b9e5ca14	customChange		\N	3.5.4	\N	\N	2019944028
authz-3.4.0.CR1-resource-server-pk-change-part3-fixed	glavoie@gmail.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2021-09-19 02:52:26.302514	47	MARK_RAN	7:fd8cf02498f8b1e72496a20afc75178c	dropIndex indexName=IDX_RES_SERV_POL_RES_SERV, tableName=RESOURCE_SERVER_POLICY; dropIndex indexName=IDX_RES_SRV_RES_RES_SRV, tableName=RESOURCE_SERVER_RESOURCE; dropIndex indexName=IDX_RES_SRV_SCOPE_RES_SRV, tableName=RESOURCE_SERVER_SCOPE		\N	3.5.4	\N	\N	2019944028
authz-3.4.0.CR1-resource-server-pk-change-part3-fixed-nodropindex	glavoie@gmail.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2021-09-19 02:52:26.371475	48	EXECUTED	7:542794f25aa2b1fbabb7e577d6646319	addNotNullConstraint columnName=RESOURCE_SERVER_CLIENT_ID, tableName=RESOURCE_SERVER_POLICY; addNotNullConstraint columnName=RESOURCE_SERVER_CLIENT_ID, tableName=RESOURCE_SERVER_RESOURCE; addNotNullConstraint columnName=RESOURCE_SERVER_CLIENT_ID, ...		\N	3.5.4	\N	\N	2019944028
authn-3.4.0.CR1-refresh-token-max-reuse	glavoie@gmail.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2021-09-19 02:52:26.375671	49	EXECUTED	7:edad604c882df12f74941dac3cc6d650	addColumn tableName=REALM		\N	3.5.4	\N	\N	2019944028
3.4.0	keycloak	META-INF/jpa-changelog-3.4.0.xml	2021-09-19 02:52:26.432394	50	EXECUTED	7:0f88b78b7b46480eb92690cbf5e44900	addPrimaryKey constraintName=CONSTRAINT_REALM_DEFAULT_ROLES, tableName=REALM_DEFAULT_ROLES; addPrimaryKey constraintName=CONSTRAINT_COMPOSITE_ROLE, tableName=COMPOSITE_ROLE; addPrimaryKey constraintName=CONSTR_REALM_DEFAULT_GROUPS, tableName=REALM...		\N	3.5.4	\N	\N	2019944028
3.4.0-KEYCLOAK-5230	hmlnarik@redhat.com	META-INF/jpa-changelog-3.4.0.xml	2021-09-19 02:52:26.610183	51	EXECUTED	7:d560e43982611d936457c327f872dd59	createIndex indexName=IDX_FU_ATTRIBUTE, tableName=FED_USER_ATTRIBUTE; createIndex indexName=IDX_FU_CONSENT, tableName=FED_USER_CONSENT; createIndex indexName=IDX_FU_CONSENT_RU, tableName=FED_USER_CONSENT; createIndex indexName=IDX_FU_CREDENTIAL, t...		\N	3.5.4	\N	\N	2019944028
3.4.1	psilva@redhat.com	META-INF/jpa-changelog-3.4.1.xml	2021-09-19 02:52:26.61375	52	EXECUTED	7:c155566c42b4d14ef07059ec3b3bbd8e	modifyDataType columnName=VALUE, tableName=CLIENT_ATTRIBUTES		\N	3.5.4	\N	\N	2019944028
3.4.2	keycloak	META-INF/jpa-changelog-3.4.2.xml	2021-09-19 02:52:26.616466	53	EXECUTED	7:b40376581f12d70f3c89ba8ddf5b7dea	update tableName=REALM		\N	3.5.4	\N	\N	2019944028
3.4.2-KEYCLOAK-5172	mkanis@redhat.com	META-INF/jpa-changelog-3.4.2.xml	2021-09-19 02:52:26.622387	54	EXECUTED	7:a1132cc395f7b95b3646146c2e38f168	update tableName=CLIENT		\N	3.5.4	\N	\N	2019944028
4.0.0-KEYCLOAK-6335	bburke@redhat.com	META-INF/jpa-changelog-4.0.0.xml	2021-09-19 02:52:26.633381	55	EXECUTED	7:d8dc5d89c789105cfa7ca0e82cba60af	createTable tableName=CLIENT_AUTH_FLOW_BINDINGS; addPrimaryKey constraintName=C_CLI_FLOW_BIND, tableName=CLIENT_AUTH_FLOW_BINDINGS		\N	3.5.4	\N	\N	2019944028
4.0.0-CLEANUP-UNUSED-TABLE	bburke@redhat.com	META-INF/jpa-changelog-4.0.0.xml	2021-09-19 02:52:26.638238	56	EXECUTED	7:7822e0165097182e8f653c35517656a3	dropTable tableName=CLIENT_IDENTITY_PROV_MAPPING		\N	3.5.4	\N	\N	2019944028
4.0.0-KEYCLOAK-6228	bburke@redhat.com	META-INF/jpa-changelog-4.0.0.xml	2021-09-19 02:52:26.67144	57	EXECUTED	7:c6538c29b9c9a08f9e9ea2de5c2b6375	dropUniqueConstraint constraintName=UK_JKUWUVD56ONTGSUHOGM8UEWRT, tableName=USER_CONSENT; dropNotNullConstraint columnName=CLIENT_ID, tableName=USER_CONSENT; addColumn tableName=USER_CONSENT; addUniqueConstraint constraintName=UK_JKUWUVD56ONTGSUHO...		\N	3.5.4	\N	\N	2019944028
4.0.0-KEYCLOAK-5579-fixed	mposolda@redhat.com	META-INF/jpa-changelog-4.0.0.xml	2021-09-19 02:52:26.868025	58	EXECUTED	7:6d4893e36de22369cf73bcb051ded875	dropForeignKeyConstraint baseTableName=CLIENT_TEMPLATE_ATTRIBUTES, constraintName=FK_CL_TEMPL_ATTR_TEMPL; renameTable newTableName=CLIENT_SCOPE_ATTRIBUTES, oldTableName=CLIENT_TEMPLATE_ATTRIBUTES; renameColumn newColumnName=SCOPE_ID, oldColumnName...		\N	3.5.4	\N	\N	2019944028
authz-4.0.0.CR1	psilva@redhat.com	META-INF/jpa-changelog-authz-4.0.0.CR1.xml	2021-09-19 02:52:26.900451	59	EXECUTED	7:57960fc0b0f0dd0563ea6f8b2e4a1707	createTable tableName=RESOURCE_SERVER_PERM_TICKET; addPrimaryKey constraintName=CONSTRAINT_FAPMT, tableName=RESOURCE_SERVER_PERM_TICKET; addForeignKeyConstraint baseTableName=RESOURCE_SERVER_PERM_TICKET, constraintName=FK_FRSRHO213XCX4WNKOG82SSPMT...		\N	3.5.4	\N	\N	2019944028
authz-4.0.0.Beta3	psilva@redhat.com	META-INF/jpa-changelog-authz-4.0.0.Beta3.xml	2021-09-19 02:52:26.907442	60	EXECUTED	7:2b4b8bff39944c7097977cc18dbceb3b	addColumn tableName=RESOURCE_SERVER_POLICY; addColumn tableName=RESOURCE_SERVER_PERM_TICKET; addForeignKeyConstraint baseTableName=RESOURCE_SERVER_PERM_TICKET, constraintName=FK_FRSRPO2128CX4WNKOG82SSRFY, referencedTableName=RESOURCE_SERVER_POLICY		\N	3.5.4	\N	\N	2019944028
authz-4.2.0.Final	mhajas@redhat.com	META-INF/jpa-changelog-authz-4.2.0.Final.xml	2021-09-19 02:52:26.914337	61	EXECUTED	7:2aa42a964c59cd5b8ca9822340ba33a8	createTable tableName=RESOURCE_URIS; addForeignKeyConstraint baseTableName=RESOURCE_URIS, constraintName=FK_RESOURCE_SERVER_URIS, referencedTableName=RESOURCE_SERVER_RESOURCE; customChange; dropColumn columnName=URI, tableName=RESOURCE_SERVER_RESO...		\N	3.5.4	\N	\N	2019944028
authz-4.2.0.Final-KEYCLOAK-9944	hmlnarik@redhat.com	META-INF/jpa-changelog-authz-4.2.0.Final.xml	2021-09-19 02:52:26.921318	62	EXECUTED	7:9ac9e58545479929ba23f4a3087a0346	addPrimaryKey constraintName=CONSTRAINT_RESOUR_URIS_PK, tableName=RESOURCE_URIS		\N	3.5.4	\N	\N	2019944028
4.2.0-KEYCLOAK-6313	wadahiro@gmail.com	META-INF/jpa-changelog-4.2.0.xml	2021-09-19 02:52:26.924548	63	EXECUTED	7:14d407c35bc4fe1976867756bcea0c36	addColumn tableName=REQUIRED_ACTION_PROVIDER		\N	3.5.4	\N	\N	2019944028
4.3.0-KEYCLOAK-7984	wadahiro@gmail.com	META-INF/jpa-changelog-4.3.0.xml	2021-09-19 02:52:26.927158	64	EXECUTED	7:241a8030c748c8548e346adee548fa93	update tableName=REQUIRED_ACTION_PROVIDER		\N	3.5.4	\N	\N	2019944028
4.6.0-KEYCLOAK-7950	psilva@redhat.com	META-INF/jpa-changelog-4.6.0.xml	2021-09-19 02:52:26.929772	65	EXECUTED	7:7d3182f65a34fcc61e8d23def037dc3f	update tableName=RESOURCE_SERVER_RESOURCE		\N	3.5.4	\N	\N	2019944028
4.6.0-KEYCLOAK-8377	keycloak	META-INF/jpa-changelog-4.6.0.xml	2021-09-19 02:52:26.960569	66	EXECUTED	7:b30039e00a0b9715d430d1b0636728fa	createTable tableName=ROLE_ATTRIBUTE; addPrimaryKey constraintName=CONSTRAINT_ROLE_ATTRIBUTE_PK, tableName=ROLE_ATTRIBUTE; addForeignKeyConstraint baseTableName=ROLE_ATTRIBUTE, constraintName=FK_ROLE_ATTRIBUTE_ID, referencedTableName=KEYCLOAK_ROLE...		\N	3.5.4	\N	\N	2019944028
4.6.0-KEYCLOAK-8555	gideonray@gmail.com	META-INF/jpa-changelog-4.6.0.xml	2021-09-19 02:52:26.979925	67	EXECUTED	7:3797315ca61d531780f8e6f82f258159	createIndex indexName=IDX_COMPONENT_PROVIDER_TYPE, tableName=COMPONENT		\N	3.5.4	\N	\N	2019944028
4.7.0-KEYCLOAK-1267	sguilhen@redhat.com	META-INF/jpa-changelog-4.7.0.xml	2021-09-19 02:52:26.984752	68	EXECUTED	7:c7aa4c8d9573500c2d347c1941ff0301	addColumn tableName=REALM		\N	3.5.4	\N	\N	2019944028
4.7.0-KEYCLOAK-7275	keycloak	META-INF/jpa-changelog-4.7.0.xml	2021-09-19 02:52:27.004854	69	EXECUTED	7:b207faee394fc074a442ecd42185a5dd	renameColumn newColumnName=CREATED_ON, oldColumnName=LAST_SESSION_REFRESH, tableName=OFFLINE_USER_SESSION; addNotNullConstraint columnName=CREATED_ON, tableName=OFFLINE_USER_SESSION; addColumn tableName=OFFLINE_USER_SESSION; customChange; createIn...		\N	3.5.4	\N	\N	2019944028
4.8.0-KEYCLOAK-8835	sguilhen@redhat.com	META-INF/jpa-changelog-4.8.0.xml	2021-09-19 02:52:27.010798	70	EXECUTED	7:ab9a9762faaba4ddfa35514b212c4922	addNotNullConstraint columnName=SSO_MAX_LIFESPAN_REMEMBER_ME, tableName=REALM; addNotNullConstraint columnName=SSO_IDLE_TIMEOUT_REMEMBER_ME, tableName=REALM		\N	3.5.4	\N	\N	2019944028
authz-7.0.0-KEYCLOAK-10443	psilva@redhat.com	META-INF/jpa-changelog-authz-7.0.0.xml	2021-09-19 02:52:27.015279	71	EXECUTED	7:b9710f74515a6ccb51b72dc0d19df8c4	addColumn tableName=RESOURCE_SERVER		\N	3.5.4	\N	\N	2019944028
8.0.0-adding-credential-columns	keycloak	META-INF/jpa-changelog-8.0.0.xml	2021-09-19 02:52:27.02137	72	EXECUTED	7:ec9707ae4d4f0b7452fee20128083879	addColumn tableName=CREDENTIAL; addColumn tableName=FED_USER_CREDENTIAL		\N	3.5.4	\N	\N	2019944028
8.0.0-updating-credential-data-not-oracle-fixed	keycloak	META-INF/jpa-changelog-8.0.0.xml	2021-09-19 02:52:27.029239	73	EXECUTED	7:3979a0ae07ac465e920ca696532fc736	update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=FED_USER_CREDENTIAL; update tableName=FED_USER_CREDENTIAL; update tableName=FED_USER_CREDENTIAL		\N	3.5.4	\N	\N	2019944028
8.0.0-updating-credential-data-oracle-fixed	keycloak	META-INF/jpa-changelog-8.0.0.xml	2021-09-19 02:52:27.031599	74	MARK_RAN	7:5abfde4c259119d143bd2fbf49ac2bca	update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=FED_USER_CREDENTIAL; update tableName=FED_USER_CREDENTIAL; update tableName=FED_USER_CREDENTIAL		\N	3.5.4	\N	\N	2019944028
8.0.0-credential-cleanup-fixed	keycloak	META-INF/jpa-changelog-8.0.0.xml	2021-09-19 02:52:27.043351	75	EXECUTED	7:b48da8c11a3d83ddd6b7d0c8c2219345	dropDefaultValue columnName=COUNTER, tableName=CREDENTIAL; dropDefaultValue columnName=DIGITS, tableName=CREDENTIAL; dropDefaultValue columnName=PERIOD, tableName=CREDENTIAL; dropDefaultValue columnName=ALGORITHM, tableName=CREDENTIAL; dropColumn ...		\N	3.5.4	\N	\N	2019944028
8.0.0-resource-tag-support	keycloak	META-INF/jpa-changelog-8.0.0.xml	2021-09-19 02:52:27.061215	76	EXECUTED	7:a73379915c23bfad3e8f5c6d5c0aa4bd	addColumn tableName=MIGRATION_MODEL; createIndex indexName=IDX_UPDATE_TIME, tableName=MIGRATION_MODEL		\N	3.5.4	\N	\N	2019944028
9.0.0-always-display-client	keycloak	META-INF/jpa-changelog-9.0.0.xml	2021-09-19 02:52:27.064825	77	EXECUTED	7:39e0073779aba192646291aa2332493d	addColumn tableName=CLIENT		\N	3.5.4	\N	\N	2019944028
9.0.0-drop-constraints-for-column-increase	keycloak	META-INF/jpa-changelog-9.0.0.xml	2021-09-19 02:52:27.06705	78	MARK_RAN	7:81f87368f00450799b4bf42ea0b3ec34	dropUniqueConstraint constraintName=UK_FRSR6T700S9V50BU18WS5PMT, tableName=RESOURCE_SERVER_PERM_TICKET; dropUniqueConstraint constraintName=UK_FRSR6T700S9V50BU18WS5HA6, tableName=RESOURCE_SERVER_RESOURCE; dropPrimaryKey constraintName=CONSTRAINT_O...		\N	3.5.4	\N	\N	2019944028
9.0.0-increase-column-size-federated-fk	keycloak	META-INF/jpa-changelog-9.0.0.xml	2021-09-19 02:52:27.084594	79	EXECUTED	7:20b37422abb9fb6571c618148f013a15	modifyDataType columnName=CLIENT_ID, tableName=FED_USER_CONSENT; modifyDataType columnName=CLIENT_REALM_CONSTRAINT, tableName=KEYCLOAK_ROLE; modifyDataType columnName=OWNER, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=CLIENT_ID, ta...		\N	3.5.4	\N	\N	2019944028
9.0.0-recreate-constraints-after-column-increase	keycloak	META-INF/jpa-changelog-9.0.0.xml	2021-09-19 02:52:27.087072	80	MARK_RAN	7:1970bb6cfb5ee800736b95ad3fb3c78a	addNotNullConstraint columnName=CLIENT_ID, tableName=OFFLINE_CLIENT_SESSION; addNotNullConstraint columnName=OWNER, tableName=RESOURCE_SERVER_PERM_TICKET; addNotNullConstraint columnName=REQUESTER, tableName=RESOURCE_SERVER_PERM_TICKET; addNotNull...		\N	3.5.4	\N	\N	2019944028
9.0.1-add-index-to-client.client_id	keycloak	META-INF/jpa-changelog-9.0.1.xml	2021-09-19 02:52:27.103336	81	EXECUTED	7:45d9b25fc3b455d522d8dcc10a0f4c80	createIndex indexName=IDX_CLIENT_ID, tableName=CLIENT		\N	3.5.4	\N	\N	2019944028
9.0.1-KEYCLOAK-12579-drop-constraints	keycloak	META-INF/jpa-changelog-9.0.1.xml	2021-09-19 02:52:27.105697	82	MARK_RAN	7:890ae73712bc187a66c2813a724d037f	dropUniqueConstraint constraintName=SIBLING_NAMES, tableName=KEYCLOAK_GROUP		\N	3.5.4	\N	\N	2019944028
9.0.1-KEYCLOAK-12579-add-not-null-constraint	keycloak	META-INF/jpa-changelog-9.0.1.xml	2021-09-19 02:52:27.109894	83	EXECUTED	7:0a211980d27fafe3ff50d19a3a29b538	addNotNullConstraint columnName=PARENT_GROUP, tableName=KEYCLOAK_GROUP		\N	3.5.4	\N	\N	2019944028
9.0.1-KEYCLOAK-12579-recreate-constraints	keycloak	META-INF/jpa-changelog-9.0.1.xml	2021-09-19 02:52:27.112206	84	MARK_RAN	7:a161e2ae671a9020fff61e996a207377	addUniqueConstraint constraintName=SIBLING_NAMES, tableName=KEYCLOAK_GROUP		\N	3.5.4	\N	\N	2019944028
9.0.1-add-index-to-events	keycloak	META-INF/jpa-changelog-9.0.1.xml	2021-09-19 02:52:27.129402	85	EXECUTED	7:01c49302201bdf815b0a18d1f98a55dc	createIndex indexName=IDX_EVENT_TIME, tableName=EVENT_ENTITY		\N	3.5.4	\N	\N	2019944028
map-remove-ri	keycloak	META-INF/jpa-changelog-11.0.0.xml	2021-09-19 02:52:27.134503	86	EXECUTED	7:3dace6b144c11f53f1ad2c0361279b86	dropForeignKeyConstraint baseTableName=REALM, constraintName=FK_TRAF444KK6QRKMS7N56AIWQ5Y; dropForeignKeyConstraint baseTableName=KEYCLOAK_ROLE, constraintName=FK_KJHO5LE2C0RAL09FL8CM9WFW9		\N	3.5.4	\N	\N	2019944028
map-remove-ri	keycloak	META-INF/jpa-changelog-12.0.0.xml	2021-09-19 02:52:27.141153	87	EXECUTED	7:578d0b92077eaf2ab95ad0ec087aa903	dropForeignKeyConstraint baseTableName=REALM_DEFAULT_GROUPS, constraintName=FK_DEF_GROUPS_GROUP; dropForeignKeyConstraint baseTableName=REALM_DEFAULT_ROLES, constraintName=FK_H4WPD7W4HSOOLNI3H0SW7BTJE; dropForeignKeyConstraint baseTableName=CLIENT...		\N	3.5.4	\N	\N	2019944028
12.1.0-add-realm-localization-table	keycloak	META-INF/jpa-changelog-12.0.0.xml	2021-09-19 02:52:27.152188	88	EXECUTED	7:c95abe90d962c57a09ecaee57972835d	createTable tableName=REALM_LOCALIZATIONS; addPrimaryKey tableName=REALM_LOCALIZATIONS		\N	3.5.4	\N	\N	2019944028
default-roles	keycloak	META-INF/jpa-changelog-13.0.0.xml	2021-09-19 02:52:27.157379	89	EXECUTED	7:f1313bcc2994a5c4dc1062ed6d8282d3	addColumn tableName=REALM; customChange		\N	3.5.4	\N	\N	2019944028
default-roles-cleanup	keycloak	META-INF/jpa-changelog-13.0.0.xml	2021-09-19 02:52:27.162893	90	EXECUTED	7:90d763b52eaffebefbcbde55f269508b	dropTable tableName=REALM_DEFAULT_ROLES; dropTable tableName=CLIENT_DEFAULT_ROLES		\N	3.5.4	\N	\N	2019944028
13.0.0-KEYCLOAK-16844	keycloak	META-INF/jpa-changelog-13.0.0.xml	2021-09-19 02:52:27.180032	91	EXECUTED	7:d554f0cb92b764470dccfa5e0014a7dd	createIndex indexName=IDX_OFFLINE_USS_PRELOAD, tableName=OFFLINE_USER_SESSION		\N	3.5.4	\N	\N	2019944028
map-remove-ri-13.0.0	keycloak	META-INF/jpa-changelog-13.0.0.xml	2021-09-19 02:52:27.186937	92	EXECUTED	7:73193e3ab3c35cf0f37ccea3bf783764	dropForeignKeyConstraint baseTableName=DEFAULT_CLIENT_SCOPE, constraintName=FK_R_DEF_CLI_SCOPE_SCOPE; dropForeignKeyConstraint baseTableName=CLIENT_SCOPE_CLIENT, constraintName=FK_C_CLI_SCOPE_SCOPE; dropForeignKeyConstraint baseTableName=CLIENT_SC...		\N	3.5.4	\N	\N	2019944028
13.0.0-KEYCLOAK-17992-drop-constraints	keycloak	META-INF/jpa-changelog-13.0.0.xml	2021-09-19 02:52:27.189029	93	MARK_RAN	7:90a1e74f92e9cbaa0c5eab80b8a037f3	dropPrimaryKey constraintName=C_CLI_SCOPE_BIND, tableName=CLIENT_SCOPE_CLIENT; dropIndex indexName=IDX_CLSCOPE_CL, tableName=CLIENT_SCOPE_CLIENT; dropIndex indexName=IDX_CL_CLSCOPE, tableName=CLIENT_SCOPE_CLIENT		\N	3.5.4	\N	\N	2019944028
13.0.0-increase-column-size-federated	keycloak	META-INF/jpa-changelog-13.0.0.xml	2021-09-19 02:52:27.197745	94	EXECUTED	7:5b9248f29cd047c200083cc6d8388b16	modifyDataType columnName=CLIENT_ID, tableName=CLIENT_SCOPE_CLIENT; modifyDataType columnName=SCOPE_ID, tableName=CLIENT_SCOPE_CLIENT		\N	3.5.4	\N	\N	2019944028
13.0.0-KEYCLOAK-17992-recreate-constraints	keycloak	META-INF/jpa-changelog-13.0.0.xml	2021-09-19 02:52:27.199948	95	MARK_RAN	7:64db59e44c374f13955489e8990d17a1	addNotNullConstraint columnName=CLIENT_ID, tableName=CLIENT_SCOPE_CLIENT; addNotNullConstraint columnName=SCOPE_ID, tableName=CLIENT_SCOPE_CLIENT; addPrimaryKey constraintName=C_CLI_SCOPE_BIND, tableName=CLIENT_SCOPE_CLIENT; createIndex indexName=...		\N	3.5.4	\N	\N	2019944028
json-string-accomodation-fixed	keycloak	META-INF/jpa-changelog-13.0.0.xml	2021-09-19 02:52:27.207255	96	EXECUTED	7:329a578cdb43262fff975f0a7f6cda60	addColumn tableName=REALM_ATTRIBUTE; update tableName=REALM_ATTRIBUTE; dropColumn columnName=VALUE, tableName=REALM_ATTRIBUTE; renameColumn newColumnName=VALUE, oldColumnName=VALUE_NEW, tableName=REALM_ATTRIBUTE		\N	3.5.4	\N	\N	2019944028
14.0.0-KEYCLOAK-11019	keycloak	META-INF/jpa-changelog-14.0.0.xml	2021-09-19 02:52:27.248295	97	EXECUTED	7:fae0de241ac0fd0bbc2b380b85e4f567	createIndex indexName=IDX_OFFLINE_CSS_PRELOAD, tableName=OFFLINE_CLIENT_SESSION; createIndex indexName=IDX_OFFLINE_USS_BY_USER, tableName=OFFLINE_USER_SESSION; createIndex indexName=IDX_OFFLINE_USS_BY_USERSESS, tableName=OFFLINE_USER_SESSION		\N	3.5.4	\N	\N	2019944028
14.0.0-KEYCLOAK-18286	keycloak	META-INF/jpa-changelog-14.0.0.xml	2021-09-19 02:52:27.250335	98	MARK_RAN	7:075d54e9180f49bb0c64ca4218936e81	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	3.5.4	\N	\N	2019944028
14.0.0-KEYCLOAK-18286-revert	keycloak	META-INF/jpa-changelog-14.0.0.xml	2021-09-19 02:52:27.261324	99	MARK_RAN	7:06499836520f4f6b3d05e35a59324910	dropIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	3.5.4	\N	\N	2019944028
14.0.0-KEYCLOAK-18286-supported-dbs	keycloak	META-INF/jpa-changelog-14.0.0.xml	2021-09-19 02:52:27.281128	100	EXECUTED	7:fad08e83c77d0171ec166bc9bc5d390a	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	3.5.4	\N	\N	2019944028
14.0.0-KEYCLOAK-18286-unsupported-dbs	keycloak	META-INF/jpa-changelog-14.0.0.xml	2021-09-19 02:52:27.283345	101	MARK_RAN	7:3d2b23076e59c6f70bae703aa01be35b	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	3.5.4	\N	\N	2019944028
KEYCLOAK-17267-add-index-to-user-attributes	keycloak	META-INF/jpa-changelog-14.0.0.xml	2021-09-19 02:52:27.301855	102	EXECUTED	7:1a7f28ff8d9e53aeb879d76ea3d9341a	createIndex indexName=IDX_USER_ATTRIBUTE_NAME, tableName=USER_ATTRIBUTE		\N	3.5.4	\N	\N	2019944028
KEYCLOAK-18146-add-saml-art-binding-identifier	keycloak	META-INF/jpa-changelog-14.0.0.xml	2021-09-19 02:52:27.306241	103	EXECUTED	7:2fd554456fed4a82c698c555c5b751b6	customChange		\N	3.5.4	\N	\N	2019944028
15.0.0-KEYCLOAK-18467	keycloak	META-INF/jpa-changelog-15.0.0.xml	2021-09-19 02:52:27.310978	104	EXECUTED	7:b06356d66c2790ecc2ae54ba0458397a	addColumn tableName=REALM_LOCALIZATIONS; update tableName=REALM_LOCALIZATIONS; dropColumn columnName=TEXTS, tableName=REALM_LOCALIZATIONS; renameColumn newColumnName=TEXTS, oldColumnName=TEXTS_NEW, tableName=REALM_LOCALIZATIONS; addNotNullConstrai...		\N	3.5.4	\N	\N	2019944028
\.


--
-- Data for Name: databasechangeloglock; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.databasechangeloglock (id, locked, lockgranted, lockedby) FROM stdin;
1	f	\N	\N
1000	f	\N	\N
1001	f	\N	\N
\.


--
-- Data for Name: default_client_scope; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.default_client_scope (realm_id, scope_id, default_scope) FROM stdin;
master	3fb21161-bc63-4cb5-bdbe-a6edc03cd315	f
master	c582d3ac-7b28-4558-b9a9-1912f111c2c0	t
master	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad	t
master	d7bea98e-4c85-4972-b5c4-b61a4b357520	t
master	06548876-9800-4f2e-b7e8-f70b6080fede	f
master	cb3d536f-dc2a-4fd9-b48a-156dff627a7b	f
master	3029167d-7d42-4351-8374-b7e269453392	t
master	515b8af9-819c-4abc-86ed-87b34c43e4ca	t
master	716fbf33-c971-41db-b2dd-2e94965c780d	f
aspen	25c8fd53-39bc-44ac-a26f-5df70fec3942	t
aspen	0d33f992-a6de-48e0-9df9-de039cae8569	t
aspen	b3a3162a-61c9-499b-9a7e-3e535a7e843d	t
aspen	b7858b8f-f3f3-48fa-99e8-323e099302b1	t
aspen	1cedd5fe-7777-4e7a-8c5e-fe4138e6968a	t
aspen	34c1623f-b4bf-406a-a97e-4bcab3db9529	f
aspen	7e4a3b88-203f-4051-a8a2-6f1365135bde	f
aspen	10609232-fea8-4344-93bd-ca15a5069026	f
aspen	984ea520-4d21-442f-8bb5-8e2df107a775	f
\.


--
-- Data for Name: event_entity; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.event_entity (id, client_id, details_json, error, ip_address, realm_id, session_id, event_time, type, user_id) FROM stdin;
\.


--
-- Data for Name: fed_user_attribute; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_attribute (id, name, user_id, realm_id, storage_provider_id, value) FROM stdin;
\.


--
-- Data for Name: fed_user_consent; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_consent (id, client_id, user_id, realm_id, storage_provider_id, created_date, last_updated_date, client_storage_provider, external_client_id) FROM stdin;
\.


--
-- Data for Name: fed_user_consent_cl_scope; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_consent_cl_scope (user_consent_id, scope_id) FROM stdin;
\.


--
-- Data for Name: fed_user_credential; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_credential (id, salt, type, created_date, user_id, realm_id, storage_provider_id, user_label, secret_data, credential_data, priority) FROM stdin;
\.


--
-- Data for Name: fed_user_group_membership; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_group_membership (group_id, user_id, realm_id, storage_provider_id) FROM stdin;
\.


--
-- Data for Name: fed_user_required_action; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_required_action (required_action, user_id, realm_id, storage_provider_id) FROM stdin;
\.


--
-- Data for Name: fed_user_role_mapping; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_role_mapping (role_id, user_id, realm_id, storage_provider_id) FROM stdin;
\.


--
-- Data for Name: federated_identity; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.federated_identity (identity_provider, realm_id, federated_user_id, federated_username, token, user_id) FROM stdin;
\.


--
-- Data for Name: federated_user; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.federated_user (id, storage_provider_id, realm_id) FROM stdin;
\.


--
-- Data for Name: group_attribute; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.group_attribute (id, name, value, group_id) FROM stdin;
bb5e4bef-115b-4767-93fc-ba4afbccfc07	isInOtherGroup	maybe...	f1ee9d3b-a7dd-466a-9cf6-9c2b559d19ee
\.


--
-- Data for Name: group_role_mapping; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.group_role_mapping (role_id, group_id) FROM stdin;
526ddcda-dc7d-4c47-9730-af8180cbada4	1b609383-7203-47ff-b4eb-4a3e22d1e601
\.


--
-- Data for Name: identity_provider; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.identity_provider (internal_id, enabled, provider_alias, provider_id, store_token, authenticate_by_default, realm_id, add_token_role, trust_email, first_broker_login_flow_id, post_broker_login_flow_id, provider_display_name, link_only) FROM stdin;
\.


--
-- Data for Name: identity_provider_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.identity_provider_config (identity_provider_id, value, name) FROM stdin;
\.


--
-- Data for Name: identity_provider_mapper; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.identity_provider_mapper (id, name, idp_alias, idp_mapper_name, realm_id) FROM stdin;
\.


--
-- Data for Name: idp_mapper_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.idp_mapper_config (idp_mapper_id, value, name) FROM stdin;
\.


--
-- Data for Name: keycloak_group; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.keycloak_group (id, name, parent_group, realm_id) FROM stdin;
1b609383-7203-47ff-b4eb-4a3e22d1e601	aspen-users	 	aspen
f1ee9d3b-a7dd-466a-9cf6-9c2b559d19ee	other-group	 	aspen
\.


--
-- Data for Name: keycloak_role; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.keycloak_role (id, client_realm_constraint, client_role, description, name, realm_id, client, realm) FROM stdin;
1ddd0d01-b06f-4731-ad0a-52abe01ab6b5	master	f	${role_default-roles}	default-roles-master	master	\N	\N
c9b1fa63-17be-4b24-aa7c-775cebc84e29	master	f	${role_admin}	admin	master	\N	\N
d7153836-937c-4f15-adf2-107b2346cc49	master	f	${role_create-realm}	create-realm	master	\N	\N
53eaf79b-b4b8-4ace-831c-69190cd4d0b9	99a223f0-9821-4c16-8101-df120180f09f	t	${role_create-client}	create-client	master	99a223f0-9821-4c16-8101-df120180f09f	\N
2aa0bf70-6e96-4eb7-b783-2a5722a78f04	99a223f0-9821-4c16-8101-df120180f09f	t	${role_view-realm}	view-realm	master	99a223f0-9821-4c16-8101-df120180f09f	\N
c95f7f49-493d-4998-8c2a-8c90606f0173	99a223f0-9821-4c16-8101-df120180f09f	t	${role_view-users}	view-users	master	99a223f0-9821-4c16-8101-df120180f09f	\N
de8e8046-b3b6-4dee-b9ee-a01b333ff3de	99a223f0-9821-4c16-8101-df120180f09f	t	${role_view-clients}	view-clients	master	99a223f0-9821-4c16-8101-df120180f09f	\N
e88164ee-1a41-4d0b-a66c-2449ccc4060e	99a223f0-9821-4c16-8101-df120180f09f	t	${role_view-events}	view-events	master	99a223f0-9821-4c16-8101-df120180f09f	\N
1bb09102-5c8a-4465-a92e-3927c85ba6a0	99a223f0-9821-4c16-8101-df120180f09f	t	${role_view-identity-providers}	view-identity-providers	master	99a223f0-9821-4c16-8101-df120180f09f	\N
7a4ee52f-59e5-4479-8c66-c994ebf013d4	99a223f0-9821-4c16-8101-df120180f09f	t	${role_view-authorization}	view-authorization	master	99a223f0-9821-4c16-8101-df120180f09f	\N
5ec19f96-31c4-4a7a-9481-4026522ff0be	99a223f0-9821-4c16-8101-df120180f09f	t	${role_manage-realm}	manage-realm	master	99a223f0-9821-4c16-8101-df120180f09f	\N
f1e12354-6714-4037-9ced-9a04afafd23f	99a223f0-9821-4c16-8101-df120180f09f	t	${role_manage-users}	manage-users	master	99a223f0-9821-4c16-8101-df120180f09f	\N
28f6f95b-f535-450d-98fd-2d739f4de2e5	99a223f0-9821-4c16-8101-df120180f09f	t	${role_manage-clients}	manage-clients	master	99a223f0-9821-4c16-8101-df120180f09f	\N
938f406f-aeb0-4387-9f92-cd975170a0a2	99a223f0-9821-4c16-8101-df120180f09f	t	${role_manage-events}	manage-events	master	99a223f0-9821-4c16-8101-df120180f09f	\N
bfbfa757-36f6-449c-a641-69953af13d99	99a223f0-9821-4c16-8101-df120180f09f	t	${role_manage-identity-providers}	manage-identity-providers	master	99a223f0-9821-4c16-8101-df120180f09f	\N
09b03605-f5bd-4fa9-8a35-ea60693dbb89	99a223f0-9821-4c16-8101-df120180f09f	t	${role_manage-authorization}	manage-authorization	master	99a223f0-9821-4c16-8101-df120180f09f	\N
17a55c12-5072-476a-a431-3baaa53cbf67	99a223f0-9821-4c16-8101-df120180f09f	t	${role_query-users}	query-users	master	99a223f0-9821-4c16-8101-df120180f09f	\N
b9aafea3-7b22-4521-a2eb-41ba33083d35	99a223f0-9821-4c16-8101-df120180f09f	t	${role_query-clients}	query-clients	master	99a223f0-9821-4c16-8101-df120180f09f	\N
93243850-e956-41d1-ba76-43e269d11825	99a223f0-9821-4c16-8101-df120180f09f	t	${role_query-realms}	query-realms	master	99a223f0-9821-4c16-8101-df120180f09f	\N
16d69b80-335a-420a-9577-10accb49cdb7	99a223f0-9821-4c16-8101-df120180f09f	t	${role_query-groups}	query-groups	master	99a223f0-9821-4c16-8101-df120180f09f	\N
465f285b-5e65-466f-9377-7f2499df400b	f050cfbd-de00-405f-a66d-28d7d629e43f	t	${role_view-profile}	view-profile	master	f050cfbd-de00-405f-a66d-28d7d629e43f	\N
61756776-df3d-43ce-af71-4b17730a42d6	f050cfbd-de00-405f-a66d-28d7d629e43f	t	${role_manage-account}	manage-account	master	f050cfbd-de00-405f-a66d-28d7d629e43f	\N
d577caa8-1a9b-4811-9371-caa4ee7a8115	f050cfbd-de00-405f-a66d-28d7d629e43f	t	${role_manage-account-links}	manage-account-links	master	f050cfbd-de00-405f-a66d-28d7d629e43f	\N
207d1313-efa3-4538-918c-1b94c4ed716c	f050cfbd-de00-405f-a66d-28d7d629e43f	t	${role_view-applications}	view-applications	master	f050cfbd-de00-405f-a66d-28d7d629e43f	\N
e9a5ba58-f9b9-47c6-a0b0-bee2fb1ef2db	f050cfbd-de00-405f-a66d-28d7d629e43f	t	${role_view-consent}	view-consent	master	f050cfbd-de00-405f-a66d-28d7d629e43f	\N
3fc65335-0620-4702-92c4-a8f5eadacb70	f050cfbd-de00-405f-a66d-28d7d629e43f	t	${role_manage-consent}	manage-consent	master	f050cfbd-de00-405f-a66d-28d7d629e43f	\N
896e43da-4ca1-47dc-b4dc-e11cdd44d7f7	f050cfbd-de00-405f-a66d-28d7d629e43f	t	${role_delete-account}	delete-account	master	f050cfbd-de00-405f-a66d-28d7d629e43f	\N
653697f9-643d-4b49-b012-5894568f46df	3bc79df6-6e74-4f26-87ee-a01543ce4762	t	${role_read-token}	read-token	master	3bc79df6-6e74-4f26-87ee-a01543ce4762	\N
843b462d-0d84-418a-bf6c-1cf115a00b0d	99a223f0-9821-4c16-8101-df120180f09f	t	${role_impersonation}	impersonation	master	99a223f0-9821-4c16-8101-df120180f09f	\N
43554a7c-0d86-4398-aa73-95ca93bd7099	master	f	${role_offline-access}	offline_access	master	\N	\N
4edd25e6-1a1f-4a44-9019-b005f2c3533e	master	f	${role_uma_authorization}	uma_authorization	master	\N	\N
7fdb50cd-511b-46c6-a6cb-0b6c4f6ddb9f	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_manage-events}	manage-events	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
526ddcda-dc7d-4c47-9730-af8180cbada4	aspen	f	${role_default-roles}	default-roles-aspen	aspen	\N	\N
5903c2e0-0eab-4b4e-8897-40532a63e939	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_create-client}	create-client	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
855405ba-612b-44ad-a63a-adf1a4488738	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_view-realm}	view-realm	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
c7463bc6-ff95-481c-aac1-f6940e3c4bd1	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_view-users}	view-users	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
dc928ecc-5367-4e0b-8829-5425755b3942	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_view-clients}	view-clients	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
4e12c42f-27c7-41d4-b7ac-f0cece6c1263	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_view-events}	view-events	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
1ab439aa-ec46-4171-a038-e0529acb5f18	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_view-identity-providers}	view-identity-providers	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
a2e95dae-f1f9-41b8-970c-d9e5c5a1dee2	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_view-authorization}	view-authorization	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
25ab19b7-3583-44f7-8d45-1a33abb7c459	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_manage-realm}	manage-realm	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
0dba6de8-9d56-403d-9c76-f3e4a3597e6e	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_manage-users}	manage-users	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
4559f91a-48a8-47fa-9f6a-f46d2f585fe2	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_manage-clients}	manage-clients	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
8bc1b766-7aee-43db-b19a-fdcf2f619d83	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_manage-identity-providers}	manage-identity-providers	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
fc8a625b-41d1-413b-8b10-471f67b4bc27	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_manage-authorization}	manage-authorization	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
00a2eef9-bff8-4210-9fdc-b4209f533acc	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_query-users}	query-users	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
f03011b7-9dde-4206-b6d2-fd4ba969eaf2	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_query-clients}	query-clients	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
41a1ac06-7a6b-46bc-9f87-271dee630f00	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_query-realms}	query-realms	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
86a9a06a-cd2a-4755-a448-a12ab402ca07	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_query-groups}	query-groups	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
125388c9-4f35-4d2c-a267-5c0ef3764fca	aspen	f	${role_offline-access}	offline_access	aspen	\N	\N
b23cdb4c-4362-4f4b-9dff-3a21a1e3d1af	aspen	f	${role_uma_authorization}	uma_authorization	aspen	\N	\N
1d3453e1-7b23-400d-b0d2-41ec3d1a5e7b	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_create-client}	create-client	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
da920a00-99d9-41c5-ab2e-1cc82649a406	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_query-clients}	query-clients	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
48c50fe5-8917-4160-b8d9-88ff0871c1ec	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_view-authorization}	view-authorization	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
2a4e944c-1feb-47fe-af7e-07ff5de86ef7	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_manage-identity-providers}	manage-identity-providers	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
2baa76c7-0e3f-4ca1-a38c-3ca4d15dda63	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_manage-events}	manage-events	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
2f4ddbe9-fe31-4482-a6dc-57b053d4cd89	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_view-identity-providers}	view-identity-providers	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
5f898da3-2110-484c-914b-0fe989e5d5a5	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_impersonation}	impersonation	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
430ca7d1-b1f4-45b0-9f6b-3a60b2891f98	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_manage-realm}	manage-realm	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
b21f3f10-6cc5-4a56-9ce9-00550749acbe	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_manage-clients}	manage-clients	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
b65e6039-3e07-4f13-bd26-2dceff7a9128	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_query-groups}	query-groups	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
5f225779-d443-4389-8dd4-00087ff1a957	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_realm-admin}	realm-admin	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
c8dbded2-88cb-46f2-90eb-06e68c2e9cc6	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_manage-authorization}	manage-authorization	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
2764b4fd-0fd5-4419-858d-d630b31a31ad	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_query-realms}	query-realms	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
d4fc4eb6-49b5-48fc-b97c-9c9df792b2ae	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_view-clients}	view-clients	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
e5157a6e-f183-4ea4-93de-b206de07be59	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_view-realm}	view-realm	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
c50a1a92-a671-4588-acc3-0df447bab19e	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_view-users}	view-users	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
bf06e6ae-ba31-4b21-b893-599ecea4eb26	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_query-users}	query-users	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
16b93855-20a3-4e0a-96a0-c786d90f7bee	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_view-events}	view-events	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
2480eb40-75ad-4c0d-8299-5b9b8ec91530	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	t	${role_manage-users}	manage-users	aspen	ff62abc1-f318-4bd6-b4b0-4a7ec928adb4	\N
489ddb8a-c29d-4540-a366-fc278303641f	44e05627-2d1f-4910-acb9-26a8acb59196	t	${role_read-token}	read-token	aspen	44e05627-2d1f-4910-acb9-26a8acb59196	\N
84b6eb25-5a4b-4c54-86c4-2653a36dfb19	7af7268b-2ed7-464c-b50d-70ebaff119e5	t	${role_manage-account-links}	manage-account-links	aspen	7af7268b-2ed7-464c-b50d-70ebaff119e5	\N
c02fc15c-1c86-4af3-9c51-16a0feacea04	7af7268b-2ed7-464c-b50d-70ebaff119e5	t	${role_delete-account}	delete-account	aspen	7af7268b-2ed7-464c-b50d-70ebaff119e5	\N
de07690a-efe2-4225-9e2a-3908474f19db	7af7268b-2ed7-464c-b50d-70ebaff119e5	t	${role_manage-account}	manage-account	aspen	7af7268b-2ed7-464c-b50d-70ebaff119e5	\N
94180297-98f1-47bd-915e-0cd5a5555438	7af7268b-2ed7-464c-b50d-70ebaff119e5	t	${role_view-profile}	view-profile	aspen	7af7268b-2ed7-464c-b50d-70ebaff119e5	\N
5f34cfef-8ce3-408c-9e90-fa50b5ac22d3	7af7268b-2ed7-464c-b50d-70ebaff119e5	t	${role_view-consent}	view-consent	aspen	7af7268b-2ed7-464c-b50d-70ebaff119e5	\N
44df8fbc-26a0-4eb7-b595-a2d23afdf1ae	7af7268b-2ed7-464c-b50d-70ebaff119e5	t	${role_manage-consent}	manage-consent	aspen	7af7268b-2ed7-464c-b50d-70ebaff119e5	\N
00b72167-2ea2-47ba-a687-458a05e9696f	7af7268b-2ed7-464c-b50d-70ebaff119e5	t	${role_view-applications}	view-applications	aspen	7af7268b-2ed7-464c-b50d-70ebaff119e5	\N
9be77a31-d45b-49ed-9e97-dccd2d72b9b4	b940652c-a9b6-483a-b212-945e3d5491d7	t	${role_impersonation}	impersonation	master	b940652c-a9b6-483a-b212-945e3d5491d7	\N
441bf022-0174-4473-b4d1-92e36ddbcb73	aspen	f	Admin Aspen Users	aspen-admin	aspen	\N	\N
a17543af-0992-4d18-93c8-4a82bb13578e	c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	t	\N	aspen-admin	aspen	c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	\N
\.


--
-- Data for Name: migration_model; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.migration_model (id, version, update_time) FROM stdin;
vc52l	15.0.2	1632019949
\.


--
-- Data for Name: offline_client_session; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.offline_client_session (user_session_id, client_id, offline_flag, "timestamp", data, client_storage_provider, external_client_id) FROM stdin;
\.


--
-- Data for Name: offline_user_session; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.offline_user_session (user_session_id, user_id, realm_id, created_on, offline_flag, data, last_session_refresh) FROM stdin;
\.


--
-- Data for Name: policy_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.policy_config (policy_id, name, value) FROM stdin;
\.


--
-- Data for Name: protocol_mapper; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.protocol_mapper (id, name, protocol, protocol_mapper_name, client_id, client_scope_id) FROM stdin;
451afdce-fd7f-42c9-839f-be34c58b96a7	audience resolve	openid-connect	oidc-audience-resolve-mapper	dae91f88-2e76-4d7a-a717-0b6ca2bc862b	\N
d86d3e67-88db-49d7-86a9-50feaaf37428	locale	openid-connect	oidc-usermodel-attribute-mapper	b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	\N
9066cb84-5df2-4269-a886-9a89124b4018	role list	saml	saml-role-list-mapper	\N	c582d3ac-7b28-4558-b9a9-1912f111c2c0
f0d7db26-cdaa-4212-8646-dac91c37ebd3	full name	openid-connect	oidc-full-name-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
d3eaff50-4b12-4e6c-884e-a22aebdd617b	family name	openid-connect	oidc-usermodel-property-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
85d16c47-c318-4bc0-9dd0-dc0ac61ba6c1	given name	openid-connect	oidc-usermodel-property-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
be03cb16-5135-4715-b860-d2ddff955ca1	middle name	openid-connect	oidc-usermodel-attribute-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
d74eb356-edf6-457c-9fd2-cea219a84084	nickname	openid-connect	oidc-usermodel-attribute-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
f8701b10-5842-4960-add6-fac79e8431fb	username	openid-connect	oidc-usermodel-property-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
a0aefd0d-513b-4bf3-9f6b-6bd1954ebece	profile	openid-connect	oidc-usermodel-attribute-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
cc67e6a8-0f89-410e-ac74-4901615f3f73	picture	openid-connect	oidc-usermodel-attribute-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
21e7c255-ef48-416c-bd29-7f2376983464	website	openid-connect	oidc-usermodel-attribute-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
3cc204ff-dc69-463d-9073-9a648f6e4665	gender	openid-connect	oidc-usermodel-attribute-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
826a5008-61f1-4142-9515-f53e053a7aa9	birthdate	openid-connect	oidc-usermodel-attribute-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
652c8585-da2d-45c4-87e4-719cae32c67c	zoneinfo	openid-connect	oidc-usermodel-attribute-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
d90576a9-33ca-4a5c-80e8-d8d61d2cc44c	locale	openid-connect	oidc-usermodel-attribute-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
2f98061a-8320-4bf6-a897-ee8d1e740c81	updated at	openid-connect	oidc-usermodel-attribute-mapper	\N	0bd4795b-33e1-4d56-a7ac-1ec4ced634ad
cab29590-8b37-4a54-8b43-d7d7324469b8	email	openid-connect	oidc-usermodel-property-mapper	\N	d7bea98e-4c85-4972-b5c4-b61a4b357520
9b07b9db-c97a-4ae1-a439-c56e9a725088	email verified	openid-connect	oidc-usermodel-property-mapper	\N	d7bea98e-4c85-4972-b5c4-b61a4b357520
ba03943c-a247-4a22-87d3-03f9f8fe76a0	address	openid-connect	oidc-address-mapper	\N	06548876-9800-4f2e-b7e8-f70b6080fede
82da49bc-8eac-4e4f-878f-4387d9667f4e	phone number	openid-connect	oidc-usermodel-attribute-mapper	\N	cb3d536f-dc2a-4fd9-b48a-156dff627a7b
18044740-87b2-49e0-980b-c7a6028abfc7	phone number verified	openid-connect	oidc-usermodel-attribute-mapper	\N	cb3d536f-dc2a-4fd9-b48a-156dff627a7b
d82888f6-8441-4956-8dd3-c60e11f5b601	realm roles	openid-connect	oidc-usermodel-realm-role-mapper	\N	3029167d-7d42-4351-8374-b7e269453392
4e0863fd-d560-4f9a-b4a9-8a5ef324ca1b	client roles	openid-connect	oidc-usermodel-client-role-mapper	\N	3029167d-7d42-4351-8374-b7e269453392
752fcdef-5c06-4246-9cae-0b0f89999185	audience resolve	openid-connect	oidc-audience-resolve-mapper	\N	3029167d-7d42-4351-8374-b7e269453392
ae2d827a-0695-4cbc-96c5-a4aedf8593f6	allowed web origins	openid-connect	oidc-allowed-origins-mapper	\N	515b8af9-819c-4abc-86ed-87b34c43e4ca
7460f6d8-899d-4545-9e14-baad6665d6d6	upn	openid-connect	oidc-usermodel-property-mapper	\N	716fbf33-c971-41db-b2dd-2e94965c780d
906f144e-d02d-44ff-b2ff-d9280a06fb4b	groups	openid-connect	oidc-usermodel-realm-role-mapper	\N	716fbf33-c971-41db-b2dd-2e94965c780d
98ef4de6-f557-4c75-85b8-043d3de555b7	realm roles	openid-connect	oidc-usermodel-realm-role-mapper	\N	b7858b8f-f3f3-48fa-99e8-323e099302b1
40f8bbdf-5501-4624-8c98-fa31efd4f8fd	client roles	openid-connect	oidc-usermodel-client-role-mapper	\N	b7858b8f-f3f3-48fa-99e8-323e099302b1
ec2b581c-b3e5-4f98-9a61-bea0ef4a5598	audience resolve	openid-connect	oidc-audience-resolve-mapper	\N	b7858b8f-f3f3-48fa-99e8-323e099302b1
f0bec835-02e7-45d4-ae9f-6c036ccc557f	email	openid-connect	oidc-usermodel-property-mapper	\N	b3a3162a-61c9-499b-9a7e-3e535a7e843d
ba8055a9-3891-4d0e-bc6f-bad0b96d95b3	email verified	openid-connect	oidc-usermodel-property-mapper	\N	b3a3162a-61c9-499b-9a7e-3e535a7e843d
370ad375-b947-4962-bd0f-5035b08f0361	allowed web origins	openid-connect	oidc-allowed-origins-mapper	\N	1cedd5fe-7777-4e7a-8c5e-fe4138e6968a
9a1b67d8-e249-41a5-b546-394c2d8bc759	groups	openid-connect	oidc-usermodel-realm-role-mapper	\N	984ea520-4d21-442f-8bb5-8e2df107a775
b2a8e51e-c52f-4b55-8b0a-839f374e3c44	upn	openid-connect	oidc-usermodel-property-mapper	\N	984ea520-4d21-442f-8bb5-8e2df107a775
113dba93-fe8a-4943-93d5-ea50f32aa5e2	gender	openid-connect	oidc-usermodel-attribute-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
d1803a7a-5f68-4a9f-a10b-f20d269b8752	updated at	openid-connect	oidc-usermodel-attribute-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
fefb7f17-6db2-4374-b55d-3c0244ccc083	family name	openid-connect	oidc-usermodel-property-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
ee6fb1e3-1060-4efd-8032-19bb31fa9020	profile	openid-connect	oidc-usermodel-attribute-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
2b402549-5b01-4639-a442-ddc67782025b	given name	openid-connect	oidc-usermodel-property-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
f7d7ce6a-61dc-4c15-8642-63e82394c771	zoneinfo	openid-connect	oidc-usermodel-attribute-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
fd832a4a-95f0-473a-b973-1156dd4f2c87	website	openid-connect	oidc-usermodel-attribute-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
568afe0e-0c68-425d-93e5-b65efd149c72	locale	openid-connect	oidc-usermodel-attribute-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
b280948b-8141-4ebd-be53-dfe7b8aa2758	nickname	openid-connect	oidc-usermodel-attribute-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
78f58d6e-45a7-4303-bb47-14bf31495f42	full name	openid-connect	oidc-full-name-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
1d3e4772-001a-4498-a535-051a3528dc21	middle name	openid-connect	oidc-usermodel-attribute-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
ef15b153-c21b-4bed-bfb2-c75e66f5b024	picture	openid-connect	oidc-usermodel-attribute-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
47c16f68-bd92-4d9a-b451-0bfed345f8c4	birthdate	openid-connect	oidc-usermodel-attribute-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
4393b0b2-3c0f-409b-9213-7b6743426743	username	openid-connect	oidc-usermodel-property-mapper	\N	0d33f992-a6de-48e0-9df9-de039cae8569
9ac939d4-21e7-4a8b-8044-75210076299a	address	openid-connect	oidc-address-mapper	\N	7e4a3b88-203f-4051-a8a2-6f1365135bde
8f6054c8-f8cb-4266-b44d-4196f5210575	role list	saml	saml-role-list-mapper	\N	25c8fd53-39bc-44ac-a26f-5df70fec3942
7a6585d4-a5d6-4ee4-bdc4-c420ae7765bf	phone number verified	openid-connect	oidc-usermodel-attribute-mapper	\N	10609232-fea8-4344-93bd-ca15a5069026
c0341aed-9295-4bb7-b0e7-71f651287cfe	phone number	openid-connect	oidc-usermodel-attribute-mapper	\N	10609232-fea8-4344-93bd-ca15a5069026
add99e58-d86d-4d63-90dd-3ba2df7e5d99	audience resolve	openid-connect	oidc-audience-resolve-mapper	c7555935-08d9-4c93-8fea-401d7ee4ea49	\N
4b5851bb-d567-448d-b887-c1b780fb771c	locale	openid-connect	oidc-usermodel-attribute-mapper	855cb299-7dc3-44de-b189-075aeaa4fc69	\N
6020d184-957a-416e-9818-8091137e2054	aspen-api	openid-connect	oidc-audience-mapper	\N	26192d59-fb37-46e3-ad58-9e3660830db9
c5ef31f0-6b8e-4af1-89ee-e3b7ccbf55bd	Group Mapper	openid-connect	oidc-group-membership-mapper	c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	\N
4424a01d-cbe1-4085-b12d-0c475ef7d978	Role Mapper	openid-connect	oidc-role-name-mapper	c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	\N
99c87403-3c46-4ad5-a10a-6e606874639f	realm roles	openid-connect	oidc-usermodel-realm-role-mapper	c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	\N
\.


--
-- Data for Name: protocol_mapper_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.protocol_mapper_config (protocol_mapper_id, value, name) FROM stdin;
d86d3e67-88db-49d7-86a9-50feaaf37428	true	userinfo.token.claim
d86d3e67-88db-49d7-86a9-50feaaf37428	locale	user.attribute
d86d3e67-88db-49d7-86a9-50feaaf37428	true	id.token.claim
d86d3e67-88db-49d7-86a9-50feaaf37428	true	access.token.claim
d86d3e67-88db-49d7-86a9-50feaaf37428	locale	claim.name
d86d3e67-88db-49d7-86a9-50feaaf37428	String	jsonType.label
9066cb84-5df2-4269-a886-9a89124b4018	false	single
9066cb84-5df2-4269-a886-9a89124b4018	Basic	attribute.nameformat
9066cb84-5df2-4269-a886-9a89124b4018	Role	attribute.name
f0d7db26-cdaa-4212-8646-dac91c37ebd3	true	userinfo.token.claim
f0d7db26-cdaa-4212-8646-dac91c37ebd3	true	id.token.claim
f0d7db26-cdaa-4212-8646-dac91c37ebd3	true	access.token.claim
d3eaff50-4b12-4e6c-884e-a22aebdd617b	true	userinfo.token.claim
d3eaff50-4b12-4e6c-884e-a22aebdd617b	lastName	user.attribute
d3eaff50-4b12-4e6c-884e-a22aebdd617b	true	id.token.claim
d3eaff50-4b12-4e6c-884e-a22aebdd617b	true	access.token.claim
d3eaff50-4b12-4e6c-884e-a22aebdd617b	family_name	claim.name
d3eaff50-4b12-4e6c-884e-a22aebdd617b	String	jsonType.label
85d16c47-c318-4bc0-9dd0-dc0ac61ba6c1	true	userinfo.token.claim
85d16c47-c318-4bc0-9dd0-dc0ac61ba6c1	firstName	user.attribute
85d16c47-c318-4bc0-9dd0-dc0ac61ba6c1	true	id.token.claim
85d16c47-c318-4bc0-9dd0-dc0ac61ba6c1	true	access.token.claim
85d16c47-c318-4bc0-9dd0-dc0ac61ba6c1	given_name	claim.name
85d16c47-c318-4bc0-9dd0-dc0ac61ba6c1	String	jsonType.label
be03cb16-5135-4715-b860-d2ddff955ca1	true	userinfo.token.claim
be03cb16-5135-4715-b860-d2ddff955ca1	middleName	user.attribute
be03cb16-5135-4715-b860-d2ddff955ca1	true	id.token.claim
be03cb16-5135-4715-b860-d2ddff955ca1	true	access.token.claim
be03cb16-5135-4715-b860-d2ddff955ca1	middle_name	claim.name
be03cb16-5135-4715-b860-d2ddff955ca1	String	jsonType.label
d74eb356-edf6-457c-9fd2-cea219a84084	true	userinfo.token.claim
d74eb356-edf6-457c-9fd2-cea219a84084	nickname	user.attribute
d74eb356-edf6-457c-9fd2-cea219a84084	true	id.token.claim
d74eb356-edf6-457c-9fd2-cea219a84084	true	access.token.claim
d74eb356-edf6-457c-9fd2-cea219a84084	nickname	claim.name
d74eb356-edf6-457c-9fd2-cea219a84084	String	jsonType.label
f8701b10-5842-4960-add6-fac79e8431fb	true	userinfo.token.claim
f8701b10-5842-4960-add6-fac79e8431fb	username	user.attribute
f8701b10-5842-4960-add6-fac79e8431fb	true	id.token.claim
f8701b10-5842-4960-add6-fac79e8431fb	true	access.token.claim
f8701b10-5842-4960-add6-fac79e8431fb	preferred_username	claim.name
f8701b10-5842-4960-add6-fac79e8431fb	String	jsonType.label
a0aefd0d-513b-4bf3-9f6b-6bd1954ebece	true	userinfo.token.claim
a0aefd0d-513b-4bf3-9f6b-6bd1954ebece	profile	user.attribute
a0aefd0d-513b-4bf3-9f6b-6bd1954ebece	true	id.token.claim
a0aefd0d-513b-4bf3-9f6b-6bd1954ebece	true	access.token.claim
a0aefd0d-513b-4bf3-9f6b-6bd1954ebece	profile	claim.name
a0aefd0d-513b-4bf3-9f6b-6bd1954ebece	String	jsonType.label
cc67e6a8-0f89-410e-ac74-4901615f3f73	true	userinfo.token.claim
cc67e6a8-0f89-410e-ac74-4901615f3f73	picture	user.attribute
cc67e6a8-0f89-410e-ac74-4901615f3f73	true	id.token.claim
cc67e6a8-0f89-410e-ac74-4901615f3f73	true	access.token.claim
cc67e6a8-0f89-410e-ac74-4901615f3f73	picture	claim.name
cc67e6a8-0f89-410e-ac74-4901615f3f73	String	jsonType.label
21e7c255-ef48-416c-bd29-7f2376983464	true	userinfo.token.claim
21e7c255-ef48-416c-bd29-7f2376983464	website	user.attribute
21e7c255-ef48-416c-bd29-7f2376983464	true	id.token.claim
21e7c255-ef48-416c-bd29-7f2376983464	true	access.token.claim
21e7c255-ef48-416c-bd29-7f2376983464	website	claim.name
21e7c255-ef48-416c-bd29-7f2376983464	String	jsonType.label
3cc204ff-dc69-463d-9073-9a648f6e4665	true	userinfo.token.claim
3cc204ff-dc69-463d-9073-9a648f6e4665	gender	user.attribute
3cc204ff-dc69-463d-9073-9a648f6e4665	true	id.token.claim
3cc204ff-dc69-463d-9073-9a648f6e4665	true	access.token.claim
3cc204ff-dc69-463d-9073-9a648f6e4665	gender	claim.name
3cc204ff-dc69-463d-9073-9a648f6e4665	String	jsonType.label
826a5008-61f1-4142-9515-f53e053a7aa9	true	userinfo.token.claim
826a5008-61f1-4142-9515-f53e053a7aa9	birthdate	user.attribute
826a5008-61f1-4142-9515-f53e053a7aa9	true	id.token.claim
826a5008-61f1-4142-9515-f53e053a7aa9	true	access.token.claim
826a5008-61f1-4142-9515-f53e053a7aa9	birthdate	claim.name
826a5008-61f1-4142-9515-f53e053a7aa9	String	jsonType.label
652c8585-da2d-45c4-87e4-719cae32c67c	true	userinfo.token.claim
652c8585-da2d-45c4-87e4-719cae32c67c	zoneinfo	user.attribute
652c8585-da2d-45c4-87e4-719cae32c67c	true	id.token.claim
652c8585-da2d-45c4-87e4-719cae32c67c	true	access.token.claim
652c8585-da2d-45c4-87e4-719cae32c67c	zoneinfo	claim.name
652c8585-da2d-45c4-87e4-719cae32c67c	String	jsonType.label
d90576a9-33ca-4a5c-80e8-d8d61d2cc44c	true	userinfo.token.claim
d90576a9-33ca-4a5c-80e8-d8d61d2cc44c	locale	user.attribute
d90576a9-33ca-4a5c-80e8-d8d61d2cc44c	true	id.token.claim
d90576a9-33ca-4a5c-80e8-d8d61d2cc44c	true	access.token.claim
d90576a9-33ca-4a5c-80e8-d8d61d2cc44c	locale	claim.name
d90576a9-33ca-4a5c-80e8-d8d61d2cc44c	String	jsonType.label
2f98061a-8320-4bf6-a897-ee8d1e740c81	true	userinfo.token.claim
2f98061a-8320-4bf6-a897-ee8d1e740c81	updatedAt	user.attribute
2f98061a-8320-4bf6-a897-ee8d1e740c81	true	id.token.claim
2f98061a-8320-4bf6-a897-ee8d1e740c81	true	access.token.claim
2f98061a-8320-4bf6-a897-ee8d1e740c81	updated_at	claim.name
2f98061a-8320-4bf6-a897-ee8d1e740c81	String	jsonType.label
cab29590-8b37-4a54-8b43-d7d7324469b8	true	userinfo.token.claim
cab29590-8b37-4a54-8b43-d7d7324469b8	email	user.attribute
cab29590-8b37-4a54-8b43-d7d7324469b8	true	id.token.claim
cab29590-8b37-4a54-8b43-d7d7324469b8	true	access.token.claim
cab29590-8b37-4a54-8b43-d7d7324469b8	email	claim.name
cab29590-8b37-4a54-8b43-d7d7324469b8	String	jsonType.label
9b07b9db-c97a-4ae1-a439-c56e9a725088	true	userinfo.token.claim
9b07b9db-c97a-4ae1-a439-c56e9a725088	emailVerified	user.attribute
9b07b9db-c97a-4ae1-a439-c56e9a725088	true	id.token.claim
9b07b9db-c97a-4ae1-a439-c56e9a725088	true	access.token.claim
9b07b9db-c97a-4ae1-a439-c56e9a725088	email_verified	claim.name
9b07b9db-c97a-4ae1-a439-c56e9a725088	boolean	jsonType.label
ba03943c-a247-4a22-87d3-03f9f8fe76a0	formatted	user.attribute.formatted
ba03943c-a247-4a22-87d3-03f9f8fe76a0	country	user.attribute.country
ba03943c-a247-4a22-87d3-03f9f8fe76a0	postal_code	user.attribute.postal_code
ba03943c-a247-4a22-87d3-03f9f8fe76a0	true	userinfo.token.claim
ba03943c-a247-4a22-87d3-03f9f8fe76a0	street	user.attribute.street
ba03943c-a247-4a22-87d3-03f9f8fe76a0	true	id.token.claim
ba03943c-a247-4a22-87d3-03f9f8fe76a0	region	user.attribute.region
ba03943c-a247-4a22-87d3-03f9f8fe76a0	true	access.token.claim
ba03943c-a247-4a22-87d3-03f9f8fe76a0	locality	user.attribute.locality
82da49bc-8eac-4e4f-878f-4387d9667f4e	true	userinfo.token.claim
82da49bc-8eac-4e4f-878f-4387d9667f4e	phoneNumber	user.attribute
82da49bc-8eac-4e4f-878f-4387d9667f4e	true	id.token.claim
82da49bc-8eac-4e4f-878f-4387d9667f4e	true	access.token.claim
82da49bc-8eac-4e4f-878f-4387d9667f4e	phone_number	claim.name
82da49bc-8eac-4e4f-878f-4387d9667f4e	String	jsonType.label
18044740-87b2-49e0-980b-c7a6028abfc7	true	userinfo.token.claim
18044740-87b2-49e0-980b-c7a6028abfc7	phoneNumberVerified	user.attribute
18044740-87b2-49e0-980b-c7a6028abfc7	true	id.token.claim
18044740-87b2-49e0-980b-c7a6028abfc7	true	access.token.claim
18044740-87b2-49e0-980b-c7a6028abfc7	phone_number_verified	claim.name
18044740-87b2-49e0-980b-c7a6028abfc7	boolean	jsonType.label
d82888f6-8441-4956-8dd3-c60e11f5b601	true	multivalued
d82888f6-8441-4956-8dd3-c60e11f5b601	foo	user.attribute
d82888f6-8441-4956-8dd3-c60e11f5b601	true	access.token.claim
d82888f6-8441-4956-8dd3-c60e11f5b601	realm_access.roles	claim.name
d82888f6-8441-4956-8dd3-c60e11f5b601	String	jsonType.label
4e0863fd-d560-4f9a-b4a9-8a5ef324ca1b	true	multivalued
4e0863fd-d560-4f9a-b4a9-8a5ef324ca1b	foo	user.attribute
4e0863fd-d560-4f9a-b4a9-8a5ef324ca1b	true	access.token.claim
4e0863fd-d560-4f9a-b4a9-8a5ef324ca1b	resource_access.${client_id}.roles	claim.name
4e0863fd-d560-4f9a-b4a9-8a5ef324ca1b	String	jsonType.label
7460f6d8-899d-4545-9e14-baad6665d6d6	true	userinfo.token.claim
7460f6d8-899d-4545-9e14-baad6665d6d6	username	user.attribute
7460f6d8-899d-4545-9e14-baad6665d6d6	true	id.token.claim
7460f6d8-899d-4545-9e14-baad6665d6d6	true	access.token.claim
7460f6d8-899d-4545-9e14-baad6665d6d6	upn	claim.name
7460f6d8-899d-4545-9e14-baad6665d6d6	String	jsonType.label
906f144e-d02d-44ff-b2ff-d9280a06fb4b	true	multivalued
906f144e-d02d-44ff-b2ff-d9280a06fb4b	foo	user.attribute
906f144e-d02d-44ff-b2ff-d9280a06fb4b	true	id.token.claim
906f144e-d02d-44ff-b2ff-d9280a06fb4b	true	access.token.claim
906f144e-d02d-44ff-b2ff-d9280a06fb4b	groups	claim.name
906f144e-d02d-44ff-b2ff-d9280a06fb4b	String	jsonType.label
98ef4de6-f557-4c75-85b8-043d3de555b7	foo	user.attribute
98ef4de6-f557-4c75-85b8-043d3de555b7	true	access.token.claim
98ef4de6-f557-4c75-85b8-043d3de555b7	realm_access.roles	claim.name
98ef4de6-f557-4c75-85b8-043d3de555b7	String	jsonType.label
98ef4de6-f557-4c75-85b8-043d3de555b7	true	multivalued
40f8bbdf-5501-4624-8c98-fa31efd4f8fd	foo	user.attribute
40f8bbdf-5501-4624-8c98-fa31efd4f8fd	true	access.token.claim
40f8bbdf-5501-4624-8c98-fa31efd4f8fd	resource_access.${client_id}.roles	claim.name
40f8bbdf-5501-4624-8c98-fa31efd4f8fd	String	jsonType.label
40f8bbdf-5501-4624-8c98-fa31efd4f8fd	true	multivalued
f0bec835-02e7-45d4-ae9f-6c036ccc557f	true	userinfo.token.claim
f0bec835-02e7-45d4-ae9f-6c036ccc557f	email	user.attribute
f0bec835-02e7-45d4-ae9f-6c036ccc557f	true	id.token.claim
f0bec835-02e7-45d4-ae9f-6c036ccc557f	true	access.token.claim
f0bec835-02e7-45d4-ae9f-6c036ccc557f	email	claim.name
f0bec835-02e7-45d4-ae9f-6c036ccc557f	String	jsonType.label
ba8055a9-3891-4d0e-bc6f-bad0b96d95b3	true	userinfo.token.claim
ba8055a9-3891-4d0e-bc6f-bad0b96d95b3	emailVerified	user.attribute
ba8055a9-3891-4d0e-bc6f-bad0b96d95b3	true	id.token.claim
ba8055a9-3891-4d0e-bc6f-bad0b96d95b3	true	access.token.claim
ba8055a9-3891-4d0e-bc6f-bad0b96d95b3	email_verified	claim.name
ba8055a9-3891-4d0e-bc6f-bad0b96d95b3	boolean	jsonType.label
9a1b67d8-e249-41a5-b546-394c2d8bc759	true	multivalued
9a1b67d8-e249-41a5-b546-394c2d8bc759	true	userinfo.token.claim
9a1b67d8-e249-41a5-b546-394c2d8bc759	foo	user.attribute
9a1b67d8-e249-41a5-b546-394c2d8bc759	true	id.token.claim
9a1b67d8-e249-41a5-b546-394c2d8bc759	true	access.token.claim
9a1b67d8-e249-41a5-b546-394c2d8bc759	groups	claim.name
9a1b67d8-e249-41a5-b546-394c2d8bc759	String	jsonType.label
b2a8e51e-c52f-4b55-8b0a-839f374e3c44	true	userinfo.token.claim
b2a8e51e-c52f-4b55-8b0a-839f374e3c44	username	user.attribute
b2a8e51e-c52f-4b55-8b0a-839f374e3c44	true	id.token.claim
b2a8e51e-c52f-4b55-8b0a-839f374e3c44	true	access.token.claim
b2a8e51e-c52f-4b55-8b0a-839f374e3c44	upn	claim.name
b2a8e51e-c52f-4b55-8b0a-839f374e3c44	String	jsonType.label
113dba93-fe8a-4943-93d5-ea50f32aa5e2	true	userinfo.token.claim
113dba93-fe8a-4943-93d5-ea50f32aa5e2	gender	user.attribute
113dba93-fe8a-4943-93d5-ea50f32aa5e2	true	id.token.claim
113dba93-fe8a-4943-93d5-ea50f32aa5e2	true	access.token.claim
113dba93-fe8a-4943-93d5-ea50f32aa5e2	gender	claim.name
113dba93-fe8a-4943-93d5-ea50f32aa5e2	String	jsonType.label
d1803a7a-5f68-4a9f-a10b-f20d269b8752	true	userinfo.token.claim
d1803a7a-5f68-4a9f-a10b-f20d269b8752	updatedAt	user.attribute
d1803a7a-5f68-4a9f-a10b-f20d269b8752	true	id.token.claim
d1803a7a-5f68-4a9f-a10b-f20d269b8752	true	access.token.claim
d1803a7a-5f68-4a9f-a10b-f20d269b8752	updated_at	claim.name
d1803a7a-5f68-4a9f-a10b-f20d269b8752	String	jsonType.label
fefb7f17-6db2-4374-b55d-3c0244ccc083	true	userinfo.token.claim
fefb7f17-6db2-4374-b55d-3c0244ccc083	lastName	user.attribute
fefb7f17-6db2-4374-b55d-3c0244ccc083	true	id.token.claim
fefb7f17-6db2-4374-b55d-3c0244ccc083	true	access.token.claim
fefb7f17-6db2-4374-b55d-3c0244ccc083	family_name	claim.name
fefb7f17-6db2-4374-b55d-3c0244ccc083	String	jsonType.label
ee6fb1e3-1060-4efd-8032-19bb31fa9020	true	userinfo.token.claim
ee6fb1e3-1060-4efd-8032-19bb31fa9020	profile	user.attribute
ee6fb1e3-1060-4efd-8032-19bb31fa9020	true	id.token.claim
ee6fb1e3-1060-4efd-8032-19bb31fa9020	true	access.token.claim
ee6fb1e3-1060-4efd-8032-19bb31fa9020	profile	claim.name
ee6fb1e3-1060-4efd-8032-19bb31fa9020	String	jsonType.label
2b402549-5b01-4639-a442-ddc67782025b	true	userinfo.token.claim
2b402549-5b01-4639-a442-ddc67782025b	firstName	user.attribute
2b402549-5b01-4639-a442-ddc67782025b	true	id.token.claim
2b402549-5b01-4639-a442-ddc67782025b	true	access.token.claim
2b402549-5b01-4639-a442-ddc67782025b	given_name	claim.name
2b402549-5b01-4639-a442-ddc67782025b	String	jsonType.label
f7d7ce6a-61dc-4c15-8642-63e82394c771	true	userinfo.token.claim
f7d7ce6a-61dc-4c15-8642-63e82394c771	zoneinfo	user.attribute
f7d7ce6a-61dc-4c15-8642-63e82394c771	true	id.token.claim
f7d7ce6a-61dc-4c15-8642-63e82394c771	true	access.token.claim
f7d7ce6a-61dc-4c15-8642-63e82394c771	zoneinfo	claim.name
f7d7ce6a-61dc-4c15-8642-63e82394c771	String	jsonType.label
fd832a4a-95f0-473a-b973-1156dd4f2c87	true	userinfo.token.claim
fd832a4a-95f0-473a-b973-1156dd4f2c87	website	user.attribute
fd832a4a-95f0-473a-b973-1156dd4f2c87	true	id.token.claim
fd832a4a-95f0-473a-b973-1156dd4f2c87	true	access.token.claim
fd832a4a-95f0-473a-b973-1156dd4f2c87	website	claim.name
fd832a4a-95f0-473a-b973-1156dd4f2c87	String	jsonType.label
568afe0e-0c68-425d-93e5-b65efd149c72	true	userinfo.token.claim
568afe0e-0c68-425d-93e5-b65efd149c72	locale	user.attribute
568afe0e-0c68-425d-93e5-b65efd149c72	true	id.token.claim
568afe0e-0c68-425d-93e5-b65efd149c72	true	access.token.claim
568afe0e-0c68-425d-93e5-b65efd149c72	locale	claim.name
568afe0e-0c68-425d-93e5-b65efd149c72	String	jsonType.label
b280948b-8141-4ebd-be53-dfe7b8aa2758	true	userinfo.token.claim
b280948b-8141-4ebd-be53-dfe7b8aa2758	nickname	user.attribute
b280948b-8141-4ebd-be53-dfe7b8aa2758	true	id.token.claim
b280948b-8141-4ebd-be53-dfe7b8aa2758	true	access.token.claim
b280948b-8141-4ebd-be53-dfe7b8aa2758	nickname	claim.name
b280948b-8141-4ebd-be53-dfe7b8aa2758	String	jsonType.label
78f58d6e-45a7-4303-bb47-14bf31495f42	true	id.token.claim
78f58d6e-45a7-4303-bb47-14bf31495f42	true	access.token.claim
78f58d6e-45a7-4303-bb47-14bf31495f42	true	userinfo.token.claim
1d3e4772-001a-4498-a535-051a3528dc21	true	userinfo.token.claim
1d3e4772-001a-4498-a535-051a3528dc21	middleName	user.attribute
1d3e4772-001a-4498-a535-051a3528dc21	true	id.token.claim
1d3e4772-001a-4498-a535-051a3528dc21	true	access.token.claim
1d3e4772-001a-4498-a535-051a3528dc21	middle_name	claim.name
1d3e4772-001a-4498-a535-051a3528dc21	String	jsonType.label
ef15b153-c21b-4bed-bfb2-c75e66f5b024	true	userinfo.token.claim
ef15b153-c21b-4bed-bfb2-c75e66f5b024	picture	user.attribute
ef15b153-c21b-4bed-bfb2-c75e66f5b024	true	id.token.claim
ef15b153-c21b-4bed-bfb2-c75e66f5b024	true	access.token.claim
ef15b153-c21b-4bed-bfb2-c75e66f5b024	picture	claim.name
ef15b153-c21b-4bed-bfb2-c75e66f5b024	String	jsonType.label
47c16f68-bd92-4d9a-b451-0bfed345f8c4	true	userinfo.token.claim
47c16f68-bd92-4d9a-b451-0bfed345f8c4	birthdate	user.attribute
47c16f68-bd92-4d9a-b451-0bfed345f8c4	true	id.token.claim
47c16f68-bd92-4d9a-b451-0bfed345f8c4	true	access.token.claim
47c16f68-bd92-4d9a-b451-0bfed345f8c4	birthdate	claim.name
47c16f68-bd92-4d9a-b451-0bfed345f8c4	String	jsonType.label
4393b0b2-3c0f-409b-9213-7b6743426743	true	userinfo.token.claim
4393b0b2-3c0f-409b-9213-7b6743426743	username	user.attribute
4393b0b2-3c0f-409b-9213-7b6743426743	true	id.token.claim
4393b0b2-3c0f-409b-9213-7b6743426743	true	access.token.claim
4393b0b2-3c0f-409b-9213-7b6743426743	preferred_username	claim.name
4393b0b2-3c0f-409b-9213-7b6743426743	String	jsonType.label
9ac939d4-21e7-4a8b-8044-75210076299a	formatted	user.attribute.formatted
9ac939d4-21e7-4a8b-8044-75210076299a	country	user.attribute.country
9ac939d4-21e7-4a8b-8044-75210076299a	postal_code	user.attribute.postal_code
9ac939d4-21e7-4a8b-8044-75210076299a	true	userinfo.token.claim
9ac939d4-21e7-4a8b-8044-75210076299a	street	user.attribute.street
9ac939d4-21e7-4a8b-8044-75210076299a	true	id.token.claim
9ac939d4-21e7-4a8b-8044-75210076299a	region	user.attribute.region
9ac939d4-21e7-4a8b-8044-75210076299a	true	access.token.claim
9ac939d4-21e7-4a8b-8044-75210076299a	locality	user.attribute.locality
8f6054c8-f8cb-4266-b44d-4196f5210575	false	single
8f6054c8-f8cb-4266-b44d-4196f5210575	Basic	attribute.nameformat
8f6054c8-f8cb-4266-b44d-4196f5210575	Role	attribute.name
7a6585d4-a5d6-4ee4-bdc4-c420ae7765bf	true	userinfo.token.claim
7a6585d4-a5d6-4ee4-bdc4-c420ae7765bf	phoneNumberVerified	user.attribute
7a6585d4-a5d6-4ee4-bdc4-c420ae7765bf	true	id.token.claim
7a6585d4-a5d6-4ee4-bdc4-c420ae7765bf	true	access.token.claim
7a6585d4-a5d6-4ee4-bdc4-c420ae7765bf	phone_number_verified	claim.name
7a6585d4-a5d6-4ee4-bdc4-c420ae7765bf	boolean	jsonType.label
c0341aed-9295-4bb7-b0e7-71f651287cfe	true	userinfo.token.claim
c0341aed-9295-4bb7-b0e7-71f651287cfe	phoneNumber	user.attribute
c0341aed-9295-4bb7-b0e7-71f651287cfe	true	id.token.claim
c0341aed-9295-4bb7-b0e7-71f651287cfe	true	access.token.claim
c0341aed-9295-4bb7-b0e7-71f651287cfe	phone_number	claim.name
c0341aed-9295-4bb7-b0e7-71f651287cfe	String	jsonType.label
4b5851bb-d567-448d-b887-c1b780fb771c	true	userinfo.token.claim
4b5851bb-d567-448d-b887-c1b780fb771c	locale	user.attribute
4b5851bb-d567-448d-b887-c1b780fb771c	true	id.token.claim
4b5851bb-d567-448d-b887-c1b780fb771c	true	access.token.claim
4b5851bb-d567-448d-b887-c1b780fb771c	locale	claim.name
4b5851bb-d567-448d-b887-c1b780fb771c	String	jsonType.label
6020d184-957a-416e-9818-8091137e2054	aspen-web	included.client.audience
6020d184-957a-416e-9818-8091137e2054	true	id.token.claim
6020d184-957a-416e-9818-8091137e2054	true	access.token.claim
c5ef31f0-6b8e-4af1-89ee-e3b7ccbf55bd	false	full.path
c5ef31f0-6b8e-4af1-89ee-e3b7ccbf55bd	true	id.token.claim
c5ef31f0-6b8e-4af1-89ee-e3b7ccbf55bd	true	access.token.claim
c5ef31f0-6b8e-4af1-89ee-e3b7ccbf55bd	groups	claim.name
c5ef31f0-6b8e-4af1-89ee-e3b7ccbf55bd	true	userinfo.token.claim
4424a01d-cbe1-4085-b12d-0c475ef7d978	aspen-admin	role
4424a01d-cbe1-4085-b12d-0c475ef7d978	admin-aspen	new.role.name
99c87403-3c46-4ad5-a10a-6e606874639f	foo	user.attribute
99c87403-3c46-4ad5-a10a-6e606874639f	true	access.token.claim
99c87403-3c46-4ad5-a10a-6e606874639f	String	jsonType.label
99c87403-3c46-4ad5-a10a-6e606874639f	true	multivalued
99c87403-3c46-4ad5-a10a-6e606874639f	true	userinfo.token.claim
99c87403-3c46-4ad5-a10a-6e606874639f	true	id.token.claim
99c87403-3c46-4ad5-a10a-6e606874639f	roles	claim.name
\.


--
-- Data for Name: realm; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm (id, access_code_lifespan, user_action_lifespan, access_token_lifespan, account_theme, admin_theme, email_theme, enabled, events_enabled, events_expiration, login_theme, name, not_before, password_policy, registration_allowed, remember_me, reset_password_allowed, social, ssl_required, sso_idle_timeout, sso_max_lifespan, update_profile_on_soc_login, verify_email, master_admin_client, login_lifespan, internationalization_enabled, default_locale, reg_email_as_username, admin_events_enabled, admin_events_details_enabled, edit_username_allowed, otp_policy_counter, otp_policy_window, otp_policy_period, otp_policy_digits, otp_policy_alg, otp_policy_type, browser_flow, registration_flow, direct_grant_flow, reset_credentials_flow, client_auth_flow, offline_session_idle_timeout, revoke_refresh_token, access_token_life_implicit, login_with_email_allowed, duplicate_emails_allowed, docker_auth_flow, refresh_token_max_reuse, allow_user_managed_access, sso_max_lifespan_remember_me, sso_idle_timeout_remember_me, default_role) FROM stdin;
master	60	300	60	\N	\N	\N	t	f	0	\N	master	0	\N	f	f	f	f	EXTERNAL	1800	36000	f	f	99a223f0-9821-4c16-8101-df120180f09f	1800	f	\N	f	f	f	f	0	1	30	6	HmacSHA1	totp	24c21a84-eb0d-41e4-8b53-d18327307361	e20ff429-1dfd-4de5-9a9f-544a2ea1855e	713abcc2-95cb-4657-8b5b-56ca0304e9ff	5c743a3a-74d5-4a52-a285-15f047c52251	45984ddc-3a91-4bd0-8005-1bdc073d2447	2592000	f	900	t	f	365f3269-8973-44a8-847b-6ad19fdb4f3c	0	f	0	0	1ddd0d01-b06f-4731-ad0a-52abe01ab6b5
aspen	60	300	300	keycloak.v2	base	\N	t	f	0	keycloak	aspen	0	\N	t	f	t	f	NONE	1800	36000	f	f	b940652c-a9b6-483a-b212-945e3d5491d7	1800	f	\N	f	f	f	t	0	1	30	6	HmacSHA1	totp	64d8710c-e9e4-41d8-ad78-10cd0f8eef7e	6ba886ac-9cbc-453a-996a-24d7c795d544	b0322382-1011-487b-8bb1-76b38414874c	67cbb552-f33a-4e12-a5e1-ec50b6c8ef12	414c1c11-b528-4ec6-bd38-8d7d06fe7866	2592000	f	900	t	f	4a7a0b2b-c0ca-4872-8fef-df7d2bf5fc3c	0	f	0	0	526ddcda-dc7d-4c47-9730-af8180cbada4
\.


--
-- Data for Name: realm_attribute; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_attribute (name, realm_id, value) FROM stdin;
_browser_header.contentSecurityPolicyReportOnly	master	
_browser_header.xContentTypeOptions	master	nosniff
_browser_header.xRobotsTag	master	none
_browser_header.xFrameOptions	master	SAMEORIGIN
_browser_header.contentSecurityPolicy	master	frame-src 'self'; frame-ancestors 'self'; object-src 'none';
_browser_header.xXSSProtection	master	1; mode=block
_browser_header.strictTransportSecurity	master	max-age=31536000; includeSubDomains
bruteForceProtected	master	false
permanentLockout	master	false
maxFailureWaitSeconds	master	900
minimumQuickLoginWaitSeconds	master	60
waitIncrementSeconds	master	60
quickLoginCheckMilliSeconds	master	1000
maxDeltaTimeSeconds	master	43200
failureFactor	master	30
displayName	master	Keycloak
displayNameHtml	master	<div class="kc-logo-text"><span>Keycloak</span></div>
defaultSignatureAlgorithm	master	RS256
offlineSessionMaxLifespanEnabled	master	false
offlineSessionMaxLifespan	master	5184000
clientSessionIdleTimeout	aspen	0
clientSessionMaxLifespan	aspen	0
clientOfflineSessionIdleTimeout	aspen	0
clientOfflineSessionMaxLifespan	aspen	0
oauth2DeviceCodeLifespan	aspen	600
oauth2DevicePollingInterval	aspen	5
cibaBackchannelTokenDeliveryMode	aspen	poll
cibaExpiresIn	aspen	120
cibaInterval	aspen	5
cibaAuthRequestedUserHint	aspen	login_hint
parRequestUriLifespan	aspen	60
bruteForceProtected	aspen	false
permanentLockout	aspen	false
maxFailureWaitSeconds	aspen	900
minimumQuickLoginWaitSeconds	aspen	60
waitIncrementSeconds	aspen	60
quickLoginCheckMilliSeconds	aspen	1000
maxDeltaTimeSeconds	aspen	43200
failureFactor	aspen	30
actionTokenGeneratedByAdminLifespan	aspen	43200
actionTokenGeneratedByUserLifespan	aspen	300
defaultSignatureAlgorithm	aspen	RS256
offlineSessionMaxLifespanEnabled	aspen	false
offlineSessionMaxLifespan	aspen	5184000
webAuthnPolicyRpEntityName	aspen	keycloak
webAuthnPolicySignatureAlgorithms	aspen	ES256
webAuthnPolicyRpId	aspen	
webAuthnPolicyAttestationConveyancePreference	aspen	not specified
webAuthnPolicyAuthenticatorAttachment	aspen	not specified
webAuthnPolicyRequireResidentKey	aspen	not specified
webAuthnPolicyUserVerificationRequirement	aspen	not specified
webAuthnPolicyCreateTimeout	aspen	0
webAuthnPolicyAvoidSameAuthenticatorRegister	aspen	false
webAuthnPolicyRpEntityNamePasswordless	aspen	keycloak
webAuthnPolicySignatureAlgorithmsPasswordless	aspen	ES256
webAuthnPolicyRpIdPasswordless	aspen	
webAuthnPolicyAttestationConveyancePreferencePasswordless	aspen	not specified
webAuthnPolicyAuthenticatorAttachmentPasswordless	aspen	not specified
webAuthnPolicyRequireResidentKeyPasswordless	aspen	not specified
webAuthnPolicyUserVerificationRequirementPasswordless	aspen	not specified
webAuthnPolicyCreateTimeoutPasswordless	aspen	0
webAuthnPolicyAvoidSameAuthenticatorRegisterPasswordless	aspen	false
client-policies.profiles	aspen	{"profiles":[]}
client-policies.policies	aspen	{"policies":[]}
_browser_header.contentSecurityPolicyReportOnly	aspen	
_browser_header.xContentTypeOptions	aspen	nosniff
_browser_header.xRobotsTag	aspen	none
_browser_header.xFrameOptions	aspen	SAMEORIGIN
_browser_header.contentSecurityPolicy	aspen	frame-src 'self'; frame-ancestors 'self'; object-src 'none';
_browser_header.xXSSProtection	aspen	1; mode=block
_browser_header.strictTransportSecurity	aspen	max-age=31536000; includeSubDomains
\.


--
-- Data for Name: realm_default_groups; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_default_groups (realm_id, group_id) FROM stdin;
\.


--
-- Data for Name: realm_enabled_event_types; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_enabled_event_types (realm_id, value) FROM stdin;
\.


--
-- Data for Name: realm_events_listeners; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_events_listeners (realm_id, value) FROM stdin;
master	jboss-logging
aspen	jboss-logging
\.


--
-- Data for Name: realm_localizations; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_localizations (realm_id, locale, texts) FROM stdin;
\.


--
-- Data for Name: realm_required_credential; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_required_credential (type, form_label, input, secret, realm_id) FROM stdin;
password	password	t	t	master
password	password	t	t	aspen
\.


--
-- Data for Name: realm_smtp_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_smtp_config (realm_id, value, name) FROM stdin;
\.


--
-- Data for Name: realm_supported_locales; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_supported_locales (realm_id, value) FROM stdin;
aspen	
\.


--
-- Data for Name: redirect_uris; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.redirect_uris (client_id, value) FROM stdin;
f050cfbd-de00-405f-a66d-28d7d629e43f	/realms/master/account/*
dae91f88-2e76-4d7a-a717-0b6ca2bc862b	/realms/master/account/*
b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	/admin/master/console/*
7af7268b-2ed7-464c-b50d-70ebaff119e5	/realms/aspen/account/*
c7555935-08d9-4c93-8fea-401d7ee4ea49	/realms/aspen/account/*
855cb299-7dc3-44de-b189-075aeaa4fc69	/admin/aspen/console/*
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	http://localhost/*
\.


--
-- Data for Name: required_action_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.required_action_config (required_action_id, value, name) FROM stdin;
\.


--
-- Data for Name: required_action_provider; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.required_action_provider (id, alias, name, realm_id, enabled, default_action, provider_id, priority) FROM stdin;
67bb7f68-e6cb-4d61-b6b4-e97cd3eb4373	VERIFY_EMAIL	Verify Email	master	t	f	VERIFY_EMAIL	50
a232693c-2802-4b85-9fdd-c2f25b0c9935	UPDATE_PROFILE	Update Profile	master	t	f	UPDATE_PROFILE	40
664f3ad2-27d0-4976-b129-5803d88971ac	CONFIGURE_TOTP	Configure OTP	master	t	f	CONFIGURE_TOTP	10
157a153b-64b8-4a40-a894-21cab5bf4906	UPDATE_PASSWORD	Update Password	master	t	f	UPDATE_PASSWORD	30
f3d444b0-4690-46a6-81c3-b4e5fdf09f52	terms_and_conditions	Terms and Conditions	master	f	f	terms_and_conditions	20
6f285cfb-8195-4445-ad0e-f91473b93011	update_user_locale	Update User Locale	master	t	f	update_user_locale	1000
bb5da88f-97c0-469b-b9f2-6444346a7c91	delete_account	Delete Account	master	f	f	delete_account	60
414da204-0e70-46a1-a66c-d9aa7de2c3d5	CONFIGURE_TOTP	Configure OTP	aspen	t	f	CONFIGURE_TOTP	10
2bcd2a4d-39ae-4dd0-b3d7-e64f23deaf37	terms_and_conditions	Terms and Conditions	aspen	f	f	terms_and_conditions	20
daf4466f-492c-4ab8-b34a-327209690eda	UPDATE_PASSWORD	Update Password	aspen	t	f	UPDATE_PASSWORD	30
53a69c5d-eeac-454f-ba07-7e7d9960a150	UPDATE_PROFILE	Update Profile	aspen	t	f	UPDATE_PROFILE	40
1cb5b0d4-5285-409b-aac1-f253c0750891	VERIFY_EMAIL	Verify Email	aspen	t	f	VERIFY_EMAIL	50
f5f0b2bf-74a6-45e5-bcf6-55bc6992a2a8	delete_account	Delete Account	aspen	f	f	delete_account	60
4dc2ede5-f07a-4d81-829e-72923489bb3b	update_user_locale	Update User Locale	aspen	t	f	update_user_locale	1000
\.


--
-- Data for Name: resource_attribute; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_attribute (id, name, value, resource_id) FROM stdin;
\.


--
-- Data for Name: resource_policy; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_policy (resource_id, policy_id) FROM stdin;
\.


--
-- Data for Name: resource_scope; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_scope (resource_id, scope_id) FROM stdin;
\.


--
-- Data for Name: resource_server; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_server (id, allow_rs_remote_mgmt, policy_enforce_mode, decision_strategy) FROM stdin;
\.


--
-- Data for Name: resource_server_perm_ticket; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_server_perm_ticket (id, owner, requester, created_timestamp, granted_timestamp, resource_id, scope_id, resource_server_id, policy_id) FROM stdin;
\.


--
-- Data for Name: resource_server_policy; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_server_policy (id, name, description, type, decision_strategy, logic, resource_server_id, owner) FROM stdin;
\.


--
-- Data for Name: resource_server_resource; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_server_resource (id, name, type, icon_uri, owner, resource_server_id, owner_managed_access, display_name) FROM stdin;
\.


--
-- Data for Name: resource_server_scope; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_server_scope (id, name, icon_uri, resource_server_id, display_name) FROM stdin;
\.


--
-- Data for Name: resource_uris; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_uris (resource_id, value) FROM stdin;
\.


--
-- Data for Name: role_attribute; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.role_attribute (id, role_id, name, value) FROM stdin;
4aa44790-a2b8-4ac4-a583-0e5fa1b7a460	441bf022-0174-4473-b4d1-92e36ddbcb73	AspenAdmin	true
\.


--
-- Data for Name: scope_mapping; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.scope_mapping (client_id, role_id) FROM stdin;
dae91f88-2e76-4d7a-a717-0b6ca2bc862b	61756776-df3d-43ce-af71-4b17730a42d6
c7555935-08d9-4c93-8fea-401d7ee4ea49	de07690a-efe2-4225-9e2a-3908474f19db
\.


--
-- Data for Name: scope_policy; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.scope_policy (scope_id, policy_id) FROM stdin;
\.


--
-- Data for Name: user_attribute; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_attribute (name, value, user_id, id) FROM stdin;
\.


--
-- Data for Name: user_consent; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_consent (id, client_id, user_id, created_date, last_updated_date, client_storage_provider, external_client_id) FROM stdin;
\.


--
-- Data for Name: user_consent_client_scope; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_consent_client_scope (user_consent_id, scope_id) FROM stdin;
\.


--
-- Data for Name: user_entity; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_entity (id, email, email_constraint, email_verified, enabled, federation_link, first_name, last_name, realm_id, username, created_timestamp, service_account_client_link, not_before) FROM stdin;
06be471b-1c32-40ea-86ad-20b1914ec450	\N	e9d56013-0a76-486b-a167-28d34bb16db8	f	t	\N	\N	\N	master	admin	1632019951425	\N	0
9f3ef3d5-7c23-4ba1-8138-37f7693cd5de	user@toteslegit.website	user@toteslegit.website	t	t	\N	User	Name	aspen	user	1632020474047	\N	0
3f64dbd3-a135-45eb-9d1c-afe9151082cd	admin@projectaspen.org	admin@projectaspen.org	t	t	\N	aspen	admin	aspen	aspenadmin	1632198221032	\N	0
\.


--
-- Data for Name: user_federation_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_federation_config (user_federation_provider_id, value, name) FROM stdin;
\.


--
-- Data for Name: user_federation_mapper; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_federation_mapper (id, name, federation_provider_id, federation_mapper_type, realm_id) FROM stdin;
\.


--
-- Data for Name: user_federation_mapper_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_federation_mapper_config (user_federation_mapper_id, value, name) FROM stdin;
\.


--
-- Data for Name: user_federation_provider; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_federation_provider (id, changed_sync_period, display_name, full_sync_period, last_sync, priority, provider_name, realm_id) FROM stdin;
\.


--
-- Data for Name: user_group_membership; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_group_membership (group_id, user_id) FROM stdin;
1b609383-7203-47ff-b4eb-4a3e22d1e601	9f3ef3d5-7c23-4ba1-8138-37f7693cd5de
f1ee9d3b-a7dd-466a-9cf6-9c2b559d19ee	9f3ef3d5-7c23-4ba1-8138-37f7693cd5de
1b609383-7203-47ff-b4eb-4a3e22d1e601	3f64dbd3-a135-45eb-9d1c-afe9151082cd
\.


--
-- Data for Name: user_required_action; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_required_action (user_id, required_action) FROM stdin;
\.


--
-- Data for Name: user_role_mapping; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_role_mapping (role_id, user_id) FROM stdin;
1ddd0d01-b06f-4731-ad0a-52abe01ab6b5	06be471b-1c32-40ea-86ad-20b1914ec450
c9b1fa63-17be-4b24-aa7c-775cebc84e29	06be471b-1c32-40ea-86ad-20b1914ec450
526ddcda-dc7d-4c47-9730-af8180cbada4	9f3ef3d5-7c23-4ba1-8138-37f7693cd5de
526ddcda-dc7d-4c47-9730-af8180cbada4	3f64dbd3-a135-45eb-9d1c-afe9151082cd
441bf022-0174-4473-b4d1-92e36ddbcb73	3f64dbd3-a135-45eb-9d1c-afe9151082cd
\.


--
-- Data for Name: user_session; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_session (id, auth_method, ip_address, last_session_refresh, login_username, realm_id, remember_me, started, user_id, user_session_state, broker_session_id, broker_user_id) FROM stdin;
\.


--
-- Data for Name: user_session_note; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_session_note (user_session, name, value) FROM stdin;
\.


--
-- Data for Name: username_login_failure; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.username_login_failure (realm_id, username, failed_login_not_before, last_failure, last_ip_failure, num_failures) FROM stdin;
\.


--
-- Data for Name: web_origins; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.web_origins (client_id, value) FROM stdin;
b2540a11-e1f3-4731-972a-a7d5c4ca1cd9	+
855cb299-7dc3-44de-b189-075aeaa4fc69	+
c3053e3e-9d90-4a2f-b7ab-232f108b2e6f	http://localhost
\.


--
-- Name: username_login_failure CONSTRAINT_17-2; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.username_login_failure
    ADD CONSTRAINT "CONSTRAINT_17-2" PRIMARY KEY (realm_id, username);


--
-- Name: keycloak_role UK_J3RWUVD56ONTGSUHOGM184WW2-2; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.keycloak_role
    ADD CONSTRAINT "UK_J3RWUVD56ONTGSUHOGM184WW2-2" UNIQUE (name, client_realm_constraint);


--
-- Name: client_auth_flow_bindings c_cli_flow_bind; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_auth_flow_bindings
    ADD CONSTRAINT c_cli_flow_bind PRIMARY KEY (client_id, binding_name);


--
-- Name: client_scope_client c_cli_scope_bind; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope_client
    ADD CONSTRAINT c_cli_scope_bind PRIMARY KEY (client_id, scope_id);


--
-- Name: client_initial_access cnstr_client_init_acc_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_initial_access
    ADD CONSTRAINT cnstr_client_init_acc_pk PRIMARY KEY (id);


--
-- Name: realm_default_groups con_group_id_def_groups; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_default_groups
    ADD CONSTRAINT con_group_id_def_groups UNIQUE (group_id);


--
-- Name: broker_link constr_broker_link_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.broker_link
    ADD CONSTRAINT constr_broker_link_pk PRIMARY KEY (identity_provider, user_id);


--
-- Name: client_user_session_note constr_cl_usr_ses_note; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_user_session_note
    ADD CONSTRAINT constr_cl_usr_ses_note PRIMARY KEY (client_session, name);


--
-- Name: component_config constr_component_config_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.component_config
    ADD CONSTRAINT constr_component_config_pk PRIMARY KEY (id);


--
-- Name: component constr_component_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT constr_component_pk PRIMARY KEY (id);


--
-- Name: fed_user_required_action constr_fed_required_action; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_required_action
    ADD CONSTRAINT constr_fed_required_action PRIMARY KEY (required_action, user_id);


--
-- Name: fed_user_attribute constr_fed_user_attr_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_attribute
    ADD CONSTRAINT constr_fed_user_attr_pk PRIMARY KEY (id);


--
-- Name: fed_user_consent constr_fed_user_consent_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_consent
    ADD CONSTRAINT constr_fed_user_consent_pk PRIMARY KEY (id);


--
-- Name: fed_user_credential constr_fed_user_cred_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_credential
    ADD CONSTRAINT constr_fed_user_cred_pk PRIMARY KEY (id);


--
-- Name: fed_user_group_membership constr_fed_user_group; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_group_membership
    ADD CONSTRAINT constr_fed_user_group PRIMARY KEY (group_id, user_id);


--
-- Name: fed_user_role_mapping constr_fed_user_role; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_role_mapping
    ADD CONSTRAINT constr_fed_user_role PRIMARY KEY (role_id, user_id);


--
-- Name: federated_user constr_federated_user; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.federated_user
    ADD CONSTRAINT constr_federated_user PRIMARY KEY (id);


--
-- Name: realm_default_groups constr_realm_default_groups; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_default_groups
    ADD CONSTRAINT constr_realm_default_groups PRIMARY KEY (realm_id, group_id);


--
-- Name: realm_enabled_event_types constr_realm_enabl_event_types; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_enabled_event_types
    ADD CONSTRAINT constr_realm_enabl_event_types PRIMARY KEY (realm_id, value);


--
-- Name: realm_events_listeners constr_realm_events_listeners; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_events_listeners
    ADD CONSTRAINT constr_realm_events_listeners PRIMARY KEY (realm_id, value);


--
-- Name: realm_supported_locales constr_realm_supported_locales; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_supported_locales
    ADD CONSTRAINT constr_realm_supported_locales PRIMARY KEY (realm_id, value);


--
-- Name: identity_provider constraint_2b; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider
    ADD CONSTRAINT constraint_2b PRIMARY KEY (internal_id);


--
-- Name: client_attributes constraint_3c; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_attributes
    ADD CONSTRAINT constraint_3c PRIMARY KEY (client_id, name);


--
-- Name: event_entity constraint_4; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.event_entity
    ADD CONSTRAINT constraint_4 PRIMARY KEY (id);


--
-- Name: federated_identity constraint_40; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.federated_identity
    ADD CONSTRAINT constraint_40 PRIMARY KEY (identity_provider, user_id);


--
-- Name: realm constraint_4a; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm
    ADD CONSTRAINT constraint_4a PRIMARY KEY (id);


--
-- Name: client_session_role constraint_5; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_role
    ADD CONSTRAINT constraint_5 PRIMARY KEY (client_session, role_id);


--
-- Name: user_session constraint_57; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_session
    ADD CONSTRAINT constraint_57 PRIMARY KEY (id);


--
-- Name: user_federation_provider constraint_5c; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_provider
    ADD CONSTRAINT constraint_5c PRIMARY KEY (id);


--
-- Name: client_session_note constraint_5e; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_note
    ADD CONSTRAINT constraint_5e PRIMARY KEY (client_session, name);


--
-- Name: client constraint_7; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT constraint_7 PRIMARY KEY (id);


--
-- Name: client_session constraint_8; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session
    ADD CONSTRAINT constraint_8 PRIMARY KEY (id);


--
-- Name: scope_mapping constraint_81; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.scope_mapping
    ADD CONSTRAINT constraint_81 PRIMARY KEY (client_id, role_id);


--
-- Name: client_node_registrations constraint_84; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_node_registrations
    ADD CONSTRAINT constraint_84 PRIMARY KEY (client_id, name);


--
-- Name: realm_attribute constraint_9; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_attribute
    ADD CONSTRAINT constraint_9 PRIMARY KEY (name, realm_id);


--
-- Name: realm_required_credential constraint_92; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_required_credential
    ADD CONSTRAINT constraint_92 PRIMARY KEY (realm_id, type);


--
-- Name: keycloak_role constraint_a; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.keycloak_role
    ADD CONSTRAINT constraint_a PRIMARY KEY (id);


--
-- Name: admin_event_entity constraint_admin_event_entity; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.admin_event_entity
    ADD CONSTRAINT constraint_admin_event_entity PRIMARY KEY (id);


--
-- Name: authenticator_config_entry constraint_auth_cfg_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authenticator_config_entry
    ADD CONSTRAINT constraint_auth_cfg_pk PRIMARY KEY (authenticator_id, name);


--
-- Name: authentication_execution constraint_auth_exec_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authentication_execution
    ADD CONSTRAINT constraint_auth_exec_pk PRIMARY KEY (id);


--
-- Name: authentication_flow constraint_auth_flow_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authentication_flow
    ADD CONSTRAINT constraint_auth_flow_pk PRIMARY KEY (id);


--
-- Name: authenticator_config constraint_auth_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authenticator_config
    ADD CONSTRAINT constraint_auth_pk PRIMARY KEY (id);


--
-- Name: client_session_auth_status constraint_auth_status_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_auth_status
    ADD CONSTRAINT constraint_auth_status_pk PRIMARY KEY (client_session, authenticator);


--
-- Name: user_role_mapping constraint_c; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_role_mapping
    ADD CONSTRAINT constraint_c PRIMARY KEY (role_id, user_id);


--
-- Name: composite_role constraint_composite_role; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.composite_role
    ADD CONSTRAINT constraint_composite_role PRIMARY KEY (composite, child_role);


--
-- Name: client_session_prot_mapper constraint_cs_pmp_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_prot_mapper
    ADD CONSTRAINT constraint_cs_pmp_pk PRIMARY KEY (client_session, protocol_mapper_id);


--
-- Name: identity_provider_config constraint_d; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider_config
    ADD CONSTRAINT constraint_d PRIMARY KEY (identity_provider_id, name);


--
-- Name: policy_config constraint_dpc; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.policy_config
    ADD CONSTRAINT constraint_dpc PRIMARY KEY (policy_id, name);


--
-- Name: realm_smtp_config constraint_e; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_smtp_config
    ADD CONSTRAINT constraint_e PRIMARY KEY (realm_id, name);


--
-- Name: credential constraint_f; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.credential
    ADD CONSTRAINT constraint_f PRIMARY KEY (id);


--
-- Name: user_federation_config constraint_f9; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_config
    ADD CONSTRAINT constraint_f9 PRIMARY KEY (user_federation_provider_id, name);


--
-- Name: resource_server_perm_ticket constraint_fapmt; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT constraint_fapmt PRIMARY KEY (id);


--
-- Name: resource_server_resource constraint_farsr; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_resource
    ADD CONSTRAINT constraint_farsr PRIMARY KEY (id);


--
-- Name: resource_server_policy constraint_farsrp; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_policy
    ADD CONSTRAINT constraint_farsrp PRIMARY KEY (id);


--
-- Name: associated_policy constraint_farsrpap; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.associated_policy
    ADD CONSTRAINT constraint_farsrpap PRIMARY KEY (policy_id, associated_policy_id);


--
-- Name: resource_policy constraint_farsrpp; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_policy
    ADD CONSTRAINT constraint_farsrpp PRIMARY KEY (resource_id, policy_id);


--
-- Name: resource_server_scope constraint_farsrs; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_scope
    ADD CONSTRAINT constraint_farsrs PRIMARY KEY (id);


--
-- Name: resource_scope constraint_farsrsp; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_scope
    ADD CONSTRAINT constraint_farsrsp PRIMARY KEY (resource_id, scope_id);


--
-- Name: scope_policy constraint_farsrsps; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.scope_policy
    ADD CONSTRAINT constraint_farsrsps PRIMARY KEY (scope_id, policy_id);


--
-- Name: user_entity constraint_fb; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT constraint_fb PRIMARY KEY (id);


--
-- Name: user_federation_mapper_config constraint_fedmapper_cfg_pm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_mapper_config
    ADD CONSTRAINT constraint_fedmapper_cfg_pm PRIMARY KEY (user_federation_mapper_id, name);


--
-- Name: user_federation_mapper constraint_fedmapperpm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_mapper
    ADD CONSTRAINT constraint_fedmapperpm PRIMARY KEY (id);


--
-- Name: fed_user_consent_cl_scope constraint_fgrntcsnt_clsc_pm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_consent_cl_scope
    ADD CONSTRAINT constraint_fgrntcsnt_clsc_pm PRIMARY KEY (user_consent_id, scope_id);


--
-- Name: user_consent_client_scope constraint_grntcsnt_clsc_pm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_consent_client_scope
    ADD CONSTRAINT constraint_grntcsnt_clsc_pm PRIMARY KEY (user_consent_id, scope_id);


--
-- Name: user_consent constraint_grntcsnt_pm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT constraint_grntcsnt_pm PRIMARY KEY (id);


--
-- Name: keycloak_group constraint_group; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.keycloak_group
    ADD CONSTRAINT constraint_group PRIMARY KEY (id);


--
-- Name: group_attribute constraint_group_attribute_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.group_attribute
    ADD CONSTRAINT constraint_group_attribute_pk PRIMARY KEY (id);


--
-- Name: group_role_mapping constraint_group_role; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.group_role_mapping
    ADD CONSTRAINT constraint_group_role PRIMARY KEY (role_id, group_id);


--
-- Name: identity_provider_mapper constraint_idpm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider_mapper
    ADD CONSTRAINT constraint_idpm PRIMARY KEY (id);


--
-- Name: idp_mapper_config constraint_idpmconfig; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.idp_mapper_config
    ADD CONSTRAINT constraint_idpmconfig PRIMARY KEY (idp_mapper_id, name);


--
-- Name: migration_model constraint_migmod; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.migration_model
    ADD CONSTRAINT constraint_migmod PRIMARY KEY (id);


--
-- Name: offline_client_session constraint_offl_cl_ses_pk3; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.offline_client_session
    ADD CONSTRAINT constraint_offl_cl_ses_pk3 PRIMARY KEY (user_session_id, client_id, client_storage_provider, external_client_id, offline_flag);


--
-- Name: offline_user_session constraint_offl_us_ses_pk2; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.offline_user_session
    ADD CONSTRAINT constraint_offl_us_ses_pk2 PRIMARY KEY (user_session_id, offline_flag);


--
-- Name: protocol_mapper constraint_pcm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.protocol_mapper
    ADD CONSTRAINT constraint_pcm PRIMARY KEY (id);


--
-- Name: protocol_mapper_config constraint_pmconfig; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.protocol_mapper_config
    ADD CONSTRAINT constraint_pmconfig PRIMARY KEY (protocol_mapper_id, name);


--
-- Name: redirect_uris constraint_redirect_uris; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.redirect_uris
    ADD CONSTRAINT constraint_redirect_uris PRIMARY KEY (client_id, value);


--
-- Name: required_action_config constraint_req_act_cfg_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.required_action_config
    ADD CONSTRAINT constraint_req_act_cfg_pk PRIMARY KEY (required_action_id, name);


--
-- Name: required_action_provider constraint_req_act_prv_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.required_action_provider
    ADD CONSTRAINT constraint_req_act_prv_pk PRIMARY KEY (id);


--
-- Name: user_required_action constraint_required_action; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_required_action
    ADD CONSTRAINT constraint_required_action PRIMARY KEY (required_action, user_id);


--
-- Name: resource_uris constraint_resour_uris_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_uris
    ADD CONSTRAINT constraint_resour_uris_pk PRIMARY KEY (resource_id, value);


--
-- Name: role_attribute constraint_role_attribute_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.role_attribute
    ADD CONSTRAINT constraint_role_attribute_pk PRIMARY KEY (id);


--
-- Name: user_attribute constraint_user_attribute_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_attribute
    ADD CONSTRAINT constraint_user_attribute_pk PRIMARY KEY (id);


--
-- Name: user_group_membership constraint_user_group; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_group_membership
    ADD CONSTRAINT constraint_user_group PRIMARY KEY (group_id, user_id);


--
-- Name: user_session_note constraint_usn_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_session_note
    ADD CONSTRAINT constraint_usn_pk PRIMARY KEY (user_session, name);


--
-- Name: web_origins constraint_web_origins; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.web_origins
    ADD CONSTRAINT constraint_web_origins PRIMARY KEY (client_id, value);


--
-- Name: client_scope_attributes pk_cl_tmpl_attr; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope_attributes
    ADD CONSTRAINT pk_cl_tmpl_attr PRIMARY KEY (scope_id, name);


--
-- Name: client_scope pk_cli_template; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope
    ADD CONSTRAINT pk_cli_template PRIMARY KEY (id);


--
-- Name: databasechangeloglock pk_databasechangeloglock; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.databasechangeloglock
    ADD CONSTRAINT pk_databasechangeloglock PRIMARY KEY (id);


--
-- Name: resource_server pk_resource_server; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server
    ADD CONSTRAINT pk_resource_server PRIMARY KEY (id);


--
-- Name: client_scope_role_mapping pk_template_scope; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope_role_mapping
    ADD CONSTRAINT pk_template_scope PRIMARY KEY (scope_id, role_id);


--
-- Name: default_client_scope r_def_cli_scope_bind; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.default_client_scope
    ADD CONSTRAINT r_def_cli_scope_bind PRIMARY KEY (realm_id, scope_id);


--
-- Name: realm_localizations realm_localizations_pkey; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_localizations
    ADD CONSTRAINT realm_localizations_pkey PRIMARY KEY (realm_id, locale);


--
-- Name: resource_attribute res_attr_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_attribute
    ADD CONSTRAINT res_attr_pk PRIMARY KEY (id);


--
-- Name: keycloak_group sibling_names; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.keycloak_group
    ADD CONSTRAINT sibling_names UNIQUE (realm_id, parent_group, name);


--
-- Name: identity_provider uk_2daelwnibji49avxsrtuf6xj33; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider
    ADD CONSTRAINT uk_2daelwnibji49avxsrtuf6xj33 UNIQUE (provider_alias, realm_id);


--
-- Name: client uk_b71cjlbenv945rb6gcon438at; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT uk_b71cjlbenv945rb6gcon438at UNIQUE (realm_id, client_id);


--
-- Name: client_scope uk_cli_scope; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope
    ADD CONSTRAINT uk_cli_scope UNIQUE (realm_id, name);


--
-- Name: user_entity uk_dykn684sl8up1crfei6eckhd7; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT uk_dykn684sl8up1crfei6eckhd7 UNIQUE (realm_id, email_constraint);


--
-- Name: resource_server_resource uk_frsr6t700s9v50bu18ws5ha6; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_resource
    ADD CONSTRAINT uk_frsr6t700s9v50bu18ws5ha6 UNIQUE (name, owner, resource_server_id);


--
-- Name: resource_server_perm_ticket uk_frsr6t700s9v50bu18ws5pmt; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT uk_frsr6t700s9v50bu18ws5pmt UNIQUE (owner, requester, resource_server_id, resource_id, scope_id);


--
-- Name: resource_server_policy uk_frsrpt700s9v50bu18ws5ha6; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_policy
    ADD CONSTRAINT uk_frsrpt700s9v50bu18ws5ha6 UNIQUE (name, resource_server_id);


--
-- Name: resource_server_scope uk_frsrst700s9v50bu18ws5ha6; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_scope
    ADD CONSTRAINT uk_frsrst700s9v50bu18ws5ha6 UNIQUE (name, resource_server_id);


--
-- Name: user_consent uk_jkuwuvd56ontgsuhogm8uewrt; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT uk_jkuwuvd56ontgsuhogm8uewrt UNIQUE (client_id, client_storage_provider, external_client_id, user_id);


--
-- Name: realm uk_orvsdmla56612eaefiq6wl5oi; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm
    ADD CONSTRAINT uk_orvsdmla56612eaefiq6wl5oi UNIQUE (name);


--
-- Name: user_entity uk_ru8tt6t700s9v50bu18ws5ha6; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT uk_ru8tt6t700s9v50bu18ws5ha6 UNIQUE (realm_id, username);


--
-- Name: idx_assoc_pol_assoc_pol_id; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_assoc_pol_assoc_pol_id ON public.associated_policy USING btree (associated_policy_id);


--
-- Name: idx_auth_config_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_auth_config_realm ON public.authenticator_config USING btree (realm_id);


--
-- Name: idx_auth_exec_flow; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_auth_exec_flow ON public.authentication_execution USING btree (flow_id);


--
-- Name: idx_auth_exec_realm_flow; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_auth_exec_realm_flow ON public.authentication_execution USING btree (realm_id, flow_id);


--
-- Name: idx_auth_flow_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_auth_flow_realm ON public.authentication_flow USING btree (realm_id);


--
-- Name: idx_cl_clscope; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_cl_clscope ON public.client_scope_client USING btree (scope_id);


--
-- Name: idx_client_att_by_name_value; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_client_att_by_name_value ON public.client_attributes USING btree (name, ((value)::character varying(250)));


--
-- Name: idx_client_id; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_client_id ON public.client USING btree (client_id);


--
-- Name: idx_client_init_acc_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_client_init_acc_realm ON public.client_initial_access USING btree (realm_id);


--
-- Name: idx_client_session_session; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_client_session_session ON public.client_session USING btree (session_id);


--
-- Name: idx_clscope_attrs; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_clscope_attrs ON public.client_scope_attributes USING btree (scope_id);


--
-- Name: idx_clscope_cl; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_clscope_cl ON public.client_scope_client USING btree (client_id);


--
-- Name: idx_clscope_protmap; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_clscope_protmap ON public.protocol_mapper USING btree (client_scope_id);


--
-- Name: idx_clscope_role; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_clscope_role ON public.client_scope_role_mapping USING btree (scope_id);


--
-- Name: idx_compo_config_compo; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_compo_config_compo ON public.component_config USING btree (component_id);


--
-- Name: idx_component_provider_type; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_component_provider_type ON public.component USING btree (provider_type);


--
-- Name: idx_component_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_component_realm ON public.component USING btree (realm_id);


--
-- Name: idx_composite; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_composite ON public.composite_role USING btree (composite);


--
-- Name: idx_composite_child; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_composite_child ON public.composite_role USING btree (child_role);


--
-- Name: idx_defcls_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_defcls_realm ON public.default_client_scope USING btree (realm_id);


--
-- Name: idx_defcls_scope; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_defcls_scope ON public.default_client_scope USING btree (scope_id);


--
-- Name: idx_event_time; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_event_time ON public.event_entity USING btree (realm_id, event_time);


--
-- Name: idx_fedidentity_feduser; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fedidentity_feduser ON public.federated_identity USING btree (federated_user_id);


--
-- Name: idx_fedidentity_user; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fedidentity_user ON public.federated_identity USING btree (user_id);


--
-- Name: idx_fu_attribute; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_attribute ON public.fed_user_attribute USING btree (user_id, realm_id, name);


--
-- Name: idx_fu_cnsnt_ext; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_cnsnt_ext ON public.fed_user_consent USING btree (user_id, client_storage_provider, external_client_id);


--
-- Name: idx_fu_consent; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_consent ON public.fed_user_consent USING btree (user_id, client_id);


--
-- Name: idx_fu_consent_ru; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_consent_ru ON public.fed_user_consent USING btree (realm_id, user_id);


--
-- Name: idx_fu_credential; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_credential ON public.fed_user_credential USING btree (user_id, type);


--
-- Name: idx_fu_credential_ru; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_credential_ru ON public.fed_user_credential USING btree (realm_id, user_id);


--
-- Name: idx_fu_group_membership; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_group_membership ON public.fed_user_group_membership USING btree (user_id, group_id);


--
-- Name: idx_fu_group_membership_ru; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_group_membership_ru ON public.fed_user_group_membership USING btree (realm_id, user_id);


--
-- Name: idx_fu_required_action; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_required_action ON public.fed_user_required_action USING btree (user_id, required_action);


--
-- Name: idx_fu_required_action_ru; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_required_action_ru ON public.fed_user_required_action USING btree (realm_id, user_id);


--
-- Name: idx_fu_role_mapping; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_role_mapping ON public.fed_user_role_mapping USING btree (user_id, role_id);


--
-- Name: idx_fu_role_mapping_ru; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_role_mapping_ru ON public.fed_user_role_mapping USING btree (realm_id, user_id);


--
-- Name: idx_group_attr_group; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_group_attr_group ON public.group_attribute USING btree (group_id);


--
-- Name: idx_group_role_mapp_group; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_group_role_mapp_group ON public.group_role_mapping USING btree (group_id);


--
-- Name: idx_id_prov_mapp_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_id_prov_mapp_realm ON public.identity_provider_mapper USING btree (realm_id);


--
-- Name: idx_ident_prov_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_ident_prov_realm ON public.identity_provider USING btree (realm_id);


--
-- Name: idx_keycloak_role_client; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_keycloak_role_client ON public.keycloak_role USING btree (client);


--
-- Name: idx_keycloak_role_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_keycloak_role_realm ON public.keycloak_role USING btree (realm);


--
-- Name: idx_offline_css_preload; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_offline_css_preload ON public.offline_client_session USING btree (client_id, offline_flag);


--
-- Name: idx_offline_uss_by_user; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_offline_uss_by_user ON public.offline_user_session USING btree (user_id, realm_id, offline_flag);


--
-- Name: idx_offline_uss_by_usersess; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_offline_uss_by_usersess ON public.offline_user_session USING btree (realm_id, offline_flag, user_session_id);


--
-- Name: idx_offline_uss_createdon; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_offline_uss_createdon ON public.offline_user_session USING btree (created_on);


--
-- Name: idx_offline_uss_preload; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_offline_uss_preload ON public.offline_user_session USING btree (offline_flag, created_on, user_session_id);


--
-- Name: idx_protocol_mapper_client; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_protocol_mapper_client ON public.protocol_mapper USING btree (client_id);


--
-- Name: idx_realm_attr_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_attr_realm ON public.realm_attribute USING btree (realm_id);


--
-- Name: idx_realm_clscope; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_clscope ON public.client_scope USING btree (realm_id);


--
-- Name: idx_realm_def_grp_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_def_grp_realm ON public.realm_default_groups USING btree (realm_id);


--
-- Name: idx_realm_evt_list_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_evt_list_realm ON public.realm_events_listeners USING btree (realm_id);


--
-- Name: idx_realm_evt_types_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_evt_types_realm ON public.realm_enabled_event_types USING btree (realm_id);


--
-- Name: idx_realm_master_adm_cli; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_master_adm_cli ON public.realm USING btree (master_admin_client);


--
-- Name: idx_realm_supp_local_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_supp_local_realm ON public.realm_supported_locales USING btree (realm_id);


--
-- Name: idx_redir_uri_client; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_redir_uri_client ON public.redirect_uris USING btree (client_id);


--
-- Name: idx_req_act_prov_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_req_act_prov_realm ON public.required_action_provider USING btree (realm_id);


--
-- Name: idx_res_policy_policy; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_res_policy_policy ON public.resource_policy USING btree (policy_id);


--
-- Name: idx_res_scope_scope; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_res_scope_scope ON public.resource_scope USING btree (scope_id);


--
-- Name: idx_res_serv_pol_res_serv; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_res_serv_pol_res_serv ON public.resource_server_policy USING btree (resource_server_id);


--
-- Name: idx_res_srv_res_res_srv; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_res_srv_res_res_srv ON public.resource_server_resource USING btree (resource_server_id);


--
-- Name: idx_res_srv_scope_res_srv; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_res_srv_scope_res_srv ON public.resource_server_scope USING btree (resource_server_id);


--
-- Name: idx_role_attribute; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_role_attribute ON public.role_attribute USING btree (role_id);


--
-- Name: idx_role_clscope; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_role_clscope ON public.client_scope_role_mapping USING btree (role_id);


--
-- Name: idx_scope_mapping_role; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_scope_mapping_role ON public.scope_mapping USING btree (role_id);


--
-- Name: idx_scope_policy_policy; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_scope_policy_policy ON public.scope_policy USING btree (policy_id);


--
-- Name: idx_update_time; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_update_time ON public.migration_model USING btree (update_time);


--
-- Name: idx_us_sess_id_on_cl_sess; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_us_sess_id_on_cl_sess ON public.offline_client_session USING btree (user_session_id);


--
-- Name: idx_usconsent_clscope; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_usconsent_clscope ON public.user_consent_client_scope USING btree (user_consent_id);


--
-- Name: idx_user_attribute; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_attribute ON public.user_attribute USING btree (user_id);


--
-- Name: idx_user_attribute_name; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_attribute_name ON public.user_attribute USING btree (name, value);


--
-- Name: idx_user_consent; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_consent ON public.user_consent USING btree (user_id);


--
-- Name: idx_user_credential; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_credential ON public.credential USING btree (user_id);


--
-- Name: idx_user_email; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_email ON public.user_entity USING btree (email);


--
-- Name: idx_user_group_mapping; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_group_mapping ON public.user_group_membership USING btree (user_id);


--
-- Name: idx_user_reqactions; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_reqactions ON public.user_required_action USING btree (user_id);


--
-- Name: idx_user_role_mapping; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_role_mapping ON public.user_role_mapping USING btree (user_id);


--
-- Name: idx_usr_fed_map_fed_prv; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_usr_fed_map_fed_prv ON public.user_federation_mapper USING btree (federation_provider_id);


--
-- Name: idx_usr_fed_map_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_usr_fed_map_realm ON public.user_federation_mapper USING btree (realm_id);


--
-- Name: idx_usr_fed_prv_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_usr_fed_prv_realm ON public.user_federation_provider USING btree (realm_id);


--
-- Name: idx_web_orig_client; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_web_orig_client ON public.web_origins USING btree (client_id);


--
-- Name: client_session_auth_status auth_status_constraint; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_auth_status
    ADD CONSTRAINT auth_status_constraint FOREIGN KEY (client_session) REFERENCES public.client_session(id);


--
-- Name: identity_provider fk2b4ebc52ae5c3b34; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider
    ADD CONSTRAINT fk2b4ebc52ae5c3b34 FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: client_attributes fk3c47c64beacca966; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_attributes
    ADD CONSTRAINT fk3c47c64beacca966 FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: federated_identity fk404288b92ef007a6; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.federated_identity
    ADD CONSTRAINT fk404288b92ef007a6 FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: client_node_registrations fk4129723ba992f594; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_node_registrations
    ADD CONSTRAINT fk4129723ba992f594 FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: client_session_note fk5edfb00ff51c2736; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_note
    ADD CONSTRAINT fk5edfb00ff51c2736 FOREIGN KEY (client_session) REFERENCES public.client_session(id);


--
-- Name: user_session_note fk5edfb00ff51d3472; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_session_note
    ADD CONSTRAINT fk5edfb00ff51d3472 FOREIGN KEY (user_session) REFERENCES public.user_session(id);


--
-- Name: client_session_role fk_11b7sgqw18i532811v7o2dv76; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_role
    ADD CONSTRAINT fk_11b7sgqw18i532811v7o2dv76 FOREIGN KEY (client_session) REFERENCES public.client_session(id);


--
-- Name: redirect_uris fk_1burs8pb4ouj97h5wuppahv9f; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.redirect_uris
    ADD CONSTRAINT fk_1burs8pb4ouj97h5wuppahv9f FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: user_federation_provider fk_1fj32f6ptolw2qy60cd8n01e8; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_provider
    ADD CONSTRAINT fk_1fj32f6ptolw2qy60cd8n01e8 FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: client_session_prot_mapper fk_33a8sgqw18i532811v7o2dk89; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_prot_mapper
    ADD CONSTRAINT fk_33a8sgqw18i532811v7o2dk89 FOREIGN KEY (client_session) REFERENCES public.client_session(id);


--
-- Name: realm_required_credential fk_5hg65lybevavkqfki3kponh9v; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_required_credential
    ADD CONSTRAINT fk_5hg65lybevavkqfki3kponh9v FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: resource_attribute fk_5hrm2vlf9ql5fu022kqepovbr; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_attribute
    ADD CONSTRAINT fk_5hrm2vlf9ql5fu022kqepovbr FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- Name: user_attribute fk_5hrm2vlf9ql5fu043kqepovbr; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_attribute
    ADD CONSTRAINT fk_5hrm2vlf9ql5fu043kqepovbr FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: user_required_action fk_6qj3w1jw9cvafhe19bwsiuvmd; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_required_action
    ADD CONSTRAINT fk_6qj3w1jw9cvafhe19bwsiuvmd FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: keycloak_role fk_6vyqfe4cn4wlq8r6kt5vdsj5c; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.keycloak_role
    ADD CONSTRAINT fk_6vyqfe4cn4wlq8r6kt5vdsj5c FOREIGN KEY (realm) REFERENCES public.realm(id);


--
-- Name: realm_smtp_config fk_70ej8xdxgxd0b9hh6180irr0o; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_smtp_config
    ADD CONSTRAINT fk_70ej8xdxgxd0b9hh6180irr0o FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: realm_attribute fk_8shxd6l3e9atqukacxgpffptw; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_attribute
    ADD CONSTRAINT fk_8shxd6l3e9atqukacxgpffptw FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: composite_role fk_a63wvekftu8jo1pnj81e7mce2; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.composite_role
    ADD CONSTRAINT fk_a63wvekftu8jo1pnj81e7mce2 FOREIGN KEY (composite) REFERENCES public.keycloak_role(id);


--
-- Name: authentication_execution fk_auth_exec_flow; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authentication_execution
    ADD CONSTRAINT fk_auth_exec_flow FOREIGN KEY (flow_id) REFERENCES public.authentication_flow(id);


--
-- Name: authentication_execution fk_auth_exec_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authentication_execution
    ADD CONSTRAINT fk_auth_exec_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: authentication_flow fk_auth_flow_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authentication_flow
    ADD CONSTRAINT fk_auth_flow_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: authenticator_config fk_auth_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authenticator_config
    ADD CONSTRAINT fk_auth_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: client_session fk_b4ao2vcvat6ukau74wbwtfqo1; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session
    ADD CONSTRAINT fk_b4ao2vcvat6ukau74wbwtfqo1 FOREIGN KEY (session_id) REFERENCES public.user_session(id);


--
-- Name: user_role_mapping fk_c4fqv34p1mbylloxang7b1q3l; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_role_mapping
    ADD CONSTRAINT fk_c4fqv34p1mbylloxang7b1q3l FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: client_scope_attributes fk_cl_scope_attr_scope; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope_attributes
    ADD CONSTRAINT fk_cl_scope_attr_scope FOREIGN KEY (scope_id) REFERENCES public.client_scope(id);


--
-- Name: client_scope_role_mapping fk_cl_scope_rm_scope; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope_role_mapping
    ADD CONSTRAINT fk_cl_scope_rm_scope FOREIGN KEY (scope_id) REFERENCES public.client_scope(id);


--
-- Name: client_user_session_note fk_cl_usr_ses_note; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_user_session_note
    ADD CONSTRAINT fk_cl_usr_ses_note FOREIGN KEY (client_session) REFERENCES public.client_session(id);


--
-- Name: protocol_mapper fk_cli_scope_mapper; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.protocol_mapper
    ADD CONSTRAINT fk_cli_scope_mapper FOREIGN KEY (client_scope_id) REFERENCES public.client_scope(id);


--
-- Name: client_initial_access fk_client_init_acc_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_initial_access
    ADD CONSTRAINT fk_client_init_acc_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: component_config fk_component_config; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.component_config
    ADD CONSTRAINT fk_component_config FOREIGN KEY (component_id) REFERENCES public.component(id);


--
-- Name: component fk_component_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT fk_component_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: realm_default_groups fk_def_groups_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_default_groups
    ADD CONSTRAINT fk_def_groups_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: user_federation_mapper_config fk_fedmapper_cfg; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_mapper_config
    ADD CONSTRAINT fk_fedmapper_cfg FOREIGN KEY (user_federation_mapper_id) REFERENCES public.user_federation_mapper(id);


--
-- Name: user_federation_mapper fk_fedmapperpm_fedprv; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_mapper
    ADD CONSTRAINT fk_fedmapperpm_fedprv FOREIGN KEY (federation_provider_id) REFERENCES public.user_federation_provider(id);


--
-- Name: user_federation_mapper fk_fedmapperpm_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_mapper
    ADD CONSTRAINT fk_fedmapperpm_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: associated_policy fk_frsr5s213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.associated_policy
    ADD CONSTRAINT fk_frsr5s213xcx4wnkog82ssrfy FOREIGN KEY (associated_policy_id) REFERENCES public.resource_server_policy(id);


--
-- Name: scope_policy fk_frsrasp13xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.scope_policy
    ADD CONSTRAINT fk_frsrasp13xcx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- Name: resource_server_perm_ticket fk_frsrho213xcx4wnkog82sspmt; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrho213xcx4wnkog82sspmt FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);


--
-- Name: resource_server_resource fk_frsrho213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_resource
    ADD CONSTRAINT fk_frsrho213xcx4wnkog82ssrfy FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);


--
-- Name: resource_server_perm_ticket fk_frsrho213xcx4wnkog83sspmt; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrho213xcx4wnkog83sspmt FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- Name: resource_server_perm_ticket fk_frsrho213xcx4wnkog84sspmt; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrho213xcx4wnkog84sspmt FOREIGN KEY (scope_id) REFERENCES public.resource_server_scope(id);


--
-- Name: associated_policy fk_frsrpas14xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.associated_policy
    ADD CONSTRAINT fk_frsrpas14xcx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- Name: scope_policy fk_frsrpass3xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.scope_policy
    ADD CONSTRAINT fk_frsrpass3xcx4wnkog82ssrfy FOREIGN KEY (scope_id) REFERENCES public.resource_server_scope(id);


--
-- Name: resource_server_perm_ticket fk_frsrpo2128cx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrpo2128cx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- Name: resource_server_policy fk_frsrpo213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_policy
    ADD CONSTRAINT fk_frsrpo213xcx4wnkog82ssrfy FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);


--
-- Name: resource_scope fk_frsrpos13xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_scope
    ADD CONSTRAINT fk_frsrpos13xcx4wnkog82ssrfy FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- Name: resource_policy fk_frsrpos53xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_policy
    ADD CONSTRAINT fk_frsrpos53xcx4wnkog82ssrfy FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- Name: resource_policy fk_frsrpp213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_policy
    ADD CONSTRAINT fk_frsrpp213xcx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- Name: resource_scope fk_frsrps213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_scope
    ADD CONSTRAINT fk_frsrps213xcx4wnkog82ssrfy FOREIGN KEY (scope_id) REFERENCES public.resource_server_scope(id);


--
-- Name: resource_server_scope fk_frsrso213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_scope
    ADD CONSTRAINT fk_frsrso213xcx4wnkog82ssrfy FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);


--
-- Name: composite_role fk_gr7thllb9lu8q4vqa4524jjy8; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.composite_role
    ADD CONSTRAINT fk_gr7thllb9lu8q4vqa4524jjy8 FOREIGN KEY (child_role) REFERENCES public.keycloak_role(id);


--
-- Name: user_consent_client_scope fk_grntcsnt_clsc_usc; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_consent_client_scope
    ADD CONSTRAINT fk_grntcsnt_clsc_usc FOREIGN KEY (user_consent_id) REFERENCES public.user_consent(id);


--
-- Name: user_consent fk_grntcsnt_user; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT fk_grntcsnt_user FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: group_attribute fk_group_attribute_group; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.group_attribute
    ADD CONSTRAINT fk_group_attribute_group FOREIGN KEY (group_id) REFERENCES public.keycloak_group(id);


--
-- Name: group_role_mapping fk_group_role_group; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.group_role_mapping
    ADD CONSTRAINT fk_group_role_group FOREIGN KEY (group_id) REFERENCES public.keycloak_group(id);


--
-- Name: realm_enabled_event_types fk_h846o4h0w8epx5nwedrf5y69j; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_enabled_event_types
    ADD CONSTRAINT fk_h846o4h0w8epx5nwedrf5y69j FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: realm_events_listeners fk_h846o4h0w8epx5nxev9f5y69j; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_events_listeners
    ADD CONSTRAINT fk_h846o4h0w8epx5nxev9f5y69j FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: identity_provider_mapper fk_idpm_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider_mapper
    ADD CONSTRAINT fk_idpm_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: idp_mapper_config fk_idpmconfig; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.idp_mapper_config
    ADD CONSTRAINT fk_idpmconfig FOREIGN KEY (idp_mapper_id) REFERENCES public.identity_provider_mapper(id);


--
-- Name: web_origins fk_lojpho213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.web_origins
    ADD CONSTRAINT fk_lojpho213xcx4wnkog82ssrfy FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: scope_mapping fk_ouse064plmlr732lxjcn1q5f1; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.scope_mapping
    ADD CONSTRAINT fk_ouse064plmlr732lxjcn1q5f1 FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: protocol_mapper fk_pcm_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.protocol_mapper
    ADD CONSTRAINT fk_pcm_realm FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: credential fk_pfyr0glasqyl0dei3kl69r6v0; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.credential
    ADD CONSTRAINT fk_pfyr0glasqyl0dei3kl69r6v0 FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: protocol_mapper_config fk_pmconfig; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.protocol_mapper_config
    ADD CONSTRAINT fk_pmconfig FOREIGN KEY (protocol_mapper_id) REFERENCES public.protocol_mapper(id);


--
-- Name: default_client_scope fk_r_def_cli_scope_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.default_client_scope
    ADD CONSTRAINT fk_r_def_cli_scope_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: required_action_provider fk_req_act_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.required_action_provider
    ADD CONSTRAINT fk_req_act_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: resource_uris fk_resource_server_uris; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_uris
    ADD CONSTRAINT fk_resource_server_uris FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- Name: role_attribute fk_role_attribute_id; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.role_attribute
    ADD CONSTRAINT fk_role_attribute_id FOREIGN KEY (role_id) REFERENCES public.keycloak_role(id);


--
-- Name: realm_supported_locales fk_supported_locales_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_supported_locales
    ADD CONSTRAINT fk_supported_locales_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: user_federation_config fk_t13hpu1j94r2ebpekr39x5eu5; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_config
    ADD CONSTRAINT fk_t13hpu1j94r2ebpekr39x5eu5 FOREIGN KEY (user_federation_provider_id) REFERENCES public.user_federation_provider(id);


--
-- Name: user_group_membership fk_user_group_user; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_group_membership
    ADD CONSTRAINT fk_user_group_user FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: policy_config fkdc34197cf864c4e43; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.policy_config
    ADD CONSTRAINT fkdc34197cf864c4e43 FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- Name: identity_provider_config fkdc4897cf864c4e43; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider_config
    ADD CONSTRAINT fkdc4897cf864c4e43 FOREIGN KEY (identity_provider_id) REFERENCES public.identity_provider(internal_id);


--
-- PostgreSQL database dump complete
--

